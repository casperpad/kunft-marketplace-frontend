import { useState, useCallback } from 'react'
import styled from 'styled-components'

import { Box, Flex, BoxProps } from '@components/Box'
import { RangeSlider } from '@components/Slider'
import { Text } from '@components/Text'

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

const Container = styled(Box)<BoxProps>`
  background-color: ${({ theme }) => theme.colors.background};
  max-width: max-content;
  height: max-content;
`

function Checkbox({ text }: { text: string }) {
  return (
    <Flex mt="3px" flexDirection="row" alignItems="center">
      <input type="checkbox" value="ForSale" />
      <Text ml="8px">{text}</Text>
    </Flex>
  )
}

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
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const handleChange = useCallback((value: any) => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [])

  return (
    <Container {...props}>
      <Text fontSize="27px">FILTER</Text>
      <Flex flexDirection="column">
        <Box>
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Status
          </Text>
          <Flex flexDirection="column" fontFamily="Avenir" fontSize="20px">
            <Checkbox text="For Sale" />
            <Checkbox text="On Auction" />
          </Flex>
        </Box>
        <Box mt="10px">
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Rarity
          </Text>
          <Flex flexDirection="column" fontFamily="Avenir" fontSize="20px">
            <Checkbox text="Common" />
            <Checkbox text="Semi-Rare" />
            <Checkbox text="Rare" />
          </Flex>
        </Box>
        <Box mt="10px">
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Price
          </Text>
          <Flex mt="12px">
            <PriceText>
              <Flex flexDirection="row" justifyContent="space-between" px="8px">
                KNFT
                <Text fontWeight={700}>v</Text>
              </Flex>
            </PriceText>
            <PriceText>{minValue}</PriceText>
            <PriceText>{maxValue}</PriceText>
          </Flex>
          <Flex mt="28px" pr="20px">
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
