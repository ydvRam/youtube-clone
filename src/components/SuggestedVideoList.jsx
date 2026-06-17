import { useNavigate } from "react-router-dom"
import { formatTimestamp, formatViewCount } from "../utils/format"

export const SuggestedVideoList = ({ videos }) => {
  const navigate = useNavigate()

  if (!videos?.length) {
    return (
      <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-sm text-slate-300">
        No suggestions available right now.
      </div>
    )
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-4">
      <h2 className="px-2 text-lg font-semibold text-slate-100">Suggested</h2>
      <ul className="space-y-3">
        {videos.map((video) => {
          const thumbnail =
            video.thumbnails?.medium?.url ??
            video.thumbnails?.default?.url ??
            video.thumbnails?.high?.url

          return (
            <li key={video.id}>
              <button
                type="button"
                className="flex w-full items-start gap-3 rounded-2xl p-2 text-left transition hover:bg-slate-800/60"
                onClick={() => navigate(`/watch/${video.id}`)}
              >
                <img
                  src={thumbnail}
                  alt={video.title}
                  className="h-20 w-32 flex-shrink-0 rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="space-y-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-100">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400">{video.channelTitle}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{formatViewCount(video.statistics?.viewCount)}</span>
                    <span>{formatTimestamp(video.publishedAt)}</span>
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

