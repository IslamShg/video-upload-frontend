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
  )
}

const { signInThunk } = userThunks

const initialState: State = {
  user: null,
  loading: false,
  error: false
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
  }
})

export const useUserActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...userSlice.actions, ...userThunks }, dispatch)
}
