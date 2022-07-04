/* eslint-disable no-useless-escape */
import { Schema, model, Model, HydratedDocument } from 'mongoose'
import validator from 'validator'

interface User {
  name: string
  email?: string
  publicKey: string
  nonce: string
  emailVerified: boolean
  role: 'user' | 'admin'
}

interface UserInstanceMethods {
  toJSON(): User
}

interface UserModel
  extends Model<User, Record<string, never>, UserInstanceMethods> {
  findByPublicKey(publicKey: string): Promise<HydratedDocument<User> | null>
  getNonce(publicKey: string): Promise<string | undefined>
}

const userSchema = new Schema<User, UserModel, UserInstanceMethods>({
  name: {
    type: String,
    required: true,
  },
  nonce: {
    type: String,
    required: true,
  },
  publicKey: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    index: true,
  },
  email: {
    type: String,
    unique: true,
    dropDups: true,
    index: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please fill a valid email address'],
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
})

userSchema.statics.getNonce = async function (publicKey: string) {
  const user = await this.findOne({ publicKey }).select('nonce')
  return user?.nonce
}

userSchema.statics.findByPublicKey = async function (publicKey: string) {
  return await this.findOne({ publicKey })
}

userSchema.methods.toJSON = function () {
  const { _id, __v, ...user } = this._doc
  return user
}

export default model<User, UserModel>('User', userSchema)
