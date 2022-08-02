import { TokenFieldsFragment } from '@/graphql/queries/__generated__/token.generated'
import { asCollection, Collection } from './Collection'

export type TokenType = 'Sale' | 'NoneSale' | 'Owned' | 'Upcoming'

interface Metadata {
  [key: string]: string
}

export interface Token {
  type: TokenType
  name: string
  id: string
  metadata: Metadata
  owner?: string
  listed: boolean
  viewed: number
  price?: string
  payToken?: string
  favoritedUsers: string[]
  collection: Collection
}

export const asToken = (fields: TokenFieldsFragment): Token => ({
  type: fields.listed ? 'Sale' : 'NoneSale',
  name: `${fields.collection.name} #${fields.tokenId}`,
  id: fields.tokenId,
  metadata: fields.metadata,
  listed: fields.listed,
  viewed: fields.viewed,
  price: fields.price ? fields.price : undefined,
  favoritedUsers: fields.favoritedUsers ? fields.favoritedUsers : [],
  collection: asCollection(fields.collection),
})
