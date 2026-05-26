import { Video } from "@/type/reel";

const sampleVideos = [
  "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
  "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
];

export const fetchVideos = async (
  page: number,
  limit: number
): Promise<Video[]> => {
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${offset}`
  );
  const data = await res.json();
  return data.posts.map((post: any, index: number) => ({
    id: String(post.id),
    title: post.title,
    description: post.body,
    channelName: `Creator ${post.userId}`,
    channelLogo: `https://i.pravatar.cc/150?img=${post.userId}`,
    thumbnail: `https://picsum.photos/400/700?random=${post.id}`,
    videoUrl: sampleVideos[index % sampleVideos.length],
    likes: post.reactions.likes || 100,
    views: Math.floor(Math.random() * 100000),
  }));
};
