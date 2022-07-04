import React from 'react'

import { ThemeProvider } from 'styled-components'

export const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    transparent: 'transparent',
    orange_600: '#FA5F0C',
    gray_200: '#E5E5E5',
    gray_300: '#C4C4C4',
    gray_600: '#494949',
    gray_900: '#191919',
  },
  fonts: {
    Avenir: 'Avenir',
    Castle: 'Castle',
  },
}

interface ThemeProps {
  children: React.ReactNode
}

export default function Theme({ children }: ThemeProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
