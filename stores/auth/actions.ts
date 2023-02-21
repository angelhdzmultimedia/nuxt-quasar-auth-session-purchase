import * as api from '~~/api'
import { LoginData } from '~~/types/login-data'
import { RegisterData } from '~~/types/register-data'

export async function login(loginData: LoginData): Promise<void> {
  //const data = await api.post('/api/auth/login', loginData)
  navigateTo('/asdasd')
}

export async function register(registerData: RegisterData): Promise<void> {
  const data = await api.post('/api/auth/register', registerData)
}
