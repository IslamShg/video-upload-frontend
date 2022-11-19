import {
  bindActionCreators,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { VideoType } from '../shared'

type State = {
  videos: VideoType[] | null
  currentVideo: VideoType | null
  loading: boolean
  error: boolean
}

const videoThunks = {
  getVideoById: createAsyncThunk(
    'videos/getVideoById',
    async (payload: { videoId: string }) => {
      const { data } = await axios.get<VideoType>(
        `/videos/find/${payload.videoId}`
      )
      return data
    }
  ),

  likeVideoById: createAsyncThunk(
    'videos/likeVideoById',
    async (payload: {
      videoId: string
      type: 'set' | 'remove'
      userId: string
    }) => {
      const { videoId, type, userId } = payload

      await axios.put<VideoType>(`/users/like/${videoId}`)
      return { type, videoId, userId }
    }
  ),

  dislikeVideoById: createAsyncThunk(
    'videos/dislikeVideoById',
    async (payload: {
      videoId: string
      type: 'set' | 'remove'
      userId: string
    }) => {
      const { videoId, type, userId } = payload

      await axios.put<VideoType>(`/users/dislike/${videoId}`)
      return { type, videoId, userId }
    }
  )
}

const { getVideoById, dislikeVideoById, likeVideoById } = videoThunks

const initialState: State = {
  videos: null,
  loading: false,
  error: false,
  currentVideo: null
}

export const videoSlice = createSlice({
  name: 'videoSlice',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(getVideoById.fulfilled, (state, { payload }) => {
      state.currentVideo = payload
    })

    addCase(likeVideoById.fulfilled, (state, { payload }) => {
      const isAdd = payload.type === 'set'
      const newLikesArr = isAdd
        ? [...state.currentVideo.likes, payload.userId]
        : state.currentVideo.likes.filter((id) => id !== payload.userId)

      state.currentVideo.likes = newLikesArr
      state.currentVideo.dislikes = state.currentVideo.dislikes.filter(
        (id) => id !== payload.userId
      )
    })

    addCase(dislikeVideoById.fulfilled, (state, { payload }) => {
      const isAdd = payload.type === 'set'
      const newDislikesArr = isAdd
        ? [...state.currentVideo.dislikes, payload.userId]
        : state.currentVideo.dislikes.filter((id) => id !== payload.userId)

      state.currentVideo.dislikes = newDislikesArr
      state.currentVideo.likes = state.currentVideo.likes.filter(
        (id) => id !== payload.userId
      )
    })
  }
})

export const useVideoActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...videoSlice.actions, ...videoThunks }, dispatch)
}
