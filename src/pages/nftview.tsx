import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const NFTViewPage = dynamic<{}>(() => import('@views/NFTView'), {
  ssr: false,
})

export default NFTViewPage
