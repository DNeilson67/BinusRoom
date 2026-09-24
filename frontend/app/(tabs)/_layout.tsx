import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link, Tabs } from "expo-router";
import {
  Home,
  Calendar,
  Bell,
  Grid,
  ChevronsUpDown,
  Search,
  UsersRound,
  LayoutGrid,
  Settings,
  Thermometer,
} from "lucide-react-native";
import { Avatar } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: { Icon: React.ElementType; color: string }) {
  const { Icon, color } = props;
  return <Icon size={24} color={color} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarStyle: { height: 50 },
        tabBarLabelStyle: { fontSize: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon Icon={Home} color={color} />,
        }}
      />
      <Tabs.Screen
        name="roomList"
        options={{
          title: "RoomList",
          tabBarIcon: ({ color }) => (
            <TabBarIcon Icon={LayoutGrid} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
