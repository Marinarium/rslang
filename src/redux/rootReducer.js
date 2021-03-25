import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './wordsReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import dictionaryReducer from './dictionaryReducer'

export default configureStore({
  reducer: {
      words: wordsReducer,
      auth: authReducer,
      app: appReducer,
      dictionary: dictionaryReducer
  }
})
