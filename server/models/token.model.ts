import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { TokenDocument } from '../interfaces/mongoose.gen'

const TokenSchema = new Schema({
  collectionNFT: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Collection',
  },
  tokenId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
  },
  metadata: {
    type: [
      {
        key: String,
        value: String,
      },
    ],
    required: true,
  },
})

TokenSchema.plugin(mongooseAggregatePaginate)

export const Token = mongoose.model<
  TokenDocument,
  mongoose.AggregatePaginateModel<TokenDocument>
>('Token', TokenSchema)
