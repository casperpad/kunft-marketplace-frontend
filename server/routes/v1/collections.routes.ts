import express from 'express'
import { collectionController } from '@server/controllers'

const router = express.Router()

router.get('/', collectionController.getCollections)

router.post('/', collectionController.createCollection)

export default router
