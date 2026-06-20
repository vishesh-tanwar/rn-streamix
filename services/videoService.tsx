import { UploadResponse } from "@/state/videoStore";
import { Video } from "@/type/reel";
import { url } from "@/utils/strings";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchVideos = async (
  page: number,
  limit: number
): Promise<Video[]> => {
  try {
    const offset = (page - 1) * limit;
    const res = await fetch(
      `${url}:8081/videos/get?page=${page}&size=${limit}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();

    return data.content.map((post: Video, index: number) => ({
      videoId: String(post.videoId),
      title: post.title,
      description: post.description,
      userId: post.userId,
      userName: post.userName,
      userImage: post.userImage,
      thumbnail: post.thumbnail,
      videoUrl: post.videoUrl,
      likes: post.likes || 0,
      views: 0,
      duration: post.duration || 0,
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const UploadVideo = async (
  videoData: FormData
): Promise<UploadResponse> => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      throw new Error("No auth token found");
    }
    const res = await fetch(`${url}:8081/videos/upload`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: videoData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};
