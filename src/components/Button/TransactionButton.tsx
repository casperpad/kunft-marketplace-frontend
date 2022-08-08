import React from 'react'
import { useCasperWeb3Provider } from '@/hooks'
import StyledButton from './StyledButton'

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
    <StyledButton
      text={connected ? title : 'Connect Wallet'}
      link={false}
      fontSize="20px"
      height={44}
      onClick={connected ? onClick : connect}
      disabled={disabled}
    />
  )
}
