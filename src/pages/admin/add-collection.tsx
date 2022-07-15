import AddCollection from '@views/Admin/AddCollection'

export default AddCollection

export function getStaticProps() {
  return {
    props: {
      protected: true,
      role: ['admin'],
    },
  }
}
