import { SaleFieldsFragment } from '@/graphql/queries/__generated__/token.generated'

export type TransactionStatus = 'pending' | 'succeed' | 'canceled'

export interface Sale {
  creator: string
  price: string
  payToken?: string
  startTime: any
  status: TransactionStatus
  createdAt: any
}

export const asSale = (fields: SaleFieldsFragment): Sale => ({
  creator: fields.creator,
  price: fields.price,
  payToken: fields.payToken ? fields.payToken : undefined,
  startTime: fields.startTime,
  status: fields.status as TransactionStatus,
  createdAt: fields.createdAt,
})
