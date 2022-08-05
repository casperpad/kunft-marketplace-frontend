import React from 'react'
import { useCasperWeb3Provider } from '@/hooks'
import StyledButton from './StyledButton'

interface TransactionButtonProps {
  title: string
  onClick?: any
}

export default function TransactionButton({
  title,
  onClick,
}: TransactionButtonProps) {
  const { connected, connect } = useCasperWeb3Provider()

  return (
    <StyledButton
      text={title}
      link={false}
      fontSize="20px"
      height={44}
      onClick={connected ? onClick : connect}
    />
  )
}
