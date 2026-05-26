import { Reel } from "@/type/reel";
import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

const { height, width } = Dimensions.get("window");
const ReelItem =
    ({
        video,
        isActive,
    }: {
        video: Reel;
        isActive: boolean;
    }) => {
        const [paused, setPaused] = useState(false);
        const [showDiscription, setShowDescription] = useState(false);
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
                        <View className="pb-2 flex-1 flex-row items-center">
                            <View className="bg-gray-300 rounded-full w-10 h-10 ml-2 overflow-hidden">
                                <Image
                                    source={{ uri: video.channelLogo }} resizeMode="contain"

                                    style={{ width: "100%", height: "100%" }}
                                />
                            </View>
                            <View>
                                <Text className="text-white ml-2">{video.channelName}</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>{video.title}</Text>
                        <Pressable onPress={() => setShowDescription(!showDiscription)}>
                            <Text style={styles.desc} numberOfLines={showDiscription ? 0 : 2} >{video.description}</Text>
                        </Pressable>
                    </View>
                    <View className="absolute bottom-30 right-5 justify-between">
                        <View>
                            <MaterialIcons name="thumb-up" color={"white"} className="pb-7" size={30} />
                            <MaterialIcons name="thumb-down" color={"white"} className="pb-7" size={30} />
                            <MaterialIcons name="comment" color={"white"} className="pb-7" size={30} />
                            <MaterialIcons name="bookmark" color={"white"} className="pb-7" size={30} />
                        </View>
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