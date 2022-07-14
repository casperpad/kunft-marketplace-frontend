import styled from 'styled-components'

import { Flex } from '@components/Box'
import { StyledButton } from '@components/Button'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

const CollectionButton = styled(StyledButton)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 25px;
  }
`

const Container = styled(Flex)`
  background: url('/assets/images/Home/Collection.png');
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 46px 33px 74px;
  font-size: 40px;
  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
  }
`

export default function Collection() {
  return (
    <Layout>
      <Container>
        <Text color="background">ALL NFT COLLECTIONS</Text>
        <CollectionButton text="Collections" />
      </Container>
    </Layout>
  )
}
