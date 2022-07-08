import { useState } from 'react'

import About from './About'
import Artist from './Artist'
import Collections from './Collections'
import Landing from './Landing'

export default function HomeView() {
  const [tops] = useState<string[]>([])
  const [collections] = useState<string[]>([])

  return (
    <>
      <Landing tops={tops} />
      <Artist />
      <Collections collections={collections} />
      <About />
    </>
  )
}
