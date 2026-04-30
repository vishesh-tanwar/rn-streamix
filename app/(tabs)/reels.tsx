import ReelItem from "@/components/ReelItem";
import { useReelStore } from "@/state/reelStore";
import { useLocalSearchParams } from "expo-router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

export default function Reels() {
  const { reelId } = useLocalSearchParams();

  const flatListRef = useRef<FlatList>(null);

  const {
    reels,
    getReels,
    loading,
  } = useReelStore();

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Initial fetch
  useEffect(() => {
    if (reels.length === 0) {
      getReels();
    }
  }, []);

  // ✅ Scroll to clicked reel
  useEffect(() => {
    if (reels.length === 0) return;

    const index = reels.findIndex(
      (r) => r.id === reelId
    );

    if (index >= 0) {
      setActiveIndex(index);

      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index,
          animated: false,
        });
      }, 100);
    }
  }, [reels, reelId]);

  // ✅ Detect active reel
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: any) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 80,
  }).current;

  // ✅ Optimized render
  const renderItem = useCallback(
    ({ item, index }: any) => (
      <ReelItem
        video={item}
        isActive={index === activeIndex}
      />
    ),
    [activeIndex]
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        ref={flatListRef}
        data={reels}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={height}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}

        // ✅ Pagination
        onEndReached={() => {
          getReels();
        }}
        onEndReachedThreshold={0.5}

        // ✅ Performance
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        windowSize={5}
        removeClippedSubviews
      />

      {loading && (
        <ActivityIndicator
          size="large"
          color="orange"
          style={{
            position: "absolute",
            bottom: 40,
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
}