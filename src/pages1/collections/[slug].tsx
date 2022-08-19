import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import Collection from '@/views/Collection'
// import { client } from '../../Providers'

export default Collection

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params === undefined) return { props: {} }
    const { slug } = params

    const { data } = await client.query({
      query: gql`
        query getCollections($query: String!, $page: Int!, $limit: Int!) {
          getCollections(query: $query, page: $page, limit: $limit) {
            collections {
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
          }
        }
      `,
      variables: {
        query: slug,
        page: 1,
        limit: 20,
      },
    })

    return { props: { collection: data?.getCollections?.collections[0] } }
  } catch (error: any) {
    console.error(error, { depth: null })
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        {
          getCollectionSlugs {
            data {
              slug
            }
          }
        }
      `,
    })
    const paths = data.getCollectionSlugs.data.map((slug: { slug: string }) => {
      return { params: slug }
    })
    return {
      paths,
      fallback: false,
    }
  } catch (error: any) {
    console.error(error, { depth: null })
    return {
      paths: [],
      fallback: false,
    }
  }
}
