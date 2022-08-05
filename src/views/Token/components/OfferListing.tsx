import { Flex, Text } from '@/components'
import { Offer } from '@/types'
import { shortenHash } from '@/utils/hash'
import { Container, StyledTable, Td, HeadTr, TitleContainer } from './styles'

interface OfferListingProps {
  offers: Offer[]
}

function TableView({ offers }: OfferListingProps) {
  if (offers.length) {
    return (
      <StyledTable>
        <thead>
          <HeadTr>
            <Td>Price</Td>
            <Td>USDPrice</Td>
            <Td>From</Td>
          </HeadTr>
        </thead>
        <tbody>
          {offers.map((offer) => {
            return (
              <tr key={offer.startTime}>
                <Td>{offer.price}</Td>
                <Td>{offer.price}</Td>
                <Td>{shortenHash(offer.creator)}</Td>
              </tr>
            )
          })}
        </tbody>
      </StyledTable>
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

export default function OfferListing({ offers }: OfferListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Offers</Text>
      </TitleContainer>
      <TableView offers={offers} />
    </Container>
  )
}
