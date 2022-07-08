import { Flex } from '@components/Box'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

export default function Create() {
  return (
    <Layout>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <Text fontSize="90px" textAlign="center">
          Create Page Coming Soon!
        </Text>
      </Flex>
    </Layout>
  )
}
