import {
  bindActionCreators,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { UserType } from '../shared'

type State = {
  user: UserType | null
  loading: boolean
  error: boolean
}

const initialState: State = {
  user: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUserData: (state: State, { payload }: PayloadAction<UserType>) => {
      state.user = payload
    },
    logout: () => initialState
  }
})

export const useUserActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators({ ...userSlice.actions }, dispatch)
}
