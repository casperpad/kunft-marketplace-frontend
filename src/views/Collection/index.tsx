import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { Page, Box, Flex } from '@/components'
import { meta } from '@/config'
import { Collection as ICollection } from '@/types'
import CollectionExplorer from './CollectionExplorer'
import Filter from './Filter'

const StyledPage = styled(Page)`
  padding: 0px 0px 40px 0px;
`

const Logo = styled(Box)`
  padding: 20px 10px;
`

const Container = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`

export default function Collection({
  collection,
}: {
  collection: ICollection
}) {
  const { name, slug } = collection

  return (
    <>
      <NextSeo
        title={name}
        openGraph={{
          url: `${meta.SITE_URL}/collections/${slug}`,
          title: name,
          description: collection.description,
          images: collection.image
            ? [
                {
                  url: collection.image,
                  width: 800,
                  height: 600,
                  alt: collection.name,
                },
              ]
            : undefined,
          site_name: meta.SITE_NAME,
        }}
      />
      <StyledPage>
        <Logo>{name}</Logo>
        <Container>
          <Filter />
          <CollectionExplorer collection={collection} />
        </Container>
      </StyledPage>
    </>
  )
}
