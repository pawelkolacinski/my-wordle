import { configureStore } from '@reduxjs/toolkit'
import wordleReducer from './state/wordleSlice'

export const store = configureStore({
  reducer: {
    wordle: wordleReducer
  },
})