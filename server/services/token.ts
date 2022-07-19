import { CEP47Client } from 'casper-cep47-js-client'
import { StatusCodes } from 'http-status-codes'

import { Token, Collection, User } from '@server/models'
import { ApiError } from '@server/utils'
import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '../config'
import { addCollection } from './collection'

export const getTokens = async (
  collection: string,
  page: number,
  limit: number,
) => {
  const collectionDB = await Collection.findOne({ slug: collection })

  if (collectionDB === null) throw Error(`Not exist ${collection}`)

  const aggregate = Token.aggregate([
    {
      $match: {
        collectionNFT: collectionDB._id,
      },
    },
    {
      $lookup: {
        from: 'sales',
        localField: '_id',
        foreignField: 'token',
        as: 'sales',
        pipeline: [
          {
            $project: {
              _id: 0,
              __v: 0,
              token: 0,
            },
          },
        ],
      },
    },
    {
      $set: {
        price: '1000000',
      },
    },
    {
      $set: {
        listed: true,
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ])

  const customLabels = {
    totalDocs: 'total',
    docs: 'tokens',
    limit: 'limit',
    page: 'currentPage',
    nextPage: 'nextPage',
    prevPage: 'prevPage',
    totalPages: 'totalPages',
    hasPrevPage: 'hasPrev',
    hasNextPage: 'hasNext',
    pagingCounter: 'pageCounter',
    meta: 'paginationInfo',
  }
  const options = {
    page,
    limit,
    customLabels,
  }

  const result = await Token.aggregatePaginate(aggregate, options)

  return result
}

export const getTokensOwnedBy = async (
  owner: string,
  page: number,
  limit: number,
) => {
  const user = await User.findOne({ publicKey: owner }).populate({
    path: 'tokens',
    populate: { path: 'collectionNFT', model: 'Collection' },
  })
  // .populate({ path: 'tokens.collectionNFT' })
  if (user === null) throw new ApiError(StatusCodes.NOT_FOUND, `Not exist user`)
  return { tokens: user.tokens }
}

export const addToken = async (
  contractPackageHash: string,
  contractHash: string,
  tokenId: string,
  owner?: string,
) => {
  let collectionNFT = await Collection.findOne({ contractPackageHash })
  if (collectionNFT === null) {
    collectionNFT = await addCollection(
      contractPackageHash,
      contractHash,
      false,
      false,
    )
  }

  const cep47Client = new CEP47Client(
    NEXT_PUBLIC_CASPER_NODE_ADDRESS!,
    NEXT_PUBLIC_CASPER_CHAIN_NAME!,
  )
  cep47Client.setContractHash(`hash-${contractHash}`)
  const metadata = await cep47Client.getTokenMeta(tokenId)
  const token = new Token({
    collectionNFT,
    tokenId,
    metadata,
  })
  await token.save()
  if (owner) {
    const tokenOwner = await cep47Client.getOwnerOf(tokenId)
    console.log(tokenOwner, owner)

    if (tokenOwner.endsWith(owner)) {
      const user = await User.findOne({ publicKey: owner })
      if (user === null)
        throw new ApiError(StatusCodes.NOT_FOUND, `Not exist user`)
      if (!user.tokens.includes(token._id)) {
        user.tokens.push(token._id)
        await user.save()
      } else {
        throw new ApiError(StatusCodes.CONFLICT, `Already added token`)
      }
    } else {
      throw new ApiError(StatusCodes.NOT_ACCEPTABLE, `Not token owner`)
    }
  }
  return token
}
