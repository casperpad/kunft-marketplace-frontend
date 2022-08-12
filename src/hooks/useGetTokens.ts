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
  const { data, error, loading } = useGetTokensQuery({
    variables: { where, page, limit },
  })

  const parsed = parseGetTokensResponse(data)

  return {
    data: parsed.data,
    error,
    loading,
  }
}
