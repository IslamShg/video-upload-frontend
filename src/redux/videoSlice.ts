import {
  bindActionCreators,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { VideoType } from '../shared'

type State = {
  videos: VideoType[] | null
  loading: boolean
  error: boolean
}

const videoThunks = {
  signInThunk: createAsyncThunk('video/random', async () => {})
}

const { signInThunk } = videoThunks

const initialState: State = {
  videos: null,
  loading: false,
  error: false
}

export const videoSlice = createSlice({
  name: 'videossdf/videoSlice',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: ({ addCase }) => {
    addCase(signInThunk.pending, (state) => {})
    addCase(signInThunk.fulfilled, (state, { payload }) => {})
    addCase(signInThunk.rejected, (state) => {})
  }
})

export const useVideoActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...videoSlice.actions, ...videoThunks }, dispatch)
}
