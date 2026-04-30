import { Video } from "@/data/videos";
import { formatDuration } from "@/functions/onNumbers";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function VideoCard({
  height = 200,
  width = 400,
  showChannelIcon = true,
  overlay = false,
  overlayIcon = null,
  video
}: {
  height?: number;
  width?: number;
  showChannelIcon?: boolean;
  overlay?: boolean;
  overlayIcon?: React.ReactNode;
  video: Video
}) {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.push(`/video/${video.id}`)} className="m-2 bg-white rounded-lg overflow-hidden" style={{ width }}>
      {/* Image container */}
      <View style={{ height, position: "relative" }}>
        <Image
          source={{ uri: video.thumbnail }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            backgroundColor: "rgba(0,0,0,0.8)",
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>
            {formatDuration(video.duration)}
          </Text>
        </View>


        {overlay && (
          <View
            style={[
              StyleSheet.absoluteFillObject, // 👈 Required to overlay correctly
              {
                backgroundColor: "rgba(0,0,0,0.4)",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            {overlayIcon}
          </View>
        )}
      </View>

      {/* Channel Info */}

      <View className="flex-row items-start mb-2 mt-1">
        {showChannelIcon && (
          <View className="bg-gray-300 rounded-full w-10 h-10 ml-2 overflow-hidden">
            <Image source={{ uri: video.channelLogo }} style={{ width: "100%", height: "100%" }} />
          </View>
        )}
        <View className="px-2 flex-1 pb-2">
          <Text numberOfLines={1}>{video.description}</Text>
          <View className="flex-1 flex-row justify-between items-center">
            <Text className="text-sm text-gray-500">{video.channelName}</Text>
            <Text className="text-sm text-gray-500">Views : {video.views} | Likes : {video.likes}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
