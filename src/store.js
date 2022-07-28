import { configureStore } from '@reduxjs/toolkit'
import wordleReducer from './state/wordleSlice'
import themeReducer from './state/themeSlice'

export const store = configureStore({
  reducer: {
    wordle: wordleReducer,
    theme: themeReducer
  },
})