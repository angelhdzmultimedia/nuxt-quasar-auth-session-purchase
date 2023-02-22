import { User, _User } from '~~/types/user'
import { randomUUID } from 'node:crypto'

export const users: User[] = [
  {
    email: 'angelhdz@gmail.com',
    password: '123456',
    id: 'asdasd89as09das',
    name: 'Angel',
    username: 'angelhdz',
  },
]
type Purchase = {
  action: string
  userId: string
}
export type Token = {
  value: string
  userId: string
}
export const tokens: Token[] = []
export const purchases: Purchase[] = []

export function createPurchase(purchase: Purchase) {
  purchases.push(purchase)
}

export function deleteTokenByToken(token: string) {
  const _token: Token | undefined = findTokenByToken(token)
  const index: number = tokens.indexOf(_token!)
  tokens.splice(index, 1)
}

export function findPurchase(purchase: Purchase) {
  return purchases.find((item) => {
    return item.userId === purchase.userId && item.action === purchase.action
  })
}

export function createUser(data: User) {
  users.push({
    ...data,
    id: randomUUID(),
  })
}

function transformUser(user: User | undefined): _User | undefined {
  if (!user) return undefined
  const { password, ...props } = user
  return props
}

export function findUserByEmail(email: string): _User | undefined {
  return transformUser(users.find((item) => item.email === email))
}

export function createTokenByUserId(userId: string, value: string) {
  tokens.push({
    value,
    userId,
  })
}

export function findTokenByToken(token: string): Token | undefined {
  return tokens.find((item) => item.value === token)
}

export function findUserById(id: string): _User | undefined {
  return transformUser(users.find((item) => item.id === id))
}

export function validatePassword(password: string, id: string): boolean {
  const user = users.find((item) => item.id === id)
  console.log(`ID: ${id}`)
  return password === user?.password
}
