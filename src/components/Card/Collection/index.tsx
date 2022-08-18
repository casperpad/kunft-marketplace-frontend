import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Collection } from '@/types'

export default function CollectionCard({
  slug,
  image,
  logo,
  name,
  verified,
}: Collection) {
  return (
    <StyledCollectionCard href={`/collections/${slug}`}>
      <div className="">name</div>
    </StyledCollectionCard>
  )
}

const StyledCollectionCard = styled(Link)`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-family: 'Avenir';
  font-weight: lighter;
  transition: all 0.3s;
  height: max-content;
  margin-bottom: 40px;
`
