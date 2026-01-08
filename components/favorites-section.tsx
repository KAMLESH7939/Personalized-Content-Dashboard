"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { ContentCard } from "@/components/content-card"
import { Heart } from "lucide-react"

export function FavoritesSection() {
  const { items } = useSelector((state: RootState) => state.content)
  const { ids: favoriteIds } = useSelector((state: RootState) => state.favorites)

  const favoriteItems = items.filter((item) => favoriteIds.includes(item.id))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Heart className="w-8 h-8 text-destructive" />
          Your Favorites
        </h2>
        <p className="text-muted-foreground">Content you've marked as favorite</p>
      </div>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No favorites yet. Start adding your favorite content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
