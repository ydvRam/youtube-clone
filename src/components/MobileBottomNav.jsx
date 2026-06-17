import { Fragment } from "react"
import { MdHomeFilled, MdOutlineExplore, MdOutlineLogin, MdOutlineLogout } from "react-icons/md"
import { PiFilmSlateFill } from "react-icons/pi"
import { MdWhatshot } from "react-icons/md"
import { useNavigate, useLocation } from "react-router-dom"
import { useVideo } from "../context/VideoContext"
import { useAuth } from "../context/AuthContext"

export const MobileBottomNav = ({ onOpenSidebar }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { loadPopularVideos, loadTrendingVideos, activeFeed } = useVideo()
  const { user, logout } = useAuth()

  const handleHome = () => {
    loadPopularVideos()
    navigate("/")
  }

  const handleTrending = () => {
    loadTrendingVideos()
    navigate("/")
  }

  const navigationItems = [
    {
      label: "Home",
      icon: MdHomeFilled,
      isActive: activeFeed === "home" && location.pathname === "/",
      onClick: handleHome,
    },
    {
      label: "Trending",
      icon: MdWhatshot,
      isActive: activeFeed === "trending",
      onClick: handleTrending,
    },
    {
      label: "Shorts",
      icon: PiFilmSlateFill,
      onClick: () => onOpenSidebar?.(),
    },
    {
      label: "Explore",
      icon: MdOutlineExplore,
      onClick: () => onOpenSidebar?.(),
    },
  ]

  const AuthIcon = user ? MdOutlineLogout : MdOutlineLogin

  return (
    <Fragment>
      <div className="h-20 sm:hidden" />
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-2 border-t border-white/10 bg-slate-950/90 px-4 py-3 sm:hidden">
        <div className="flex flex-1 items-center justify-around gap-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={`flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition ${
                  item.isActive
                    ? "bg-red-500/10 text-red-200"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-slate-100"
                }`}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
        <button
          type="button"
          onClick={user ? logout : () => navigate("/login")}
          className="flex flex-1 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800/70"
        >
          <AuthIcon className="size-5" />
          <span>{user ? "Logout" : "Login"}</span>
        </button>
      </nav>
    </Fragment>
  )
}


