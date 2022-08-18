import { Flex } from '@/components'
import { Metadata } from '@/types'

import {
  Container,
  StyledText,
  DataContainer,
  NameContainer,
  ValueContainer,
} from './styles'

interface PropertiesProps {
  metadata: Metadata
}

export default function Properties({ metadata }: PropertiesProps) {
  const shorten = (value: string) => {
    if (value.length > 12) return `${value.slice(0, 10)}...${value.slice(-10)}`
    return value
  }
  return (
    <Container>
      <StyledText>Properties</StyledText>
      <DataContainer>
        {Object.entries(metadata).map(([key, value]) => {
          return (
            <Flex key={key} alignItems="center" justifyContent="space-between">
              <NameContainer>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </NameContainer>
              <ValueContainer>{shorten(value)}</ValueContainer>
            </Flex>
          )
        })}
      </DataContainer>
    </Container>
  )
}
