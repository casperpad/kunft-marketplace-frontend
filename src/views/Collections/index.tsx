import { useState, useEffect, useCallback } from 'react'
import uniqBy from 'lodash/uniqBy'
import { NextSeo } from 'next-seo'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { Layout, CollectionCard } from '@/components'
import { meta } from '@/config'
import { useGetCollectionsLazy } from '@/hooks'
import { Collection } from '@/types'

import { Title } from './Collections.styles'

export default function Collections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [hasMore, setHasMore] = useState(true)
  const { getCollections, loading } = useGetCollectionsLazy()

  useEffect(() => {
    fetchCollections()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCollections = useCallback(async () => {
    if (loading) return
    const { data } = await getCollections({ page, limit })

    if (data) {
      setCollections((prev) =>
        uniqBy([...prev, ...data.collections], (c) => c.contractPackageHash),
      )
      if (data.paginationInfo.hasNext) {
        setPage(data.paginationInfo.currentPage + 1)
      } else {
        setHasMore(false)
      }
    }
  }, [page, limit, loading, getCollections])

  return (
    <Layout>
      <NextSeo
        title="Explorer collections"
        openGraph={{
          description: 'Explorer collections on KUNFT Marketplace',
          site_name: meta.SITE_NAME,
        }}
      />
      <Title>Explorer Collections</Title>
      <StyledInfiniteScroll
        dataLength={collections.length}
        next={fetchCollections}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {collections.map((collection) => (
          <CollectionCard
            key={collection.contractPackageHash}
            {...collection}
          />
        ))}
      </StyledInfiniteScroll>
    </Layout>
  )
}

// @ts-ignore
const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: grid;
  width: 100%;
  height: 100%;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`
