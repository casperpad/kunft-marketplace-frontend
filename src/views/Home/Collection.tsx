import styled from 'styled-components'

import { Flex } from '@components/Box'
import { StyledButton } from '@components/Button'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const StyledLayout = styled(Layout)`
  display: none;
  ${({ theme }) => theme.mediaQueries.xl} {
    display: block;
  }
`

const Container = styled(Flex)`
  background: url('/assets/images/Collection.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 46px 33px 74px;
  font-size: 60px;
`

export default function Collection() {
  return (
    <StyledLayout>
      <Container>
        <Text color="background">ALL NFT COLLECTIONS</Text>
        <StyledButton text="Collections" />
      </Container>
    </StyledLayout>
  )
}
