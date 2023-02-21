import { randomUUID } from 'crypto'
import { createTokenByUserId, findUserByEmail, validatePassword } from '~~/db'
import { LoginData } from '~~/types/login-data'
import { _User } from '~~/types/user'

export default defineEventHandler(async (event): Promise<_User | void> => {
  const { email, password }: LoginData = await readBody(event)
  console.log(email)

  const user = await findUserByEmail(email)

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'User not found',
      })
    )
  }

  if (!validatePassword(password, user.id)) {
    return sendError(
      event,
      createError({
        statusCode: 403,
        statusMessage: 'Email or password not valid',
      })
    )
  }
  const token = randomUUID()
  setCookie(event, 'token', token)
  createTokenByUserId(user.id, token)

  return user
})
