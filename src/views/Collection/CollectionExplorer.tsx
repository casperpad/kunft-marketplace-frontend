import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Grid, NFTCard } from '@/components'
import { useGetTokens, GetTokensInput } from '@/hooks'
import { Collection as ICollection, Token } from '@/types'
import { useRouter } from '@/utils/route'

const DiscoverContainer = styled(Grid)`
  display: grid;
  width: 100%;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  const { data, loading, refetch } = useGetTokens(where, page, limit)
  const [tokens, setTokens] = useState<Token[]>([])

  useEffect(() => {
    if (loading || !data) return
    console.log(loading, data)
    setTokens((prev) => [...prev, ...data.tokens])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, data])

  useEffect(() => {
    if (
      query.listed &&
      typeof query.listed === 'string' &&
      (query.listed === 'true' || query.listed === 'false')
    ) {
      setWhere({ ...where, listed: query.listed === 'true' })
      setTokens([])
      refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.listed])

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
