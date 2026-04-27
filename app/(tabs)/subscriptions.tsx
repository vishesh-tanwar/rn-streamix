import { View, Text, Pressable } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { CategoryBar } from "@/components/categoryBar";
import VideoCard from "@/components/videoCard";

const subscriptions = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center px-3">
        <Text className="text-lg font-bold"></Text>
        <Pressable>
          <Text className="text-blue-700 font-bold">All</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="h-33 p-3"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} className="mr-4">
            <View className="w-20 h-20 rounded-full bg-black"></View>
            <Text
              className="text-sm font-bold mt-1 text-center w-20"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Channel Name
            </Text>
          </View>
        ))}
      </ScrollView>
      <CategoryBar categories={["All", "Today", "Videos", "Reels"]} />

      {[1, 2, 3, 4, 5].map((item) => {
        return <VideoCard key={item} />;
      })}
    </View>
  );
};

export default subscriptions;
