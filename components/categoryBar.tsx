import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View } from "react-native";

const categories = ["Drawer", "All", "Music", "Gaming", "News", "Live", "Podcasts", "Coding"];


export const CategoryBar = () => {
    const navigation = useNavigation();

    return (
        <View className="py-2 bg-white ">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((item, index) => (
                    index === 0 ? (
                        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())
                        } key={index} className="px-4 py-2 bg-gray-200 rounded-xl mx-2 flex-row items-center">
                            <MaterialIcons name="menu" size={12} />
                        </Pressable>
                    ) :
                        <View key={index} className="px-4 py-2 bg-gray-200 rounded-xl mx-2">
                            <Text>{item}</Text>
                        </View>
                ))}
            </ScrollView>
        </View>
    );
};
