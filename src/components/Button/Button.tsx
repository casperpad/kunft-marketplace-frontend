import styled, { DefaultTheme } from 'styled-components'
import { border, layout, space } from 'styled-system'
import getThemeValue from 'utils/getThemeValue'

import { BaseButtonProps } from './types'

interface ThemeProps extends BaseButtonProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemeProps) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

const Button = styled.div<BaseButtonProps>`
  background-color: ${getColor};
  ${border}
  ${layout}
  ${space}
`

Button.defaultProps = {
  color: 'primary',
}

export default Button
