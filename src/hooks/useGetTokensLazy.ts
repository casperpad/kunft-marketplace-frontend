import { useCallback, useMemo } from 'react'
import { useGetTokensLazyQuery } from '@/graphql/queries/__generated__/token.generated'
import { parseGetTokensResponse, GetTokensInput } from './useGetTokens'

export default function useGetTokensLazy() {
  const [getTokens, { data, ...others }] = useGetTokensLazyQuery()

  const parsed = useMemo(() => {
    return parseGetTokensResponse(data)
  }, [data])

  const fetchTokens = useCallback(
    async (where: GetTokensInput, page?: number, limit?: number) => {
      const { data } = await getTokens({ variables: { where, page, limit } })
      return parseGetTokensResponse(data)
    },
    [getTokens],
  )

  return {
    getTokens: fetchTokens,
    data: parsed.data,
    ...others,
  }
}
