import { IResolvers } from '@graphql-tools/utils'
import { gql } from 'apollo-server-express'
import GraphQLDate from 'graphql-date'
// @ts-ignore
import GraphQLLong from 'graphql-type-long'
import { getTokens, getTokensOwnedBy } from '@server/services/token'

export const Token = gql`
  scalar Metadata
  scalar GraphQLDate
  scalar GraphQLLong

  type Sale {
    creator: String!
    price: String!
    payToken: String
    startTime: GraphQLLong!
    status: String!
    createdAt: GraphQLDate!
    updatedAt: GraphQLDate!
  }

  type Token {
    collectionNFT: Collection!
    tokenId: String!
    metadata: Metadata!
    favoritedUsers: [String!]
    viewed: Int!
    price: String
    listed: Boolean!
    sales: [Sale!]
  }

  type GetTokensResponse {
    tokens: [Token!]
    paginationInfo: PaginationInfo!
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
  GraphQLDate,
  GraphQLLong,
}
