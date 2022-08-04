import { useFavoriteTokenMutation } from '@/graphql/queries/__generated__/token.generated'
import { asToken } from '@/types'

export default function useFavoriteToken() {
  const [favoriteTokenMutation, { data, loading, error }] =
    useFavoriteTokenMutation()
  return {
    favoriteTokenMutation,
    data:
      data && data.favoriteToken
        ? asToken(data.favoriteToken.token)
        : undefined,
    loading,
    error,
  }
}
