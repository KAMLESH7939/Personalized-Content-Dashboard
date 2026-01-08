"use client"

import { useDispatch, useSelector } from "react-redux"
import { toggleDarkMode } from "@/store/slices/preferencesSlice"
import { setSearchQuery } from "@/store/slices/uiSlice"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Moon, Sun, Search, Bell, User } from "lucide-react"
import { useEffect, useState } from "react"

export function Header() {
  const dispatch = useDispatch()
  const { darkMode } = useSelector((state: RootState) => state.preferences)
  const { searchQuery } = useSelector((state: RootState) => state.ui)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode, mounted])

  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-10 py-2 shadow-md"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 ml-4">
          <Button variant="ghost" size="icon" onClick={() => dispatch(toggleDarkMode())} title="Toggle dark mode">
            {mounted && darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" title="Notifications">
            <Bell className="w-5 h-5" />
          </Button>

          <Button variant="ghost" size="icon" title="User profile">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
