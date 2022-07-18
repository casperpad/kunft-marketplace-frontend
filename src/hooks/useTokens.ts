import { useGetTokensQuery } from '@graphql/queries/__generated__/token.generated'

export default function useTokens(slug: string, page: number, limit: number) {
  return useGetTokensQuery({ variables: { slug, page, limit } })
}
