import React from 'react'
import { gql } from '@apollo/client'
import { CEP47Client } from 'casper-cep47-js-client'
import { GetStaticProps, GetStaticPaths } from 'next'

import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
} from '@/config'
import { client } from '../../../Providers'

export default function Token(props: { slug: string; tokenId: string }) {
  console.log(props)
  return <div>sadfasdfasdfsadf</div>
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params === undefined) return { props: {} }
    const { slug, tokenId } = params
    console.log(params)
    const { data } = await client.query({
      query: gql`
        query getTokens($where: GetTokensInput!, $page: Int, $limit: Int) {
          getTokens(where: $where, page: $page, limit: $limit) {
            tokens {
              metadata
              favoritedUsers
              viewed
              price
              listed
              sales {
                creator
                price
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
    console.dir(data.getTokens.tokens, { depth: null })
    return { props: {} }
  } catch (error: any) {
    console.dir(error, { depth: null })
    return {
      notFound: true,
    }
    // console.dir(error.networkError?.result, { depth: null })
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      {
        getCollectionSlugs {
          data {
            slug
            contractHash
          }
        }
      }
    `,
  })
  const slugs: { slug: string; contractHash: string }[] =
    data.getCollectionSlugs.data.map(
      ({ slug, contractHash }: { slug: string; contractHash: string }) => {
        return { slug, contractHash }
      },
    )

  const paths: {
    params: {
      slug: string
      tokenId: string
    }
  }[] = []
  await Promise.all(
    slugs.map(async ({ slug, contractHash }) => {
      const cep47Client = new CEP47Client(
        NEXT_PUBLIC_CASPER_NODE_ADDRESS!,
        NEXT_PUBLIC_CASPER_CHAIN_NAME!,
      )
      const preferContractHash = contractHash.startsWith('hash-')
        ? contractHash
        : `hash-${contractHash}`
      cep47Client.setContractHash(preferContractHash)
      const totalSupply = await cep47Client.totalSupply()
      let i = 0
      for (i = 0; i < totalSupply; i++) {
        paths.push({
          params: { slug, tokenId: i.toString() },
        })
      }
    }),
  )
  return {
    paths,
    fallback: false,
  }
}
