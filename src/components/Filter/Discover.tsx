import { useState, useCallback } from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'
import { Box, Flex, BoxProps } from '@/components/Box'
import { CheckboxItem } from '@/components/Checkbox'
import { RangeSlider } from '@/components/Slider'
import { Text } from '@/components/Text'
import { acceptableTokens } from '@/config'
import TokenSelect from '../TokenSelect'

interface FilterProps extends BoxProps {
  min?: number
  max?: number
  step?: number
}

export default function Filter({
  min = 0,
  max = 50000,
  step = 10,
  ...props
}: FilterProps) {
  const router = useRouter()
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)
  const [payToken, setPayToken] = useState(acceptableTokens[1].contractHash)

  const handleChange = useCallback((value: any) => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [])

  const handleTrait = useCallback(
    (key: string, value: string) => {
      let trait = router.query[key]

      trait =
        trait === undefined ? [] : typeof trait === 'string' ? [trait] : trait

      const newTrait = trait.includes(value)
        ? trait.filter((v) => v !== value)
        : [...trait, value]

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [key]: newTrait },
        },
        undefined,
        { shallow: true },
      )
    },
    [router],
  )

  const handleCheck = useCallback(
    (field: string, value: boolean) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [field]: value ? 'true' : 'false' },
        },
        undefined,
        { shallow: true },
      )
    },
    [router],
  )

  const fieldSelected = (field: string) => {
    const fieldValue = router.query[field]
    if (fieldValue !== undefined && fieldValue === 'true') return true
    return false
  }

  const traitSelected = (trait: string, value: string) => {
    const fieldValue = router.query[trait]

    if (fieldValue !== undefined) {
      if (typeof fieldValue === 'string' && fieldValue === value) return true
      if (typeof fieldValue !== 'string' && fieldValue.find((v) => v === value))
        return true
    }
    return false
  }

  return (
    <Container {...props}>
      <Text fontFamily="Castle" fontSize="27px">
        FILTER
      </Text>
      <Flex flexDirection="column" mt="20px">
        <Box>
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Status
          </Text>
          <CheckboxContainer>
            <CheckboxItem
              text="For Sale"
              name="listed"
              checked={fieldSelected('listed')}
              onChange={(e) => handleCheck(e.target.name, e.target.checked)}
            />
            <CheckboxItem text="On Auction" disabled />
          </CheckboxContainer>
        </Box>
        <Box mt="10px">
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Rarity
          </Text>
          <CheckboxContainer>
            <CheckboxItem
              name="rarity"
              text="Common"
              value="common"
              onChange={(e) => handleTrait(e.target.name, e.target.value)}
              checked={traitSelected('rarity', 'common')}
            />
            <CheckboxItem
              name="rarity"
              value="semi-rare"
              text="Semi-Rare"
              onChange={(e) => handleTrait(e.target.name, e.target.value)}
              checked={traitSelected('rarity', 'semi-rare')}
            />
            <CheckboxItem
              name="rarity"
              value="rare"
              text="Rare"
              onChange={(e) => handleTrait(e.target.name, e.target.value)}
              checked={traitSelected('rarity', 'rare')}
            />
          </CheckboxContainer>
        </Box>
        <Box mt="10px">
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Price
          </Text>
          <Flex mt="12px">
            <TokenSelect
              tokens={acceptableTokens}
              value={payToken}
              onChange={setPayToken}
            />
            <PriceText>{minValue}</PriceText>
            <PriceText>{maxValue}</PriceText>
          </Flex>
          <Flex mt="28px" mb="5px" pr="27px" pl="12px">
            <RangeSlider
              min={min}
              max={max}
              step={step}
              onValueChange={handleChange}
            />
          </Flex>
        </Box>
      </Flex>
    </Container>
  )
}

const PriceText = styled(Text)`
  width: 65px;
  height: 39px;
  text-align: center;
  margin-right: 20px;
  padding-top: 10px;
  font-family: 'Avenir';
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

const CheckboxContainer = styled(Flex)`
  flex-direction: column;
  gap: 2px;
  font-family: 'Avenir';
  font-size: 20px;
`

const Container = styled(Box)<BoxProps>`
  background-color: ${({ theme }) => theme.colors.background};
  max-width: max-content;
  height: max-content;
`
