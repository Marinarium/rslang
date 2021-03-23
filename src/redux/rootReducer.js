import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './wordsReducer'
import authReducer from './authReducer'

export default configureStore({
  reducer: {
      words: wordsReducer,
      auth: authReducer
  }
})
