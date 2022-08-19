import React, { useCallback, useEffect, useMemo, useState } from 'react'
import clone from 'lodash/clone'
import forIn from 'lodash/forIn'
import uniqWith from 'lodash/uniqWith'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { NFTCard } from '@/components'
import { useGetTokensLazy } from '@/hooks'
import { Collection as ICollection, Token } from '@/types'
import { isEqual } from '@/utils/token'
// import { useRouter } from '@/utils/route'

export default function CollectionExplorer({
  collection: _,
}: {
  collection: ICollection
}) {
  const { query } = useRouter()
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const { loading, getTokens } = useGetTokensLazy()
  const [tokens, setTokens] = useState<Token[]>([])
  const [hasMore, setHasMore] = useState(true)

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
      if (data.paginationInfo.hasNext) {
        setPage(data.paginationInfo.currentPage + 1)
      } else {
        setHasMore(false)
      }
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
    <StyledInfiniteScroll
      dataLength={tokens.length}
      next={fetchTokens}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {tokens.map((token) => (
        <NFTCard
          key={`${token.collection.contractPackageHash}-${token.id}`}
          {...token}
        />
      ))}
    </StyledInfiniteScroll>
  )
}

// @ts-ignore
const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: grid;
  height: 100%;
  gap: 20px;
  padding-bottom: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`
