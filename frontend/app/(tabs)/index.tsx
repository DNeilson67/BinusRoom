import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider, Avatar } from "react-native-paper";
import {
  Home,
  Calendar,
  ChevronsUpDown,
  Settings,
  Bell,
  Grid,
  Droplet,
  Wind,
  GraduationCap,
  UsersRound,
  LayoutGrid,
  Thermometer,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function TabOneScreen() {
  const [room, setRoom] = useState("604");
  const insets = useSafeAreaInsets(); // Get the safe area insets
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#4A90E2", "#A34FA0"]} // From blue-800 to purple-700
        style={{ flex: 1, paddingTop: insets.top + 10 }}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
          <View className="flex-row items-center justify-between w-full gap-2 px-4">
            <View className="flex-1">
              <TouchableOpacity className="flex-row items-center justify-between bg-white rounded-full px-4 p-1.5">
                <View>
                  <Text className="text-black font-bold text-base">
                    Student International Undergra...
                  </Text>
                  <Text className="text-black text-sm">BINUS University</Text>
                </View>
                <ChevronsUpDown size={20} color="#000000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="">
              <View className="p-3 bg-white rounded-full">
                <Settings size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="">
              <View className="bg-white rounded-full">
                <Avatar.Text size={48} label="DN" />
              </View>
            </TouchableOpacity>
            {/* <Image
                  source={{ uri: '/placeholder.svg?height=40&width=40' }}
                  className="w-10 h-10 rounded-full"
                /> */}
          </View>
          {/* Header */}
          <View className="p-5 pt-2  flex flex-col gap-2">
            <Text className="text-white text-xl">Good afternoon,</Text>
            <Text className="text-white text-2xl font-bold">DAVIN NEILSON</Text>
          </View>

          {/* Upcoming Class Card */}
          <TouchableOpacity
            className="bg-white m-4 rounded-xl shadow-md"
            onPress={() =>
              router.push({
                pathname: "/roomdetails/[roomNo]",
                params: { roomNo: room },
              })
            }
          >
            <View className="flex-row justify-between p-4 bg-gray-800 rounded-t-xl">
              <Text className="text-white font-bold">
                YOU ARE CURRENTLY IN ROOM
              </Text>
              {/* <Text className="text-white">1d 19h</Text> */}
            </View>
            <View className="p-4 flex flex-col gap-4">
              <Text className="text-6xl font-bold">{room}</Text>
              <Text className="text-2xl font-bold w-3/4">
                Student's Request
              </Text>
              <View className="flex flex-row gap-2 items-center">
                <Avatar.Text size={48} label="DN" />
                <Text className="text-xl font-bold">DAVIN NEILSON</Text>
              </View>

              <Divider></Divider>

              {/* <View className="flex-row items-center gap-2">
                  <GraduationCap size={20} color="#666" />
                  <Text className="text-gray-600">COMP6696001 | L5AC - LEC</Text>
                </View> */}
              {/* <Text className="text-gray-600 text-base">L5AC - LEC</Text> */}
              <View className="flex-row items-center gap-2">
                <Calendar size={20} color="#666" />
                <Text className="text-gray-600">
                  11 Nov 2024 08:30 - 10:10 GMT+7
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <UsersRound size={20} color="#666" />
                <Text className="text-gray-600">4 People</Text>
              </View>

              <Divider></Divider>
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

              {/* <View className="flex-row items-center">
                  <Home size={20} color="#666" />
                  <Text className="text-gray-600">
                    International Undergraduate{"\n"}BINUS University
                  </Text>
                </View> */}
              {/* <View className="flex-row items-center">
                  <Bell size={20} color="#666" />
                  <Text className="text-gray-600">F2F</Text>
                </View> */}
              {/* <View className="flex-row items-center gap-2">
                  <Grid size={20} color="#666" />
                  <Text className="text-gray-600">COMP6696001</Text>
                </View> */}
            </View>
          </TouchableOpacity>

          {/* Quick Access Cards */}
          <View className="p-4 flex-row gap-4">
            <TouchableOpacity onPress = {()=>{router.push("/(tabs)/roomList")}} className="bg-white p-4 rounded-xl shadow-md w-[48%]">
              <View className="mb-3">
                <LayoutGrid size={32} color="#FF8C00" />
              </View>
              <Text className="text-base font-bold mb-2">ROOM LIST</Text>
              <Text className="text-gray-600 text-sm">
                Tap to View available room in Binus Senayan.
              </Text>
            </TouchableOpacity>

            <View className="bg-white p-4 rounded-xl shadow-md w-[48%]">
              {/* <Image
                  source={{ uri: "/placeholder.svg?height=40&width=120" }}
                  className="w-30 h-10 mb-3"
                /> */}
              <Text className="text-base font-bold mb-2">MY ROOM</Text>
              <Text className="text-gray-600 text-sm mb-3">
                Request a room to support your study environment.
              </Text>
              <TouchableOpacity onPress={()=>{router.push("/requestRoom")}} className="bg-[#FF8C00] p-3 rounded-lg items-center">
                <Text className="text-white font-bold">Request Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
