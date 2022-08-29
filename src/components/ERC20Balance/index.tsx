import React from 'react'
import { BigNumberish, formatFixed } from '@ethersproject/bignumber'
import { Image, useTooltip } from '@kunftmarketplace/uikit'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { NATIVE_HASH } from '@/config'
import { ERC20 } from '@/types'
import { getERC20Logo } from '@/utils'
import Address from '../Address'

interface ERC20BalanceProps {
  amount: BigNumberish
  token: ERC20
}

export default function ERC20Balance({ amount, token }: ERC20BalanceProps) {
  const { decimals, contractPackageHash } = token
  const { targetRef: targetRefFineTuned, tooltip: tooltipFineTuned } =
    useTooltip(
      <Address
        address={token.contractHash}
        showTooltip={false}
        variant="secondary"
      />,
      {
        placement: 'top',
      },
    )
  if (token === undefined) return <Skeleton width={50} />
  return (
    <StyledERC20Balance ref={targetRefFineTuned}>
      <StyledLogo
        src={getERC20Logo(contractPackageHash)}
        width={32}
        height={32}
      />
      {`${formatFixed(amount, decimals)}`}
      {contractPackageHash !== NATIVE_HASH && tooltipFineTuned}
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
