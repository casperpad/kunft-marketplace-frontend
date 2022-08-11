import React from 'react'
import { Token } from '@/types'
import { Modal, InjectedModalProps } from '../Modal'

import Sell from './Sell'

interface SellTokenModalProps extends InjectedModalProps {
  token: Token
}

export default function SellTokenModal({
  token,
  ...props
}: SellTokenModalProps) {
  return (
    <Modal title={`Sell ${token.name}`} {...props}>
      <Sell token={token} />
    </Modal>
  )
}
