import { PaginationFieldsFragment } from '@/graphql/queries/__generated__/collection.generated'

export interface PaginationInfo {
  currentPage: number
  hasNext: boolean
  hasPrev: boolean
  limit: number
  total: number
  totalPages: number
}

export const asPaginationInfo = ({
  __typename,
  ...props
}: PaginationFieldsFragment): PaginationInfo => ({
  ...props,
})
