import {
  bindActionCreators,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { VideoType, CommentType, UploadVideoPayload } from '../shared'

type State = {
  videos: VideoType[] | null
  currentVideo: VideoType | null
  loading: boolean
  error: boolean
  currentVideoComments: CommentType[]
}

const videoThunks = {
  getVideos: createAsyncThunk(
    'videos/getVideos',
    async (payload: { type: string }) => {
      const { data } = await axios.get<VideoType[]>(`/videos/${payload.type}`)
      return data
    }
  ),

  searchVideos: createAsyncThunk(
    'videos/searchVideos',
    async ({ q }: { q: string }) => {
      const { data } = await axios.get<VideoType[]>('/videos/search', {
        params: { q }
      })
      return data
    }
  ),

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
  ),

  getVideoComments: createAsyncThunk(
    'videos/getVideoComments',
    async (payload: { videoId: string }) => {
      const { videoId } = payload

      const { data } = await axios.get<CommentType[]>(`/comments/${videoId}`)
      return data
    }
  ),

  uploadVideo: createAsyncThunk(
    'videos/uploadVideo',
    async (payload: UploadVideoPayload) => {
      const { data } = await axios.post<VideoType>('/videos', payload)
      return data
    }
  )
}

export const {
  getVideoById,
  dislikeVideoById,
  likeVideoById,
  getVideoComments,
  uploadVideo,
  getVideos,
  searchVideos
} = videoThunks

const initialState: State = {
  videos: [],
  loading: false,
  error: false,
  currentVideo: null,
  currentVideoComments: []
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

    addCase(getVideoComments.fulfilled, (state, { payload }) => {
      state.currentVideoComments = payload
    })

    addCase(getVideos.fulfilled, (state, { payload }) => {
      state.videos = payload
    })

    addCase(searchVideos.fulfilled, (state, { payload }) => {
      state.videos = payload
    })
  }
})

export const useVideoActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...videoSlice.actions, ...videoThunks }, dispatch)
}
