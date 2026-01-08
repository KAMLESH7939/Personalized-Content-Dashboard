"use client"

import { useDispatch, useSelector } from "react-redux"
import { setActiveSection, toggleSidebar } from "@/store/slices/uiSlice"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Menu, X, Newspaper, Sparkles, Heart } from "lucide-react"

export function Sidebar() {
  const dispatch = useDispatch()
  const { sidebarOpen, activeSection } = useSelector((state: RootState) => state.ui)

  const navItems = [
    { id: "feed", label: "Feed", icon: Newspaper },
    { id: "trending", label: "Trending", icon: Sparkles },
    { id: "favorites", label: "Favorites", icon: Heart },
  ] as const

  return (
    <>
      {/* Mobile hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => dispatch(toggleSidebar())}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-out z-40 flex flex-col lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo area */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="font-bold text-chart-3 text-4xl">Content</h1>
          <p className="mt-1 text-popover-foreground text-lg tracking-normal font-medium">Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                dispatch(setActiveSection(id as "feed" | "trending" | "favorites"))
                // Close sidebar on mobile
                if (window.innerWidth < 1024) {
                  dispatch(toggleSidebar())
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeSection === id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="w-5 h-5 font-black" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => dispatch(toggleSidebar())} />
      )}
    </>
  )
}
