import { Flex, Text } from '@/components'

import {
  Container,
  StyledText,
  DataContainer,
  NameContainer,
  ValueContainer,
} from './styles'

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
