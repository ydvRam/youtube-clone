import { useNavigate } from "react-router-dom"
import { formatLikeCount, formatTimestamp, formatViewCount } from "../utils/format"

export const VideoCard = ({ video }) => {
  const navigate = useNavigate()

  const thumbnail =
    video.thumbnails?.maxres?.url ??
    video.thumbnails?.high?.url ??
    video.thumbnails?.medium?.url ??
    video.thumbnails?.default?.url

  const handleClick = () => {
    navigate(`/watch/${video.id}`)
  }

  return (
    <article
      className="group cursor-pointer"
      onClick={handleClick}
      onKeyUp={(event) => {
        if (event.key === "Enter") handleClick()
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg ring-1 ring-white/5 transition group-hover:-translate-y-1 group-hover:shadow-red-500/20">
        <img
          src={thumbnail}
          alt={video.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="mt-3 space-y-1.5">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-50">
          {video.title}
        </h3>
        <p className="text-sm text-slate-400">{video.channelTitle}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-400">
          <span>{formatViewCount(video.statistics?.viewCount)}</span>
          <span>{formatLikeCount(video.statistics?.likeCount)}</span>
          <span>{formatTimestamp(video.publishedAt)}</span>
        </div>
      </div>
    </article>
  )
}

