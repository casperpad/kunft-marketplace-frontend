import styled from 'styled-components'

import { Box } from '@/components'
import { Token } from '@/types'

import Collection from './Collection'
import Detail from './Detail'
import Properties from './Properties'

const Container = styled(Box)``

interface DescriptionProps {
  token: Token
}

export default function Description({ token }: DescriptionProps) {
  return (
    <Container>
      <Collection description={token.collection.description} />
      <Detail token={token} />
      <Properties metadata={token.metadata} />
    </Container>
  )
}
