import { useCallback, useMemo } from 'react'
import { formatFixed } from '@ethersproject/bignumber'
import styled from 'styled-components'

import { Flex, Text, TransactionButton } from '@/components'
import { useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'

const PriceContainer = styled(Flex)`
  flex-direction: column;
  font-family: 'Avenir';
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    align-items: start;
  }
`

const ButtonContainer = styled(Flex)`
  justify-content: center;
`

const Container = styled(Flex)`
  flex-direction: column;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 20px 32px;
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

interface BuyProps {
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export default function Buy({ token }: BuyProps) {
  const { buyToken } = useMarketplaceTransaction(token.collection.contractHash)
  const handle = useCallback(async () => {
    if (token.listed) await buyToken(token)
  }, [buyToken, token])

  const price = useMemo(() => {
    if (!token.price) return undefined
    // TODO update decimal
    return formatFixed(token.price.price, 9)
  }, [token.price])

  return (
    <Container>
      <PriceContainer>
        <Text fontSize="16px">Current Price</Text>
        <Text fontSize="30px" fontWeight={700} mt="-10px">
          {price || 'Not Available'}
        </Text>
      </PriceContainer>
      <ButtonContainer>
        <TransactionButton
          title="Buy Now"
          disabled={!token.listed}
          onClick={handle}
        />
      </ButtonContainer>
    </Container>
  )
}
