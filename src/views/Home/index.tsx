import { useState } from 'react'
import { Layout } from '@/components'

import About from './About'
import Artist from './Artist'
import Collection from './Collection'
import Landing from './Landing'
import PromotedCollection from './PromotedCollection'

export default function HomeView() {
  const [tops] = useState<string[]>([
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/DuIicVTk_zFHgv7-HKjAlsfthJs2Ig30rKu7q3TeJvI',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/WC7hhcP8QXoCRe8h6DEiOnXSWXxbxqlC8CeanZdqgWg',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/XCbxFcL9ldK6SaCa8jh2wiyHPcSUwXD23aBrTzfIhOo',
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/nhYi3gCWBQ4VaHE8okoEpH_D21FwprE5p5DwXjUM8Wo',
  ])

  return (
    <>
      <Landing tops={tops} />
      <Artist />
      <Layout>
        <PromotedCollection />
        <Collection />
        <About />
      </Layout>
    </>
  )
}
