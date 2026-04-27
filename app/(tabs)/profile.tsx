import VideoCard from "@/components/videoCard";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const profile = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex-row justify-start items-center h-25 mb-4">
        <View className="bg-gray-300 rounded-full w-24 h-24 mr-4"></View>
        <View className="mb-4">
          <Text className="text-xl font-bold">Username</Text>
          <Text className="text-gray-500">unique_handle</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="text-xl font-bold mb-2">History</Text>
        <MaterialIcons name="arrow-right" size={26} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 h-40"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <View
            key={item}
            className="mr-4"
            style={{ width: 150, height: 80 }} // 👈 final size you want
          >
            <VideoCard height={80} width={150} showChannelIcon={false} />
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center">
        <Text className="text-xl font-bold mb-2">PlayLists</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 h-40"
      >
        {
          <>
            <View className="mr-4" style={{ width: 150, height: 80 }}>
              <VideoCard
                height={80}
                width={150}
                showChannelIcon={false}
                overlay={true}
                overlayIcon={
                  <MaterialIcons name="play-arrow" size={26} color="white" />
                }
              />
            </View>
            <View className="" style={{ width: 150, height: 80 }}>
              <VideoCard
                height={80}
                width={150}
                showChannelIcon={false}
                overlay={true}
                overlayIcon={
                  <MaterialIcons name="access-time" size={26} color="white" />
                }
              />
            </View>
          </>
        }
      </ScrollView>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="featured-video" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Your Videos</Text>
      </Pressable>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="download" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Downloads</Text>
      </Pressable>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="movie" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Films</Text>
      </Pressable>
    </ScrollView>
  );
};

export default profile;
