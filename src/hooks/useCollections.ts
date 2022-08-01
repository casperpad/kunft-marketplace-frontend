import { useGetCollectionsQuery } from '@/graphql/queries/__generated__/collection.generated'

export default function useCollections(
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
