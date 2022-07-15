import styled, { DefaultTheme } from 'styled-components'
import { border, layout, space, typography } from 'styled-system'
import getThemeValue from '@utils/getThemeValue'

import { BaseButtonProps } from './types'

interface ThemeProps extends BaseButtonProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemeProps) => {
  return getThemeValue(`colors.${color}`, color)(theme)
}

export const DefaultButton = styled.button.attrs({
  type: 'button',
})<BaseButtonProps>`
  background-color: ${getColor};
  border: 0;
  ${border}
  ${layout}
  ${space}
  ${typography}
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
`

DefaultButton.defaultProps = {
  color: 'primary',
}

export const Button = styled(DefaultButton)`
  box-shadow: ${({ theme }) => theme.shadows.base};
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
  }
`
