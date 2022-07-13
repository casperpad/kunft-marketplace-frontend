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
  width: calc(100% / 5);
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
