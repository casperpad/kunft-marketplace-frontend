import { useGetCollectionsQuery } from '@graphql/queries/__generated__/collection.generated'

export default function useCollections(page: number, limit: number) {
  return useGetCollectionsQuery({
    variables: { page, limit },
  })
}
