import ReactLogo from "@/assets/images/react-logo.png";
import { CategoryBar } from "@/components/categoryBar";
import CustomHeader from "@/components/customHeader";
import VideoCard from "@/components/videoCard";
import { useVideoStore } from "@/state/videoStore";
// import { videoMap } from "@/data/videos";
import { useRef } from "react";
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";


const subscriptions = () => {
  // const videos = Object.values(videoMap);
  const videos = useVideoStore().videos;
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const HEADER_HEIGHT = 120;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY.current + 5) {
      // user scrolling DOWN → hide header
      Animated.timing(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (currentY < lastScrollY.current - 1) {
      // user scrolling UP → show header
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentY;
  };
  return (
    <View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 20,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <CustomHeader />
      </Animated.View>
      <Animated.ScrollView onScroll={handleScroll}>

        <View className="flex-1 flex-row items-center mt-24">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="h-33 p-3"
          >
            {[1, 2, 3, 4, 5].map((item) => (
              <View key={item} className="mr-4">
                <Image source={ReactLogo} className="w-20 h-20 rounded-full" />
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
          <Pressable className="w-18 justify-center items-center"><Text className="text-blue-700">All</Text></Pressable>
        </View>
        <CategoryBar categories={["All", "Today", "Videos", "Reels"]} />

        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default subscriptions;
