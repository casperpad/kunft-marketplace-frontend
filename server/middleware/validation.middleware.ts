import express from 'express'
import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

export const validateRequest = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: result.array() })
  }
  next()
}
