import { fetchReels } from "@/services/reelService";
import { Video } from "@/type/reel";
import { create } from "zustand";

type reelState = {
  reels: Video[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  getReels: () => Promise<void>;
};

export const useReelStore = create<reelState>((set, get) => ({
  reels: [],
  loading: false,
  hasMore: true,
  page: 1,
  getReels: async () => {
    const { reels, loading, hasMore, page } = get();

    if (loading || !hasMore) return;

    set({ loading: true });
    try {
      const newReels = await fetchReels(page, 10);

      set({
        reels: [...reels, ...newReels],
        loading: false,
        hasMore: newReels.length > 0,
        page: page + 1,
      });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
