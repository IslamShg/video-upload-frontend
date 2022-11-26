import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { CommentType, UploadVideoPayload, VideoType } from './video.types'

export const videoThunks = {
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
