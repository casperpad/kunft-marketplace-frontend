import { TokenFieldsFragment } from '@/graphql/queries/__generated__/token.generated'
import { asCollection, Collection } from './Collection'
import { asSale, Sale } from './Sale'

export type TokenType = 'Listed' | 'NotListed' | 'Upcoming'

interface Metadata {
  [key: string]: string
}

export interface Token {
  name: string
  id: string
  metadata: Metadata
  owner: string
  viewed: number
  payToken?: string
  favoritedUsers: string[]
  collection: Collection
  pendingSale?: Sale
  sales: Sale[]
}

export const asToken = (fields: TokenFieldsFragment): Token => ({
  name: `${fields.collection.name} #${fields.tokenId}`,
  id: fields.tokenId,
  metadata: fields.metadata,
  owner: fields.owner,
  viewed: fields.viewed,
  favoritedUsers: fields.favoritedUsers ? fields.favoritedUsers : [],
  collection: asCollection(fields.collection),
  pendingSale: fields.pendingSale ? asSale(fields.pendingSale) : undefined,
  sales: fields.sales ? fields.sales.map(asSale) : [],
})
