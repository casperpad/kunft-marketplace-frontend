import React, { useCallback, useMemo, useRef, useState } from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { Image, useModal } from '@kunftmarketplace/uikit'
import { CLKeyParameters, CLPublicKey } from 'casper-js-sdk'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Box } from '@/components/Box'
import ERC20Balance from '@/components/ERC20Balance'
import { Text } from '@/components/Text'
import { NATIVE_HASH } from '@/config'
import {
  useCasperWeb3Provider,
  useMarketplaceTransaction,
  useWindowSize,
} from '@/hooks'
import { Token } from '@/types'
import { findAcceptableTokens } from '@/utils'

import FavoriteToken from '../../FavoriteToken'
import { OfferTokenModal, SellTokenModal } from '../../Modals'
import {
  SaleButton,
  Wrapper,
  NameContainer,
  ValueContainer,
} from './NFTCard.styles'

export default function NFTCard(_token: Token) {
  const [token, setToken] = useState<Token>(_token)
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width] = useWindowSize()

  const {
    id,
    name,
    metadata,
    collection: { contractHash, logo: collectionImage, slug },
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
            return router.push(`/token/${token.collection.slug}/${token.id}`)
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
        if (offers.find((o) => o.status === 'pending')) return 'Accept Offer'
        return 'Sell'
      }
    }
    if (listed) return 'Buy Now'
    return 'Make Offer'
  }, [listed, owner, offers, currentAccount])

  return (
    <Wrapper ref={ref}>
      <StyledLink
        href={`/token/${slug}/${id}`}
        onClick={(e) => {
          e.preventDefault()
          router.push(`/token/${slug}/${token.id}`)
        }}
      >
        <ImageWrapper>
          <StyledImage
            src={metadata?.image || metadata?.logo || collectionImage || ''}
            width={320}
            height={320}
            display="cover"
            alt={name}
          />
        </ImageWrapper>
      </StyledLink>

      <Box px="28px" py={[14, 17]}>
        <NameContainer>
          <Text fontFamily="Castle">{name}</Text>
        </NameContainer>
        <ValueContainer>
          <FavoriteToken token={token} setToken={setToken} />
          {price ? (
            <ERC20Balance
              token={findAcceptableTokens({
                contractHash: price.payToken
                  ? `hash-${price.payToken}`
                  : NATIVE_HASH,
              })}
              amount={price.price}
            />
          ) : null}
        </ValueContainer>
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
  &::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
`

const ImageWrapper = styled.div`
  border-radius: 10px 10px 0px 0px;
  position: relative;
  overflow: hidden;
  z-index: 1;
`
const StyledImage = styled(Image)`
  transition: all 1s;
  &:hover {
    transform: scale(1.15);
  }
`
