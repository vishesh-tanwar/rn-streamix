import { Video } from "@/data/videos";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { height, width } = Dimensions.get("window");
const ReelItem =
    ({
        video,
        isActive,
    }: {
        video: Video;
        isActive: boolean;
    }) => {
        const [paused, setPaused] = useState(false);
        const isFocused = useIsFocused();
        const player = useVideoPlayer(
            "https://www.w3schools.com/html/mov_bbb.mp4",
            (player) => {
                player.loop = true;
            }
        );

        useEffect(() => {
            if (!player) return;

            if (isFocused && isActive && !paused) {
                player.play();
            } else {
                player.pause();
            }
        }, [isActive, paused, isFocused, player]);

        return (

            <View style={styles.container}>
                <Pressable style={styles.video}
                    onPress={() => {
                        setPaused((prev) => !prev);
                    }}>
                    <VideoView
                        player={player}
                        style={styles.video}
                        contentFit="contain"
                        nativeControls={false}
                    />

                    {paused && (
                        <View
                            className="absolute top-[47%] left-[43%] h-16 w-16 rounded-full items-center justify-center"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.5)",
                                zIndex: 10,
                            }}
                        >
                            <MaterialIcons
                                name="play-arrow"
                                color="orange"
                                size={40}
                            />
                        </View>
                    )}

                    {/* 🔥 Overlay UI */}
                    <View style={styles.overlay}>
                        <Text style={styles.title}>{video.title}</Text>
                        <Text style={styles.desc}>{video.description}</Text>
                    </View>
                </Pressable>
            </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
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

export default React.memo(ReelItem)