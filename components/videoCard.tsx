import Icon from "@/assets/images/icon.png";
import thumbnail from "@/assets/images/photo.jpg";

import { Image, Text, View } from "react-native";

export default function VideoCard() {
    return (
        <View className="m-2 bg-white rounded-lg overflow-hidden">
            <View >
                <Image source={thumbnail} style={{ width: "100%", height: 200 }} />
            </View>
            <View>
                <View className="flex-row items-start mb-2">
                    <View className="bg-gray-300 rounded-full w-10 h-10 ml-2">
                        <Image source={Icon} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    </View>
                    <View>

                        <Text className="text-sm text-gray-500 px-2">Channel Name</Text>
                        <Text className="text-sm text-gray-500 px-2">Views • Time</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}