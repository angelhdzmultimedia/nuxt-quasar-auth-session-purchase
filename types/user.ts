export type User = {
  name: string
  email: string
  username: string
  password: string
  id: string
}

export type _User = Omit<User, 'password'>
