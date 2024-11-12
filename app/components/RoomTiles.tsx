import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import {
  Calendar,
  CircleCheck,
  CircleMinus,
} from "lucide-react-native";
import { Link } from "expo-router";

interface RoomTilesProps {
  roomNo: string;
  username: string;
  className: string;
  classType: string;
  courseCode: string;
  courseName: string;
  approved: boolean;
}

export default function RoomTiles({
  roomNo,
  username,
  className,
  classType,
  courseCode,
  courseName,
  approved,
}: RoomTilesProps) {
  return (
    <Link href="/roomdetails" asChild>
      <TouchableOpacity activeOpacity={0.7} className="bg-white mx-4 my-2 p-4 rounded-xl flex flex-row gap-2">
        <View className="flex gap-2 flex-col w-3/4">
          <Text className="text-2xl font-semibold">{courseName}</Text>

          <View className="flex-row items-center gap-2">
            <Avatar.Text size={40} label="DN" />
            <Text className="text-base font-medium">{username}</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <Calendar size={25} color={"gray"} />
            <Text>11 Nov 2024 08:30 - 10:10 GMT+7</Text>
          </View>
        </View>
        
        <Divider style={{ width: 1, height: "100%" }} />

        <View className="flex justify-between items-center text-center w-1/4">
          <Text className="font-bold text-4xl">{roomNo}</Text>
          <View className="flex flex-col justify-center items-center">
            <Text>Approved</Text>
            {approved ? (
              <CircleCheck size={40} color={"green"} />
            ) : (
              <CircleMinus size={40} color={"orange"} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
