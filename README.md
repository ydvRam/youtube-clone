<div align="center">

# 📺 YouTube Clone

**A sleek, full-featured YouTube experience — built with React 19, Firebase & the YouTube Data API v3.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-Rolldown-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## ✨ Features

- 🔐 **Auth** — Sign up & log in with Firebase Authentication
- 🏠 **Home Feed** — Browse trending videos via the YouTube Data API v3
- 🎬 **Video Playback** — Full video detail page with related suggestions
- 🔒 **Protected Routes** — Watch page gated behind authentication
- 📱 **Fully Responsive** — Mobile bottom nav + collapsible sidebar
- ⚡ **Blazing Fast** — Powered by Rolldown-Vite for near-instant HMR

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + React Router v7 |
| Build Tool | Vite (Rolldown) |
| Styling | Tailwind CSS v4 |
| Auth & Backend | Firebase v11 |
| API | YouTube Data API v3 via Axios |
| Icons | React Icons v5 |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/youtube-clone.git
cd youtube-clone

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env   # fill in your Firebase & YouTube API keys

# 4. Start the dev server
npm run dev
```

> **Required `.env` keys:** `VITE_FIREBASE_*` config values + `VITE_YOUTUBE_API_KEY`

---

## 📁 Project Structure

```
src/
├── components/     # Header, Sidebar, VideoCard, VideoPlayer …
├── pages/          # Home, VideoDetail, Login, Signup
├── context/        # Global state (Auth context)
├── services/       # YouTube API calls (Axios)
├── lib/            # Firebase initialisation
└── utils/          # Shared helpers
```

---

<div align="center">

Made with ❤️ by **Ram**

</div>
