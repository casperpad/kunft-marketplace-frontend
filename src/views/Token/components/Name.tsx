import { BsEye } from 'react-icons/bs'
import styled from 'styled-components'

import { Flex, Text, FavoriteToken, Address } from '@/components'
import { Token } from '@/types'

interface NameProps {
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export default function Name({ token, setToken }: NameProps) {
  return (
    <Container>
      <NameText>{token.name}</NameText>
      <DataContainer>
        <Flex flexDirection="row">
          <Text mr="4px">Owned by</Text>
          <Address address={token.owner} />
        </Flex>
        <Flex flexDirection="row">
          <FavoriteToken token={token} setToken={setToken} />
          <ViewButton color="transparent">
            <BsEye />
            <Text color="primary">{token.viewed}</Text>
          </ViewButton>
        </Flex>
      </DataContainer>
    </Container>
  )
}

const NameText = styled(Text)`
  font-size: 40px;
`

const Button = styled(Flex)`
  flex-direction: row;
  color: black;
  align-items: center;
`

const ViewButton = styled(Button)``

const DataContainer = styled(Flex)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 24px;
  font-family: 'Avenir';
  font-size: 20px;
`

const Container = styled(Flex)`
  flex-direction: column;
`
