import { useGetMetadataInfoQuery } from '@/graphql/queries/__generated__/collection.generated'

export default function useMetadataInfo(slug: string) {
  const { data, ...rest } = useGetMetadataInfoQuery({
    variables: { slug },
  })
  return {
    data: data?.getMetadataInfo?.data,
    ...rest,
  }
}
