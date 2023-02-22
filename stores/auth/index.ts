import { User, _User } from '~~/types/user'

import { StoreDefinition } from 'pinia'
import * as api from '~/api'
import { LoginData } from '~~/types/login-data'
import { wait } from '~~/server/api/activation/utils/wait'

export function Store(...args: any[]) {
  return function (target: any) {
    const _instance = new target()
    const state: { [key: keyof typeof _instance]: any } = {}
    const actions: { [key: keyof typeof _instance]: any } = {}

    Object.getOwnPropertyNames(Object.getPrototypeOf(_instance)).forEach(
      (key) => {
        console.log(key)
        if (key !== 'constructor') {
          actions[key] = _instance[key]
        }
      }
    )

    Object.keys(_instance).forEach((key) => {
      if (!actions[key] && !state[key]) {
        state[key as keyof typeof _instance] =
          _instance[key as keyof typeof _instance]
      }
    })

    console.log(JSON.stringify({ actions, state }))

    return {
      id: _instance.constructor.name,
      state: () => {
        return {
          ...state,
        }
      },
      actions: {
        ...actions,
      },
    } as typeof target
  }
}

@Store()
class AuthStore {
  public isAuth: boolean = false
  public user: _User | undefined = undefined
  public isLoading: boolean = false

  public async login(loginData: LoginData) {
    this.isLoading = true
    await wait(250)
    const data = await api.post<LoginData, _User>('/api/auth/login', loginData)
    this.isLoading = false
    this.user = data as _User
    this.isAuth = true
  }

  public async logout(): Promise<void> {
    await api.get('/api/auth/logout')
    alert('bla')
    this.user = undefined
    this.isAuth = false
  }

  public async findProfile() {
    try {
      this.isLoading = true
      await wait(250)
      const data = await api.get<_User>('/api/auth/profile')
      this.user = data!
      this.isAuth = true
    } catch (error) {
    } finally {
      this.isLoading = false
    }
  }
}

export function initStore<T>(storeClass: {
  new <T>(): any
}): StoreDefinition<string, any, any, any> {
  const _store: {
    id: string
    state: () => { [key in keyof T]: any }
    actions: { [key in keyof T]: any }
  } = storeClass as unknown as {
    id: string
    state: () => { [key in keyof T]: any }
    actions: { [key in keyof T]: any }
  }

  return defineStore(_store)
}

export const useAuthStore = initStore(AuthStore)
