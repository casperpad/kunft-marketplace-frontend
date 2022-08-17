import { useMemo } from 'react'
import clone from 'lodash/clone'
import forIn from 'lodash/forIn'
import {
  useGetTokensQuery,
  GetTokensQuery,
} from '@/graphql/queries/__generated__/token.generated'
import { asPaginationInfo } from '@/types/PaginationInfo'
import { asToken } from '@/types/Token'

interface MetadataInput {
  [key: string]: string[]
}

export interface GetTokensInput {
  slug?: string
  owner?: string
  promoted?: boolean
  listed?: boolean
  metadata?: MetadataInput
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
  if (where.listed) {
    if (typeof where.listed === 'string') where.listed = where.listed === 'true'
  }

  const preferWhere = clone(where)

  forIn(where, (value, key) => {
    if (key.startsWith('metadata_')) {
      // @ts-ignore
      preferWhere.metadata = {
        ...preferWhere.metadata,
        [key.split('_')[1]]: value,
      }
      // @ts-ignore
      delete preferWhere[key]
    }
  })

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
