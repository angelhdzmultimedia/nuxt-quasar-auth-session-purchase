import { initStore, Store } from '../auth'
import { Notify } from 'quasar'

@Store()
class ActionStore {
  public count: number = 0

  public click() {
    try {
      this.count++
    Notify.create({
      message: `You clicked this button ${this.count} times!!!`,
      color: 'positive',
    })
    } catch (error) {
      
    }
  }
}

export const useActionStore = initStore(ActionStore)
