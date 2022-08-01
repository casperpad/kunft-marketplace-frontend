import styled from 'styled-components'

import { Page, Box } from '@/components'
import { Collection as ICollection } from '../../types/nft.types'
import CollectionExplorer from './CollectionExplorer'
import Filter from './Filter'

const StyledPage = styled(Page)`
  padding: 0px 0px 40px 0px;
`

const Logo = styled(Box)`
  padding: 20px 10px;
`

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`

export default function Collection({
  collection,
}: {
  collection: ICollection
}) {
  const { name } = collection

  return (
    <StyledPage>
      <Logo>{name}</Logo>
      <Container>
        <Filter />
        <CollectionExplorer collection={collection} />
      </Container>
    </StyledPage>
  )
}
