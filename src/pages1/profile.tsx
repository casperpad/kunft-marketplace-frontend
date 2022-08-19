import Profile from '@/views/Profile'

export default Profile

export function getStaticProps() {
  return {
    props: {
      protected: true,
      role: ['user'],
    },
  }
}
