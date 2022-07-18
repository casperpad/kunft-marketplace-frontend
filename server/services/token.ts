import { Collection } from '@server/models/collection.model'
import { Token } from '@server/models/token.model'

export const getTokens = async (
  collection: string,
  page: number,
  limit: number,
) => {
  const collectionDB = await Collection.findOne({ slug: collection })

  if (collectionDB === null) throw Error(`Not exist ${collection}`)

  const aggregate = Token.aggregate([
    {
      $match: {
        collectionNFT: collectionDB._id,
      },
    },
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ])

  const customLabels = {
    totalDocs: 'total',
    docs: 'tokens',
    limit: 'limit',
    page: 'currentPage',
    nextPage: 'nextPage',
    prevPage: 'prevPage',
    totalPages: 'totalPages',
    hasPrevPage: 'hasPrev',
    hasNextPage: 'hasNext',
    pagingCounter: 'pageCounter',
    meta: 'paginationInfo',
  }
  const options = {
    page,
    limit,
    customLabels,
  }

  const result = await Token.aggregatePaginate(aggregate, options)
  return result
}
