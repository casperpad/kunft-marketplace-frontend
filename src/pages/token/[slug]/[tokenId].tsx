import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetServerSideProps } from 'next'

import { asToken } from '@/types'
import TokenViews from '@/views/Token'

export default TokenViews

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params === undefined) return { props: {} }
    const { slug, tokenId } = params

    const { data } = await client.query({
      query: gql`
        query getTokens($where: GetTokensInput!, $page: Int, $limit: Int) {
          getTokens(where: $where, page: $page, limit: $limit) {
            tokens {
              collection {
                contractPackageHash
                contractHash
                name
                description
                symbol
                slug
                logo
                background
                verified
                promoted
              }
              tokenId
              metadata
              favoritedUsers
              viewed
              owner
              listed
              price {
                price
                payToken
              }
              sales {
                creator
                price
                payToken
                startTime
                status
                createdAt
              }
              offers {
                creator
                payToken
                price
                startTime
                owner
                additionalRecipient
                status
                createdAt
              }
            }
          }
        }
      `,
      variables: {
        where: {
          slug,
          tokenId,
        },
      },
    })
    // Removes undefined fields
    return {
      props: {
        token: JSON.parse(JSON.stringify(asToken(data.getTokens.tokens[0]))),
      },
    }
  } catch (error: any) {
    console.error(error, { depth: null })
    return {
      notFound: true,
    }
    // console.dir(error.networkError?.result, { depth: null })
  }
}
