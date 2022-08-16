import React from 'react'
import styled from 'styled-components'

import { ERC20 } from '@/types'

interface TokenSelectProps {
  tokens: ERC20[]
  value?: string
  onChange?: (contractHash: string) => void
}

export default function TokenSelect({
  tokens,
  value,
  onChange,
}: TokenSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e) => (onChange ? onChange(e.target.value) : undefined)}
    >
      {tokens.map((token) => (
        <option key={token.contractPackageHash} value={token.contractHash}>
          {token.symbol}
        </option>
      ))}
    </Select>
  )
}

const Select = styled.select`
  width: auto;
  height: 50px;
  background: transparent;
  color: gray;
  padding: 0px 10px;
  font-size: 14px;
  border: none;
  &:hover {
    cursor: pointer;
  }
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    padding: 3px;
    &:hover {
      cursor: pointer;
    }
  }
`
