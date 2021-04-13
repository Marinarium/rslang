import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from './wordsReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import statReducer from './statReducer'
import dictionaryReducer from './dictionaryReducer'

export default configureStore({
  reducer: {
      words: wordsReducer,
      auth: authReducer,
      app: appReducer,
      dictionary: dictionaryReducer,
      stat: statReducer
  },
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
})
