import React, { useCallback, useEffect, useMemo, useState } from 'react'
import clone from 'lodash/clone'
import forIn from 'lodash/forIn'
import uniqWith from 'lodash/uniqWith'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Grid, NFTCard } from '@/components'
import { useGetTokensLazy } from '@/hooks'
import { Collection as ICollection, Token } from '@/types'
import { isEqual } from '@/utils/token'
// import { useRouter } from '@/utils/route'

const DiscoverContainer = styled(Grid)`
  display: grid;
  width: 100%;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export default function CollectionExplorer({
  collection: _,
}: {
  collection: ICollection
}) {
  const { query } = useRouter()
  const [page] = useState(1)
  const [limit] = useState(20)
  const { loading, getTokens } = useGetTokensLazy()
  const [tokens, setTokens] = useState<Token[]>([])

  const where = useMemo(() => {
    const preferWhere = clone(query) as any
    if (preferWhere.listed) {
      if (typeof preferWhere.listed === 'string')
        preferWhere.listed = preferWhere.listed === 'true'
    }

    forIn(query, (value, key) => {
      if (key.startsWith('metadata_')) {
        // @ts-ignore
        preferWhere.metadata = {
          ...preferWhere.metadata,
          [key.split('_')[1]]: value,
        }
        // @ts-ignore
        delete preferWhere[key]
      } else if (key.startsWith('price_')) {
        preferWhere.price = {
          ...preferWhere.price,
          [key.split('_')[1]]: value,
        }
        delete preferWhere[key]
      }
    })
    return preferWhere
  }, [query])

  const fetchTokens = useCallback(async () => {
    if (loading) return

    const { data } = await getTokens(where, page, limit)
    if (data) {
      setTokens((prev) => uniqWith([...prev, ...data.tokens], isEqual))
    }
  }, [getTokens, where, page, limit, loading])

  useEffect(() => {
    fetchTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTokens([])
    fetchTokens()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

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
