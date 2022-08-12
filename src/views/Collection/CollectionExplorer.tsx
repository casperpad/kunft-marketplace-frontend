import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Grid, NFTCard } from '@/components'

import { useGetTokens, GetTokensInput } from '@/hooks'
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
  const { query } = useRouter()
  const [where, setWhere] = useState<GetTokensInput>({ slug: collection.slug })
  const [page] = useState(1)
  const [limit] = useState(20)
  const { data, loading } = useGetTokens(where, page, limit)
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    if (loading || !data) return

    setTokens((prev) => [...prev, ...data.tokens])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  // useEffect(() => {
  //   if (query.slug && typeof query.slug === 'string') {
  //     setWhere({ ...where, slug: query.slug })
  //   }
  //   if (
  //     query.listed &&
  //     typeof query.listed === 'string' &&
  //     (query.listed === 'true' || query.listed === 'false')
  //   ) {
  //     setWhere({ ...where, listed: query.listed === 'true' })
  //   }
  //   setTokens([])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [query])

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
