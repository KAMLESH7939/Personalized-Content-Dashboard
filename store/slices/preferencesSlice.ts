import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PreferencesState {
  categories: string[]
  darkMode: boolean
  language: string
}

const initialState: PreferencesState = {
  categories: ["technology", "finance", "movies"],
  darkMode: false,
  language: "en",
}

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      if (state.categories.includes(action.payload)) {
        state.categories = state.categories.filter((c) => c !== action.payload)
      } else {
        state.categories.push(action.payload)
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const { setCategories, toggleCategory, toggleDarkMode, setLanguage } = preferencesSlice.actions
export default preferencesSlice.reducer
