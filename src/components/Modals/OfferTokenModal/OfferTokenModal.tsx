import React from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { Token } from '@/types'
import { Flex } from '../../Box'
import { Modal, InjectedModalProps } from '../Modal'

import Offer from './Offer'

interface OfferTokenModalProps extends InjectedModalProps {
  token: Token
  offerToken: (id: string, amount: BigNumberish) => Promise<void>
}

export default function OfferTokenModal({
  token,
  offerToken,
  ...props
}: OfferTokenModalProps) {
  return (
    <Modal title={`Offer ${token.name} Token`} {...props}>
      <Flex flexDirection="column" gap={8}>
        The smart contract will hold the offer amount until it is either
        accepted by the NFT owner or it expires.
        <Offer token={token} offerToken={offerToken} />
      </Flex>
    </Modal>
  )
}
