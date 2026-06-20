import { fetchVideos, UploadVideo } from "@/services/videoService";
import { Video } from "@/type/reel";
import { useInterpolateConfig } from "react-native-reanimated";
import { create } from "zustand";

type videoState = {
  videos: Video[];
  page: number;
  loading: boolean;
  videoloading: boolean;
  hasMore: boolean;
  getVideos: () => Promise<void>;
  uploadVideo: (videoData: FormData) => Promise<UploadResponse>;
};

export const useVideoStore = create<videoState>((set, get) => ({
  videos: [],
  page: 0,
  loading: false,
  hasMore: true,
  videoloading: false,
  getVideos: async () => {
    const { page, loading, hasMore, videos } = get();
    if (loading || !hasMore) return;
    set({ loading: true });
    try {
      const newVideos = await fetchVideos(page, 10);
      set({
        page: page + 1,
        videos: [...videos, ...newVideos],
        hasMore: newVideos.length > 0,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
  uploadVideo: async (videoData) => {
    try {
      set({ videoloading: true });
      const response = await UploadVideo(videoData);
      set({ videoloading: false });
      return response;
    } catch (error) {
      set({ videoloading: false });
      throw error;
    }
  },
}));

export type UploadResponse = {
  message: string;
  status: string;
};
