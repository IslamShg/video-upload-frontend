import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { userSlice } from './userSlice'
import { videoSlice } from './videoSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    video: videoSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
