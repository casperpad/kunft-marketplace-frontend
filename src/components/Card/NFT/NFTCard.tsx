import React, { useCallback, useEffect, useMemo } from 'react'

import { BigNumberish, formatFixed } from '@ethersproject/bignumber'
import {
  CLPublicKey,
  CLValueBuilder,
  decodeBase16,
  encodeBase16,
} from 'casper-js-sdk'
import NextLink from 'next/link'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { toast } from 'react-toastify'

import { Box, Flex } from '@/components/Box'
import { Text } from '@/components/Text'
import {
  NEXT_PUBLIC_CASPER_CHAIN_NAME,
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  contracts,
} from '@/config'
import {
  useCasperWeb3Provider,
  useCEP47,
  useFavoriteToken,
  useMarketplace,
} from '@/hooks'

import { Token } from '@/types'

import {
  StarsButton,
  SaleButton,
  StyledImage,
  Container,
  NameContainer,
  ValueContainer,
} from './NFTCard.styles'

export default function NFTCard({
  id,
  name,
  metadata,
  favoritedUsers,
  collection: { contractHash, image: collectionImage, slug },
  owner,
  pendingSale,
}: Token) {
  const { currentAccount, connect, getDeploy, signDeploy } =
    useCasperWeb3Provider()
  const { createSellOrder, buySellOrderCspr } = useMarketplace()
  const { approve, getAllowance } = useCEP47(contractHash)
  const { favoriteTokenMutation, data } = useFavoriteToken()

  const sellToken = useCallback(async () => {
    if (currentAccount === undefined) return

    toast.info('Checking allownace')
    let shouldApprove = true
    try {
      const allowance = await getAllowance(
        CLPublicKey.fromHex(currentAccount),
        id,
      )

      const parsedAllowance = CLValueBuilder.byteArray(
        decodeBase16(allowance.slice(13)),
      )
      const marketplaceContractPackageHash = CLValueBuilder.byteArray(
        decodeBase16(
          contracts.marketplace[
            NEXT_PUBLIC_CASPER_CHAIN_NAME
          ].contractPackageHash.slice(5),
        ),
      )
      shouldApprove =
        encodeBase16(parsedAllowance.data) !==
        encodeBase16(marketplaceContractPackageHash.data)
      // eslint-disable-next-line no-empty
    } catch (error: any) {}

    // Approve if allowance is incorrect
    if (shouldApprove) {
      toast.info('Approve request submitted.')
      const approveDeploy = await approve(
        CLValueBuilder.byteArray(
          decodeBase16(
            contracts.marketplace[
              NEXT_PUBLIC_CASPER_CHAIN_NAME
            ].contractPackageHash.slice(5),
          ),
        ),
        [id],
        '500000000',
        CLPublicKey.fromHex(currentAccount),
      )
      const signedApproveDeploy = await signDeploy(
        approveDeploy,
        currentAccount,
      )

      const arppoveDeployHash = await signedApproveDeploy.send(
        NEXT_PUBLIC_CASPER_NODE_ADDRESS,
      )

      const _ = await getDeploy(arppoveDeployHash)
    }

    const tokens = new Map<BigNumberish, BigNumberish>([[id, '1000000']])
    toast.info('Sign sell request transaction')
    const deployHash = await createSellOrder(
      Date.now(),
      contractHash,
      tokens,
      currentAccount!,
      '5000000000',
    )

    const _ = await getDeploy(deployHash)
  }, [
    approve,
    contractHash,
    createSellOrder,
    currentAccount,
    getAllowance,
    getDeploy,
    signDeploy,
    id,
  ])

  const buyToken = useCallback(async () => {
    //
    if (currentAccount === undefined || pendingSale === undefined) return
    const deployHash = await buySellOrderCspr(
      contractHash,
      id,
      pendingSale.price,
      '4500000000',
      currentAccount,
    )
    return deployHash
  }, [currentAccount, pendingSale, buySellOrderCspr, contractHash, id])

  const handle = useCallback(async () => {
    const deployHash = await sellToken()
    console.log(deployHash)
    const _ = await getDeploy(deployHash!)
  }, [getDeploy, buyToken, sellToken])

  const handleStarClick = useCallback(() => {
    if (!currentAccount) return
    favoriteTokenMutation({
      variables: {
        slug,
        tokenId: id,
        publicKey: currentAccount,
      },
    })
  }, [favoriteTokenMutation, slug, id, currentAccount])

  const userStarred = useMemo(() => {
    return true
  }, [])

  console.log(data)

  const buttonText = useMemo(() => {
    if (currentAccount) {
      const currentAccountHash = CLPublicKey.fromHex(currentAccount)
        .toAccountHashStr()
        .slice(13)
      if (currentAccountHash === owner) {
        if (pendingSale) return 'Cancel Listing'
        return 'Sell'
      }
    }
    if (pendingSale) return 'Buy Now'
    return 'Make Offer'
  }, [pendingSale, owner, currentAccount])
  const show = true

  return (
    <Container>
      <StyledImage
        src={metadata?.image || collectionImage || ''}
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
          <Flex flexDirection="row" alignItems="center">
            <StarsButton color="transparent" onClick={handleStarClick}>
              {userStarred ? <BsHeartFill /> : <BsHeart />}
            </StarsButton>
            <Text ml="4px" color="primary">
              {favoritedUsers.length}
            </Text>
          </Flex>
          <Text color="primary">
            {pendingSale
              ? parseFloat(formatFixed(pendingSale.price, 9)).toLocaleString()
              : 'Not Available'}
          </Text>
        </ValueContainer>
        <NextLink href={`/token/${slug}/${id}`}>Details</NextLink>
      </Box>
      {show && (
        <SaleButton
          onClick={currentAccount ? handle : connect}
          text={currentAccount ? buttonText : 'Connect Wallet'}
        />
      )}
    </Container>
  )
}
