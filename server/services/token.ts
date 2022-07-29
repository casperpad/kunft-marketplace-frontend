import { CEP47Client } from 'casper-cep47-js-client'
import { CLPublicKey } from 'casper-js-sdk'
import { StatusCodes } from 'http-status-codes'

import { Token, Collection, User } from '@server/models'
import { ApiError } from '@server/utils'
import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '../config'
import { addCollection } from './collection'

interface GetTokensInput {
  slug?: string
  owner?: string
}

export const getTokens = async ({
  where,
  page = 1,
  limit = 20,
}: {
  where: GetTokensInput
  page?: number
  limit?: number
}) => {
  const { slug, owner } = where
  let collectionNFTId: string | undefined
  const matchQuery = {} as any
  if (slug) {
    const collectionDB = await Collection.findOne({ slug })

    if (collectionDB === null) throw Error(`Not exist ${slug}`)

    matchQuery.collectionNFT = collectionDB._id
  }

  const aggregate = Token.aggregate([
    {
      $match: {
        ...matchQuery,
        owner,
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
    // {
    //   $addFields: {
    //     result: {
    //       $eq: [
    //         {
    //           $let: {
    //             vars: {
    //               sales: '$sales',
    //             },
    //             in: '$$sales.status',
    //           },
    //         },
    //         'pending',
    //       ],
    //     },
    //   },
    // },
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

export const addToken = async (
  contractPackageHash: string,
  contractHash: string,
  tokenId: string,
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
  const owner = (await cep47Client.getOwnerOf(tokenId)).slice(13)
  const token = await Token.findOneAndUpdate(
    { collectionNFT, tokenId },
    {
      collectionNFT,
      tokenId,
      metadata,
      owner,
    },
    {
      upsert: true,
    },
  )

  return token
}
