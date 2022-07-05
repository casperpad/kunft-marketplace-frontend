import { LayoutProps, SpaceProps, BorderProps } from 'styled-system'

export const variants = {
  PRIMARY: 'primary',
  DISABLE: 'disable',
}

export interface BaseButtonProps extends LayoutProps, SpaceProps, BorderProps {
  color?: string
}
