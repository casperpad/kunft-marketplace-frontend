import dynamic from 'next/dynamic'
import type { NextPage } from 'next'
import HomeView from '@/views/Home'

// eslint-disable-next-line @typescript-eslint/ban-types
// const HomeView = dynamic<{}>(() => import('@/viewsHome'), {
//   ssr: false,
// })

// const Home: NextPage = () => {
//   return <HomeView />
// }

export default HomeView
