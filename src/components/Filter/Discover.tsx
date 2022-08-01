import { useState, useCallback } from 'react'
import styled from 'styled-components'

import { Box, Flex, BoxProps } from '@/components/Box'
import { CheckboxItem } from '@/components/Checkbox'
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

  const [sale, setSale] = useState(false)
  const [auction, setAuction] = useState(false)

  const [common, setCommon] = useState(false)
  const [semi, setSemi] = useState(false)
  const [rare, setRare] = useState(false)

  const handleChange = useCallback((value: any) => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [])

  return (
    <Container {...props}>
      <Text fontSize="27px">FILTER</Text>
      <Flex flexDirection="column" mt="20px">
        <Box>
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Status
          </Text>
          <CheckboxContainer>
            <CheckboxItem text="For Sale" checked={sale} setChecked={setSale} />
            <CheckboxItem
              text="On Auction"
              disabled
              checked={auction}
              setChecked={setAuction}
            />
          </CheckboxContainer>
        </Box>
        <Box mt="10px">
          <Text fontFamily="Avenir" fontSize="25px" fontWeight={500} mb="4px">
            Rarity
          </Text>
          <CheckboxContainer>
            <CheckboxItem
              text="Common"
              checked={common}
              setChecked={setCommon}
            />
            <CheckboxItem
              text="Semi-Rare"
              checked={semi}
              setChecked={setSemi}
            />
            <CheckboxItem text="Rare" checked={rare} setChecked={setRare} />
          </CheckboxContainer>
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
