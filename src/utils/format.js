const formatter = new Intl.NumberFormat("en", { notation: "compact" })

export const formatViewCount = (count) => {
  if (!count) return "0 views"
  return `${formatter.format(Number(count))} views`
}

export const formatLikeCount = (count) => {
  if (!count) return "0 likes"
  return `${formatter.format(Number(count))} likes`
}

export const formatTimestamp = (isoString) => {
  if (!isoString) return ""
  const date = new Date(isoString)
  const diffMs = Date.now() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours <= 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `${diffMinutes || 1} minutes ago`
    }
    return `${diffHours} hours ago`
  }

  if (diffDays < 30) {
    return `${diffDays} days ago`
  }

  if (diffDays < 365) {
    const diffMonths = Math.floor(diffDays / 30)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`
  }

  const diffYears = Math.floor(diffDays / 365)
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`
}

