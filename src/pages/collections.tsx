import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const CollectionsPage = dynamic<{}>(() => import('@views/Collections'), {
  ssr: false,
})

export default CollectionsPage
