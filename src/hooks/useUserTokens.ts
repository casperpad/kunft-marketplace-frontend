import { useGetTokensOwnedByQuery } from '@graphql/queries/__generated__/token.generated'

export default function useUserTokens(
  publicKey: string,
  page: number,
  limit: number,
) {
  return useGetTokensOwnedByQuery({
    variables: { owner: publicKey, page, limit },
  })
}
