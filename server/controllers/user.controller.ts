import express from 'express'
import { tokenServices } from '@server/services'
import catchAsync from '@server/utils/catchAsync'

export const addToken = catchAsync(
  async (req: express.Request, res: express.Response) => {
    const { contractPackageHash, contractHash, tokenId } = req.body
    const { publicKey } = req.headers.user as any
    const result = await tokenServices.addToken(
      contractPackageHash,
      contractHash,
      tokenId,
      publicKey,
    )
    res.json(result)
  },
)
