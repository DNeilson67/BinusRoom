import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Calendar, Thermometer, Droplet, Wind } from "lucide-react-native";
import { Avatar, Divider } from "react-native-paper";
import SessionCard from "../components/SessionCard";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function RoomDetails() {
  const insets = useSafeAreaInsets(); // Get the safe area insets
  const { roomNo } = useLocalSearchParams();
  
  // State to track the selected session
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Handle session selection
  const handleSessionSelect = (sessionId:string) => {
    setSelectedSession(sessionId);
  };

  // Default session details if no session is selected
  const sessionDetails = selectedSession || {
    title: "No session selected",
    requestText: "N/A",
    time: "N/A",
    username: "N/A",
    date: "N/A",
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#4A90E2", "#A34FA0"]}
        className="flex-1"
        style={{ paddingTop: insets.top + 50 }}
      >
        {/* Room Name Section */}
        <View className="px-4 py-6 h-[15%]">
          <Text className="text-white text-5xl font-bold">{roomNo}</Text>
          <Text className="text-white text-xl">Auditorium</Text>
        </View>

        <Divider bold={true}></Divider>

        {/* Session Cards Section */}
        <View className="h-1/4">
          <ScrollView horizontal={true} className="py-2">
            <SessionCard
              title="Student's Request"
              requestText="Student's Request"
              time="09:00 - 12:00"
              onPress={() => handleSessionSelect({ title: "Student's Request", requestText: "Student's Request", time: "09:00 - 12:00", username: "DAVIN NEILSON", date: "11 Nov 2024 08:30 - 10:10 GMT+7" })}
            />
            <SessionCard
              title="Research Methodology in Computer Science"
              requestText="COMP6696001 | L5AC - LEC"
              time="13:00 - 15:00"
              onPress={() => handleSessionSelect({ title: "Research Methodology in Computer Science", requestText: "COMP6696001 | L5AC - LEC", time: "13:00 - 15:00", username: "JANE DOE", date: "11 Nov 2024 13:00 - 15:00 GMT+7" })}
            />
            <SessionCard
              title="Student's Request"
              requestText="Student's Request"
              time="17:00 - 19:00"
              onPress={() => handleSessionSelect({ title: "Student's Request", requestText: "Student's Request", time: "17:00 - 19:00", username: "JOHN SMITH", date: "11 Nov 2024 17:00 - 19:00 GMT+7" })}
            />
          </ScrollView>
        </View>

        {/* Room Details Section */}
        <View className="flex-1 bg-white bg-white rounded-t-3xl px-4 pt-4">
          <ScrollView>
            {/* Room Details Title */}
            <Text className="text-2xl font-semibold mb-4">Room Details</Text>
            
            {/* Session Details */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-white p-4 rounded-3xl flex flex-row gap-2 shadow-lg border border-gray-500"
            >
              <View className="flex gap-2 flex-col w-3/4">
                <Text className="text-2xl font-semibold">
                  {sessionDetails.title}
                </Text>

                <View className="flex-row items-center gap-2">
                  <Avatar.Text size={40} label="DN" />
                  <Text className="text-base font-medium">{sessionDetails.username}</Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Calendar size={25} color={"gray"} />
                  <Text>{sessionDetails.date}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Environmental Stats */}
            <View className="flex flex-row gap-2 justify-center mt-4">
              <View className="flex flex-row items-center">
                <Thermometer size={45} color="#666" />
                <View>
                  <Text>Temp</Text>
                  <Text className="text-3xl font-bold">26°C</Text>
                </View>
              </View>
              <Divider style={{ width: 1, height: "100%" }} />
              <View className="flex flex-row items-center">
                <Droplet size={45} color="#666" />
                <View>
                  <Text>Humidity</Text>
                  <Text className="text-3xl font-bold">30%</Text>
                </View>
              </View>
              <Divider style={{ width: 1, height: "100%" }} />
              <View className="flex flex-row items-center">
                <Wind size={45} color="#666" />
                <View>
                  <Text>Air Quality</Text>
                  <Text className="text-3xl font-bold">GOOD</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
