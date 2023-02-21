import { createPurchase, findPurchase } from '~~/db'

export default defineEventHandler(async (event): Promise<boolean | void> => {
  const { action, userId } = await readBody(event)

  const purchase = await findPurchase({ action, userId })

  if (!purchase) {
    createPurchase({ action, userId })
    return true
  }

  return true
})
