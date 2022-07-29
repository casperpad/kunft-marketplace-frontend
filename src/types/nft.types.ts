export type TokenType = 'Sale' | 'NoneSale' | 'Owned' | 'Upcoming'

interface Metadata {
  [key: string]: string
}

export interface Token {
  type: TokenType
  name: string
  id: string
  metadata: Metadata
  collectionImage: string | null
  owner: string
  listed: boolean
  viewed: number
  price?: string
  payToken?: string | null
  favoritedUsers: string[]
  contractHash: string
}

export interface Collection {
  __typename: string
  contractPackageHash: string
  contractHash: string
  name: string
  description: string | null
  symbol: string
  slug: string
  image: string | null
  verified: boolean
  promoted: boolean
}
