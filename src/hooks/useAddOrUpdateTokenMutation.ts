import { useAddOrUpdateTokenMutation as _useAddOrUpdateTokenMutation } from '@/graphql/queries/__generated__/token.generated'
import { asToken } from '@/types/Token'

export default function useAddOrUpdateTokenMutation() {
  const [addOrUpdateTokenMutation, { data, loading, error }] =
    _useAddOrUpdateTokenMutation()

  return {
    addOrUpdateTokenMutation,
    data: data && data.addToken ? asToken(data.addToken.token) : undefined,
    loading,
    error,
  }
}
