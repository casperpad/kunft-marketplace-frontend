import {
  LayoutProps,
  SpaceProps,
  BorderProps,
  TypographyProps,
} from 'styled-system'

export const variants = {
  PRIMARY: 'primary',
  DISABLE: 'disable',
}

export interface BaseButtonProps
  extends LayoutProps,
    SpaceProps,
    BorderProps,
    TypographyProps {
  color?: string
  onClick?: any
  disabled?: boolean
}
