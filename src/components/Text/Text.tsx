import styled, { DefaultTheme } from 'styled-components'
import { space, typography, layout } from 'styled-system'
import getThemeValue from 'utils/getThemeValue'

import { TextProps } from './types'

interface ThemeProps extends TextProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemeProps) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const Text = styled.div<TextProps>`
  color: ${getColor};
  line-height: 1.5;
  ${space}
  ${typography}
  ${layout}

  ${({ fontWeight }) => `font-weight: ${fontWeight || 300}`}
  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
`

Text.defaultProps = {
  color: 'text',
}

export default Text
