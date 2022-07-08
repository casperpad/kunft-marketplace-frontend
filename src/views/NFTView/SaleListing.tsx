import styled from 'styled-components'

import { Box } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  font-family: 'Avenir';
`

const HeadTr = styled.tr`
  font-size: 15px;
`

interface SaleListingProps {
  lists: string[]
}

export default function SaleListing({ lists = [] }: SaleListingProps) {
  return (
    <Container>
      <Text>Sales Listings</Text>
      <table>
        <thead>
          <HeadTr>
            <td>Price</td>
            <td>USDPrice</td>
            <td>Date</td>
            <td>From</td>
            <td> </td>
          </HeadTr>
        </thead>
        <tbody>
          {(lists.length && <tr>asdf</tr>) || (
            <Text fontFamily="Avenir" fontWeight={700}>
              No Listing Available
            </Text>
          )}
        </tbody>
      </table>
    </Container>
  )
}
