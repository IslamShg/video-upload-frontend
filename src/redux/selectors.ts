import { RootState } from './store'

export const getCurrentVidSelector = (state: RootState) =>
  state.video.currentVideo

export const getCurrentUserSelector = (state: RootState) => state.user.user
