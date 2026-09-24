# BinusRoom

A system for BINUS University students to see which rooms are in use, check a room's schedule and conditions, and request a room for study.

The repo has two parts:

| Folder                   | What it is                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| [`frontend/`](frontend/) | Mobile app built with Expo (React Native), Expo Router and NativeWind                                |
| [`arduino/`](arduino/)   | ESP32 firmware that reads temperature, humidity, air quality and rain, then sends them to Firebase |

---

## Frontend (mobile app)

### Features

- **Home**: shows the room you are currently in, the session details, and the room's temperature, humidity and air quality. Links to the room list and to room requests.
- **Room List**: lists room bookings with course, requester, time and approval status.
- **Room Details**: opens from the home card or a room tile. Shows the room number, a horizontal list of the day's sessions, and details for the selected session.
- **Request Room**: placeholder screen.

### Tech stack

| Area       | Library                                     |
| ---------- | ------------------------------------------- |
| Framework  | Expo SDK 51, React Native 0.74, React 18    |
| Navigation | Expo Router 3 (file-based, typed routes)    |
| Styling    | NativeWind 4 + Tailwind CSS 3               |
| UI         | React Native Paper, `expo-linear-gradient`  |
| Icons      | `lucide-react-native`, `@expo/vector-icons` |
| Testing    | Jest with `jest-expo`                       |
| Builds     | EAS Build                                   |

### Getting started

You need Node.js 18 or newer, npm, and either the [Expo Go](https://expo.dev/go) app on your phone or an Android emulator / iOS simulator.

```bash
cd frontend
npm install
npm start
```

Then scan the QR code with Expo Go, or press `a` (Android), `i` (iOS) or `w` (web) in the terminal.

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `npm start`       | Start the Expo dev server     |
| `npm run android` | Start and open on Android     |
| `npm run ios`     | Start and open on iOS         |
| `npm run web`     | Start and open in the browser |
| `npm test`        | Run Jest in watch mode        |

### Project structure

```
frontend/
  app/
    _layout.tsx              Root stack navigator and theme
    (tabs)/
      _layout.tsx            Bottom tab bar (Home, Room List)
      index.tsx              Home screen
      roomList.tsx           Room list screen
    roomdetails/[roomNo].tsx Room details, opened as a modal
    requestRoom.tsx          Request room screen (placeholder)
    components/
      RoomTiles.tsx          Room booking card used in the list
      SessionCard.tsx        Session card used in room details
  components/                Shared helpers from the Expo template
  constants/Colors.ts        Theme colours
  assets/                    Fonts, icons and splash image
  global.css                 Tailwind entry point
  tailwind.config.js         Tailwind / NativeWind config
  eas.json                   EAS build profiles
```

### Building with EAS

The app is set up for [EAS Build](https://docs.expo.dev/build/introduction/) with three profiles in `frontend/eas.json`: `development`, `preview` and `production`.

```bash
npm install -g eas-cli
cd frontend
eas login
eas build --profile preview --platform android
```

The Android package name is `com.dneilson.BinusRoom`.

---

## Arduino (sensor node)

[`arduino/main.ino`](arduino/main.ino) runs on an ESP32. It connects to Wi-Fi, signs in to Firebase anonymously, reads its sensors every second, and sends the latest readings to the Realtime Database every 10 seconds.

### Hardware

| Component          | ESP32 pin(s)                   | Measures                 |
| ------------------ | ------------------------------ | ------------------------ |
| DHT11              | GPIO 23                        | Temperature, humidity    |
| MQ135 gas sensor   | GPIO 33 (analog), 18 (digital) | Air quality, gas state   |
| Rain sensor module | GPIO 32 (analog), 35 (digital) | Rain intensity, rain yes/no |

### Libraries

Install these through the Arduino IDE Library Manager, along with the ESP32 board package:

- [Firebase Arduino Client Library for ESP8266 and ESP32](https://github.com/mobizt/Firebase-ESP-Client) (`Firebase_ESP_Client.h`)
- [DHT sensor library](https://github.com/adafruit/DHT-sensor-library) by Adafruit

### Configuration

Fill in these values at the top of `main.ino` before you upload it:

```cpp
#define API_KEY ""        // Firebase Web API key
#define DATABASE_URL ""   // Firebase Realtime Database URL
#define WIFI_SSID ""      // Wi-Fi network name
#define WIFI_PASSWORD ""  // Wi-Fi password
```

### Data format

The sketch overwrites the `Outdoor` node in the Realtime Database each time it sends data:

```json
{
  "Outdoor": {
    "temperatureValue": 26.0,
    "humidityValue": 30.0,
    "rainIntensityValue": 4095,
    "rainDetected": 1,
    "gasState": 1,
    "airQuality": "Good",
    "timestamp": 1234
  }
}
```

- `rainDetected` and `gasState` are the raw digital pin readings. For the rain sensor, `0` (LOW) means rain was detected.
- `airQuality` comes from the MQ135 analog reading (0–4095): below 2048 is `Good`, below 2560 is `Moderate`, below 3072 is `Bad`, and anything higher is `Unhealthy`.
- `timestamp` is the number of seconds since the board booted, not wall-clock time.

---

## Roadmap

- Read live sensor data from Firebase in the app instead of hard-coded values
- Support one sensor node per room instead of a single `Outdoor` node
- Load rooms and sessions from a backend instead of hard-coded arrays
- Implement the Request Room form and approval flow
- Make the room filter and campus selector work
