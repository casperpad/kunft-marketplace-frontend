import { useFavoriteTokenMutation } from '@/graphql/queries/__generated__/token.generated'

export default function useFavoriteToken() {
  const [favoriteTokenMutation, { data, loading, error }] =
    useFavoriteTokenMutation()
  return {
    favoriteTokenMutation,
    data,
    loading,
    error,
  }
}
