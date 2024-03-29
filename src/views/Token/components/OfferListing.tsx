import { useCallback, useEffect, useState } from 'react'
import { CLAccountHash, CLPublicKey, decodeBase16 } from 'casper-js-sdk'
import {
  Address,
  Flex,
  Text,
  TransactionButton,
  ERC20Balance,
} from '@/components'
import { NATIVE_HASH } from '@/config'
import {
  useCasperWeb3Provider,
  useCEP47,
  useMarketplaceTransaction,
} from '@/hooks'
import { Token } from '@/types'
import { findAcceptableTokens } from '@/utils'

import { Container, StyledTable, TitleContainer } from './styles'

interface OfferListingProps {
  token: Token
}

function TableView({ token: { collection, offers, id } }: OfferListingProps) {
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const { currentAccount } = useCasperWeb3Provider()
  const { acceptOffer, cancelOffer } = useMarketplaceTransaction(
    collection.contractHash,
  )
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
          <tr>
            <td>Price</td>
            <td>USDPrice</td>
            <td>From</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => {
            const isCreator = currentAccount
              ? offer.creator ===
                CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13)
              : false
            return (
              <tr key={offer.startTime}>
                <td>
                  <ERC20Balance
                    token={findAcceptableTokens({
                      contractHash: offer.payToken
                        ? `hash-${offer.payToken}`
                        : NATIVE_HASH,
                    })}
                    amount={offer.price}
                  />
                </td>
                <td>-</td>
                <td>
                  <Address address={offer.creator} />
                </td>
                <td>
                  {loading ? (
                    'Loading'
                  ) : offer.status === 'pending' ? (
                    isOwner ? (
                      <TransactionButton
                        title="Accept Offer"
                        onClick={() => accept(offer.creator)}
                      />
                    ) : isCreator ? (
                      <TransactionButton
                        title="Cancel Offer"
                        onClick={() => cancelOffer(id)}
                      />
                    ) : null
                  ) : null}
                </td>
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
