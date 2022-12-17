import { useState, useCallback } from 'react'
import styled from 'styled-components'

import { Box, Flex } from '@/components/Box'
import { RangeSlider } from '@/components/Slider'
import { Text } from '@/components/Text'

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

const SliderContainer = styled(Flex)`
  margin: 28px 30px 3px 7px;
`

const Container = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  height: max-content;
`

interface FilterProps {
  min?: number
  max?: number
  step?: number
}

export default function Filter({
  min = 0,
  max = 50000,
  step = 10,
}: FilterProps) {
  const [minValue, setMinValue] = useState(min)
  const [maxValue, setMaxValue] = useState(max)

  const handleChange = useCallback((value: any) => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [])

  return (
    <>
      <Text fontSize="27px" mb="4px">
        FILTER
      </Text>
      <Container>
        <Box>
          <Text fontFamily="Avenir" fontSize="18px" fontWeight={500} mb="4px">
            Status
          </Text>
        </Box>
        <Box>
          <Text fontFamily="Avenir" fontSize="18px" fontWeight={500} mb="4px">
            Price
          </Text>
          <Flex mt="4px">
            <PriceText>
              <Flex flexDirection="row" justifyContent="space-between" px="8px">
                KNFT
                <Text fontWeight={700}>v</Text>
              </Flex>
            </PriceText>
            <PriceText>{minValue}</PriceText>
            <PriceText>{maxValue}</PriceText>
          </Flex>
          <SliderContainer>
            <RangeSlider
              min={min}
              max={max}
              step={step}
              onValueChange={handleChange}
            />
          </SliderContainer>
        </Box>
      </Container>
    </>
  )
}
