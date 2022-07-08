import React from 'react'

import Input from './Input'
import ModalInput from './ModalInput'

export default {
  title: 'Components/Inputs',
  component: Input,
  argTypes: {},
}

export const CustomInput: React.FC = () => {
  return (
    <div>
      <Input />
      <ModalInput />
      <ModalInput
        readOnly
        backgroundColor="inputSecondary"
        value="Read Only Text"
      />
    </div>
  )
}
