import CustomHeader from "@/components/customHeader";
import VideoCard from "@/components/videoCard";
import React, { useRef } from "react";
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import ReelImage from "../../assets/images/reel.jpg";

export type Video = {
  id: string;
  title: string;
  description: string;
  channelName: string;
  channelLogo: string;
  thumbnail: string;
  views: number;
  likes: number;
  duration: number;
};

export const videoMap: Record<string, Video> = {
  "1": {
    id: "1",
    title: "Flutter vs React Native",
    description: "Full comparison ",
    channelName: "CodeWithVish",
    channelLogo: "https://i.pravatar.cc/100",
    thumbnail: "https://picsum.photos/300/207",
    views: 12000,
    likes: 500,
    duration: 123421
  },
  "2": {
    id: "2",
    title: "Build YouTube Clone",
    description: "Step by step jnfea jaenfja fdjanefjandj ajna afjaenfa jana ajeneajf fejnfenfe",
    channelName: "DevHub",
    channelLogo: "https://i.pravatar.cc/101",
    thumbnail: "https://picsum.photos/300/204",
    views: 54000,
    likes: 1200,
    duration: 123421

  },
  "3": {
    id: "3",
    title: "hey ya welcome to vlog",
    description: "Step by step jsnfaj jfnajf akjsnjas fkjandfhoibnv ujebnv ouvn ouejnve er",
    channelName: "DevHub",
    channelLogo: "https://i.pravatar.cc/101",
    thumbnail: "https://picsum.photos/300/202",
    views: 54000,
    likes: 1200,
    duration: 123421

  }, "4": {
    id: "4",
    title: "video 4",
    description: "Step by ste 44444p",
    channelName: "DevHub",
    channelLogo: "https://i.pravatar.cc/101",
    thumbnail: "https://picsum.photos/300/203",
    views: 54000,
    likes: 1200,
    duration: 123421

  }, "5": {
    id: "5",
    title: "video 5",
    description: "Step by step 5555555",
    channelName: "DevHub",
    channelLogo: "https://i.pravatar.cc/101",
    thumbnail: "https://picsum.photos/300/201",
    views: 54000,
    duration: 123421,
    likes: 1200,
  },
};

const Home = () => {
  const videos = Object.values(videoMap);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const HEADER_HEIGHT = 120;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY.current + 15) {
      // user scrolling DOWN → hide header
      Animated.timing(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else if (currentY < lastScrollY.current - 2) {
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
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

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        {/* Grid */}
        <View className="flex-row flex-wrap p-2">
          {[1, 2, 3, 4].map((item) => (
            <View
              key={item}
              style={{
                width: "50%",
                height: 250,
                padding: 5,
              }}
            >
              <View
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={ReelImage}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
            </View>
          ))}
        </View>


        {/* Map */}
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
