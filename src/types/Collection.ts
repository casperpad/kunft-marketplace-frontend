import { CollectionFieldsFragment } from '@/graphql/queries/__generated__/collection.generated'

export interface Collection {
  contractPackageHash: string
  contractHash: string
  name: string
  description?: string
  symbol: string
  slug: string
  image?: string
  logo?: string
  verified: boolean
  promoted: boolean
}

export const asCollection = (fields: CollectionFieldsFragment): Collection => ({
  contractPackageHash: fields.contractPackageHash,
  contractHash: fields.contractHash,
  name: fields.name,
  description: fields.description ? fields.description : undefined,
  symbol: fields.symbol,
  slug: fields.slug,
  image: fields.image ? fields.image : undefined,
  logo: fields.logo ? fields.logo : undefined,
  verified: fields.verified,
  promoted: fields.promoted,
})
