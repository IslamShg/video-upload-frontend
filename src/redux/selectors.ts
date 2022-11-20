import { RootState } from './store'

export const getCurrentVidSelector = (state: RootState) =>
  state.video.currentVideo

export const getCurrentUserSelector = (state: RootState) => state.user.user

export const getVideosSelector = (state: RootState) => state.video.videos

export const getCurrentVidComsSelector = (state: RootState) =>
  state.video.currentVideoComments

export const getCurrentVideoAuthorSelector = (state: RootState) =>
  state.user.currentVideoUser
