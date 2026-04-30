import VideoCard from "@/components/videoCard";
import { videoMap } from "@/data/videos";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function VideoScreen() {
    const { id } = useLocalSearchParams();

    const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

    const player = useVideoPlayer(videoUrl, (player) => {
        player.play();
    });
    const [isBuffering, setIsBuffering] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            if (!player) return;

            const current = player.currentTime || 0;

            // crude buffering detection
            setIsBuffering(current === 0);
        }, 500);

        return () => clearInterval(interval);
    }, [player]);

    useEffect(() => {
        player.play();
    }, [player]);

    const videos = Object.values(videoMap);
    const videoMetaData = videoMap[id as string];
    return (
        <View className="flex-1 bg-white">

            <VideoView
                player={player}
                style={styles.video}
                allowsPictureInPicture
                allowsVideoFrameAnalysis
            />

            {isBuffering && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            )}

            <FlatList
                ListHeaderComponent={
                    <View>
                        <Text className="p-2" >{videoMetaData.title}</Text>
                        <Text numberOfLines={2} className="px-2">{videoMetaData.description}</Text>
                        <View className="flex-1 flex-row justify-between items-center">
                            <View className="flex-row items-center my-2">
                                <View className="bg-gray-300 rounded-full w-10 h-10 ml-2 overflow-hidden">
                                    <Image source={{ uri: videoMetaData.channelLogo }} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <Text className="ml-2">{videoMetaData.channelName}</Text>
                            </View>
                            <View>
                                <Pressable
                                    onPress={() => { }}
                                    className="bg-orange-500 px-3 py-1 rounded-md mr-2"
                                >
                                    <Text className="text-white font-semibold">
                                        Subscribe
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                }
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <VideoCard video={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    video: { width: "100%", height: 300 },
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