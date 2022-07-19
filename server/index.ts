import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'

import mongoose from 'mongoose'
import morgan from 'morgan'
import next from 'next'
import responseTime from 'response-time'

import { MONGODB_URL, PORT, SENTRY_DSN, APP_ENV } from '@server/config'
import { typeDefs, resolvers } from '@server/graphql'
import redisClient from '@server/providers/redis'
import apiRouter from '@server/routes'
import { authLimiter } from './middlewares'
import {
  startMarketplaceEventStream,
  // startCEP47EventStream,
} from './web3/event'

const dev = APP_ENV === 'development'
const app = next({ dev })

const handle = app.getRequestHandler()
async function startServer() {
  await mongoose.connect(MONGODB_URL).then(() => {
    console.info(`Connected to ${MONGODB_URL}`)
  })

  await redisClient.connect()
  await app.prepare().catch((err) => console.error(err))

  const server = express()

  if (SENTRY_DSN)
    Sentry.init({
      dsn: SENTRY_DSN,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: server }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })

  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  server.use(Sentry.Handlers.requestHandler())
  // TracingHandler creates a trace for every incoming request
  server.use(Sentry.Handlers.tracingHandler())

  // server.use(compression())
  server.use(cors())
  server.use(express.json({ limit: '25mb' }))
  server.use(express.urlencoded({ limit: '25mb', extended: true }))
  server.use(cookieParser())
  server.use(morgan('dev'))

  server.use(responseTime())

  // limit repeated failed requests to auth endpoints
  if (APP_ENV !== 'development') {
    server.use('/api/v1/auth', authLimiter)
  }

  server.use('/api', apiRouter)

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  })
  await apolloServer.start()
  apolloServer.applyMiddleware({
    app: server,
    path: '/api/graphql',
  })
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use(Sentry.Handlers.errorHandler())

  server.listen(PORT, () => {
    try {
      startMarketplaceEventStream()
    } catch (err: any) {
      console.error(`***Marketplace EventStream Error***`)
      console.error(err)
      console.error(`*** ***`)
    }
    // startCEP47EventStream()
    console.info(`Server is running on ${PORT}`)
  })
}

startServer()
