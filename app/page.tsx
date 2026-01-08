"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContent } from "@/store/slices/contentSlice"
import type { RootState, AppDispatch } from "@/store/store"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { ContentFeed } from "@/components/content-feed"
import { TrendingSection } from "@/components/trending-section"
import { FavoritesSection } from "@/components/favorites-section"
import { SettingsPanel } from "@/components/settings-panel"

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { activeSection } = useSelector((state: RootState) => state.ui)
  const { categories } = useSelector((state: RootState) => state.preferences)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    dispatch(fetchContent({ categories, page: 0 }))
  }, [dispatch, categories])

  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6">
        {activeSection === "feed" && <ContentFeed />}
        {activeSection === "trending" && <TrendingSection />}
        {activeSection === "favorites" && <FavoritesSection />}

        {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      </div>

      {/* Settings button for quick access */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
          title="Open settings"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </LayoutWrapper>
  )
}
