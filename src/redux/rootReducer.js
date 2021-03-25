import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './wordsReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'

export default configureStore({
  reducer: {
      words: wordsReducer,
      auth: authReducer,
      app: appReducer
  }
})
