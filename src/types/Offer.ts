import { OfferFieldsFragment } from '@/graphql/queries/__generated__/token.generated'
import { TransactionStatus } from './Sale'

export interface Offer {
  creator: string
  payToken?: string
  price: string
  startTime: number
  owner?: string
  additionalRecipient?: string
  status: TransactionStatus
  createdAt: Date
}

export const asOffer = (fields: OfferFieldsFragment): Offer => ({
  creator: fields.creator,
  payToken: fields.payToken ? fields.payToken : undefined,
  price: fields.price,
  startTime: fields.startTime,
  owner: fields.owner ? fields.owner : undefined,
  additionalRecipient: fields.additionalRecipient
    ? fields.additionalRecipient
    : undefined,
  status: fields.status as TransactionStatus,
  createdAt: fields.createdAt,
})
