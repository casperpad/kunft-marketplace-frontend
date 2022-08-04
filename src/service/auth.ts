import { User } from '@/types'
import api from './api'

interface GetNonceResponse {
  nonce: string
}

interface SignInResponse extends User {
  expire: number
}

export const getNonce = async (publicKey: string) => {
  const result = await api.get<GetNonceResponse>(`/auth/${publicKey}`)
  return result.data.nonce
}

export const signUp = async (publicKey: string, signature: string) => {
  const result = await api.post<SignInResponse>('/auth/signup', {
    signature,
    publicKey,
  })
  return result.data
}

export const signIn = async (publicKey: string, signature: string) => {
  const result = await api.post<SignInResponse>('/auth/signin', {
    publicKey,
    signature,
  })

  return result.data
}

export const checkAuth = async () => {
  const result = await api.get('/auth/check')
  return result.data
}

export const signOut = async () => {
  const result = await api.post('/auth/signout')
  return result.data
}
