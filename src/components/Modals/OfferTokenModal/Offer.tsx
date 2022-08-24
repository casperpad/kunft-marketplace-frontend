import { useState } from 'react'
import { BigNumberish, parseFixed } from '@ethersproject/bignumber'
import { CLKeyParameters } from 'casper-js-sdk'
import styled from 'styled-components'

import { acceptableTokens, NATIVE_HASH } from '@/config'
import { Token } from '@/types'

import { Flex } from '../../Box'
import { TransactionButton } from '../../Button'
import { Input } from '../../Input'
import { Text } from '../../Text'
import TokenSelect from '../../TokenSelect'

interface OfferProps {
  token: Token
  offerToken: (
    tokenId: BigNumberish,
    amount: BigNumberish,
    payToken?: string,
    additionalRecipient?: CLKeyParameters,
  ) => Promise<void>
}

export default function Offer({ token, offerToken }: OfferProps) {
  const [offerPrice, setOfferPrice] = useState('')
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
          value={offerPrice}
          min={0}
          onChange={(e) => setOfferPrice(e.target.value)}
        />
        <Flex flexDirection="column">
          <Text fontFamily="Avenir" fontSize="10px">
            Highest Offer
          </Text>
          <Text fontFamily="Avenir" fontSize="18px" fontWeight={700}>
            -
          </Text>
        </Flex>
      </PriceContainer>
      <TransactionButton
        title="Make Offer"
        onClick={() =>
          offerToken(
            token.id,
            parseFixed(offerPrice, 9),
            payToken === NATIVE_HASH ? undefined : payToken,
          )
        }
        disabled={offerPrice.length === 0}
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
