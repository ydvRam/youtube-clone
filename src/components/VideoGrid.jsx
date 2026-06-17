import { VideoCard } from "./VideoCard"

export const VideoGrid = ({ videos }) => (
  <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    {videos.map((video) => (
      <VideoCard key={video.id} video={video} />
    ))}
  </section>
)

