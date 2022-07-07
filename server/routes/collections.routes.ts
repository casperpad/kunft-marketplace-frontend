import express from 'express'
import { query } from 'express-validator'
import { validateRequest } from '@server/middleware'
import { Collection } from '@server/models/collection.model'

// import redisClient from '@server/providers/redis'

const router = express.Router()

router.get(
  '/',
  query('name').isString().optional(),
  query('page')
    .isNumeric({ no_symbols: true })
    .custom((value) => value > 0)
    .optional(),
  query('limit')
    .isNumeric({ no_symbols: true })
    .custom((value) => value > 0)
    .optional(),
  validateRequest,

  async (req, res) => {
    try {
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

      const collectionDB = await Collection.aggregatePaginate(
        aggregate,
        options,
      )
      res.json(collectionDB)
    } catch (error: any) {
      console.error(error)
    }
  },
)

export default router
