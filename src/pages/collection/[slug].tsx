import { gql } from '@apollo/client'
import { GetStaticProps, GetStaticPaths } from 'next'
import Collection from '@views/Collection'
import { client } from '../../Providers'

export default Collection

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) return { props: {} }
  const { slug } = params

  return { props: { hello: `slug-${slug}` } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({
    query: gql`
      {
        getCollectionSlugs {
          slugs {
            slug
          }
        }
      }
    `,
  })
  const paths = data.getCollectionSlugs.slugs.map((slug: { slug: string }) => {
    return { params: slug }
  })
  return {
    paths,
    fallback: false,
  }
}
