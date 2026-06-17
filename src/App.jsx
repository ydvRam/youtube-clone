import { useState } from "react"
import { Outlet, Route, Routes, Navigate } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { MobileBottomNav } from "./components/MobileBottomNav"
import { Home } from "./pages/Home"
import { VideoDetail } from "./pages/VideoDetail"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup"
import { ProtectedRoute } from "./components/ProtectedRoute"

const Shell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900">
        <Header onMenuToggle={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <MobileBottomNav onOpenSidebar={toggleSidebar} />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route
          path="watch/:videoId"
          element={
            <ProtectedRoute>
              <VideoDetail />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
