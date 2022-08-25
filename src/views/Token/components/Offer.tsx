import { useCallback, useState, useEffect } from 'react'
import { parseFixed } from '@ethersproject/bignumber'
import { CLPublicKey } from 'casper-js-sdk'
import styled from 'styled-components'

import { Flex, Input, Text, TransactionButton, TokenSelect } from '@/components'
import { acceptableTokens, NATIVE_HASH } from '@/config'
import {
  useMarketplaceTransaction,
  useERC20,
  useCasperWeb3Provider,
} from '@/hooks'
import { Token } from '@/types'

interface OfferProps {
  token: Token
}

export default function Offer({ token }: OfferProps) {
  const [offerPrice, setOfferPrice] = useState('')
  const [offerToken, setOfferToken] = useState(acceptableTokens[1])
  const { balanceOf, loading: erc20Loading } = useERC20({
    contractHash: offerToken.contractHash,
  })
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)

  const { currentAccount } = useCasperWeb3Provider()
  const { offerToken: handleOfferToken } = useMarketplaceTransaction(
    token.collection.contractHash,
  )
  const offer = useCallback(async () => {
    const _ = await handleOfferToken(
      token.id,
      parseFixed(offerPrice, 9),
      offerToken.contractHash,
    )
  }, [handleOfferToken, token.id, offerPrice, offerToken])

  useEffect(() => {
    async function fetchData() {
      if (!currentAccount || erc20Loading) return
      setLoading(true)
      if (offerToken.contractHash !== NATIVE_HASH) {
        const balance = await balanceOf(CLPublicKey.fromHex(currentAccount))
        setBalance(balance.toNumber())
      }
      setLoading(false)
    }
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerToken, erc20Loading, currentAccount])

  return (
    <Container>
      <PriceContainer>
        <TokenSelect
          tokens={acceptableTokens}
          value={offerToken}
          onChange={setOfferToken}
        />
        <CustomInput
          placeholder={
            loading || erc20Loading ? 'Loading...' : balance.toFixed(2)
          }
          type="number"
          value={offerPrice}
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
      <ButtonContainer>
        <TransactionButton
          title="Make Offer"
          onClick={offer}
          disabled={offerPrice.length === 0}
        />
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
