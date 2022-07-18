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
  metadata: {
    type: Map,
    required: true,
  },
  favoritedUsers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  viwed: {
    type: Number,
    default: 0,
  },
})

TokenSchema.plugin(mongooseAggregatePaginate)

export const Token = mongoose.model<
  TokenDocument,
  mongoose.AggregatePaginateModel<TokenDocument>
>('Token', TokenSchema)
