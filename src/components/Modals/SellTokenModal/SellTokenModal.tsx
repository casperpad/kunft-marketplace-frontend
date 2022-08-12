import React from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import { Token } from '@/types'
import { Modal, InjectedModalProps } from '../Modal'

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
      <Sell token={token} sellToken={sellToken} />
    </Modal>
  )
}
