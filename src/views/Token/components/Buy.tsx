import { useCallback } from 'react'
import styled from 'styled-components'

import { Flex, Text, ERC20Balance, TransactionButton } from '@/components'
import { NATIVE_HASH } from '@/config'
import { useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'
import { findAcceptableTokens } from '@/utils'

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

  return (
    <Container>
      <PriceContainer>
        <Text fontSize="16px">Current Price</Text>
        <Text fontSize="30px" fontWeight={700} mt="-10px">
          {token.price ? (
            <ERC20Balance
              token={findAcceptableTokens({
                contractHash: token.price.payToken
                  ? `hash-${token.price.payToken}`
                  : NATIVE_HASH,
              })}
              amount={token.price.price}
            />
          ) : (
            'Not Available'
          )}
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
