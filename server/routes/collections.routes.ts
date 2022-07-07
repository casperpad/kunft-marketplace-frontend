import express from 'express'
import { Collection } from '@server/models/collection.model'
import { Token } from '@server/models/token.model'
// import redisClient from '@server/providers/redis'

const router = express.Router()

router.get('/:collection', async (req, res) => {
  try {
    const { collection } = req.params
    // const existCollection: string | null = await redisClient.get(collection)
    // if (existCollection) {
    //   return res.json(JSON.parse(existCollection))
    // }
    const collectionDB = await Collection.findOne({ slug: collection })

    if (collectionDB === null) throw Error(`Not exist ${collection}`)

    console.info(collectionDB._id)

    const token = await Token.find({
      collectionNFT: collectionDB._id,
    })

    // await redisClient.set(collection, JSON.stringify(collectionDB))
    // await setAsync(collection, 3600, JSON.stringify(collectionDB))
    res.json(token)
  } catch (error: any) {
    console.error(error)
  }
})

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
    res.json(token)
  } catch (error: any) {
    console.error(error)
  }
})

export default router
