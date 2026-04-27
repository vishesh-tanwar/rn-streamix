import React, { useRef } from "react";
import { Animated, View } from "react-native";
import CustomHeader from "@/components/customHeader";
import VideoCard from "@/components/videoCard";

const Home = () => {
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const HEADER_HEIGHT = 120;

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY.current + 5) {
      // user scrolling DOWN → hide header
      Animated.timing(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        duration: 300,
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

      {/* List */}
      <Animated.FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <VideoCard />}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Home;
