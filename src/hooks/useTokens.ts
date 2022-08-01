import { useGetTokensQuery } from '@/graphql/queries/__generated__/token.generated'

interface GetTokensInput {
  slug?: string
  owner?: string
}

export default function useTokens(
  where: GetTokensInput,
  page?: number,
  limit?: number,
) {
  const { data, error, loading } = useGetTokensQuery({
    variables: { where, page, limit },
  })
  return {
    data: data?.getTokens,
    error,
    loading,
  }
}
