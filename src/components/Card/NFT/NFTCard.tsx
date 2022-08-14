import React, { useCallback, useMemo, useState } from 'react'

import { BigNumberish, formatFixed } from '@ethersproject/bignumber'
import { CLKeyParameters, CLPublicKey } from 'casper-js-sdk'
import { useRouter } from 'next/router'
import styled from 'styled-components'

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
  const { buyToken, offerToken, sellToken } =
    useMarketplaceTransaction(contractHash)
  const router = useRouter()

  const handleOfferToken = useCallback(
    async (
      id: BigNumberish,
      amount: BigNumberish,
      payToken?: string,
      additionalRecipient?: CLKeyParameters,
    ) => {
      await offerToken(id, amount, payToken, additionalRecipient)
      hideOfferModal()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [offerToken],
  )

  const handleSellToken = useCallback(
    async (id: string, price: BigNumberish, payToken?: string | undefined) => {
      const preferPayToken = payToken?.startsWith('hash-')
        ? payToken
        : undefined
      await sellToken(id, price, preferPayToken)
      hideSellModal()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sellToken],
  )

  const [onPresentOfferModal, hideOfferModal] = useModal(
    <OfferTokenModal token={token} offerToken={handleOfferToken} />,
    true,
  )
  const [onPresentSellModal, hideSellModal] = useModal(
    <SellTokenModal token={token} sellToken={handleSellToken} />,
    true,
  )

  const handle = useCallback(async () => {
    try {
      if (currentAccount) {
        const currentAccountHash = CLPublicKey.fromHex(currentAccount)
          .toAccountHashStr()
          .slice(13)
        if (currentAccountHash === owner) {
          if (offers.find((o) => o.status === 'pending'))
            router.push(`/token/${token.collection.slug}/${token.id}`)
          return onPresentSellModal()
        }
      }
      if (listed && price) {
        return buyToken(token)
      }
      onPresentOfferModal()
    } catch (error: any) {
      console.error(error)
    }
  }, [
    token,
    currentAccount,
    listed,
    price,
    router,
    offers,
    owner,
    onPresentOfferModal,
    onPresentSellModal,
    buyToken,
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
        <StyledLink href={`/token/${slug}/${id}`}>Details</StyledLink>
      </Box>
      <SaleButton
        onClick={currentAccount ? handle : connect}
        text={currentAccount ? buttonText : 'Connect Wallet'}
      />
    </Wrapper>
  )
}

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${({ theme }) => theme.colors.primary};
`
