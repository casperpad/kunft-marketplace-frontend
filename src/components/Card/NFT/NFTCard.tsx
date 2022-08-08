import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { formatFixed } from '@ethersproject/bignumber'
import { CLPublicKey } from 'casper-js-sdk'
import NextLink from 'next/link'
import { toast } from 'react-toastify'

import { Box } from '@/components/Box'
import { Text } from '@/components/Text'
import {
  useAddOrUpdateTokenMutation,
  useCasperWeb3Provider,
  useCEP47,
  useMarketplaceTransaction,
} from '@/hooks'
import { Token } from '@/types'

import FavoriteToken from '../../FavoriteToken'
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
  const { buyToken, sellToken, offerToken } =
    useMarketplaceTransaction(contractHash)
  const { getOwnerOf } = useCEP47(contractHash)

  const {
    addOrUpdateTokenMutation,
    data: addOrUpdateTokenMutationData,
    loading: addOrUpdateTokenMutationLoading,
  } = useAddOrUpdateTokenMutation()

  const handle = useCallback(async () => {
    try {
      const _owner = await getOwnerOf(id)
      // DB data is outdated
      if (owner !== _owner.slice(13)) {
        toast.error('Invalid token')
        await addOrUpdateTokenMutation({
          variables: { contractHash, tokenId: id },
        })
        return
      }
      if (currentAccount) {
        const currentAccountHash = CLPublicKey.fromHex(currentAccount)
          .toAccountHashStr()
          .slice(13)
        if (currentAccountHash === owner) {
          // if (pendingSale) return 'Cancel Listing'
          return sellToken(id)
        }
      }
      if (listed && price) return buyToken(id, price.price)
      return offerToken(id, '2000000000')
    } catch (error: any) {
      console.error(error)
    }
  }, [
    currentAccount,
    listed,
    buyToken,
    getOwnerOf,
    id,
    price,
    addOrUpdateTokenMutation,
    contractHash,
    owner,
    sellToken,
    offerToken,
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

  useEffect(() => {
    if (addOrUpdateTokenMutationLoading || !addOrUpdateTokenMutationData) return
    setToken(addOrUpdateTokenMutationData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOrUpdateTokenMutationLoading])

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
