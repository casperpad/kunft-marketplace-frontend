import { useCallback, useMemo } from 'react'
import { useGetCollectionsLazyQuery } from '@/graphql/queries/__generated__/collection.generated'
import { parseGetCollectionsResponse } from './useGetCollections'

export default function useGetCollectionsLazy() {
  const [getCollections, { data, ...others }] = useGetCollectionsLazyQuery()

  const parsed = useMemo(() => {
    return parseGetCollectionsResponse(data)
  }, [data])

  const fetchCollections = useCallback(
    async ({
      query,
      page,
      limit,
    }: {
      query?: string
      page?: number
      limit?: number
    }) => {
      const { data } = await getCollections({
        variables: { query, page, limit },
      })
      return parseGetCollectionsResponse(data)
    },
    [getCollections],
  )
  return {
    getCollections: fetchCollections,
    data: parsed.data,
    ...others,
  }
}
