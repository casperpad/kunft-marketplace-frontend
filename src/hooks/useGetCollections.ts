import {
  GetCollectionsQuery,
  useGetCollectionsQuery,
} from '@/graphql/queries/__generated__/collection.generated'
import { asCollection, asPaginationInfo } from '@/types'

export const parseGetCollectionsResponse = (data?: GetCollectionsQuery) => ({
  data:
    data && data.getCollections
      ? {
          collections: data.getCollections.collections!.map(asCollection),
          paginationInfo: asPaginationInfo(data.getCollections.paginationInfo),
        }
      : undefined,
})

export default function useGetCollections(
  query: string,
  page: number,
  limit: number,
) {
  const { data, error, loading } = useGetCollectionsQuery({
    variables: { query, page, limit },
  })
  return {
    data: data?.getCollections,
    error,
    loading,
  }
}
