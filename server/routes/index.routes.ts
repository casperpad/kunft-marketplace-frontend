import express from 'express'
import authRouter from './auth.routes'
import collectionsRouter from './collections.routes'

const appRouter = express.Router()

appRouter.use('/collections', collectionsRouter)
appRouter.use('/auth', authRouter)

export default appRouter
