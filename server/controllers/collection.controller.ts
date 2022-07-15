import express from 'express'
import { Collection } from '@server/models/collection.model'
// import redisClient from '@server/providers/redis'

export const getCollections = async (
  req: express.Request,
  res: express.Response,
) => {
  // const { collection } = req.body
  // const existCollection: string | null = await redisClient.get(collection)
  // if (existCollection) {
  //   return res.json(JSON.parse(existCollection))
  // }

  // @ts-ignore
  const { page, limit } = req.query

  const aggregate = Collection.aggregate()

  const options = {
    page: (page as unknown as number) || 1,
    limit: (limit as unknown as number) || 20,
  }

  const collectionDB = await Collection.aggregatePaginate(aggregate, options)
  res.json(collectionDB)
}

export const createCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  res.json()
  //
}
