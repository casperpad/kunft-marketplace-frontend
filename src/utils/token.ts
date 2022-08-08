import { Token } from '@/types'

export const isEqual = (a: Token, b: Token) =>
  a.collection.contractPackageHash === b.collection.contractPackageHash &&
  a.id === b.id
