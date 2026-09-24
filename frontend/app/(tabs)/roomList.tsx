"use client";

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronDown, FilterIcon, Menu } from "lucide-react-native";
import { Avatar, Divider } from "react-native-paper";
import RoomTiles from "../components/RoomTiles";
import { Filter } from "react-native-svg";

export default function TabTwoScreen() {
  const insets = useSafeAreaInsets();

  // Define an array with multiple room objects
  const rooms = [
    {
      roomNo: "603",
      username: "Davin Neilson",
      className: "L5AC",
      courseCode: "COMP6696001",
      courseName: "Student's Request",
      classType: "LEC",
      approved: true,
    },
    {
      roomNo: "604",
      username: "Davin Neilson",
      className: "L5AD",
      courseCode: "COMP6688002",
      courseName: "Student's Request",
      classType: "LAB",
      approved: false,
    },
    {
      roomNo: "605",
      username: "Davin Neilson",
      className: "L5AE",
      courseCode: "COMP6677003",
      courseName: "Student's Request",
      classType: "LEC",
      approved: true,
    },
    // Add more room objects as needed
  ];

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#6B1D71", "#3A0F3D"]} // From blue-800 to purple-700
        style={{ flex: 1, paddingTop: insets.top + 10 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom }}
          className=""
        >
          <View>
            <View className="flex flex-col">
              <View className="p-4">
                <Text className="text-3xl font-bold text-white">Room List</Text>
              </View>
              <View className="flex-row items-center px-4 pb-4 gap-2">
                <TouchableOpacity className="flex-1 flex-row items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <Text className="text-base text-gray-800">My Room</Text>
                  <ChevronDown color="#000" size={24} />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 p-3 rounded-lg justify-center items-center">
                  <FilterIcon color="#000" size={24} />
                </TouchableOpacity>
              </View>
              {/* Map through the rooms array to render each RoomTiles component */}
              {rooms.map((room, index) => (
                <RoomTiles
                  key={index} // Use index as key, though a unique id is preferable
                  classType={room.classType}
                  roomNo={room.roomNo}
                  username={room.username}
                  className={room.className}
                  courseCode={room.courseCode}
                  courseName={room.courseName}
                  approved={room.approved}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
