import { View, Dimensions, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { reelMap } from "./index";
import ReelItem from "@/components/ReelItem";

const { height } = Dimensions.get("window");

export default function reels() {
  const { reelId } = useLocalSearchParams();

  const reels = Object.values(reelMap);
  const initialIndex = reels.findIndex((r) => r.id === reelId);

  const [activeIndex, setActiveIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <FlatList
      data={reels}
      keyExtractor={(item) => item.id}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      decelerationRate="fast"
      initialScrollIndex={activeIndex}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      renderItem={({ item, index }) => (
        <ReelItem video={item} isActive={index === activeIndex} />
      )}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
}