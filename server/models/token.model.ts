import mongoose, { Schema } from 'mongoose'
import {
  TokenDocument,
  TokenModel,
  TokenSchema,
} from '../interfaces/mongoose.gen'

const TokenSchema: TokenSchema = new Schema({
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

export const Token = mongoose.model<TokenDocument, TokenModel>(
  'Token',
  TokenSchema,
)
