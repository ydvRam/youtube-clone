import { formatLikeCount, formatTimestamp, formatViewCount } from "../utils/format"

export const VideoPlayer = ({ video }) => {
  if (!video) return null

  const videoSrc = `https://www.youtube.com/embed/${video.id}?autoplay=0`

  return (
    <div className="space-y-6">
      <div className="aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
        <iframe
          src={videoSrc}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-slate-50">{video.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          <span>{video.channelTitle}</span>
          <span>{formatViewCount(video.statistics?.viewCount)}</span>
          <span>{formatLikeCount(video.statistics?.likeCount)}</span>
          <span>{formatTimestamp(video.publishedAt)}</span>
        </div>

        <p className="rounded-2xl bg-slate-900/60 p-6 text-sm leading-relaxed text-slate-200">
          {video.description}
        </p>
      </div>
    </div>
  )
}

