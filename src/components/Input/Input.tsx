/* eslint-disable @typescript-eslint/no-non-null-assertion */
import styled, { DefaultTheme } from 'styled-components'
import getThemeValue from '@/utils/getThemeValue'
import { InputProps } from './types'

interface StyledInputProps extends InputProps {
  theme: DefaultTheme
}

const getColor =
  (color: string) =>
  ({ theme }: StyledInputProps) => {
    return getThemeValue(`colors.${color}`, color)(theme)
  }

const Input = styled.input<InputProps>`
  color: ${({ textColor }) => getColor(textColor as string)};
  background-color: ${({ backgroundColor }) =>
    getColor(backgroundColor as string)};
  font-family: 'Avenir';
  font-weight: 300;
  vertical-align: center;
  height: 51px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
`

Input.defaultProps = {
  color: 'text',
  backgroundColor: 'transparent',
}

export default Input
