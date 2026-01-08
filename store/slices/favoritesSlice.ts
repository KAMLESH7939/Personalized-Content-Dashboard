import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  ids: string[]
}

const initialState: FavoritesState = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload)
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload)
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      if (state.ids.includes(action.payload)) {
        state.ids = state.ids.filter((id) => id !== action.payload)
      } else {
        state.ids.push(action.payload)
      }
    },
  },
})

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
