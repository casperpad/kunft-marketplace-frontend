import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface StyledButtonProps extends BaseButtonProps {
  text: string
  onClick?: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      borderRadius={100}
      maxWidth="max-content"
      height={65}
      px="1.5rem"
      pt="13px"
      {...props}
    >
      <Flex
        alignItems="center"
        position="relative"
        height="40px"
        overflow="hidden"
      >
        <Text fontSize="25px" mr="8px">
          {text}
        </Text>
        <Text fontSize="100px">{'>'}</Text>
      </Flex>
    </Button>
  )
}

export default StyledButton
