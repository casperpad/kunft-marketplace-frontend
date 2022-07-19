import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'

import { Collection, collectionResolver } from './collection'
import { Token, tokenResolver } from './token'

export const resolvers = mergeResolvers([collectionResolver, tokenResolver])
export const typeDefs = mergeTypeDefs([Collection, Token])
