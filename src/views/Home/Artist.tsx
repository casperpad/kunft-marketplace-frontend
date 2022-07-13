import styled from 'styled-components'

import { Flex } from '@components/Box'
import { StyledButton } from '@components/Button'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const Title = styled(Text)`
  font-size: 70px;
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 90px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 110px;
  }
`

const DataContainer = styled(Flex)`
  justify-content: space-between;
  margin-top: 50px;
  align-items: center;
  font-size: 28px;
`

const StyledPage = styled(Layout)`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  position: relative;
  left: 0;
`

export default function Artist() {
  return (
    <StyledPage>
      <Flex flexDirection="column">
        <Title color="textSecondary">ARE YOU AN ARTIST?</Title>
        <DataContainer>
          <Text width="70%" color="textSecondary" fontFamily="Avenir">
            Our goal is to serve as a platform for NFT creators to exhibit their
            unique work, & to bridge between creatives and collectors. <br />
            Hop on board, push the boundaries and start creating!
          </Text>
          <StyledButton text="Create NFTs" />
        </DataContainer>
      </Flex>
    </StyledPage>
  )
}
