import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface StyledButtonProps extends BaseButtonProps {
  text: string
  link?: boolean
  height?: number
  fontsize?: string
  onClick?: () => void
}

const StyledButton: React.FC<StyledButtonProps> = ({
  text,
  link = true,
  fontsize = '25px',
  height = 65,
  ...props
}) => {
  return (
    <Button
      borderRadius={100}
      maxWidth="max-content"
      height={height}
      px="1.5rem"
      {...props}
    >
      <Flex
        alignItems="center"
        position="relative"
        height="100%"
        overflow="hidden"
      >
        <Text fontSize={fontsize} mr={link ? '8px' : '0px'}>
          {text}
        </Text>
        {link && <Text fontSize="100px">{'>'}</Text>}
      </Flex>
    </Button>
  )
}

export default StyledButton
