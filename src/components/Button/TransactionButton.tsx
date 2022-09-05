import React from 'react'
import { Button } from '@kunftmarketplace/uikit'
import { useCasperWeb3Provider } from '@/hooks'

interface TransactionButtonProps {
  title: string
  onClick?: any
  disabled?: boolean
}

export default function TransactionButton({
  title,
  onClick,
  disabled,
}: TransactionButtonProps) {
  const { connected, connect } = useCasperWeb3Provider()

  return (
    <Button
      onClick={connected ? onClick : connect}
      disabled={connected ? disabled : false}
    >
      {connected ? title : 'Connect Wallet'}
    </Button>
  )
}
