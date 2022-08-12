import React from 'react'
import Address from '../Address'
import { Flex } from '../Box'
import { Text } from '../Text'

interface DeployToastProps {
  deployHash: string
}

export default function DeployToast({ deployHash }: DeployToastProps) {
  return (
    <Flex flexDirection="column" justifyContent="flex-end" gap={8}>
      <Address variant="secondary" showTooltip={false} address={deployHash} />
      <Text color="primary">Transaction Created</Text>
    </Flex>
  )
}
