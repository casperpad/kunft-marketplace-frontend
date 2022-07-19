import mongoose, { Schema } from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
import { CollectionDocument } from '../interfaces/mongoose.gen'

const CollectionSchema = new Schema({
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
  slug: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    uppercase: false,
  },
  deployer: String,
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  verified: { type: Boolean, required: true, default: false },
  promoted: { type: Boolean, required: true, default: false },
  image: { type: String },
  twitter: { type: String },
  discord: { type: String },
  website: { type: String },
})

CollectionSchema.plugin(mongooseAggregatePaginate)

export const Collection = mongoose.model<
  CollectionDocument,
  mongoose.AggregatePaginateModel<CollectionDocument>
>('Collection', CollectionSchema)
