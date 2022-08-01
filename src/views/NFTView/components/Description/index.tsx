import { useState } from 'react'
import styled from 'styled-components'

import { Box } from '@/components'

import Collection from './Collection'
import Detail from './Detail'
import NFT from './NFT'
import Properties from './Properties'

const Container = styled(Box)``

export default function Description() {
  const [properties] = useState<string[]>([
    'Property 1',
    'Property 2',
    'Property 3',
    'Property 4',
    'Property 5',
  ])

  return (
    <Container>
      <NFT />
      <Collection />
      <Detail />
      <Properties properties={properties} />
    </Container>
  )
}
