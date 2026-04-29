import { View, StyleSheet, FlatList, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import VideoCard from "@/components/videoCard";
import { videoMap } from "../(tabs)";

export default function VideoScreen() {
    const { id } = useLocalSearchParams();

    const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4";

    const player = useVideoPlayer(videoUrl, (player) => {
        player.play();
    });

    const videos = Object.values(videoMap);
    const videoMetaData = videoMap[id as string];
    return (
        <View style={styles.container}>

            <VideoView
                player={player}
                style={styles.video}
                allowsFullscreen
                allowsPictureInPicture
                allowsVideoFrameAnalysis
            />

            <Text>{videoMetaData.title}</Text>
            <Text>{videoMetaData.description}</Text>


            <FlatList
                data={videos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <VideoCard video={item} />}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white" },
    video: { width: "100%", height: 300 },
});