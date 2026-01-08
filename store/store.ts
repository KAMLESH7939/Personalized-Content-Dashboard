import { configureStore } from "@reduxjs/toolkit"
import contentReducer from "./slices/contentSlice"
import preferencesReducer from "./slices/preferencesSlice"
import favoritesReducer from "./slices/favoritesSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    content: contentReducer,
    preferences: preferencesReducer,
    favorites: favoritesReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
