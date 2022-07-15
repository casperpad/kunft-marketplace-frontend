import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { Container, Td, HeadTr, TitleContainer } from './styles'

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
