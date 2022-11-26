import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { videoThunks } from './video.thunks'
import { CommentType, VideoType } from './video.types'

type State = {
  videos: VideoType[] | null
  currentVideo: VideoType | null
  loading: boolean
  error: boolean
  currentVideoComments: CommentType[]
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
