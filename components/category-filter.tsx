"use client"

import { useDispatch, useSelector } from "react-redux"
import { toggleCategory } from "@/store/slices/preferencesSlice"
import type { RootState } from "@/store/store"
import { Badge } from "@/components/ui/badge"

const ALL_CATEGORIES = ["technology", "finance", "movies", "music", "sports", "health"]

export function CategoryFilter() {
  const dispatch = useDispatch()
  const selectedCategories = useSelector((state: RootState) => state.preferences.categories)

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {ALL_CATEGORIES.map((category) => (
        <Badge
          key={category}
          variant={selectedCategories.includes(category) ? "default" : "outline"}
          className="cursor-pointer capitalize transition-all"
          onClick={() => dispatch(toggleCategory(category))}
        >
          {category}
        </Badge>
      ))}
    </div>
  )
}
