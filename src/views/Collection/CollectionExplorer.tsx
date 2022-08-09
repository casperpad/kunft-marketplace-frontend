import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Grid, NFTCard } from '@/components'

import useGetTokens from '@/hooks/useGetTokens'
import { Collection as ICollection, Token } from '@/types'

const DiscoverContainer = styled(Grid)`
  display: grid;
  width: 100%;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(1, 1fr);

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
  }

  /* ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  } */
`

export default function CollectionExplorer({
  collection,
}: {
  collection: ICollection
}) {
  const [page] = useState(1)
  const [limit] = useState(20)
  const { data, loading } = useGetTokens({ slug: collection.slug }, page, limit)
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    if (loading || !data) return

    setTokens((prev) => [...prev, ...data.tokens])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  return (
    <DiscoverContainer>
      {tokens.map((token) => (
        <NFTCard
          key={`${token.collection.contractPackageHash}-${token.id}`}
          {...token}
        />
      ))}
      {loading ? 'Loading...' : null}
    </DiscoverContainer>
  )
}
