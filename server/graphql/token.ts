import { IResolvers } from '@graphql-tools/utils'
import { gql } from 'apollo-server-express'
import { getTokens, getTokensOwnedBy } from '@server/services/token'

export const Token = gql`
  scalar Metadata

  type Token {
    collectionNFT: Collection!
    tokenId: String!
    metadata: Metadata
    favoritedUsers: [String]
    viewed: Int!
  }

  type GetTokensResponse {
    tokens: [Token!]
    paginationInfo: PaginationInfo
  }

  type Query {
    getTokens(slug: String!, page: Int!, limit: Int!): GetTokensResponse
    getTokensOwnedBy(owner: String!, page: Int!, limit: Int!): GetTokensResponse
  }
`
export const tokenResolver: IResolvers = {
  Query: {
    async getTokens(_, args, __, ___) {
      const { slug, page, limit } = args
      return await getTokens(slug, page, limit)
    },
    async getTokensOwnedBy(_, args, __, ___) {
      const { owner, page, limit } = args
      return await getTokensOwnedBy(owner, page, limit)
    },
  },
}
