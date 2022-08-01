import styled from 'styled-components'

import { Text } from '@/components'

import {
  Container as DefaultContainer,
  StyledText,
  NameContainer,
} from './styles'

const Container = styled(DefaultContainer)`
  border-bottom: 0;
`

export default function Collection() {
  return (
    <Container>
      <StyledText>About This Collection</StyledText>
      <NameContainer>
        <Text>
          Here comes a description of the collection. The collection is very
          cool! description of the collection. The collection is very cool!
        </Text>
      </NameContainer>
    </Container>
  )
}
