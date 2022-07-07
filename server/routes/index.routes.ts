import express from 'express'
import authRouter from './auth.routes'
import collectionsRouter from './collections.routes'
import corsRouter from './cors.routes'
import tokensRouter from './tokens.routes'

const appRouter = express.Router()

appRouter.use('/cors', corsRouter)
appRouter.use('/collections', collectionsRouter)
appRouter.use('/auth', authRouter)
appRouter.use('/tokens', tokensRouter)

export default appRouter
