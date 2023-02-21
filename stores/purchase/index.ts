import { initStore, Store } from '../auth'
import { Notify } from 'quasar'
import * as api from '~/api'
import { wait } from '~~/server/api/activation/utils/wait'

@Store()
class PurchaseStore {
  public count: number = 0
  public auth = useAuthStore()
  public isLoading: boolean = false

  public async buy(action: string, userId: string) {
    this.isLoading = true
    await wait(250)
    const result = await api.post('/api/purchase/buy', { action, userId })
    this.isLoading = false
    return result
  }

  public async verify(action: string, userId: string) {
    this.isLoading = true
    await wait(250)
    const result = await api.post('/api/purchase/verify', { action, userId })
    this.isLoading = false
    return result
  }
}

export const usePurchaseStore = initStore(PurchaseStore)
