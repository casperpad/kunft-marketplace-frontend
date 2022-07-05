import { Breakpoints, Colors, MediaQueries } from './types'

export interface Theme {
  isDark: boolean
  colors: Colors
  breakpoints: Breakpoints
  mediaQueries: MediaQueries
}

export { darkColors, lightColors } from './colors'
export { default as dark } from './dark'
export { default as light } from './light'
export * from './types'
