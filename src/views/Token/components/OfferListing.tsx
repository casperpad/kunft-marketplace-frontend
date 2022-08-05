import { useCallback, useEffect, useState } from 'react'
import { CLAccountHash, CLPublicKey, decodeBase16 } from 'casper-js-sdk'
import { Flex, Text, TransactionButton } from '@/components'
import {
  useCasperWeb3Provider,
  useCEP47,
  useMarketplaceTransaction,
} from '@/hooks'
import { Token } from '@/types'
import { shortenHash } from '@/utils/hash'

import { Container, StyledTable, Td, HeadTr, TitleContainer } from './styles'

interface OfferListingProps {
  token: Token
}

function TableView({ token: { collection, offers, id } }: OfferListingProps) {
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentAccount } = useCasperWeb3Provider()
  const { acceptOffer } = useMarketplaceTransaction(collection.contractHash)
  const { getOwnerOf } = useCEP47(collection.contractHash)
  const accept = useCallback(
    async (bidder: string) => {
      const _ = await acceptOffer(id, new CLAccountHash(decodeBase16(bidder)))
    },
    [acceptOffer, id],
  )

  useEffect(() => {
    async function fetchData() {
      if (offers.length > 0 && currentAccount) {
        const owner = await getOwnerOf(id)
        if (CLPublicKey.fromHex(currentAccount).toAccountHashStr() === owner)
          setIsOwner(true)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
    fetchData()
  }, [offers.length, currentAccount, getOwnerOf, id])

  if (offers.length) {
    return (
      <StyledTable>
        <thead>
          <HeadTr>
            <Td>Price</Td>
            <Td>USDPrice</Td>
            <Td>From</Td>
            <Td />
          </HeadTr>
        </thead>
        <tbody>
          {offers.map((offer) => {
            return (
              <tr key={offer.startTime}>
                <Td>{offer.price}</Td>
                <Td>{offer.price}</Td>
                <Td>{shortenHash(offer.creator)}</Td>
                {loading ? (
                  <Td>Loading</Td>
                ) : (
                  <Td>
                    {offer.status === 'pending' && isOwner ? (
                      <TransactionButton
                        title="Accept Offer"
                        onClick={() => accept(offer.creator)}
                      />
                    ) : null}
                  </Td>
                )}
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

export default function OfferListing({ token }: OfferListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Offers</Text>
      </TitleContainer>
      <TableView token={token} />
    </Container>
  )
}
