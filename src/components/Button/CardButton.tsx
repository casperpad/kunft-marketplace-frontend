import { Flex } from '@/components/Box'
import { Text } from '@/components/Text'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface CardButtonProps extends BaseButtonProps {
  text: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const CardButton: React.FC<CardButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      borderBottomLeftRadius={10}
      borderBottomRightRadius={10}
      fontSize="22px"
      py="6px"
      {...props}
    >
      <Flex justifyContent="center">
        <Text fontFamily="Castle">{text}</Text>
      </Flex>
    </Button>
  )
}

export default CardButton
