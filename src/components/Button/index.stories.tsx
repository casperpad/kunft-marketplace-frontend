import React from 'react'

import Text from '@components/Text/Text'

import { Button as ButtonComponent } from './Button'
import SaleButton from './SaleButton'
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
      <SaleButton type="Sale" />
      <SaleButton type="NoneSale" />
    </div>
  )
}
