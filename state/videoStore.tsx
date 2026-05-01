import { fetchVideos } from "@/services/videoService";
import { Video } from "@/type/reel";
import { create } from "zustand";

type videoState = {
    videos: Video[];
    page: number;
    loading: boolean;
    hasMore: boolean;
    getVideos: () => Promise<void>;
}

export const useVideoStore = create<videoState>((set, get) => ({
    videos: [],
    page: 0,
    loading: false,
    hasMore: true,
    getVideos: async () => {
        const { page, loading, hasMore, videos } = get();
        if (loading || !hasMore) return;
        set({ loading: true });
        try {
            const newVideos = await fetchVideos(page, 10);
            set({
                page: page + 1,
                videos: { ...videos, ...newVideos },
                hasMore: newVideos.length > 0,
                loading: false
            })
        } catch (error) {
            set({ loading: false });
        }
    }
}))