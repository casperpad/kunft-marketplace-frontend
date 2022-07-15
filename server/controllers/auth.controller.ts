import {
  decodeBase16,
  verifyMessageSignature,
  CLPublicKey,
} from 'casper-js-sdk'
import Chance from 'chance'
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { sign as signJwt } from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRE, JWT_NAME } from '@server/config'
import { User } from '@server/models/user.model'
import catchAsync from '@server/utils/catchAsync'

export const generateNonce = () => {
  const chance = new Chance()
  const nonce = chance.string({ length: 20 })

  return nonce
}

export const checkAuth = catchAsync(
  async (req: express.Request, res: express.Response) => {
    try {
      const { publicKey } = req.params
      const nonce = await User.getNonce(publicKey)
      if (nonce === undefined) throw Error(`Not exist user ${publicKey}`)

      res.json({ nonce })
    } catch (error: any) {
      if (error instanceof Error) {
        console.error(error)
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message })
      }
    }
  },
)

export const getNonce = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { publicKey } = req.params
    const nonce = await User.getNonce(publicKey)
    if (nonce === undefined) throw Error(`Not exist user ${publicKey}`)
    res.json({ nonce })
  },
)

export const signUp = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { publicKey: publicKeyString, signature: signatureString } = req.body
    const publicKey = CLPublicKey.fromHex(publicKeyString)
    let user = await User.findByPublicKey(publicKey.toHex())

    if (user) {
      throw Error(`${publicKey.toHex()} alreaday exist`)
    }

    const signature = decodeBase16(signatureString)
    const message = `Signup with KUNFT with ${publicKeyString}`

    const result = verifyMessageSignature(publicKey, message, signature)
    if (result === false) {
      throw Error(`Invalid Signature`)
    }

    user = new User({
      name: publicKeyString,
      publicKey: publicKeyString,
      nonce: generateNonce(),
    })
    await user.save()

    res.json(user)
  },
)

export const signIn = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { publicKey: publicKeyString, signature: signatureString } = req.body
    const publicKey = CLPublicKey.fromHex(publicKeyString)

    const signature = decodeBase16(signatureString)

    const user = await User.findByPublicKey(publicKeyString)

    if (user === null) throw Error(`Not exist user ${publicKeyString}`)

    const message = `Signin KUNFT with\n public key: ${publicKeyString}\nnonce: ${user.nonce}`

    const verified = verifyMessageSignature(publicKey, message, signature)

    if (!verified) throw Error(`Invalid signature`)

    user.nonce = generateNonce()

    await user.save()

    const { nonce: _n, ...signObject } = user.toJSON()

    const token = signJwt(signObject, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    })

    res.cookie(JWT_NAME, token, {
      maxAge: JWT_EXPIRE * 1000,
      httpOnly: process.env.NODE_ENV !== 'development',
      secure: process.env.NODE_ENV !== 'development',
    })

    res.json({ ...signObject, expire: JWT_EXPIRE * 1000 })
  },
)

export const signOut = catchAsync(
  async (req: express.Request, res: express.Response) => {
    res.clearCookie(JWT_NAME)
    res.json({ ok: true })
  },
)
