import api from './api'

export const addToken = async (
  contractPackageHash: string,
  contractHash: string,
  tokenId: string,
) => {
  const result = await api.post('/user/add-token', {
    contractPackageHash,
    contractHash,
    tokenId,
  })
  return result.data
}
