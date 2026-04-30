import CustomHeader from "@/components/customHeader";
import VideoCard from "@/components/videoCard";
import { videoMap } from "@/data/videos";
import { useReelStore } from "@/state/reelStore";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, Text, View } from "react-native";

const Home = () => {
  const { reels, getReels } = useReelStore();
  useEffect(() => {
    if (reels.length === 0) {
      getReels();
    }
  }, []);
  const router = useRouter();
  const videos = Object.values(videoMap);

  const topReels = reels.slice(0, 4);

  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);

  const HEADER_HEIGHT = 120;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;

    if (currentY > lastScrollY.current + 15) {
      // user scrolling DOWN → hide header
      Animated.timing(headerTranslateY, {
        toValue: -HEADER_HEIGHT,
        duration: 350,
        useNativeDriver: true,
      }).start();
    } else if (currentY < lastScrollY.current - 2) {
      // user scrolling UP → show header
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }

    lastScrollY.current = currentY;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Header */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: HEADER_HEIGHT,
          zIndex: 20,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <CustomHeader />
      </Animated.View>

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT }}
      >
        {/* Grid */}
        <View className="flex-row flex-wrap p-2">
          {topReels.map((reel) => (
            <Pressable
              key={reel.id}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/reels",
                  params: { reelId: reel.id },
                })
              }
              style={{
                width: "50%",
                height: 250,
                padding: 5,
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 10,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Thumbnail */}
                <Image
                  source={{ uri: reel.thumbnail }}
                  style={{ width: "100%", height: "100%" }}
                />

                {/* 🔥 Description overlay */}
                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 6,
                  }}
                >
                  <Text
                    numberOfLines={2}
                    style={{ color: "white", fontSize: 12 }}
                  >
                    {reel.description}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Map */}
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

// import { useUserStore } from "@/state/userStore";
// import { useState } from "react";

// const Home = () => {
//   const users = useUserStore().users;
//   const id = useUserStore().id;
//   const addUser = useUserStore().addUser;
//   const removeUser = useUserStore().removeUser;
//   const [name, setname] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");

//   return (
//     <View className="p-20">
//       <TextInput placeholder="name" onChangeText={(val) => setname(val)} value={name} />
//       <TextInput placeholder="email" onChangeText={(val) => setemail(val)} value={email} />
//       <TextInput placeholder="password" onChangeText={(val) => setpassword(val)} value={password} />

//       <Pressable onPress={() => {
//         addUser({
//           name: name,
//           email: email,
//           password: password,
//           id: id.toString()
//         });
//         setname('');
//         setemail('');
//         setpassword('');
//       }}>
//         <Text>Add User</Text>
//       </Pressable>

//       {
//         users.map((user) =>
//           <View key={user.id}>
//             <View className="p-2 flex-row">
//               <Text>{user.name} {user.email} {user.password}</Text>
//               <Button onPress={() => removeUser(user.id)} title="remove"></Button>
//             </View>
//           </View>
//         )
//       }
//     </View>
//   );
// }

export default Home;