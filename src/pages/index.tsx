import dynamic from 'next/dynamic'
import type { NextPage } from 'next'

// eslint-disable-next-line @typescript-eslint/ban-types
const HomeView = dynamic<{}>(() => import('@views/Home'), {
  ssr: false,
})

const Home: NextPage = () => {
  return <HomeView />
}

export default Home
