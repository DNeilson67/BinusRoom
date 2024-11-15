import { Clock9, GraduationCap } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

interface SessionCardProps {
  title: string;
  requestText: string;
  time: string;
  onPress: () => void; // Add onPress prop to handle session selection
}

const SessionCard: React.FC<SessionCardProps> = ({ title, requestText, time, onPress }) => (
  <TouchableOpacity
    className="w-64 flex bg-white p-4 rounded-xl shadow-lg justify-between my-2 mx-2"
    onPress={onPress} // Trigger onPress when the card is clicked
  >
    <Text className="text-xl font-semibold mb-2">{title}</Text>
    <View className="flex flex-col gap-1">
      <View className="flex flex-row gap-2 items-center">
        <GraduationCap size={25} color="#666" />
        <Text className="text-gray-500">{requestText}</Text>
      </View>
      <View className="flex flex-row gap-2 items-center">
        <Clock9 size={25} color="#666" />
        <Text className="text-gray-500">{time}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default SessionCard;
