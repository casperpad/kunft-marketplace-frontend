import { useGetTokensLazyQuery } from '@/graphql/queries/__generated__/token.generated'
import { asToken, asPaginationInfo } from '@/types'

export default function useGetTokensLazy() {
  const [getTokens, { data, error, loading }] = useGetTokensLazyQuery()

  return {
    getTokens,
    data:
      data && data.getTokens
        ? {
            tokens: data.getTokens.tokens!.map(asToken),
            paginationInfo: asPaginationInfo(data.getTokens.paginationInfo),
          }
        : undefined,
    error,
    loading,
  }
}
