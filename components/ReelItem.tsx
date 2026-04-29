import { View, Text, StyleSheet, Pressable } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect } from "react";
import { Video } from "@/app/(tabs)";

export default function ReelItem({
    video,
    isActive,
}: {
    video: Video;
    isActive: boolean;
}) {
    const player = useVideoPlayer(
        "https://www.w3schools.com/html/mov_bbb.mp4"
    );

    // 🔥 control play/pause
    useEffect(() => {
        if (isActive) {
            player.play();
        } else {
            player.pause();
        }
    }, [isActive]);

    return (
        <View style={styles.container}>
            <VideoView player={player} style={styles.video} />

            {/* 🔥 Overlay UI */}
            <View style={styles.overlay}>
                <Text style={styles.title}>{video.title}</Text>
                <Text style={styles.desc}>{video.description}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "black",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        bottom: 40,
        left: 10,
    },
    title: {
        color: "white",
        fontWeight: "bold",
    },
    desc: {
        color: "white",
        marginTop: 4,
    },
});