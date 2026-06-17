import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useVideo } from "../context/VideoContext"
import { VideoPlayer } from "../components/VideoPlayer"
import { SuggestedVideoList } from "../components/SuggestedVideoList"

export const VideoDetail = () => {
  const { videoId } = useParams()
  const {
    currentVideo,
    suggestedVideos,
    selectVideo,
    isLoading,
    error,
  } = useVideo()

  useEffect(() => {
    if (!videoId) return
    if (currentVideo?.id === videoId) return
    selectVideo(videoId)
  }, [videoId, currentVideo?.id, selectVideo])

  if (isLoading && !currentVideo) {
    return (
      <div className="grid min-h-[60vh] place-content-center text-slate-200">
        Loading video...
      </div>
    )
  }

  if (!currentVideo) {
    return (
      <div className="grid min-h-[60vh] place-content-center text-center text-slate-300">
        <p className="text-lg font-semibold">Video not found.</p>
        {error ? <p className="mt-2 text-sm text-amber-300">{error}</p> : null}
      </div>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <VideoPlayer video={currentVideo} />
      <SuggestedVideoList videos={suggestedVideos} />
    </div>
  )
}

