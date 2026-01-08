"use client"

import { useDispatch, useSelector } from "react-redux"
import { setCategories, toggleDarkMode, setLanguage } from "@/store/slices/preferencesSlice"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Globe, SettingsIcon } from "lucide-react"
import { useState } from "react"

const ALL_CATEGORIES = ["technology", "finance", "movies", "music", "sports", "health"]
const LANGUAGES = ["en", "es", "fr", "de", "ja"]

interface SettingsPanelProps {
  onClose?: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const dispatch = useDispatch()
  const { categories, darkMode, language } = useSelector((state: RootState) => state.preferences)
  const [showSettings, setShowSettings] = useState(false)

  const handleCategoryToggle = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category]
    dispatch(setCategories(newCategories))
  }

  if (!showSettings) {
    return (
      <Button onClick={() => setShowSettings(true)} className="gap-2" variant="default">
        <SettingsIcon className="w-4 h-4" />
        Settings
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4">
        <CardHeader className="sticky top-0 bg-card border-b">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your dashboard experience</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => setShowSettings(false)}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-6">
          {/* Content Preferences */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <span className="text-2xl">📰</span> Content Preferences
            </h3>
            <p className="text-sm text-muted-foreground">Select the content categories you're interested in</p>
            <div className="flex flex-wrap gap-2">
              {ALL_CATEGORIES.map((category) => (
                <Badge
                  key={category}
                  variant={categories.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer capitalize transition-all px-3 py-2 ${
                    categories.includes(category) ? "ring-2 ring-primary/50" : ""
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Appearance
            </h3>
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <p className="font-medium">{darkMode ? "Dark" : "Light"} Mode</p>
                  <p className="text-sm text-muted-foreground">
                    {darkMode ? "Dark theme is enabled" : "Light theme is enabled"}
                  </p>
                </div>
              </div>
              <Button
                variant={darkMode ? "default" : "outline"}
                onClick={() => dispatch(toggleDarkMode())}
                className="transition-all"
              >
                {darkMode ? "Enabled" : "Disabled"}
              </Button>
            </div>
          </div>

          {/* Language Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Language
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <Button
                  key={lang}
                  variant={language === lang ? "default" : "outline"}
                  onClick={() => dispatch(setLanguage(lang))}
                  className="transition-all capitalize"
                >
                  {lang === "en"
                    ? "English"
                    : lang === "es"
                      ? "Español"
                      : lang === "fr"
                        ? "Français"
                        : lang === "de"
                          ? "Deutsch"
                          : "日本語"}
                </Button>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-semibold text-foreground">About</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Content Dashboard v1.0</p>
              <p>Your personalized content hub for news, recommendations, and social media.</p>
            </div>
          </div>

          {/* Close Button */}
          <Button onClick={() => setShowSettings(false)} className="w-full">
            Close Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
