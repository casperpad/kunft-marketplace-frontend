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

interface CollecitonProps {
  description?: string
}

export default function Collection({ description }: CollecitonProps) {
  return (
    <Container>
      <StyledText>About This Collection</StyledText>
      <NameContainer>
        <Text>{description}</Text>
      </NameContainer>
    </Container>
  )
}
