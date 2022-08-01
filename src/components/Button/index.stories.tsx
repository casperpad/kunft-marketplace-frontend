import React from 'react'

import { Text } from '@/components/Text'

import AddButton from './AddButton'
import { Button as ButtonComponent } from './Button'
import SaleButton from './CardButton'
import StyledButton from './StyledButton'

export default {
  title: 'Components/Buttons',
  component: ButtonComponent,
  argTypes: {},
}

export const Button: React.FC = () => {
  return (
    <div>
      <ButtonComponent>
        <Text>Button</Text>
      </ButtonComponent>
      <StyledButton text="Styled Button" />
      <SaleButton text="BUY NOW" />
      <SaleButton text="MAKE OFFER" />
      <AddButton borderRadius={9999} />
    </div>
  )
}
