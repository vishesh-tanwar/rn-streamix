import VideoCard from "@/components/videoCard";
import { useVideoStore } from "@/state/videoStore";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const { videos, loading } = useVideoStore();

  const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

  const [isReady, setIsReady] = useState(false);

  const player = useVideoPlayer(videoUrl);

  // Play video ONLY when ready
  useEffect(() => {
    if (!player) return;

    const unsub = player.addListener("statusChange", (event) => {
      if (event.status === "readyToPlay") {
        setIsReady(true);

        // small delay prevents texture flicker on mount
        setTimeout(() => {
          player.play();
        }, 80);
      }
    });

    return () => unsub.remove();
  }, [player]);

  // Get metadata
  const videoMetaData = videos.find((v) => v.id === id);

  if (!videoMetaData) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Video Player */}
      <View>
        <VideoView
          player={player}
          style={styles.video}
          allowsPictureInPicture
          allowsVideoFrameAnalysis={false}
        />

        {!isReady && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={{ paddingBottom: 10 }}>
              <Text style={{ padding: 8, fontSize: 16, fontWeight: "600" }}>
                {videoMetaData.title}
              </Text>

              <Text
                numberOfLines={2}
                style={{ paddingHorizontal: 8, color: "#444" }}
              >
                {videoMetaData.description}
              </Text>

              {/* Channel Info */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      backgroundColor: "#ccc",
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      overflow: "hidden",
                      marginLeft: 10,
                    }}
                  >
                    <Image
                      source={{ uri: videoMetaData.channelLogo }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <Text style={{ marginLeft: 10, fontWeight: "500" }}>
                    {videoMetaData.channelName}
                  </Text>
                </View>

                <Pressable
                  onPress={() => {}}
                  style={{
                    backgroundColor: "orange",
                    paddingHorizontal: 14,
                    paddingVertical: 6,
                    borderRadius: 6,
                    marginRight: 10,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Subscribe
                  </Text>
                </Pressable>
              </View>
            </View>
          }
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard video={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: { width: "100%", height: 300, backgroundColor: "black" },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
