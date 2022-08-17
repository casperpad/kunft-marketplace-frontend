import { NextSeo } from 'next-seo'
import { Flex, Layout, Text } from '@/components'
import { meta } from '@/config'

export default function TopNFTs() {
  return (
    <Layout>
      <NextSeo
        title="Top NFTs"
        openGraph={{
          description: 'Explorer top NFTs on KUNFT Marketplace',
          site_name: meta.SITE_NAME,
        }}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Text fontSize="90px" textAlign="center">
          Coming Soon!
        </Text>
      </Flex>
    </Layout>
  )
}
