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

export type UserType = {
  _id?: string
  name: string
  email: string
  password: string
  img: string
  subscribers: number
  updatedAt?: string
  createdAt?: string
  subscribedUsers: string[]
}

export type SignInPayload = {
  name: string
  email?: string
  password?: string
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

export type UploadVideoPayload = {
  tags: string[]
  title: string
  desc: string
  imgUrl: string
  videoUrl: string
}
