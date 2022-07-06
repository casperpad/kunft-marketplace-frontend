import { Flex } from '@components/Box'
import { Text } from '@components/Text'
import { NFTType } from '../../types/nft.types'

import { Button } from './Button'
import { BaseButtonProps } from './types'

interface SaleButtonProps extends BaseButtonProps {
  type: NFTType
  onClick?: () => void
}

const SaleButton: React.FC<SaleButtonProps> = ({ type, ...props }) => {
  const text = type === 'Sale' ? 'BUY NOW' : 'MAKE OFFER'
  const show = type === 'Sale' || type === 'NoneSale'

  if (show) {
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

  return null
}

export default SaleButton
