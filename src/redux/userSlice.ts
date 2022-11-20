import {
  bindActionCreators,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { SignInPayload, UserType } from '../shared'

type State = {
  user: UserType | null
  currentVideoUser: UserType | null
  loading: boolean
  error: boolean
}

const userThunks = {
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
const {
  signInThunk,
  signUpThink,
  subscribeChannelThunk,
  getCurrentChannelAuthor
} = userThunks

const initialState: State = {
  user: null,
  loading: false,
  error: false,
  currentVideoUser: null
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: ({ addCase }) => {
    addCase(signInThunk.pending, (state) => {
      state.loading = true
    })

    addCase(signInThunk.fulfilled, (state, { payload }) => {
      state.user = payload
      state.loading = false
    })

    addCase(signInThunk.rejected, (state) => {
      state.loading = false
    })

    addCase(signUpThink.pending, (state) => {
      state.loading = true
    })

    addCase(signUpThink.fulfilled, (state, { payload }) => {
      state.user = payload
      state.loading = false
    })

    addCase(signUpThink.rejected, (state) => {
      state.loading = false
    })

    addCase(getCurrentChannelAuthor.fulfilled, (state, { payload }) => {
      state.currentVideoUser = payload
    })

    addCase(subscribeChannelThunk.fulfilled, (state, { payload }) => {
      const { type, channelId } = payload

      if (type === 'sub') {
        state.user.subscribedUsers.push(channelId)
        ++state.currentVideoUser.subscribers
        return
      }
      state.user.subscribedUsers = state.user.subscribedUsers.filter(
        (id) => id !== channelId
      )
      --state.currentVideoUser.subscribers
    })
  }
})

export const useUserActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...userSlice.actions, ...userThunks }, dispatch)
}
