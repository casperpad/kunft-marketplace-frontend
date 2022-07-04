import * as redis from 'redis'
import { REDIS_URL } from '@server/config'

// create redis redisClient
const redisClient = redis.createClient({
  url: REDIS_URL,
})

redisClient.on('connect', () => {
  console.log(`Redis connected : ${REDIS_URL}`)
})

export default redisClient
