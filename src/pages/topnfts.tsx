import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const TopNFTsPage = dynamic<{}>(() => import('@/views/TopNFTs'), {
  ssr: false,
})

export default TopNFTsPage
