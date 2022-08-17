import { NextSeo } from 'next-seo'
import { Layout } from '@/components'
import { meta } from '@/config'
import PromotedCollection from '../Home/PromotedCollection'

import { Title } from './Collections.styles'

export default function Collections() {
  return (
    <Layout>
      <NextSeo
        title="Explorer collections"
        openGraph={{
          description: 'Explorer collections on KUNFT Marketplace',
          site_name: meta.SITE_NAME,
        }}
      />
      <Title>DISCOVER NTFs</Title>
      <PromotedCollection />
    </Layout>
  )
}
