import styled from 'styled-components'

import { Flex } from '@components/Box'
import { Text } from '@components/Text'

const Container = styled(Flex)`
  flex-direction: column;
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 26px 32px;
  font-family: 'Avenir';
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

interface PropertiesProps {
  properties: string[]
}

export default function Properties({ properties }: PropertiesProps) {
  return (
    <Container>
      <StyledText>Properties</StyledText>
      <DataContainer>
        <NameContainer>
          {properties.map((property) => {
            return <Text key={property}>{property}</Text>
          })}
        </NameContainer>
        <ValueContainer>
          {properties.map((property) => {
            return (
              <Flex flexDirection="row" key={property}>
                <Text color="detail" fontWeight={700}>
                  {property}
                </Text>
                <Text color="detail">10%</Text>
              </Flex>
            )
          })}
        </ValueContainer>
      </DataContainer>
    </Container>
  )
}
