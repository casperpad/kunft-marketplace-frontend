import { useState } from 'react'
import { BigNumberish } from '@ethersproject/bignumber'
import styled from 'styled-components'

import { acceptableTokens } from '@/config'
import { Token } from '@/types'

import { Flex } from '../../Box'
import { TransactionButton } from '../../Button'
import { Input } from '../../Input'
import { Text } from '../../Text'
import TokenSelect from '../../TokenSelect'

interface SellProps {
  token: Token
  sellToken: (
    id: string,
    price: BigNumberish,
    payToken?: string | undefined,
  ) => Promise<void>
}

export default function Sell({ sellToken }: SellProps) {
  const [sellPrice, setSellPrice] = useState('')
  const [payToken, setPayToken] = useState(acceptableTokens[1].contractHash)

  return (
    <Container>
      <PriceContainer>
        <TokenSelect
          tokens={acceptableTokens}
          value={payToken}
          onChange={setPayToken}
        />
        <CustomInput
          placeholder="Input Amount"
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
        />
        <Flex flexDirection="column">
          <Text fontFamily="Avenir" fontSize="10px">
            Highest Sell
          </Text>
          <Text fontFamily="Avenir" fontSize="18px" fontWeight={700}>
            50,531 KNFT
          </Text>
        </Flex>
      </PriceContainer>
      <TransactionButton
        title="Sell"
        onClick={sellToken}
        disabled={sellPrice.length === 0}
      />
    </Container>
  )
}

const CustomInput = styled(Input)`
  width: 150px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 175px;
  }
`

const PriceContainer = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: nowrap;
  }
`

const Container = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 20px;
  padding: 26px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`
