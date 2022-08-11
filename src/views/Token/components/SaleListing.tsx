import { useCallback, useMemo } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import { Flex, TransactionButton, Text, Address } from '@/components'
import { useCasperWeb3Provider, useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'

import { Container, StyledTable, TitleContainer } from './styles'

interface SaleListingProps {
  token: Token
}

function TableView({ token }: SaleListingProps) {
  const { sales, collection, owner } = token
  const { currentAccount } = useCasperWeb3Provider()
  const { buyToken } = useMarketplaceTransaction(collection.contractHash)
  const buy = useCallback(async () => {
    const _ = await buyToken(token)
  }, [buyToken, token])

  const isOwner = useMemo(() => {
    if (!currentAccount) return false
    return (
      CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13) === owner
    )
  }, [currentAccount, owner])

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
            return (
              <tr key={sale.startTime}>
                <td>{sale.price}</td>
                <td>{sale.price}</td>
                <td>{new Date(sale.createdAt).toLocaleDateString('en-US')}</td>
                <td>
                  <Address address={sale.creator} />
                </td>
                <td>
                  {sale.status === 'pending' && !isOwner ? (
                    <TransactionButton title="Buy Now" onClick={buy} />
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
