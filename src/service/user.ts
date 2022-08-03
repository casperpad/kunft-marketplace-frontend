import api from './api'

export const addToken = async (contractHash: string, tokenId: string) => {
  const result = await api.post('/user/add-token', {
    contractHash,
    tokenId,
  })
  return result.data
}
