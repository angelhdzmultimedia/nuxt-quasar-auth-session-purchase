import { findTokenByToken, findUserById, Token } from "~~/db"
import { _User } from "~~/types/user"

export default defineEventHandler(async (event): Promise<_User | void> => {
  const cookieToken = getCookie(event, 'token')
  const token: Token | undefined = findTokenByToken(cookieToken!)
  const user = findUserById(token?.userId!)

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 403,
        statusMessage: 'Session not valid',
      })
    )
  }

  return user
})