import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useVideo } from "../context/VideoContext"

const MenuIcon = () => (
  <svg
    className="size-6 text-slate-100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
)

const SearchIcon = () => (
  <svg
    className="size-4 text-slate-100"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-4.35-4.35m0 0a7.5 7.5 0 1 0-10.61 0 7.5 7.5 0 0 0 10.61 0Z"
    />
  </svg>
)

export const Header = ({ onMenuToggle }) => {
  const [query, setQuery] = useState("")
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { searchVideos } = useVideo()
  const mobileSearchRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    await searchVideos(query)
    if (location.pathname !== "/") {
      navigate("/")
    }
    setIsMobileSearchOpen(false)
  }

  useEffect(() => {
    if (isMobileSearchOpen) {
      const timeout = setTimeout(() => {
        mobileSearchRef.current?.focus()
      }, 0)
      return () => clearTimeout(timeout)
    }

    return undefined
  }, [isMobileSearchOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-b from-slate-950/95 to-slate-900/80 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:flex-nowrap sm:gap-6 sm:px-6">
        <div className="flex flex-1 items-center gap-3 sm:flex-initial sm:gap-4">
          <button
            type="button"
            className="hidden size-10 place-content-center rounded-full bg-slate-900/80 ring-1 ring-white/5 transition hover:bg-slate-800/80 md:grid"
            aria-label="Toggle sidebar"
            onClick={onMenuToggle}
          >
            <MenuIcon />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white/5"
            onClick={() => navigate("/")}
            onKeyUp={(event) => {
              if (event.key === "Enter") navigate("/")
            }}
          >
            <span className="flex items-center gap-2">
              <svg
                width="32"
                height="32"
                viewBox="0 0 90 64"
                className="drop-shadow-[0_0_15px_rgba(239,68,68,0.45)]"
              >
                <path
                  d="M87.8 10.2a11.3 11.3 0 0 0-8-8C72.6 0 45 0 45 0S17.4 0 10.2 2.2a11.3 11.3 0 0 0-8 8C0 17.4 0 32 0 32s0 14.6 2.2 21.8a11.3 11.3 0 0 0 8 8C17.4 64 45 64 45 64s27.6 0 34.8-2.2a11.3 11.3 0 0 0 8-8C90 46.6 90 32 90 32s0-14.6-2.2-21.8Z"
                  fill="#FF0000"
                />
                <path d="M36 45V19l25 13-25 13Z" fill="#fff" />
              </svg>
              <span className="text-2xl font-semibold tracking-tight text-white">
                YouTube
              </span>
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:hidden">
          {user ? (
            <div className="flex size-9 items-center justify-center rounded-full bg-red-500 text-xs font-semibold uppercase text-white">
              {user.email?.charAt(0) ?? "Y"}
            </div>
          ) : null}
          <button
            type="button"
            className="grid size-10 place-content-center rounded-full border border-white/10 bg-slate-900/80 text-slate-100 transition hover:bg-slate-800/80"
            onClick={() => setIsMobileSearchOpen(true)}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="hidden flex-1 items-center justify-center px-4 sm:flex sm:px-6 md:px-8"
        >
          <div className="flex w-full max-w-2xl overflow-hidden rounded-full border border-white/10 bg-slate-900/80 shadow-lg">
            <input
              className="flex-1 bg-transparent px-5 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-slate-800 px-4 text-sm font-medium text-slate-100 transition hover:bg-slate-700"
            >
              <SearchIcon />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </form>

        <div className="hidden items-center gap-3 sm:flex">
          {user ? (
            <>
              <div className="flex size-10 items-center justify-center rounded-full bg-red-500 text-sm font-semibold uppercase text-white">
                {user.email?.charAt(0) ?? "Y"}
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-800/80"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="rounded-full border border-red-500 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
            >
              Sign in
            </button>
          )}
        </div>
      </div>

      {isMobileSearchOpen ? (
        <div className="fixed inset-x-0 top-0 z-50 bg-slate-950/95 px-4 py-4 sm:hidden">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <button
              type="button"
              className="grid size-10 place-content-center rounded-full border border-white/10 text-slate-100 transition hover:bg-slate-800/80"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Close search"
            >
              <MenuIcon />
            </button>
            <div className="flex-1 overflow-hidden rounded-full border border-white/10 bg-slate-900/80 shadow-lg">
              <input
                ref={mobileSearchRef}
                id="mobile-search-input"
                className="w-full bg-transparent px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none"
                placeholder="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="grid size-10 place-content-center rounded-full border border-white/10 bg-red-500/90 text-white transition hover:bg-red-500"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      ) : null}
    </header>
  )
}

