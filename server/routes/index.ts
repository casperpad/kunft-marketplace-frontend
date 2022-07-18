import compression from 'compression'
import express from 'express'

import v1Router from './v1'

const router = express.Router()

router.use(compression())
router.use('/v1', v1Router)

export default router
