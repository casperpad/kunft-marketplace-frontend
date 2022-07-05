import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface TextProps extends LayoutProps, SpaceProps, TypographyProps {
  color?: string
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  fontWeight?: number
}
