import { Fragment } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  MdHomeFilled,
  MdHistory,
  MdOutlineWatchLater,
  MdSubscriptions,
  MdVideoLibrary,
  MdWhatshot,
} from "react-icons/md"
import { RiCompassDiscoverFill, RiPlayListFill } from "react-icons/ri"
import { PiFilmSlateFill } from "react-icons/pi"
import { useVideo } from "../context/VideoContext"

const sections = [
  {
    title: "Main",
    items: [
      { label: "Home", icon: MdHomeFilled, type: "home" },
      { label: "Trending", icon: MdWhatshot, type: "trending" },
      { label: "Explore", icon: RiCompassDiscoverFill },
      { label: "Shorts", icon: PiFilmSlateFill },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Subscriptions", icon: MdSubscriptions },
      { label: "Playlists", icon: RiPlayListFill },
      { label: "History", icon: MdHistory },
      { label: "Watch Later", icon: MdOutlineWatchLater },
      { label: "Your Videos", icon: MdVideoLibrary },
    ],
  },
]

const SidebarSection = ({
  title,
  items,
  currentPath,
  activeFeed,
  onNavigate,
  onFeedChange,
}) => (
  <section className="space-y-3">
    <p className="px-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {title}
    </p>
    <div className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon
        const isActive =
          (item.type && activeFeed === item.type) ||
          (item.path && currentPath === item.path)
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              if (item.type) {
                onFeedChange(item.type)
                return
              }

              if (item.path) onNavigate(item.path)
            }}
            className={`flex w-full items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-red-500/10 text-red-200"
                : "text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <span
              className={`grid size-9 place-content-center rounded-full border transition ${
                isActive
                  ? "border-red-400/40 bg-red-500/20 text-red-200"
                  : "border-white/5 bg-slate-900/80 text-slate-300"
              }`}
            >
              <Icon className="size-5" />
            </span>
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  </section>
)

export const Sidebar = ({ isMobileOpen, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loadPopularVideos, loadTrendingVideos, activeFeed } = useVideo()

  const handleFeedChange = (feedType) => {
    if (feedType === "home") {
      loadPopularVideos()
      navigate("/")
      onClose?.()
      return
    }

    if (feedType === "trending") {
      loadTrendingVideos()
      navigate("/")
      onClose?.()
    }
  }

  const handleNavigate = (path) => {
    navigate(path)
    onClose?.()
  }

  const sidebarContent = (
    <nav className="flex h-full flex-col gap-8 px-4 py-6">
      {sections.map((section) => (
        <SidebarSection
          key={section.title}
          title={section.title}
          items={section.items}
          currentPath={location.pathname}
          activeFeed={activeFeed}
          onNavigate={handleNavigate}
          onFeedChange={handleFeedChange}
        />
      ))}
    </nav>
  )

  return (
    <Fragment>
      <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-72 flex-shrink-0 border-r border-white/5 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950/80 lg:block">
        {sidebarContent}
      </aside>

      {isMobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200 lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 translate-x-[-100%] border-r border-white/10 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900 transition-transform duration-200 ease-out lg:hidden ${
          isMobileOpen ? "translate-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-base font-semibold tracking-tight text-slate-100">
            Browse
          </span>
          <button
            type="button"
            className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:bg-white/10"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto">{sidebarContent}</div>
      </aside>
    </Fragment>
  )
}

