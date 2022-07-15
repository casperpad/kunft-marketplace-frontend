import api from './api'

export const addCollection = async (
  contractPackageHash: string,
  contractHash: string,
  slug: string,
  symbol: string,
  name: string,
  verified: boolean,
  image: string,
  twitter: string,
  discord: string,
  website: string,
  desciption?: string,
  promoted?: boolean,
) => {
  const result = await api.post('/collections', {
    contractHash,
    contractPackageHash,
    slug,
    symbol,
    name,
    desciption,
    verified,
    promoted,
    image,
    twitter,
    discord,
    website,
  })
  return result.data
}
