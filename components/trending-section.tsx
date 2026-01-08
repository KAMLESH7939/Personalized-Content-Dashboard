"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function TrendingSection() {
  const { items } = useSelector((state: RootState) => state.content)

  // Group by category and get top 3
  const trendingByCategory = items.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = []
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof items>,
  )

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-accent" />
          Trending Now
        </h2>
        <p className="text-muted-foreground">The hottest content across all categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(trendingByCategory).map(([category, categoryItems]) => (
          <Card key={category} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="capitalize text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {categoryItems.slice(0, 3).map((item) => (
                  <li key={item.id} className="text-sm hover:text-primary transition-colors cursor-pointer">
                    <div className="font-medium line-clamp-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.source}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
