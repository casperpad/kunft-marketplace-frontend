import type { NextPage } from 'next'

import { Landing, Artist, Collections, About } from '@views/Home'

const Home: NextPage = () => {
  const tops: string[] = []
  const collections: string[] = []

  return (
    <>
      <Landing tops={tops} />
      <Artist />
      <Collections collections={collections} />
      <About />
    </>
  )
}

export default Home
