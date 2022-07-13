import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Flex)`
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 100%;
  font-family: 'Avenir';
`

const HeadTr = styled.tr`
  font-size: 15px;
`

const Td = styled.td`
  width: calc(100% / 3);
`

const TitleContainer = styled(Flex)`
  font-family: 'Avenir';
  font-size: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 70px;
  padding-left: 33px;
  align-items: center;
`

interface OfferListingProps {
  lists: string[]
}

function TableView({ lists }: { lists: string[] }) {
  if (lists.length) {
    return (
      <table>
        <thead>
          <HeadTr>
            <Td>Price</Td>
            <Td>USDPrice</Td>
            <Td>From</Td>
          </HeadTr>
        </thead>
      </table>
    )
  }
  return (
    <Flex margin="auto">
      <Text
        fontWeight={700}
        fontFamily="Avenir"
        fontSize="30px"
        color="disabled"
      >
        No Listings Available
      </Text>
    </Flex>
  )
}

export default function OfferListing({ lists = [] }: OfferListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Offers</Text>
      </TitleContainer>
      <TableView lists={lists} />
    </Container>
  )
}
