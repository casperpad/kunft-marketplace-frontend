import { Layout } from '@/components'

import About from './About'
import Artist from './Artist'
import Collection from './Collection'
import Landing from './Landing'
import PromotedCollection from './PromotedCollection'

export default function HomeView() {
  return (
    <>
      <Landing />
      <Artist />
      <Layout>
        <PromotedCollection />
        <Collection />
        <About />
      </Layout>
    </>
  )
}
