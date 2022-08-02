import React, { useCallback, useMemo } from 'react'
import { BigNumberish, formatFixed } from '@ethersproject/bignumber'
import {
  CLPublicKey,
  CLValueBuilder,
  decodeBase16,
  encodeBase16,
} from 'casper-js-sdk'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

import { Box, Flex } from '@/components/Box'
import { Text } from '@/components/Text'
import {
  NEXT_PUBLIC_CASPER_NODE_ADDRESS,
  NEXT_PUBLIC_MARKETPLACE_CONTRACT_PACKAGE_HASH,
} from '@/config/index'
import { useCasperWeb3Provider, useCEP47, useMarketplace } from '@/hooks/index'

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
  type,
  id,
  name,
  metadata,
  favoritedUsers,
  price,
  collection: { contractHash, image: collectionImage },
}: Token) {
  const buttonText = useMemo(() => {
    switch (type) {
      case 'NoneSale':
        return 'Make Offer'
      case 'Sale':
        return 'Buy Now'
      case 'Owned':
        return 'Sell'
      default:
        return `Unexpected ${type} type`
    }
  }, [type])
  const show = type !== 'NoneSale'
  const { currentAccount, connect, getDeploy, signDeploy } =
    useCasperWeb3Provider()
  const { createSellOrder, buySellOrderCspr } = useMarketplace()
  const { approve, getAllowance } = useCEP47(contractHash)

  const sellToken = useCallback(async () => {
    if (currentAccount === undefined) return

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
        decodeBase16(NEXT_PUBLIC_MARKETPLACE_CONTRACT_PACKAGE_HASH.slice(5)),
      )
      shouldApprove =
        encodeBase16(parsedAllowance.data) !==
        encodeBase16(marketplaceContractPackageHash.data)
      // eslint-disable-next-line no-empty
    } catch (error: any) {}

    // Approve if allowance is incorrect
    if (shouldApprove) {
      const approveDeploy = await approve(
        CLValueBuilder.byteArray(
          decodeBase16(NEXT_PUBLIC_MARKETPLACE_CONTRACT_PACKAGE_HASH.slice(5)),
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
    if (currentAccount === undefined || price === undefined) return
    const deployHash = await buySellOrderCspr(
      contractHash,
      id,
      price,
      '4500000000',
      currentAccount,
    )
    return deployHash
  }, [currentAccount, price, buySellOrderCspr, contractHash, id])

  const handle = useCallback(async () => {
    const deployHash = await buyToken()
    console.log(deployHash)
    const _ = await getDeploy(deployHash!)
  }, [getDeploy, buyToken])

  const handleStarClick = useCallback(() => {
    //
  }, [])

  const userStarred = useMemo(() => {
    return true
  }, [])

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
            {price
              ? parseFloat(formatFixed(price, 9)).toLocaleString()
              : 'Not Available'}
          </Text>
        </ValueContainer>
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
