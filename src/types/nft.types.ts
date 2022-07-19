export type TokenType = 'Sale' | 'NoneSale' | 'Upcoming'

interface Metadata {
  [key: string]: string
}

export interface Token {
  type: TokenType
  name: string
  id: string
  metadata: Metadata
  collectionImage?: string
  owner: string
  viewed: number
  price?: number
  contractHash: string
}
