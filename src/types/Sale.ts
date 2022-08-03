import { SaleFieldsFragment } from '@/graphql/queries/__generated__/token.generated'

type SaleStatus = 'pending' | 'suceed' | 'canceled'

export interface Sale {
  creator: string
  price: string
  payToken?: string
  startTime: any
  status: SaleStatus
  createdAt: any
}

export const asSale = (fields: SaleFieldsFragment): Sale => ({
  creator: fields.creator,
  price: fields.price,
  payToken: fields.payToken ? fields.payToken : undefined,
  startTime: fields.startTime,
  status: fields.status as SaleStatus,
  createdAt: fields.createdAt,
})
