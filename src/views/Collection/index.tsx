import { useRouter } from 'next/router'
import styled from 'styled-components'

import { Flex } from '@components/index'

import CollectionExplorer from './CollectionExplorer'
import Filter from './Filter'

const Container = styled(Flex)`
  position: relative;
  flex-direction: row;
  height: 100%;
  padding-top: 40px;
`

export default function Collection(props: any) {
  const router = useRouter()
  const { slug } = router.query
  console.log(props)
  return (
    <Container>
      <Filter />
      {typeof slug !== 'string' ? (
        <div>Error</div>
      ) : (
        <CollectionExplorer slug={slug} />
      )}
    </Container>
  )
}
