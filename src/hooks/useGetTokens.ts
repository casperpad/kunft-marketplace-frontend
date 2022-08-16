import { useMemo } from 'react'
import {
  useGetTokensQuery,
  GetTokensQuery,
} from '@/graphql/queries/__generated__/token.generated'
import { asPaginationInfo } from '@/types/PaginationInfo'
import { asToken } from '@/types/Token'

interface MetadataInput {
  key: string
  values: string[]
}

export interface GetTokensInput {
  slug?: string
  owner?: string
  promoted?: boolean
  listed?: boolean
  metadata?: MetadataInput[]
}

export const parseGetTokensResponse = (data?: GetTokensQuery) => ({
  data:
    data && data.getTokens
      ? {
          tokens: data.getTokens.tokens!.map(asToken),
          paginationInfo: asPaginationInfo(data.getTokens.paginationInfo),
        }
      : undefined,
})

export default function useGetTokens(
  where: GetTokensInput,
  page?: number,
  limit?: number,
) {
  const { data, error, loading, refetch } = useGetTokensQuery({
    variables: { where, page, limit },
  })

  const parsed = useMemo(() => {
    return parseGetTokensResponse(data)
  }, [data])

  return {
    refetch,
    data: parsed.data,
    error,
    loading,
  }
}
