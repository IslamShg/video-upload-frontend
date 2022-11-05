export type VideoType = {
  _id?: string
  userId: string
  title: string
  desc: string
  videoUrl: string
  views: number
  tags: string
  likes: string
  createdAt?: string
  updatedAt?: string
  user: {
    name: string
    img?: string
  }
  dislikes: string
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
