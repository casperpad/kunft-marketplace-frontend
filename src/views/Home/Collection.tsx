import styled from 'styled-components'

import { Flex, StyledButton } from '@/components'

const CollectionButton = styled(StyledButton)`
  font-size: 20px;

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 25px;
  }
`

const Container = styled(Flex)`
  background: url('/assets/images/Home/Collection.png');
  background-size: 300% 100%;
  background-position-x: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 24px 0px;
  /* padding: 40px 0px 33px; */
  font-size: 35px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: space-between;
    font-size: 60px;
    padding: 40px 46px 33px 74px;
    background-size: 200% 100%;
    background-position-x: 50%;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    background-size: 100% 100%;
    background-position-x: 0;
  }
`

export default function Collection() {
  return (
    <Container>
      <Title>ALL NFT COLLECTIONS</Title>
      <CollectionButton text="Collections" />
    </Container>
  )
}

const Title = styled.h1`
  font-size: 40px;
  color: white;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 60px;
  }
`
