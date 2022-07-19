import express from 'express'
import { getTokens as _getTokens } from '@server/services/token'

export const getTokens = async (
  req: express.Request,
  res: express.Response,
) => {
  const { collection } = req.params
  const { page, limit } = req.query

  const tokens = await _getTokens(collection, 1, 20)
  res.json(tokens)
}
