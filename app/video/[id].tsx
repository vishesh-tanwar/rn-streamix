import VideoCard from "@/components/videoCard";
import { useVideoStore } from "@/state/videoStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function VideoScreen() {
  const { id } = useLocalSearchParams();
  const { videos, loading } = useVideoStore();

  const video = videos.find((v) => v.videoId === id);

  const [isReady, setIsReady] = useState(false);

  // Tracks whether we've started playback in THIS visit.
  // Reset to false every time the screen comes back into focus.
  const hasPlayed = useRef(false);

  // Tells us the component is still mounted — prevents setState after unmount
  const isMounted = useRef(true);

  const player = useVideoPlayer(video?.videoUrl ?? null, (p) => {
    // Initial config only — do NOT call play() here.
    // We wait for statusChange → readyToPlay so we know the surface is ready.
    p.loop = false;
  });

  // ── Auto-play once per visit when the player is ready ────────────────────
  useEffect(() => {
    if (!player) return;

    const unsub = player.addListener("statusChange", (event) => {
      if (event.status === "readyToPlay" && !hasPlayed.current) {
        hasPlayed.current = true;
        if (isMounted.current) setIsReady(true);
        // Small delay prevents black-frame flicker on Android
        setTimeout(() => {
          try {
            player.play();
          } catch (_) {}
        }, 80);
      }
      if (event.status === "error") {
        console.error("VideoPlayer error:", event.error);
      }
    });

    return () => unsub.remove();
  }, [player]);

  // ── Focus lifecycle ───────────────────────────────────────────────────────
  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;

      // Reset per-visit state so the next open starts fresh
      hasPlayed.current = false;
      setIsReady(false);

      // Seek to start and let statusChange re-trigger readyToPlay → play
      try {
        player.currentTime = 0;
      } catch (_) {}

      return () => {
        // Screen losing focus — stop the player but keep the native object alive
        try {
          player.pause();
          player.currentTime = 0;
        } catch (_) {}
      };
    }, [player]) // player identity is stable across visits — safe dependency
  );

  // ── Cleanup on true unmount ───────────────────────────────────────────────
  useEffect(() => {
    return () => {
      isMounted.current = false;
      try {
        player.pause();
      } catch (_) {}
    };
  }, [player]);

  if (!video) {
    return (
      <View style={styles.centeredFill}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  const handleBack = () => {
    try {
      player.pause();
      player.currentTime = 0;
    } catch (_) {}
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* ── Video block ── */}
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <MaterialIcons name="arrow-back-ios" size={22} color="black" />
          </TouchableOpacity>
        </View>

        <VideoView
          player={player}
          style={styles.video}
          allowsPictureInPicture
          nativeControls
          allowsVideoFrameAnalysis={false}
        />

        {/* Buffering overlay */}
        {!isReady && (
          <View style={styles.videoOverlay}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
      </View>

      {/* ── Metadata + related videos ── */}
      {loading ? (
        <View style={styles.centeredFill}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <View style={{ paddingBottom: 10 }}>
              <Text style={styles.title}>{video.title}</Text>
              <Text numberOfLines={2} style={styles.description}>
                {video.description}
              </Text>

              <View style={styles.channelRow}>
                <View style={styles.channelLeft}>
                  <View style={styles.avatar}>
                    <Image
                      source={{ uri: video.userImage }}
                      style={styles.avatarImg}
                    />
                  </View>
                  <Text style={styles.userName}>{video.userName}</Text>
                </View>
                <Pressable
                  onPress={() => {}}
                  style={styles.subscribeBtn}
                  android_ripple={{ color: "#e07b00" }}
                >
                  <Text style={styles.subscribeBtnText}>Subscribe</Text>
                </Pressable>
              </View>
            </View>
          }
          data={videos}
          keyExtractor={(item) => item.videoId}
          renderItem={({ item }) => <VideoCard video={item} />}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    height: 80,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-end",
  },
  backBtn: { position: "absolute", left: 16, bottom: 12, padding: 4 },
  video: { width: "100%", height: 220, backgroundColor: "black" },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    top: 80,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  title: { padding: 8, fontSize: 16, fontWeight: "600" },
  description: { paddingHorizontal: 8, color: "#444" },
  channelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  channelLeft: { flexDirection: "row", alignItems: "center" },
  avatar: {
    backgroundColor: "#ccc",
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginLeft: 10,
  },
  avatarImg: { width: "100%", height: "100%" },
  userName: { marginLeft: 10, fontWeight: "500" },
  subscribeBtn: {
    backgroundColor: "orange",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 10,
  },
  subscribeBtnText: { color: "white", fontWeight: "bold" },
  centeredFill: { flex: 1, justifyContent: "center", alignItems: "center" },
});
