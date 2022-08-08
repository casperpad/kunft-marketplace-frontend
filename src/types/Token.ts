import { TokenFieldsFragment } from '@/graphql/queries/__generated__/token.generated'
import { asCollection, Collection } from './Collection'
import { asOffer, Offer } from './Offer'
import { asSale, Sale } from './Sale'

export type TokenType = 'Listed' | 'NotListed' | 'Upcoming'

export interface Metadata {
  [key: string]: string
}

export interface Token {
  name: string
  id: string
  metadata: Metadata
  owner: string
  viewed: number
  favoritedUsers: string[]
  collection: Collection
  price?: Sale
  listed: boolean
  sales: Sale[]
  offers: Offer[]
}

export const asToken = (fields: TokenFieldsFragment): Token => ({
  name: `${fields.collection.name} #${fields.tokenId}`,
  id: fields.tokenId,
  metadata: fields.metadata,
  owner: fields.owner,
  viewed: fields.viewed,
  favoritedUsers: fields.favoritedUsers ? fields.favoritedUsers : [],
  collection: asCollection(fields.collection),
  price: fields.price ? asSale(fields.price) : undefined,
  listed: fields.listed,
  sales: fields.sales.map(asSale),
  offers: fields.offers.map(asOffer),
})
