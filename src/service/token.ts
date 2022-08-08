import api from './api'

export const addUserToken = async (accountHash: string) => {
  const result = await api.post(`/tokens/add/${accountHash}`)
  return result.data
}
