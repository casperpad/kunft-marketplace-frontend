import styled from 'styled-components'
import { border, layout, space, typography, color } from 'styled-system'

import { BaseButtonProps } from './types'

export const DefaultButton = styled.button<BaseButtonProps>`
  background-color: ${({ theme }) => theme.colors.primary};
  border: 0;
  ${border}
  ${layout}
  ${space}
  ${typography}
  ${color}
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
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
  &:disabled {
  }
`
