import { useGetTokensLazyQuery } from '@/graphql/queries/__generated__/token.generated'
import { parseGetTokensResponse } from './useGetTokens'

export default function useGetTokensLazy() {
  const [getTokens, { data, error, loading }] = useGetTokensLazyQuery()

  const parsed = parseGetTokensResponse(data)

  return {
    getTokens,
    data: parsed.data,
    error,
    loading,
  }
}
