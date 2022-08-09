import React from 'react'
import styled from 'styled-components'
import { useCasperWeb3Provider } from '@/hooks'
import { Button } from './Button'

interface TransactionButtonProps {
  title: string
  onClick?: any
  disabled?: boolean
}

const StyledButton = styled(Button)`
  border-radius: 50px;
  font-weight: 400;
  font-size: inherit;
  color: black;
  padding: 5px 15px;
`

export default function TransactionButton({
  title,
  onClick,
  disabled,
}: TransactionButtonProps) {
  const { connected, connect } = useCasperWeb3Provider()

  return (
    <StyledButton
      fontSize="20px"
      onClick={connected ? onClick : connect}
      disabled={connected ? disabled : false}
    >
      {connected ? title : 'Connect Wallet'}
    </StyledButton>
  )
}
