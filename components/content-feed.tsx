"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContent } from "@/store/slices/contentSlice"
import { reorderContent } from "@/store/slices/uiSlice"
import type { RootState, AppDispatch } from "@/store/store"
import { DraggableContentCard } from "@/components/draggable-content-card"
import { Spinner } from "@/components/ui/spinner"
import { CategoryFilter } from "@/components/category-filter"
import { useDebounce } from "@/hooks/use-debounce"

export function ContentFeed() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, loading, hasMore } = useSelector((state: RootState) => state.content)
  const { categories } = useSelector((state: RootState) => state.preferences)
  const { searchQuery, draggedItemId, contentOrder } = useSelector((state: RootState) => state.ui)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const observerTarget = useRef<HTMLDivElement>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(fetchContent({ categories, page: Math.floor(items.length / 5) }))
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, dispatch, categories, items.length])

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
  )

  const displayedItems =
    contentOrder.length > 0
      ? contentOrder
          .map((id) => filteredItems.find((item) => item.id === id))
          .filter(Boolean)
          .concat(filteredItems.filter((item) => !contentOrder.includes(item.id)))
      : filteredItems

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.preventDefault()
    setDragOverId(itemId)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItemId: string) => {
    e.preventDefault()
    if (!draggedItemId || draggedItemId === targetItemId) return

    const draggedIndex = displayedItems.findIndex((item) => item.id === draggedItemId)
    const targetIndex = displayedItems.findIndex((item) => item.id === targetItemId)

    const newOrder = [...displayedItems]
    const [draggedItem] = newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedItem)

    dispatch(reorderContent(newOrder.map((item) => item.id)))
    setDragOverId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Feed</h2>
        <p className="text-slate-700">Personalized content from news, recommendations, and social media</p>
      </div>

      <CategoryFilter />

      {displayedItems.length === 0 && !loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content found. Try adjusting your preferences or search query.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedItems.map((item) => (
              <div
                key={item.id}
                onDragOver={(e) => handleDragOver(e, item.id)}
                onDrop={(e) => handleDrop(e, item.id)}
                className={`transition-all ${dragOverId === item.id ? "ring-2 ring-primary opacity-75" : ""}`}
              >
                <DraggableContentCard item={item} />
              </div>
            ))}
          </div>

          <div ref={observerTarget} className="py-8 flex justify-center">
            {loading && <Spinner />}
            {!hasMore && items.length > 0 && <p className="text-muted-foreground">No more content</p>}
          </div>
        </>
      )}
    </div>
  )
}
