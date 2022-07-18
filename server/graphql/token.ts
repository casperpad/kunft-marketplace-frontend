import { IResolvers } from '@graphql-tools/utils'
import { gql } from 'apollo-server-express'
import { getTokens } from '@server/services/token'

export const Token = gql`
  scalar Metadata

  type Token {
    collectionNFT: Collection!
    tokenId: String!
    metadata: Metadata
    favoritedUsers: [String]
    viewd: Int!
  }

  type GetTokensResponse {
    tokens: [Token!]
    paginationInfo: PaginationInfo
  }

  type Query {
    getTokens(slug: String!, page: Int!, limit: Int!): GetTokensResponse
  }
`
export const tokenResolver: IResolvers = {
  Query: {
    async getTokens(_, args, __, ___) {
      const { slug, page, limit } = args
      return await getTokens(slug, page, limit)
    },
  },
}
