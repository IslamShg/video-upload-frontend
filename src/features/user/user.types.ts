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
