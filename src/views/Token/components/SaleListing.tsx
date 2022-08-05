import styled from 'styled-components'
import { Flex, StyledButton, Text } from '@/components'
import { Sale } from '@/types'
import { shortenHash } from '@/utils/hash'

import { Container, HeadTr, Td, TitleContainer } from './styles'

interface SaleListingProps {
  sales: Sale[]
}

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
`

function TableView({ sales }: SaleListingProps) {
  return (
    <StyledTable>
      <thead>
        <HeadTr>
          <Td>Price</Td>
          <Td>USDPrice</Td>
          <Td>Date</Td>
          <Td>From</Td>
          <Td> </Td>
        </HeadTr>
      </thead>
      <tbody>
        {sales
          .sort(
            (a, b) =>
              new Date(a.createdAt).getUTCMilliseconds() -
              new Date(b.createdAt).getUTCMilliseconds(),
          )
          .map((sale) => {
            return (
              <tr key={sale.startTime}>
                <Td>{sale.price}</Td>
                <Td>{sale.price}</Td>
                <Td>{new Date(sale.createdAt).toLocaleDateString('en-US')}</Td>
                <Td>{shortenHash(sale.creator)}</Td>
                <Td>
                  {sale.status === 'pending' ? (
                    <StyledButton
                      text="Buy Now"
                      link={false}
                      fontSize="20px"
                      height={44}
                    />
                  ) : (
                    ''
                  )}
                </Td>
              </tr>
            )
          })}
      </tbody>
    </StyledTable>
  )
}

export default function SaleListing({ sales }: SaleListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Sales Listings</Text>
      </TitleContainer>
      {sales.length > 0 ? (
        <TableView sales={sales} />
      ) : (
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
      )}
    </Container>
  )
}
