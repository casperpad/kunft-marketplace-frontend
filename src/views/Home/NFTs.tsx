import styled from 'styled-components'

import { Box, Grid } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const Container = styled(Grid)`
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`

interface NFTsProps {
  nfts: string[]
}

export default function NFTs(props: NFTsProps) {
  const { nfts } = props

  return (
    <Layout mt="60px">
      <Box>
        <Text fontSize="60px">COLLECTION XYZ</Text>
        <Text fontFamily="Avenir" fontSize="28px" mb="70px">
          This is a short and brief description about the featured collection.
        </Text>
        <Container>
          {nfts.map((nft) => {
            return (
              <NFTCard
                key={nft}
                type={
                  Math.random() > 0.5
                    ? Math.random() > 0.5
                      ? 'Sale'
                      : 'NoneSale'
                    : 'Upcoming'
                }
                image={nft}
                name="KUNFT"
                price={Math.random() * 10000}
                stars={Math.floor(Math.random() * 100)}
                userStarred={Math.random() > 0.5}
              />
            )
          })}
        </Container>
      </Box>
    </Layout>
  )
}
