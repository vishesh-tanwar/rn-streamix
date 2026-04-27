import Icon from "@/assets/images/icon.png";
import thumbnail from "@/assets/images/photo.jpg";

import { Image, Text, View, StyleSheet } from "react-native";

export default function VideoCard({
  height = 200,
  width = 400,
  showChannelIcon = true,
  overlay = false,
  overlayIcon = null,
}: {
  height?: number;
  width?: number;
  showChannelIcon?: boolean;
  overlay?: boolean;
  overlayIcon?: React.ReactNode;
}) {
  return (
    <View className="m-2 bg-white rounded-lg overflow-hidden" style={{ width }}>
      {/* Image container */}
      <View style={{ height, position: "relative" }}>
        <Image
          source={thumbnail}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />

        {/* Overlay stacked on the image */}
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
            <Image source={Icon} style={{ width: "100%", height: "100%" }} />
          </View>
        )}
        <View>
          <Text className="text-sm text-gray-500 px-2">Channel Name</Text>
          <Text className="text-sm text-gray-500 px-2">Views • Time</Text>
        </View>
      </View>
    </View>
  );
}
