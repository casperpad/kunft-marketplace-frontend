import mongoose, { Schema } from 'mongoose'
import {
  CollectionDocument,
  CollectionModel,
  CollectionSchema,
} from '../interfaces/mongoose.gen'

const CollectionSchema: CollectionSchema = new Schema({
  contractPackageHash: {
    type: String,
    required: true,
    unique: true,
  },
  contractHash: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  slug: { type: String, required: true, unique: true, dropDups: true },
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  verified: { type: Boolean, required: true },
  image: { type: String },
  twitter: { type: String },
  discord: { type: String },
  website: { type: String },
})

export const Collection = mongoose.model<CollectionDocument, CollectionModel>(
  'Collection',
  CollectionSchema,
)
