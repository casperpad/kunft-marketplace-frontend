import express from 'express'
import { query } from 'express-validator'
import { validateRequest } from '@server/middleware'
import { Collection } from '@server/models/collection.model'
import { Token } from '@server/models/token.model'
// import redisClient from '@server/providers/redis'

const router = express.Router()

router.get(
  '/:collection',
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
      const { collection } = req.params
      // const existResult: string | null = await redisClient.get(collection)
      // if (existResult) {
      //   return res.json(JSON.parse(existResult))
      // }
      // @ts-ignore
      const { page, limit } = req.query

      const collectionDB = await Collection.findOne({ slug: collection })

      if (collectionDB === null) throw Error(`Not exist ${collection}`)

      console.info(collectionDB._id)

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
    } catch (error: any) {
      console.error(error)
    }
  },
)

router.get('/:collection/:tokenId', async (req, res) => {
  try {
    const { collection, tokenId } = req.params
    // TODO REdis
    const collectionDB = await Collection.findOne({ slug: collection })
    if (collectionDB === null) throw Error(`Not exist ${collection}`)
    const token = await Token.findOne({
      collectionNFT: collectionDB._id,
      tokenId,
    }).populate('collectionNFT')
    // TODO return trading history
    res.json(token)
  } catch (error: any) {
    console.error(error)
  }
})

export default router
