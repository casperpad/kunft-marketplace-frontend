import styled from 'styled-components'

import { Flex, StyledButton, Layout, Text } from '@/components'

export default function Artist() {
  return (
    <StyledPage>
      <Flex flexDirection="column">
        <Title>ARE YOU AN ARTIST?</Title>
        <DataContainer>
          <Text className="text" color="textSecondary" fontFamily="Avenir">
            Our goal is to serve as a platform for NFT creators to exhibit their
            unique work, & to bridge between creatives and collectors. <br />
            Hop on board, push the boundaries and start creating!
          </Text>
          <StyledButton text="Create NFTs" minWidth="max-content" />
        </DataContainer>
      </Flex>
    </StyledPage>
  )
}

const Title = styled.h1`
  font-size: 30px;
  color: white;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 50px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 70px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 90px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 110px;
  }
`

const DataContainer = styled(Flex)`
  flex-direction: column;
  gap: 30px;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  font-size: 18px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
    margin-top: 50px;
    flex-direction: row;
    justify-content: space-between;
    .text {
      width: 67%;
    }
  }
`

const StyledPage = styled(Layout)`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
`
