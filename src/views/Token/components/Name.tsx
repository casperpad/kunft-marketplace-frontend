import { BsHeart, BsEye } from 'react-icons/bs'
import styled from 'styled-components'

import { Flex, Text } from '@/components'

const NameText = styled(Text)`
  font-size: 40px;
`

const Button = styled(Flex)`
  flex-direction: row;
  color: black;
  align-items: center;
`

const StarButton = styled(Button)`
  margin-right: 30px;
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

interface NameProps {
  name: string
  owner: string
  favoritedUsers: string[]
  viewed: number
}

export default function Name({
  name,
  owner,
  favoritedUsers,
  viewed,
}: NameProps) {
  return (
    <Container>
      <NameText>{name}</NameText>
      <DataContainer>
        <Flex flexDirection="row">
          <Text mr="4px">Owned by</Text>
          <Text color="primary">{owner}</Text>
        </Flex>
        <Flex flexDirection="row">
          <StarButton color="transparent">
            <BsHeart />
            <Text color="primary">{favoritedUsers.length}</Text>
          </StarButton>
          <ViewButton color="transparent">
            <BsEye />
            <Text color="primary">{viewed}</Text>
          </ViewButton>
        </Flex>
      </DataContainer>
    </Container>
  )
}
