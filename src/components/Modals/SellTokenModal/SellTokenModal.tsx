import React from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { Modal, InjectedModalProps } from '@kunftmarketplace/uikit'
import { Token } from '@/types'

import { Flex } from '../../Box'
import Sell from './Sell'

interface SellTokenModalProps extends InjectedModalProps {
  token: Token
  sellToken: (
    id: string,
    price: BigNumberish,
    payToken?: string | undefined,
  ) => Promise<void>
}

export default function SellTokenModal({
  token,
  sellToken,
  ...props
}: SellTokenModalProps) {
  return (
    <Modal title={`Sell ${token.name}`} {...props}>
      <Flex flexDirection="column" gap={12} my={4}>
        <Sell token={token} sellToken={sellToken} />
      </Flex>
    </Modal>
  )
}
