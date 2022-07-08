import { Flex } from '@components/Box'
import { Text } from '@components/Text'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface CardButtonProps extends BaseButtonProps {
  text: string
  onClick?: () => void
}

const CardButton: React.FC<CardButtonProps> = ({ text, ...props }) => {
  return (
    <Button
      borderBottomLeftRadius={10}
      borderBottomRightRadius={10}
      height={47}
      pt="6px"
      {...props}
    >
      <Flex alignItems="center" justifyContent="center">
        <Text fontSize="22px" fontFamily="Castle">
          {text}
        </Text>
      </Flex>
    </Button>
  )
}

export default CardButton
