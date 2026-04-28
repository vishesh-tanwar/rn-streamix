import CustomHeader from "@/components/customHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="reels"
        options={{
          title: "reels",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="play-arrow" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="subscriptions"
        options={{
          title: "Subscriptions",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="subscriptions" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          header: () => <CustomHeader />,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
