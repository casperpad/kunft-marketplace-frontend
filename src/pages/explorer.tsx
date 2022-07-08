import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const DiscoverPage = dynamic<{}>(() => import('@views/Discover'), {
  ssr: false,
})

export default DiscoverPage
