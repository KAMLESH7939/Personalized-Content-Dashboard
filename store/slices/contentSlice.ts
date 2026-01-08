import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

export interface ContentItem {
  id: string
  type: "news" | "recommendation" | "social"
  title: string
  description: string
  image: string
  source: string
  category: string
  url?: string
  timestamp: number
}

interface ContentState {
  items: ContentItem[]
  loading: boolean
  error: string | null
  hasMore: boolean
}

const initialState: ContentState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
}

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async (preferences: { categories: string[]; page: number }) => {
    // Mock data - in production, fetch from APIs
    const mockContent: ContentItem[] = [
      {
        id: "1",
        type: "news",
        title: "Breaking: New Technology Unveiled",
        description: "A groundbreaking advancement in AI technology has been announced today.",
        image: "/technology-news-collage.png",
        source: "TechNews Daily",
        category: "technology",
        url: "#",
        timestamp: Date.now(),
      },
      {
        id: "2",
        type: "recommendation",
        title: "Top Movie: Inception",
        description: "A masterpiece of modern cinema exploring dreams and reality.",
        image: "/abstract-movie-poster.png",
        source: "Movie Recommendations",
        category: "movies",
        url: "#",
        timestamp: Date.now() - 3600000,
      },
      {
        id: "3",
        type: "social",
        title: "Tech Trends Discussion",
        description: "Join the conversation about the latest technology trends #tech #innovation",
        image: "/group-discussion.png",
        source: "Social Media",
        category: "technology",
        url: "#",
        timestamp: Date.now() - 7200000,
      },
      {
        id: "4",
        type: "news",
        title: "Market Update: Stock Surge",
        description: "Financial markets reach new heights amid economic optimism.",
        image: "/finance-market.jpg",
        source: "Finance Weekly",
        category: "finance",
        url: "#",
        timestamp: Date.now() - 1800000,
      },
      {
        id: "5",
        type: "recommendation",
        title: "Album of the Month",
        description: "A stunning new album that captures the essence of modern music.",
        image: "/abstract-soundscape.png",
        source: "Music Recommendations",
        category: "music",
        url: "#",
        timestamp: Date.now() - 5400000,
      },
    ]

    return mockContent
  },
)

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearContent: (state) => {
      state.items = []
      state.error = null
    },
    removeContentItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false
        state.items = [...state.items, ...action.payload]
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch content"
      })
  },
})

export const { clearContent, removeContentItem } = contentSlice.actions
export default contentSlice.reducer
