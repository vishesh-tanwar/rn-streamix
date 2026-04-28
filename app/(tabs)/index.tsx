import CustomHeader from "@/components/customHeader";
import VideoCard from "@/components/videoCard";
import React, { useRef } from "react";
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import ReelImage from "../../assets/images/reel.jpg";
const Home = () => {
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

        {/* List */}
        {[1, 2, 3, 4, 5].map((item) => (
          <VideoCard key={item} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
