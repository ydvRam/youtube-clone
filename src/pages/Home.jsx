import { useEffect } from "react"
import { useVideo } from "../context/VideoContext"
import { VideoGrid } from "../components/VideoGrid"

export const Home = () => {
  const { videos, isLoading, error, loadPopularVideos } = useVideo()

  useEffect(() => {
    if (!videos.length) {
      loadPopularVideos()
    }
  }, [videos.length, loadPopularVideos])

  if (isLoading && !videos.length) {
    return (
      <div className="grid place-content-center py-20 text-slate-300">
        Loading videos...
      </div>
    )
  }

  if (error && !videos.length) {
    return (
      <div className="grid place-content-center py-20 text-center text-slate-300">
        <p className="text-lg font-medium">{error}</p>
        <button
          type="button"
          onClick={loadPopularVideos}
          className="mt-6 rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error ? (
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </div>
      ) : null}
      <VideoGrid videos={videos} />
    </div>
  )
}

