import express from 'express'
import { authController } from '@server/controllers'
import { validate, auth } from '@server/middlewares'
import { authValidation } from '@server/validations'

const router = express.Router()

router.get('/check', auth, authController.checkAuth)

router.get('/:publicKey', authController.getNonce)

router.post('/signup', validate(authValidation.signUp), authController.signUp)

router.post('/signin', validate(authValidation.signIn), authController.signIn)

router.post('/signout', auth, authController.signOut)

export default router
