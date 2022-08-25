import React from 'react'
import { BigNumberish, formatFixed } from '@ethersproject/bignumber'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { ERC20 } from '@/types'
import { getERC20Logo } from '@/utils'

interface ERC20BalanceProps {
  amount: BigNumberish
  token: ERC20
}

export default function ERC20Balance({ amount, token }: ERC20BalanceProps) {
  if (token === undefined) return <Skeleton width={50} />
  const { symbol, decimals, contractPackageHash } = token
  return (
    <StyledERC20Balance>
      <StyledLogo
        src={getERC20Logo(contractPackageHash)}
        width={32}
        height={32}
      />
      {`${formatFixed(amount, decimals)} ${symbol}`}
    </StyledERC20Balance>
  )
}

const StyledERC20Balance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  justify-content: center;
  gap: 4px;
`

const StyledLogo = styled(Image)`
  border-radius: 50%;
`
