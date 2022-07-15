import React from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { StyledText, NameContainer } from './styles'

const Container = styled(Flex)`
  font-family: 'Avenir';
  flex-direction: column;
  gap: 4px;
  margin-bottom: 48px;
`

export default function NFT() {
  return (
    <Container>
      <StyledText>Description</StyledText>
      <NameContainer>
        <Text>
          Here comes a description of this NFT #123. The NFT #123 is cool!
        </Text>
      </NameContainer>
    </Container>
  )
}
