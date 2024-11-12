import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  ChevronLeft,
  Wifi,
  BellRing,
  Signal,
  TimerIcon,
  Clock9,
  GraduationCap,
  Thermometer,
  Droplet,
  Wind,
} from "lucide-react-native";
import { Divider } from "react-native-paper";
import SessionCard from "./components/SessionCard";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function roomdetails() {
  const insets = useSafeAreaInsets(); // Get the safe area insets
  return (
    <SafeAreaView className="flex-1 gap-2">
      <LinearGradient colors={["#4A90E2", "#A34FA0"]} className="flex-1"  style={{ paddingTop: insets.top+40 }}
        >
        {/* Course Info */}
        <View className="px-4 py-6">
          <Text className="text-white text-center text-5xl font-bold">603</Text>
          <Text className="text-white text-center text-2xl">Auditorium</Text>
        </View>

        <Divider bold={true}></Divider>

        {/* Session Cards */}
        <ScrollView
          className="h-4 px-4 py-2"
          horizontal={true}
          style={{ maxHeight: 175 }}
        >
          <SessionCard
            title="Student's Request"
            requestText="Student's Request"
            time="09:00 - 12:00"
          />
          <SessionCard
            title="Student's Request"
            requestText="Student's Request"
            time="13:00 - 15:00"
          />
          <SessionCard
            title="Student's Request"
            requestText="Student's Request"
            time="17:00 - 19:00"
          />
        </ScrollView>

        <ScrollView className="flex flex-col bg-white rounded-3xl px-4 pt-10">
          {/* Latest Posts */}
          <Text className="text-2xl font-semibold mb-4">Room Details</Text>

          <View className="flex flex-row gap-2 justify-center">
            <View className="flex flex-row items-center">
              <Thermometer size={45} color="#666"></Thermometer>
              <View>
                <Text className="">Temp</Text>
                <Text className="text-3xl font-bold">26°C</Text>
              </View>
            </View>
            <Divider style={{ width: 1, height: "100%" }}></Divider>
            <View className="flex flex-row items-center">
              <Droplet size={45} color="#666"></Droplet>
              <View>
                <Text className="">Humidity</Text>
                <Text className="text-3xl font-bold">30%</Text>
              </View>
            </View>
            <Divider style={{ width: 1, height: "100%" }}></Divider>
            <View className="flex flex-row items-center">
              <Wind size={45} color="#666"></Wind>
              <View>
                <Text className="">Air Quality</Text>
                <Text className="text-3xl font-bold">GOOD</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
