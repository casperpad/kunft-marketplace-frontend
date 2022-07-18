import express from 'express'
import { Collection } from '@server/models/collection.model'
import { Token } from '@server/models/token.model'

export const getTokens = async (
  req: express.Request,
  res: express.Response,
) => {
  const { collection } = req.params
  // const existResult: string | null = await redisClient.get(collection)
  // if (existResult) {
  //   return res.json(JSON.parse(existResult))
  // }
  // @ts-ignore
  const { page, limit } = req.query

  const collectionDB = await Collection.findOne({ slug: collection })

  if (collectionDB === null) throw Error(`Not exist ${collection}`)

  const aggregate = Token.aggregate([
    {
      $match: {
        collectionNFT: collectionDB._id,
      },
    },
  ])

  const options = {
    page: (page as unknown as number) || 1,
    limit: (limit as unknown as number) || 20,
  }

  const result = await Token.aggregatePaginate(aggregate, options)

  // await redisClient.set(collection, JSON.stringify(collectionDB))
  // await setAsync(collection, 3600, JSON.stringify(collectionDB))
  res.json(result)
}
