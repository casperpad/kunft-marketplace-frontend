import { Flex } from '@/components/Box'
import { Text } from '@/components/Text'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface StyledButtonProps extends BaseButtonProps {
  text: string
  link?: boolean
  onClick?: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  link = true,
  ...props
}) => {
  return (
    <Button
      borderRadius={100}
      maxWidth="max-content"
      height={65}
      px="1.5rem"
      fontSize="25px"
      {...props}
    >
      <Flex alignItems="center" position="relative" height="100%">
        <Text mr={link ? '8px' : '0px'}>{text}</Text>
        {link && <Text fontSize="100px">{'>'}</Text>}
      </Flex>
    </Button>
  )
}

export default StyledButton
