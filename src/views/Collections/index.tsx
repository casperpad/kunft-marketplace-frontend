import { Layout } from '@/components'
import PromotedCollection from '../Home/PromotedCollection'

import { Title } from './Collections.styles'

export default function Collections() {
  return (
    <Layout>
      <Title>DISCOVER NTFs</Title>
      <PromotedCollection />
    </Layout>
  )
}
