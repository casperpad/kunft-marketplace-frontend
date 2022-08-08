import { useCallback, useState } from 'react'
import { parseFixed } from '@ethersproject/bignumber'
import styled from 'styled-components'

import { Flex, Input, Text, TransactionButton } from '@/components'
import { useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'

interface OfferProps {
  token: Token
}

export default function Offer({ token }: OfferProps) {
  const [offerPrice, setOfferPrice] = useState('')

  const { offerToken } = useMarketplaceTransaction(
    token.collection.contractHash,
  )
  const offer = useCallback(async () => {
    const _ = await offerToken(token.id, parseFixed(offerPrice, 9))
  }, [offerToken, token.id, offerPrice])
  return (
    <Container>
      <PriceContainer>
        <PriceText>
          CSPR
          <Text fontWeight={700}>v</Text>
        </PriceText>
        <CustomInput
          placeholder="Input Amount"
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
        />
        <Flex flexDirection="column">
          <Text fontFamily="Avenir" fontSize="10px">
            Highest Offer
          </Text>
          <Text fontFamily="Avenir" fontSize="18px" fontWeight={700}>
            50,531 KNFT
          </Text>
        </Flex>
      </PriceContainer>
      <ButtonContainer>
        <TransactionButton title="Make Offer" onClick={offer} />
      </ButtonContainer>
    </Container>
  )
}

const CustomInput = styled(Input)`
  width: 150px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 175px;
  }
`

const PriceText = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 85px;
  font-family: 'Avenir';
  font-size: 16px;
  padding: 12px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
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

const ButtonContainer = styled(Flex)`
  justify-content: center;
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
