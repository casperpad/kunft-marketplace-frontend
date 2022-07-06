import styled from 'styled-components'

import { Flex } from '@components/Box'
import { StyledButton } from '@components/Button'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const StyledPage = styled(Layout)`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  position: relative;
  left: 0;
`

export default function Artist() {
  return (
    <StyledPage>
      <Flex flexDirection="column">
        <Text fontSize="90px" color="textSecondary">
          ARE YOU AN ARTIST?
        </Text>
        <Flex justifyContent="space-between" mt="50px" alignItems="center">
          <Text
            fontFamily="Avenir"
            fontSize="28px"
            width="75%"
            color="textSecondary"
          >
            Our goal is to serve as a platform for NFT creators to exhibit their
            unique work, & to bridge between creatives and collectors. <br />
            Hop on board, push the boundaries and start creating!
          </Text>
          <StyledButton text="Create NFTs" />
        </Flex>
      </Flex>
    </StyledPage>
  )
}
