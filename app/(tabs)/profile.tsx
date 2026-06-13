import VideoCard from "@/components/videoCard";
import { useUserStore } from "@/state/userStore";
import { useVideoStore } from "@/state/videoStore";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const profile = () => {
  const videos = useVideoStore((state) => state.videos);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginFn = useUserStore().login;
  const validateTokenFn = useUserStore().validateToken;

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("authToken");
      console.log("Stored token:", storedToken);

      const isValid = await validateTokenFn(storedToken || "");
      if (isValid) {
        setToken(storedToken);
      } else {
        setToken(null);
      }
      setLoading(false);
    };

    loadToken();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      await loginFn(email, password);
      const storedToken = await AsyncStorage.getItem("authToken");
      setToken(storedToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!token) {
    return (
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold text-center mb-8">Login</Text>

        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={async () => await login(email, password)}
        >
          <Text className="text-white text-center font-bold text-lg">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="flex-row justify-start items-center h-25 mb-4">
        <View className="bg-gray-300 rounded-full w-24 h-24 mr-4"></View>
        <View className="mb-4">
          <Text className="text-xl font-bold">Username</Text>
          <Text className="text-gray-500">unique_handle</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className="text-xl font-bold mb-2">History</Text>
        <MaterialIcons name="arrow-right" size={26} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 h-40"
      >
        {videos.map((item) => (
          <View
            key={item.videoId}
            className="mr-4"
            style={{ width: 150, height: 80 }} // 👈 final size you want
          >
            <VideoCard
              height={80}
              width={150}
              showChannelIcon={false}
              video={item}
            />
          </View>
        ))}
      </ScrollView>

      <View className="flex-row items-center">
        <Text className="text-xl font-bold mb-2">PlayLists</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 h-40"
      >
        {
          <>
            <View className="mr-4" style={{ width: 150, height: 80 }}>
              <VideoCard
                video={videos[0]}
                height={80}
                width={150}
                showChannelIcon={false}
                overlay={true}
                overlayIcon={
                  <MaterialIcons name="play-arrow" size={26} color="white" />
                }
              />
            </View>
            <View className="" style={{ width: 150, height: 80 }}>
              <VideoCard
                video={videos[0]}
                height={80}
                width={150}
                showChannelIcon={false}
                overlay={true}
                overlayIcon={
                  <MaterialIcons name="access-time" size={26} color="white" />
                }
              />
            </View>
          </>
        }
      </ScrollView>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="featured-video" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Your Videos</Text>
      </Pressable>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="download" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Downloads</Text>
      </Pressable>
      <Pressable className="flex-1 flex-row mb-5">
        <MaterialIcons name="movie" size={26} />
        <Text className="text-xl font-bold mb-2 ml-4">Films</Text>
      </Pressable>
    </ScrollView>
  );
};

export default profile;
