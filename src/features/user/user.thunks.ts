import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { SignInPayload, UserType } from './user.types'

export const userThunks = {
  signInThunk: createAsyncThunk(
    'user/signin',
    async (payload: SignInPayload) => {
      const { data } = await axios.post<UserType>('/auth/signin', payload)
      return data
    }
  ),

  signUpThink: createAsyncThunk(
    'user/signup',
    async (payload: SignInPayload) => {
      const { data } = await axios.post<UserType>('/auth/signup', payload)
      return data
    }
  ),

  getCurrentChannelAuthor: createAsyncThunk(
    'videos/getCurrentChannelAuthor',
    async (payload: { authorId: string }) => {
      const { authorId } = payload
      const { data } = await axios.get<UserType>(`/users/find/${authorId}`)
      return data
    }
  ),

  subscribeChannelThunk: createAsyncThunk(
    'videos/subscribeChannel',
    async (payload: { type: 'sub' | 'unsub'; channelId: string }) => {
      const { type, channelId } = payload

      await axios.put(`/users/${type}/${channelId}`)
      return { type, channelId }
    }
  )
}
