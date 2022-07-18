import { Collection } from '@server/models/collection.model'

export const getCollections = async (page: number, limit: number) => {
  const aggregate = Collection.aggregate([
    {
      $project: {
        _id: 0,
        __v: 0,
      },
    },
  ])

  const customLabels = {
    totalDocs: 'total',
    docs: 'collections',
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

  const result = await Collection.aggregatePaginate(aggregate, options)
  return result
}
