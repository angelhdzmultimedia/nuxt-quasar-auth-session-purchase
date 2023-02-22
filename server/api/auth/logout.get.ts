import { deleteTokenByToken } from '~~/db'

export default defineEventHandler(async (event): Promise<void> => {
  const cookieToken: string | undefined = getCookie(event, 'token')
  deleteTokenByToken(cookieToken!)
  deleteCookie(event, 'token')
})
