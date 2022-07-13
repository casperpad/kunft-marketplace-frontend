import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Flex)`
  flex-direction: column;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 26px 32px;
  font-family: 'Avenir';
  border-bottom-width: 0px;
`

const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 25px;
`

const DataContainer = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
`

const NameContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
  font-size: 20px;
`

const ValueContainer = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
  font-size: 14px;
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
