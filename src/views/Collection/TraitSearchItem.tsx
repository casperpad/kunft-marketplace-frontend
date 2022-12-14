import React, { useState } from 'react'

import { Input } from '@kunftmarketplace/uikit'
import capitalize from 'lodash/capitalize'
import { useRouter } from 'next/router'
import { Flex, Text, CheckboxItem } from '@/components'

export interface TraitSearchItemProps {
  trait: string
  total: number
  distinctValues: {
    value: string
    count: number
    percent: number
  }[]
  onClick?: (trait: string, value: string) => void
}

export default function TraitSearchItem({
  trait,
  distinctValues,
  onClick,
}: TraitSearchItemProps) {
  const [keyword, setKeyword] = useState('')
  const router = useRouter()
  const valueChecked = (value: string) => {
    let selectedTraitValues = router.query[`metadata_${trait}`]
    selectedTraitValues =
      typeof selectedTraitValues === 'string'
        ? [selectedTraitValues]
        : selectedTraitValues
    if (selectedTraitValues && selectedTraitValues.some((v) => v === value))
      return true
    return false
  }

  return (
    <Flex
      gap={6}
      flexDirection="column"
      background="#f2f2f2"
      py="4px"
      px="8px"
      borderRadius={6}
    >
      <Text fontSize={16}>{capitalize(trait)}</Text>
      <Input
        scale="sm"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Flex gap={4} flexDirection="column">
        {trait !== 'image' &&
          distinctValues
            .filter((distinctValue) => {
              if (keyword.length > 0)
                return distinctValue.value
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              return true
            })
            .map(({ value, percent }) => (
              <Flex key={value} justifyContent="space-between" width="100%">
                <CheckboxItem
                  name={trait}
                  text={`${value}`}
                  checked={valueChecked(value)}
                  onChange={() => onClick?.(trait, value)}
                />
                <Text fontSize={12}>{(percent * 100).toFixed(2)}%</Text>
              </Flex>
            ))}
      </Flex>
    </Flex>
  )
}
