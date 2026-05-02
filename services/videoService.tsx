import { Video } from "@/type/reel";

const sampleVideos = [
  "https://www.w3schools.com/html/mov_bbb.mp4", // ✅ your current one

  "https://www.w3schools.com/html/movie.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/movie.mp4",
  "https://media.w3.org/2010/05/video/movie_300.mp4",

];

export const fetchVideos = async (
    page: number,
    limit: number,
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
}