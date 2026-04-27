import { MaterialIcons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View } from "react-native";

const category = [
  "Drawer",
  "All",
  "Music",
  "Gaming",
  "News",
  "Live",
  "Podcasts",
  "Coding",
];

export const CategoryBar = ({
  categories = category,
  needDrawer = false,
}: {
  categories?: string[];
  needDrawer?: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <View className="py-2 bg-white ">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {needDrawer && (
          <Pressable
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            className="px-4 py-2 bg-gray-200 rounded-xl mx-2 flex-row items-center"
          >
            <MaterialIcons name="arrow-circle-left" size={12} color="orange" />
          </Pressable>
        )}

        {categories.map((item, index) => (
          <View key={index} className="px-4 py-2 bg-gray-200 rounded-xl mx-2">
            <Text>{item}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
