import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { CEP47Client } from 'casper-cep47-js-client'
import { GetStaticProps, GetServerSideProps } from 'next'

import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '@/config'
import { asToken } from '@/types'
import TokenViews from '@/views/Token'
// import { client } from '../../../Providers'

export default TokenViews

export const client = new ApolloClient({
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
                image
                verified
                promoted
              }
              tokenId
              metadata
              favoritedUsers
              viewed
              owner
              pendingSale {
                creator
                price
                payToken
                startTime
                status
                createdAt
              }
              sales {
                creator
                price
                payToken
                startTime
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await client.query({
//     query: gql`
//       {
//         getCollectionSlugs {
//           data {
//             slug
//             contractHash
//           }
//         }
//       }
//     `,
//   })
//   const slugs: { slug: string; contractHash: string }[] =
//     data.getCollectionSlugs.data.map(
//       ({ slug, contractHash }: { slug: string; contractHash: string }) => {
//         return { slug, contractHash }
//       },
//     )

//   const paths: {
//     params: {
//       slug: string
//       tokenId: string
//     }
//   }[] = []
//   await Promise.all(
//     slugs.map(async ({ slug, contractHash }) => {
//       const cep47Client = new CEP47Client(
//         NEXT_PUBLIC_CASPER_NODE_ADDRESS!,
//         NEXT_PUBLIC_CASPER_CHAIN_NAME!,
//       )
//       const preferContractHash = contractHash.startsWith('hash-')
//         ? contractHash
//         : `hash-${contractHash}`
//       cep47Client.setContractHash(preferContractHash)
//       const totalSupply = await cep47Client.totalSupply()
//       let i = 0
//       for (i = 0; i < totalSupply; i++) {
//         paths.push({
//           params: { slug, tokenId: i.toString() },
//         })
//       }
//     }),
//   )
//   return {
//     paths,
//     fallback: false,
//   }
// }
