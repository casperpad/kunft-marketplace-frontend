import styled from 'styled-components'
import { Text } from '@components/Text'

import {
  Container as DefaultContainer,
  StyledText,
  DataContainer,
  NameContainer,
  ValueContainer,
} from './styles'

const Container = styled(DefaultContainer)`
  border-bottom: 0;
`

export default function Detail() {
  return (
    <Container>
      <StyledText>Details</StyledText>
      <DataContainer>
        <NameContainer>
          <Text>Contract Address</Text>
          <Text>Token ID</Text>
          <Text>Creator Fees</Text>
          <Text>Token Standard</Text>
        </NameContainer>
        <ValueContainer>
          <Text color="primary">02029944a...8cfc45</Text>
          <Text color="detail">123456789876...</Text>
          <Text color="detail">5%</Text>
          <Text color="detail">CEP-47</Text>
        </ValueContainer>
      </DataContainer>
    </Container>
  )
}
