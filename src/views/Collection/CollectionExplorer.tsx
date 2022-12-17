import React, { useMemo } from 'react'
import clone from 'lodash/clone'
import forIn from 'lodash/forIn'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Collection as ICollection } from '@/types'

import Tokens from '../Tokens'
import Description from './Description'

export default function CollectionExplorer({
  collection,
}: {
  collection: ICollection
}) {
  const { query } = useRouter()

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
          [key.split('_')[1]]: typeof value === 'string' ? [value] : value,
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

  return (
    <Container>
      <Description collection={collection} />
      <Tokens where={where} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
`
