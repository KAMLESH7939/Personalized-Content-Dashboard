"use client"

import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "@/store/slices/favoritesSlice"
import { removeContentItem } from "@/store/slices/contentSlice"
import type { ContentItem } from "@/store/slices/contentSlice"
import type { RootState } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ExternalLink, X } from "lucide-react"
import Image from "next/image"

interface ContentCardProps {
  item: ContentItem
}

export function ContentCard({ item }: ContentCardProps) {
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.ids)
  const isFavorite = favorites.includes(item.id)

  const typeColor = {
    news: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    recommendation: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    social: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  }

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <div className="group relative bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 ease-out hover:shadow-lg hover:border-primary/50 animate-in fade-in-50 slide-in-from-bottom-4">
      {/* Image */}
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={`${typeColor[item.type]} capitalize animate-in fade-in zoom-in-50`}>{item.type}</Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(removeContentItem(item.id))}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {item.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{item.source}</span>
          <span>{timeAgo(item.timestamp)}</span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 gap-1 bg-transparent transition-colors ${
              isFavorite ? "border-destructive text-destructive" : ""
            }`}
            onClick={() => dispatch(toggleFavorite(item.id))}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${isFavorite ? "fill-current scale-110" : "scale-100"}`}
            />
            {isFavorite ? "Saved" : "Save"}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1 gap-1 transition-all duration-200 active:scale-95"
            asChild
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
