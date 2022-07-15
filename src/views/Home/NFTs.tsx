import styled from 'styled-components'

import { Box, Grid } from '@components/Box'
import { NFTCard } from '@components/Card/NFT'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const Title = styled(Text)`
  font-size: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 60px;
  }
`

const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 20px;
  margin-bottom: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
    margin-bottom: 60px;
  }
`

const Container = styled(Grid)`
  grid-template-columns: repeat(1, 1fr);

  grid-column-gap: 20px;
  grid-row-gap: 80px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  }
`

interface NFTsProps {
  nfts: string[]
}

export default function NFTs(props: NFTsProps) {
  const { nfts } = props

  return (
    <Layout mt="60px">
      <Box>
        <Title>COLLECTION XYZ</Title>
        <Description>
          This is a short and brief description about the featured collection.
        </Description>
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
