#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include "time.h"
#include <WiFi.h>
#include "DHT.h"

// Firebase configurations
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define API_KEY ""
#define DATABASE_URL ""

#define WIFI_SSID "" // Replace with existing Wifi SSID
#define WIFI_PASSWORD "" // Replace with Wifi Password

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;
FirebaseJson json;

// DHT Sensor
#define DHTPIN 23
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// MQ135 Sensor
#define MQ135_DIGITAL_PIN 18
#define MQ135_ANALOG_PIN 33

// Rain Sensor
#define RAIN_ANALOG_PIN 32
#define RAIN_DIGITAL_PIN 35

// Timer variables
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 10000;
bool signupOK = false;

void initFirebase() {
  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;

  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);

  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("Firebase signup successful.");
    signupOK = true;
  } else {
    Serial.printf("Firebase signup failed: %s\n", config.signer.signupError.message.c_str());
  }

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);

  int retries = 10; // Retry Firebase readiness
  while (!Firebase.ready() && retries--) {
    Serial.println("Waiting for Firebase connection...");
    delay(1000);
  }

  if (Firebase.ready()) {
    Serial.println("Firebase is ready.");
  } else {
    Serial.println("Failed to initialize Firebase. Check your configuration.");
  }
}

void setup() {
  Serial.begin(115200);

  // WiFi Connection
  Serial.println("Connecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\nConnected to WiFi.");

  // Initialize Firebase
  initFirebase();

  // Initialize DHT sensor
  dht.begin();

  // Set up sensor pins
  pinMode(MQ135_DIGITAL_PIN, INPUT);
  pinMode(RAIN_DIGITAL_PIN, INPUT);

  Serial.println("Sensors initialized.");
}

void loop() {
  // Read DHT11 Sensor
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.printf("Temperature: %.2f °C\n", temperature);
    Serial.printf("Humidity: %.2f %%\n", humidity);
  }

  // Read Rain Sensor
  int rainIntensity = analogRead(RAIN_ANALOG_PIN);
  int rainDetected = digitalRead(RAIN_DIGITAL_PIN);
  Serial.printf("Rain Intensity: %d\n", rainIntensity);
  Serial.println(rainDetected == LOW ? "Rain detected." : "No rain detected.");

  // Read MQ135 Sensor
  int mq135Digital = digitalRead(MQ135_DIGITAL_PIN);
  int mq135Analog = analogRead(MQ135_ANALOG_PIN);
  String airQuality = categorizeAQI(mq135Analog);
  Serial.printf("MQ135 Digital: %d\n", mq135Digital);
  Serial.printf("MQ135 Analog: %d\n", mq135Analog);
  Serial.printf("Air Quality: %s\n", airQuality.c_str());

  // Send data to Firebase
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    json.clear();
    json.set("/temperatureValue", temperature);
    json.set("/humidityValue", humidity);
    json.set("/rainIntensityValue", rainIntensity);
    json.set("/rainDetected", rainDetected);
    json.set("/gasState", mq135Digital);
    json.set("/airQuality", airQuality);
    json.set("/timestamp", millis() / 1000);

    if (Firebase.RTDB.setJSON(&fbdo, "Outdoor", &json)) {
      Serial.println("Data sent successfully.");
    } else {
      Serial.printf("Failed to send data: %s\n", fbdo.errorReason().c_str());
    }
  }

  delay(1000); // 1-second loop delay
}

String categorizeAQI(int analogValue) {
  int aqiValue = map(analogValue, 0, 4095, 0, 300);

  if (analogValue < 1024) return "Good";            // Less than 25% of max
  else if (analogValue < 2048) return "Good";   // 25%-50% of max
  else if (analogValue < 2560) return "Moderate";
  else if (analogValue < 3072) return "Bad";  // 50%-75% of max
  else return "Unhealthy";
}

