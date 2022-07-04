import express from 'express'
import redisClient from '@server/providers/redis'
import Collection from '@server/schema/collection.model'

const router = express.Router()

router.get('/:collection', async (req, res) => {
  const { collection } = req.params
  const existCollection: string | null = await redisClient.get(collection)
  if (existCollection) {
    return res.json(JSON.parse(existCollection))
  }
  const collectionDB = await Collection.findOne({ slug: collection })
  console.info(collectionDB)
  await redisClient.set(collection, JSON.stringify(collectionDB))
  // await setAsync(collection, 3600, JSON.stringify(collectionDB))
  res.json(collectionDB)
})

export default router
