import { BsEye } from 'react-icons/bs'
import styled from 'styled-components'

import {
  Flex,
  Text,
  FavoriteToken,
  Address,
  CasperExplorerLink,
} from '@/components'
import { Token } from '@/types'
import { getNFTExplorerUrl } from '@/utils/casper'

interface NameProps {
  token: Token
  setToken: React.Dispatch<React.SetStateAction<Token>>
}

export default function Name({ token, setToken }: NameProps) {
  return (
    <Container>
      <Title>{token.name}</Title>
      <DataContainer>
        <Flex flexDirection="row" alignItems="center">
          <Text mr="4px">Owned by</Text>
          <Address address={token.owner} />
        </Flex>
        <Flex flexDirection="row" gap={8}>
          <FavoriteToken token={token} setToken={setToken} />
          <ViewButton color="transparent">
            <BsEye />
            <Text color="primary">{token.viewed}</Text>
          </ViewButton>
          <CasperExplorerLink
            href={getNFTExplorerUrl(
              token.collection.contractPackageHash,
              token.id,
            )}
          />
        </Flex>
      </DataContainer>
    </Container>
  )
}

const Title = styled.h1`
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
