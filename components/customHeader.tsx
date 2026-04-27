import { MaterialIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { Text, View } from "react-native";
import { CategoryBar } from "./categoryBar";

const CustomHeader = () => {
    const pathName = usePathname();

    const isHome = pathName === "/" || pathName === "/index";
    const isProfile = pathName === "/profile";
    return (
        <View className="pt-10 bg-white">
            {/* Top Header Row */}
            <View className="flex-row justify-between items-center px-4 py-2">
                <View className="flex-row items-center">

                    <MaterialIcons name="play-arrow" size={28} />
                    <Text className="text-[18px] font-bold ml-2">Streamix</Text>
                </View>

                <View className="flex-row">
                    <MaterialIcons name="notifications" size={24} style={{ marginRight: 15 }} />
                    <MaterialIcons name="search" size={24} />
                    {isProfile && <MaterialIcons name="settings" size={24} style={{ marginLeft: 15 }} />}
                </View>
            </View>

            {/* Scrollable Categories */}
            {isHome && <CategoryBar />}
        </View>
    );
};

export default CustomHeader;