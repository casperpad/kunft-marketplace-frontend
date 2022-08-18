import { useCallback } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import {
  Flex,
  TransactionButton,
  Text,
  Address,
  TokenDisplay,
} from '@/components'
import { NATIVE_HASH } from '@/config'
import { useCasperWeb3Provider, useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'

import { Container, StyledTable, TitleContainer } from './styles'

interface SaleListingProps {
  token: Token
}

function TableView({ token }: SaleListingProps) {
  const { sales, collection } = token
  const { currentAccount } = useCasperWeb3Provider()
  const { buyToken, cancelSell } = useMarketplaceTransaction(
    collection.contractHash,
  )
  const buy = useCallback(async () => {
    const _ = await buyToken(token)
  }, [buyToken, token])

  return (
    <StyledTable>
      <thead>
        <tr>
          <td>Price</td>
          <td>USDPrice</td>
          <td>Date</td>
          <td>From</td>
          <td> </td>
        </tr>
      </thead>
      <tbody>
        {sales
          .sort(
            (a, b) =>
              new Date(a.createdAt).getUTCMilliseconds() -
              new Date(b.createdAt).getUTCMilliseconds(),
          )
          .map((sale) => {
            const isCreator = currentAccount
              ? sale.creator ===
                CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13)
              : false
            return (
              <tr key={sale.startTime}>
                <td>
                  <TokenDisplay
                    contractHash={
                      sale.payToken ? `hash-${sale.payToken}` : NATIVE_HASH
                    }
                    amount={sale.price}
                  />
                </td>
                <td>-</td>
                <td>{new Date(sale.createdAt).toLocaleDateString('en-US')}</td>
                <td>
                  <Address address={sale.creator} />
                </td>
                <td>
                  {sale.status === 'pending' ? (
                    isCreator ? (
                      <TransactionButton
                        title="Cancel Listing"
                        onClick={() => cancelSell([token.id])}
                      />
                    ) : (
                      <TransactionButton title="Buy Now" onClick={buy} />
                    )
                  ) : sale.status === 'canceled' ? (
                    'Canceled'
                  ) : null}
                </td>
              </tr>
            )
          })}
      </tbody>
    </StyledTable>
  )
}

export default function SaleListing({ token }: SaleListingProps) {
  return (
    <Container>
      <TitleContainer>
        <Text fontWeight={500}>Sales Listings</Text>
      </TitleContainer>
      {token.sales.length > 0 ? (
        <TableView token={token} />
      ) : (
        <Flex margin="auto">
          <Text
            fontWeight={700}
            fontFamily="Avenir"
            fontSize="30px"
            color="disabled"
          >
            No Listings Available
          </Text>
        </Flex>
      )}
    </Container>
  )
}
