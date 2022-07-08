import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const CreatePage = dynamic<{}>(() => import('@views/Create'), {
  ssr: false,
})

export default CreatePage
