import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Grid, NFTCard } from '@/components'

import useTokens from '@/hooks/useTokens'
import { Collection as ICollection, Token } from '../../types/nft.types'

const DiscoverContainer = styled(Grid)`
  display: grid;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default function CollectionExplorer({
  collection,
}: {
  collection: ICollection
}) {
  const [page] = useState(1)
  const [limit] = useState(20)
  const { data, loading } = useTokens({ slug: collection.slug }, page, limit)
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    if (data === undefined || data === null) return
    if (data.tokens === undefined || data.tokens === null) return
    const fetchedTokens = data.tokens
      .map((t) => {
        const token: Token = {
          type: t.listed ? 'Sale' : 'NoneSale',
          name: `${collection.name} #${t.tokenId}`,
          id: t.tokenId,
          metadata: t.metadata,
          collectionImage: collection.image,
          owner: '',
          favoritedUsers: t.favoritedUsers || [],
          listed: t.listed,
          viewed: t.viewed,
          price: t.price ? t.price : undefined,
          payToken: t.sales ? t.sales[0].payToken : null,
          contractHash: collection.contractHash,
        }
        return token
      })
      .filter((token) => tokens.find((t) => t.id === token.id) === undefined)
    setTokens((prev) => [...prev, ...fetchedTokens])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <DiscoverContainer>
      {tokens.map((token) => (
        <NFTCard key={token.id} {...token} />
      ))}
      {loading ? 'Loading...' : null}
    </DiscoverContainer>
  )
}
