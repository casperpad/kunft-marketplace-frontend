import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import morgan from 'morgan'
import next from 'next'
import responseTime from 'response-time'

import { MONGODB_URL, PORT, SENTRY_DSN, NODE_ENV } from '@server/config'
import redisClient from '@server/providers/redis'
import serverRouter from '@server/routes/index.routes'
import {
  startMarketplaceEventStream,
  // startCEP47EventStream,
} from './web3/event'

const dev = NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()
async function startServer() {
  await mongoose.connect(MONGODB_URL).then(() => {
    console.info(`Connected to ${MONGODB_URL}`)
  })

  await redisClient.connect()
  await app.prepare()

  const server = express()

  // Global rate limiter
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // limit each IP to 1000 requests per minute
  })

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

  server.use(compression())
  server.use(cors({ origin: '*' }))
  server.use(express.json({ limit: '25mb' }))
  server.use(express.urlencoded({ limit: '25mb', extended: true }))
  server.use(cookieParser())
  server.use(morgan('dev'))
  server.use(limiter)
  server.use(responseTime())

  server.use('/api', serverRouter)
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.use(Sentry.Handlers.errorHandler())

  server.listen(PORT, () => {
    startMarketplaceEventStream()
    // startCEP47EventStream()
    console.info(`Server is running on ${PORT}`)
  })
}

startServer()
