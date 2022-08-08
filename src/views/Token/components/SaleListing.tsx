import { useCallback, useMemo } from 'react'
import { CLPublicKey } from 'casper-js-sdk'
import { Flex, TransactionButton, Text, Address } from '@/components'
import { useCasperWeb3Provider, useMarketplaceTransaction } from '@/hooks'
import { Token } from '@/types'

import { Container, StyledTable, HeadTr, Td, TitleContainer } from './styles'

interface SaleListingProps {
  token: Token
}

function TableView({
  token: { sales, collection, id, owner },
}: SaleListingProps) {
  const { currentAccount } = useCasperWeb3Provider()
  const { buyToken } = useMarketplaceTransaction(collection.contractHash)
  const buy = useCallback(
    async (price: string) => {
      const _ = await buyToken(id, price)
    },
    [buyToken, id],
  )

  const isOwner = useMemo(() => {
    if (!currentAccount) return false
    return (
      CLPublicKey.fromHex(currentAccount).toAccountHashStr().slice(13) === owner
    )
  }, [currentAccount, owner])

  return (
    <StyledTable>
      <thead>
        <HeadTr>
          <Td>Price</Td>
          <Td>USDPrice</Td>
          <Td>Date</Td>
          <Td>From</Td>
          <Td> </Td>
        </HeadTr>
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
                <Td>{sale.price}</Td>
                <Td>{sale.price}</Td>
                <Td>{new Date(sale.createdAt).toLocaleDateString('en-US')}</Td>
                <Td>
                  <Address address={sale.creator} />
                </Td>
                <Td>
                  {sale.status === 'pending' && !isOwner ? (
                    <TransactionButton
                      title="Buy Now"
                      onClick={() => buy(sale.price)}
                    />
                  ) : null}
                </Td>
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
