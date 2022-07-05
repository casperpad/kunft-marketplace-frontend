import React from 'react'

import Text from './Text'

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    fontSize: {
      name: 'fontSize',
      table: {
        type: { summary: 'string', detail: 'Fontsize in px or em' },
        defaultValue: { summary: '16px' },
      },
      control: {
        type: null,
      },
    },
    color: {
      name: 'color',
      table: {
        type: {
          summary: 'string',
          detail: 'Color from the theme, or CSS color',
        },
        defaultValue: { summary: 'theme.colors.text' },
      },
      control: {
        type: null,
      },
    },
  },
}

export const Primary = () => {
  return (
    <div>
      <Text>Default</Text>
      <Text fontSize="30px">Custom fontsize</Text>
      <Text fontWeight={500}>FontWeight</Text>
      <Text fontFamily="Avenir">Avenir default</Text>
      <Text fontFamily="Avenir" fontWeight={500}>
        Avenir 500 fontweight
      </Text>
      <Text fontFamily="Avenir" fontWeight={700} fontSize="40px">
        Avenir 700 fontweight
      </Text>
      <Text color="red">Red Text</Text>
      <Text color="primary">Primary Text</Text>
      <Text textAlign="center">Center</Text>
    </div>
  )
}
