import { useState, useCallback } from 'react'

import { useRouter } from 'next/router'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import {
  Flex,
  Box,
  TokenSelect,
  CheckboxItem,
  RangeSlider,
  Text,
} from '@/components'
import { acceptableTokens } from '@/config'
import { useMetadataInfo } from '@/hooks'
import TraitSearchItem from './TraitSearchItem'

const FilterContainer = styled(Box)`
  position: sticky;
  top: 0;
  transition: all 0.3s;
  max-height: calc(100vh - 65px);
  padding: 20px 12px;
  overflow-y: auto;
`

export default function Filter({ slug }: { slug: string }) {
  const [show] = useState(true)

  const { data } = useMetadataInfo(slug)

  const router = useRouter()
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(5000)
  const [payToken, setPayToken] = useState(acceptableTokens[1])

  const handleChange = useCallback((value: any) => {
    setMinValue(value[0])
    setMaxValue(value[1])
  }, [])

  const handleTrait = useCallback(
    (key: string, value: string) => {
      let trait = router.query[`metadata_${key}`]

      trait =
        trait === undefined ? [] : typeof trait === 'string' ? [trait] : trait

      const newTrait = trait.includes(value)
        ? trait.filter((v) => v !== value)
        : [...trait, value]

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [`metadata_${key}`]: newTrait },
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

  const handlePriceFilter = useCallback(() => {
    //
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          price_payToken: payToken.contractHash,
          price_min: minValue,
          price_max: maxValue,
        },
      },
      undefined,
      { shallow: true },
    )
  }, [minValue, maxValue, payToken, router])

  const _handleClearFilters = useCallback(() => {
    router.push(
      {
        pathname: router.pathname,
        query: { slug: router.query.slug },
      },
      undefined,
      { shallow: true },
    )
  }, [router])

  return (
    <FilterContainer width={show ? '300px' : '0px'}>
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
        <Flex mt="10px" flexDirection="column">
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
              min={minValue}
              max={maxValue}
              step={20}
              onValueChange={handleChange}
            />
          </Flex>
          <PriceFilterButton onClick={handlePriceFilter}>
            Apply Price Filter
          </PriceFilterButton>
        </Flex>
        <Flex flexDirection="column" gap={8}>
          {data ? (
            <>
              {data.map(({ __typename, ...traitInfo }) => (
                <TraitSearchItem
                  key={traitInfo.trait}
                  onClick={handleTrait}
                  {...traitInfo}
                />
              ))}
            </>
          ) : (
            <>Loading...</>
          )}
        </Flex>
      </Flex>
    </FilterContainer>
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

const PriceFilterButton = styled.button<SpaceProps>`
  ${space}
  padding: 4px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: opacity 0.3s;
  font-size: 15px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`
