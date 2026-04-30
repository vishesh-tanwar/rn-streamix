import ReelItem from "@/components/ReelItem";
import { reelMap } from "@/data/videos";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList } from "react-native";

const { height } = Dimensions.get("window");

export default function Reels() {
  const { reelId } = useLocalSearchParams();

  const reels = useMemo(() => Object.values(reelMap), []); const initialIndex = reels.findIndex((r) => r.id === reelId);

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
      renderItem={renderItem}
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
}