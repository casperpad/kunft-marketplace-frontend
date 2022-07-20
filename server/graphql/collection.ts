import { IResolvers } from '@graphql-tools/utils'
import { gql } from 'apollo-server-express'
import { getCollections, getCollectionSlugs } from '@server/services/collection'

export const Collection = gql`
  #
  type Collection {
    contractPackageHash: String!
    contractHash: String!
    slug: String!
    name: String!
    symbol: String!
    description: String
    verified: Boolean!
    promoted: Boolean!
    image: String
    twitter: String
    discord: String
  }

  type PaginationInfo {
    total: Int!
    limit: Int!
    currentPage: Int!
    totalPages: Int!
    pageCounter: Int!
    hasPrev: Boolean!
    hasNext: Boolean!
    prevPage: Boolean!
    nextPage: Int!
  }

  type GetCollectionsResponse {
    collections: [Collection]
    paginationInfo: PaginationInfo
  }

  type Slug {
    slug: String!
  }

  type GetCollectionSlugsResponse {
    slugs: [Slug!]
  }

  type Query {
    getCollections(
      query: String!
      page: Int!
      limit: Int!
    ): GetCollectionsResponse
    getCollectionSlugs: GetCollectionSlugsResponse
  }

  type Mutation {
    addCollection(
      contractPackageHash: String!
      contractHash: String!
      slug: String
      symbol: String!
      name: String!
      description: String
      verified: Boolean!
      promoted: Boolean
      image: String
      twitter: String
      discord: String
    ): Collection
  }
`

export const collectionResolver: IResolvers = {
  Query: {
    async getCollections(_, args, __, ___) {
      const { query, page, limit } = args
      return await getCollections(query, page, limit)
    },
    async getCollectionSlugs(_, __, ___, ____) {
      const slugs = await getCollectionSlugs()
      return { slugs }
    },
  },
  Mutation: {
    addCollection: async () => {
      return {}
    },
  },
}
