"use client"

import type React from "react"

import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setDraggedItem } from "@/store/slices/uiSlice"
import type { ContentItem } from "@/store/slices/contentSlice"
import { ContentCard } from "@/components/content-card"

interface DraggableContentCardProps {
  item: ContentItem
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void
}

export function DraggableContentCard({ item, onDragOver, onDrop }: DraggableContentCardProps) {
  const dispatch = useDispatch()
  const dragRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dispatch(setDraggedItem(item.id))
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", item.id)
  }

  const handleDragEnd = () => {
    dispatch(setDraggedItem(null))
  }

  return (
    <div
      ref={dragRef}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="cursor-move hover:opacity-90 transition-opacity"
    >
      <ContentCard item={item} />
    </div>
  )
}
