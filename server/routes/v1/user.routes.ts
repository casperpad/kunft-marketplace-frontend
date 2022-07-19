import express from 'express'
import { addToken } from '@server/controllers/user.controller'
import { validate, auth } from '@server/middlewares'
import { userValidation } from '@server/validations'

const router = express.Router()

router.post('/add-token', auth, validate(userValidation.addToken), addToken)

export default router
