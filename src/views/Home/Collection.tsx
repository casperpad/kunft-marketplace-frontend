import { BiChevronRight } from 'react-icons/bi'
import styled from 'styled-components'

import { Flex, Link } from '@/components'

const CollectionButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  border-radius: 50px;
  font-size: 25px;
  z-index: 3;
  padding: 1rem 1.5rem;
  transition: 300ms all;
  &:hover {
    color: black;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    svg {
      transition: 300ms all;
      transform: translateX(20%);
    }
  }
`

const Container = styled(Flex)`
  background: url('/images/Home/Collection.png');
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
      <CollectionButton href="/explorer-collections">
        Collections
        <BiChevronRight />
      </CollectionButton>
    </Container>
  )
}

const Title = styled.h2`
  font-size: 40px;
  color: white;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 60px;
  }
`
