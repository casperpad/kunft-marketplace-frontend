import express from 'express'
import { getCollections as _getCollections } from '@server/services/collection'
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
  const { query, page, limit } = req.query
  const collectionDB = await _getCollections(query, page, limit)
  res.json(collectionDB)
}

export const createCollection = async (
  req: express.Request,
  res: express.Response,
) => {
  res.json()
  //
}
