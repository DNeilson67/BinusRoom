import { Clock9, GraduationCap } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

interface SessionCardProps {
    title: string;
    requestText: string;
    time: string;
  }
  
  // SessionCard Component
const SessionCard: React.FC<SessionCardProps> = ({ title, requestText, time }) => (
    <TouchableOpacity className="w-64 flex bg-white p-4 rounded-xl shadow-md justify-between my-2 mr-2">
      <Text className="text-xl font-semibold mb-2">{title}</Text>
      <View>
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