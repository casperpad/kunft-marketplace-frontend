import React from 'react'

import Checkbox from './Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {},
}

export const CustomCheckbox: React.FC = () => {
  return (
    <div>
      <Checkbox />
    </div>
  )
}
