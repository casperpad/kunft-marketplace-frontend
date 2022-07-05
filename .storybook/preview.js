import '../public/fonts/server.css'
import '../src/styles/globals.css'
import '../src/assets/scss/main.scss'

import { light } from '../src/theme'
import { ThemeProvider } from 'styled-components'
import { addDecorator } from '@storybook/react'
import { withThemesProvider } from 'storybook-addon-styled-component-theme'

import * as NextImage from 'next/image'

const themes = [light]
addDecorator(withThemesProvider(themes), ThemeProvider)

const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'twitter',
    values: [
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
}
