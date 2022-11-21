import { NextSeo } from 'next-seo'
import styled from 'styled-components'

import { Page } from '@/components'
import { meta } from '@/config'
import { Collection as ICollection } from '@/types'
import CollectionExplorer from './CollectionExplorer'
import Filter from './Filter'

export default function Collection({
  collection,
}: {
  collection: ICollection
}) {
  const { name, slug, logo } = collection

  return (
    <>
      <NextSeo
        title={name}
        openGraph={{
          url: `${meta.SITE_URL}/collections/${slug}`,
          title: name,
          description: collection.description,
          images: logo
            ? [
                {
                  url: logo,
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
        <Filter slug={collection.slug} />
        <CollectionExplorer collection={collection} />
      </StyledPage>
    </>
  )
}

const StyledPage = styled(Page)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
