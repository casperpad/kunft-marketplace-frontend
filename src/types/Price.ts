import { PriceFieldsFragment } from '@/graphql/queries/__generated__/token.generated'

export interface Price {
  price: string
  payToken?: string
}

export const asPrice = (fields: PriceFieldsFragment): Price => ({
  price: fields.price,
  payToken: fields.payToken ? fields.payToken : undefined,
})
