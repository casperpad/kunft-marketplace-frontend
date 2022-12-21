import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GetServerSideProps } from 'next'
import Profile from '@/views/Profile'

export default Profile

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
  cache: new InMemoryCache(),
})

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params === undefined) return { props: {} }
    const { slug } = params

    const where = {} as any
    if (/^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(slug as string)) {
      where.publicKey = slug
    } else if (/^[0-9a-fA-F]{64}$/.test(slug as string)) {
      where.accountHash = slug
    } else {
      where.slug = slug
    }

    const { data } = await client.query({
      query: gql`
        query getUserInfo($where: GetUserInfo!) {
          getUserInfo(where: $where) {
            slug
            publicKey
            accountHash
            verified
            name
            avatar
            description
            ownedTokens
          }
        }
      `,
      variables: {
        where,
      },
    })

    const { __typename, ...user } = data.getUserInfo

    return {
      props: user,
    }
  } catch (e) {
    console.error(e)
    return {
      notFound: true,
    }
  }
}
