import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { Container, HeadTr, Td, TitleContainer } from './styles'

interface SaleListingProps {
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
            <Td>Date</Td>
            <Td>From</Td>
            <Td> </Td>
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

export default function SaleListing({ lists = [] }: SaleListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Sales Listings</Text>
      </TitleContainer>
      <TableView lists={lists} />
    </Container>
  )
}
