import React from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { Modal, InjectedModalProps } from '@kunftmarketplace/uikit'
import { CLKeyParameters } from 'casper-js-sdk'
import { Token } from '@/types'
import { Flex } from '../../Box'

import Offer from './Offer'

interface OfferTokenModalProps extends InjectedModalProps {
  token: Token
  offerToken: (
    tokenId: BigNumberish,
    amount: BigNumberish,
    payToken?: string,
    additionalRecipient?: CLKeyParameters,
  ) => Promise<void>
}

export default function OfferTokenModal({
  token,
  offerToken,
  ...props
}: OfferTokenModalProps) {
  return (
    <Modal title={`Offer ${token.name} Token`} {...props}>
      <Flex flexDirection="column" gap={12} my={4}>
        The smart contract will hold the offer amount until it is either
        accepted by the NFT owner or it expires.
        <Offer token={token} offerToken={offerToken} />
      </Flex>
    </Modal>
  )
}
