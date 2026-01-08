import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  sidebarOpen: boolean
  searchQuery: string
  activeSection: "feed" | "trending" | "favorites"
  draggedItemId: string | null
  contentOrder: string[]
}

const initialState: UIState = {
  sidebarOpen: true,
  searchQuery: "",
  activeSection: "feed",
  draggedItemId: null,
  contentOrder: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setActiveSection: (state, action: PayloadAction<UIState["activeSection"]>) => {
      state.activeSection = action.payload
    },
    setDraggedItem: (state, action: PayloadAction<string | null>) => {
      state.draggedItemId = action.payload
    },
    reorderContent: (state, action: PayloadAction<string[]>) => {
      state.contentOrder = action.payload
    },
  },
})

export const { toggleSidebar, setSearchQuery, setActiveSection, setDraggedItem, reorderContent } = uiSlice.actions
export default uiSlice.reducer
