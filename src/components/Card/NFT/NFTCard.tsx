import React, { useCallback, useMemo, useState } from 'react'

import { formatFixed } from '@ethersproject/bignumber'
import { CLPublicKey } from 'casper-js-sdk'
import NextLink from 'next/link'

import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import {
  useCasperWeb3Provider,
  useMarketplaceTransaction,
  useModal,
} from '@/hooks'
import { Token } from '@/types'

import FavoriteToken from '../../FavoriteToken'
import { OfferTokenModal, SellTokenModal } from '../../Modals'
import {
  SaleButton,
  StyledImage,
  Wrapper,
  NameContainer,
  ValueContainer,
} from './NFTCard.styles'

export default function NFTCard(_token: Token) {
  const [token, setToken] = useState<Token>(_token)

  const {
    id,
    name,
    metadata,
    collection: { contractHash, image: collectionImage, slug },
    owner,
    listed,
    price,
    offers,
  } = token
  const { currentAccount, connect } = useCasperWeb3Provider()
  const { buyToken } = useMarketplaceTransaction(contractHash)

  const [onPresentOfferModal] = useModal(
    <OfferTokenModal token={token} />,
    true,
  )
  const [onPresentSellModal] = useModal(<SellTokenModal token={token} />, true)

  const handle = useCallback(async () => {
    try {
      if (currentAccount) {
        const currentAccountHash = CLPublicKey.fromHex(currentAccount)
          .toAccountHashStr()
          .slice(13)
        if (currentAccountHash === owner) {
          // if (pendingSale) return 'Cancel Listing'
          return onPresentSellModal()
        }
      }
      if (listed && price) {
        return buyToken(token)
      }
      // return offerToken(id, '2000000000')
      onPresentOfferModal()
    } catch (error: any) {
      console.error(error)
    }
  }, [
    currentAccount,
    listed,
    price,
    onPresentOfferModal,
    owner,
    onPresentSellModal,
    buyToken,
    token,
  ])

  const buttonText = useMemo(() => {
    if (currentAccount) {
      const currentAccountHash = CLPublicKey.fromHex(currentAccount)
        .toAccountHashStr()
        .slice(13)
      if (currentAccountHash === owner) {
        if (offers.find((o) => o.status === 'pending')) return 'Accep Offer'
        return 'Sell'
      }
    }
    if (listed) return 'Buy Now'
    return 'Make Offer'
  }, [listed, owner, offers, currentAccount])

  return (
    <Wrapper>
      <StyledImage
        src={metadata?.image || metadata?.logo || collectionImage || ''}
        width={320}
        height={320}
        layout="responsive"
        alt={name}
      />
      <Box px="28px" py={[14, 17]}>
        <NameContainer>
          <Text fontFamily="Castle">{name}</Text>
          <Text>Price</Text>
        </NameContainer>
        <ValueContainer>
          <FavoriteToken token={token} setToken={setToken} />
          <Text color="primary">
            {price
              ? parseFloat(formatFixed(price.price, 9)).toLocaleString()
              : 'Not Available'}
          </Text>
        </ValueContainer>
        <NextLink href={`/token/${slug}/${id}`}>Details</NextLink>
      </Box>
      <SaleButton
        onClick={currentAccount ? handle : connect}
        text={currentAccount ? buttonText : 'Connect Wallet'}
      />
    </Wrapper>
  )
}
