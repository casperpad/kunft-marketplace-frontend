import base from './base'

export type Breakpoints = typeof base.breakpoints

export type MediaQueries = typeof base.mediaQueries

export type Shadows = typeof base.shadows

export type Colors = {
  primary: string
  background: string
  backgroundSecondary: string
  text: string
  textSecondary: string
  input: string
  inputSecondary: string
  border: string
  disabled: string
}
