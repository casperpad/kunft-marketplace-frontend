import { Box, Flex } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

interface CollectionsProps {
  collections: string[]
}

export default function Collections(props: CollectionsProps) {
  const { collections } = props

  return (
    <Layout mt="60px">
      <Box>
        <Text fontSize="60px">COLLECTION XYZ</Text>
        <Text fontFamily="Avenir" fontSize="28px" mb="70px">
          This is a short and brief description about the featured collection.
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="space-around"
          flexWrap="wrap"
          width="100%"
        >
          {collections.map((collection) => {
            return (
              <NFTCard
                key={collection}
                type={
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? 'Sale'
                      : 'NoneSale'
                    : 'Upcoming'
                }
                image={collection}
                name="KUNFT"
                price={Math.random() * 10000}
                stars={Math.floor(Math.random() * 100)}
                userStarred={Math.random() > 0.5}
              />
            )
          })}
        </Flex>
      </Box>
    </Layout>
  )
}
