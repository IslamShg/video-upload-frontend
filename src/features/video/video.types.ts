export type VideoType = {
  _id?: string
  userId: string
  title: string
  desc: string
  videoUrl: string
  views: number
  tags: string[]
  likes: string[]
  dislikes: string[]
  createdAt?: string
  updatedAt?: string
  user: {
    name: string
    subscribers: number | string
    img?: string
  }
}

export type UploadVideoPayload = {
  tags: string[]
  title: string
  desc: string
  imgUrl: string
  videoUrl: string
}

export type CommentType = {
  createdAt: string
  desc: string
  updatedAt: string
  userId: string
  videoId: string
  _id: string
  user: {
    userId: string
    userName: string
    avatarUrl: string
  }
}
