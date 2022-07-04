import api from './api'

interface GetNonceResponse {
  nonce: string
}

interface SignInResponse {
  user: any
}

export const getNonce = async (publicKey: string) => {
  const result = await api.get<GetNonceResponse>(`/auth/${publicKey}`)
  return result.data.nonce
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
