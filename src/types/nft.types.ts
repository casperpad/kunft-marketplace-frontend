export type NFTType = 'Sale' | 'NoneSale' | 'Upcoming'

export interface NFT {
  type: NFTType
  name: string
  owner: string
  description: string
  viewed: number
  price: number
  collection: string
}
