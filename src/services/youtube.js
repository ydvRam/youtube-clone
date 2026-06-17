import axios from "axios"
import { DEFAULT_REGION, YOUTUBE_API_KEY } from "../config"

const BASE_URL = "https://www.googleapis.com/youtube/v3"

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    key: YOUTUBE_API_KEY,
  },
})

const normalizeVideoItem = (item) => ({
  id: item.id?.videoId ?? item.id,
  title: item.snippet?.title ?? "Untitled",
  description: item.snippet?.description ?? "",
  channelTitle: item.snippet?.channelTitle ?? "Unknown channel",
  publishedAt: item.snippet?.publishedAt ?? "",
  thumbnails: item.snippet?.thumbnails ?? {},
  statistics: item.statistics ?? {},
})

const fetchMostPopularVideos = async (options = {}) => {
  const { regionCode = DEFAULT_REGION, maxResults = 24 } = options

  const { data } = await api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      chart: "mostPopular",
      regionCode,
      maxResults,
    },
  })

  return data.items.map(normalizeVideoItem)
}

export const fetchPopularVideos = (options = {}) => fetchMostPopularVideos(options)

export const fetchTrendingVideos = (options = {}) =>
  fetchMostPopularVideos({
    maxResults: 32,
    ...options,
  })

export const fetchVideoDetails = async (videoId) => {
  const { data } = await api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: videoId,
    },
  })

  return data.items.map(normalizeVideoItem)[0]
}

export const fetchSuggestedVideos = async (videoId, options = {}) => {
  const { maxResults = 12 } = options

  const { data } = await api.get("/search", {
    params: {
      part: "snippet",
      relatedToVideoId: videoId,
      type: "video",
      maxResults,
    },
  })

  const relatedIds = data.items
    .map((item) => item.id?.videoId)
    .filter(Boolean)
    .join(",")

  if (!relatedIds) {
    return []
  }

  const { data: details } = await api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: relatedIds,
    },
  })

  return details.items.map(normalizeVideoItem)
}

export const searchVideos = async (query, options = {}) => {
  const { maxResults = 24 } = options

  const { data } = await api.get("/search", {
    params: {
      part: "snippet",
      maxResults,
      q: query,
      type: "video",
    },
  })

  const videoIds = data.items
    .map((item) => item.id?.videoId)
    .filter(Boolean)
    .join(",")

  if (!videoIds) return []

  const { data: details } = await api.get("/videos", {
    params: {
      part: "snippet,statistics,contentDetails",
      id: videoIds,
    },
  })

  return details.items.map(normalizeVideoItem)
}

