import React from 'react'
import Select from 'react-select'
import { ERC20 } from '@/types'

interface TokenSelectProps {
  tokens: ERC20[]
  value?: ERC20
  onChange?: (token: ERC20) => void
}

export default function TokenSelect({
  tokens,
  value,
  onChange,
}: TokenSelectProps) {
  return (
    <Select
      options={tokens}
      getOptionLabel={(t) => t.symbol}
      value={value}
      onChange={onChange}
    />
  )
}
