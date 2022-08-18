import React, { useEffect, useState } from 'react'
import { formatFixed } from '@ethersproject/bignumber'
import Skeleton from 'react-loading-skeleton'
import styled from 'styled-components'
import { NATIVE_HASH } from '@/config'
import { useERC20 } from '@/hooks'

interface TokenProps {
  amount: string
  contractHash: string
  contractPackageHash?: string
}

export default function Token({ amount, contractHash }: TokenProps) {
  const [parsedAmount, setParsedAmount] = useState('')
  const { symbol, loading, decimals } = useERC20({ contractHash })

  useEffect(() => {
    if (contractHash === NATIVE_HASH) setParsedAmount(formatFixed(amount, 9))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (loading) return
    setParsedAmount(formatFixed(amount, decimals))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  if (loading && contractHash !== NATIVE_HASH) return <Skeleton width={50} />
  return <StyledToken>{`${parsedAmount} ${symbol || 'CSPR'}`}</StyledToken>
}

const StyledToken = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`
