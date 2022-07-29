import { useGetTokensQuery } from '@graphql/queries/__generated__/token.generated'

export default function useTokens(slug: string, page: number, limit: number) {
  const { data, error, loading } = useGetTokensQuery({
    variables: { slug, page, limit },
  })
  return {
    data: data?.getTokens,
    error,
    loading,
  }
}
