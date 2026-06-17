import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  fetchPopularVideos,
  fetchSuggestedVideos,
  fetchTrendingVideos,
  fetchVideoDetails,
  searchVideos as searchVideosApi,
} from "../services/youtube"
import { isConfigValid } from "../config"

const VideoContext = createContext(null)

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([])
  const [currentVideo, setCurrentVideo] = useState(null)
  const [suggestedVideos, setSuggestedVideos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeFeed, setActiveFeed] = useState("home")

  const loadPopularVideos = useCallback(async () => {
    if (!isConfigValid()) {
      setError("Missing API credentials. Please update config.js/.env values.")
      return
    }

    setIsLoading(true)
    try {
      const items = await fetchPopularVideos()
      setVideos(items)
      setError(null)
      setActiveFeed("home")
    } catch (err) {
      setError(err.message ?? "Unable to load videos.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadTrendingVideos = useCallback(async () => {
    if (!isConfigValid()) {
      setError("Missing API credentials. Please update config.js/.env values.")
      return
    }

    setIsLoading(true)
    try {
      const items = await fetchTrendingVideos()
      setVideos(items)
      setError(null)
      setActiveFeed("trending")
    } catch (err) {
      setError(err.message ?? "Unable to load trending videos.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const selectVideo = useCallback(async (videoId) => {
    if (!isConfigValid()) {
      setError("Missing API credentials. Please update config.js/.env values.")
      return null
    }

    setIsLoading(true)
    try {
      const video = await fetchVideoDetails(videoId)
      let suggestions = await fetchSuggestedVideos(videoId).catch((err) => {
        if (err?.response?.status === 400) {
          return []
        }
        throw err
      })

      if (!suggestions?.length && video?.title) {
        const fallbackResults = await searchVideosApi(video.title)
        suggestions = fallbackResults
      }

      setCurrentVideo(video)
      const normalizedSuggestions = Array.isArray(suggestions) ? suggestions : []
      setSuggestedVideos(
        normalizedSuggestions.filter((item) => item.id !== videoId).slice(0, 12),
      )
      setError(null)
      setActiveFeed("watch")

      return video
    } catch (err) {
      setError(err.message ?? "Unable to load video details.")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const searchVideos = useCallback(async (query) => {
    if (!isConfigValid()) {
      setError("Missing API credentials. Please update config.js/.env values.")
      return
    }

    if (!query.trim()) {
      loadPopularVideos()
      return
    }

    setIsLoading(true)
    try {
      const results = await searchVideosApi(query)
      setVideos(results)
      setError(null)
      setActiveFeed("search")
    } catch (err) {
      setError(err.message ?? "Unable to search videos.")
    } finally {
      setIsLoading(false)
    }
  }, [loadPopularVideos])

  useEffect(() => {
    loadPopularVideos()
  }, [loadPopularVideos])

  const value = useMemo(
    () => ({
      videos,
      currentVideo,
      suggestedVideos,
      isLoading,
      error,
      activeFeed,
      loadPopularVideos,
      loadTrendingVideos,
      selectVideo,
      searchVideos,
    }),
    [
      videos,
      currentVideo,
      suggestedVideos,
      isLoading,
      error,
      activeFeed,
      loadPopularVideos,
      loadTrendingVideos,
      selectVideo,
      searchVideos,
    ],
  )

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

export const useVideo = () => {
  const context = useContext(VideoContext)
  if (!context) {
    throw new Error("useVideo must be used within VideoProvider")
  }
  return context
}

