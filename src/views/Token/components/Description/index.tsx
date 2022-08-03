import { useState } from 'react'
import styled from 'styled-components'

import { Box } from '@/components'
import { Token } from '@/types'

import Collection from './Collection'
import Detail from './Detail'
import NFT from './NFT'
import Properties from './Properties'

const Container = styled(Box)``

interface DescriptionProps {
  token: Token
}

export default function Description({ token }: DescriptionProps) {
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
