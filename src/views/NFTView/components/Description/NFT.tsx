import React from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Flex)`
  font-family: 'Avenir';
  flex-direction: column;
  gap: 4px;
  margin-bottom: 48px;
`

export default function NFT() {
  return (
    <Container>
      <Text fontWeight={500} fontSize="25px">
        Description
      </Text>
      <Text fontSize="20px">
        Here comes a description of this NFT #123. The NFT #123 is cool!
      </Text>
    </Container>
  )
}
