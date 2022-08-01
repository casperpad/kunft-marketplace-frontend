import dynamic from 'next/dynamic'

// eslint-disable-next-line @typescript-eslint/ban-types
const ProfilePage = dynamic<{}>(() => import('@/views/Profile'), {
  ssr: false,
})

export default ProfilePage

export function getStaticProps() {
  return {
    props: {
      protected: true,
      role: ['user'],
    },
  }
}
