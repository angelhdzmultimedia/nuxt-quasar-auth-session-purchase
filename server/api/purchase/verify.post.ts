import { findPurchase } from '~~/db'

export default defineEventHandler(async (event): Promise<boolean | void> => {
  const { action, userId } = await readBody(event)
  if (!findPurchase({ action, userId })) {
    return false
  }
  return true
})
