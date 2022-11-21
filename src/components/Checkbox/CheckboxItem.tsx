/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components'

import { Text } from '@/components/Text'

import Checkbox, { CheckboxProps } from './Checkbox'

const StyledText = styled(Text)<{ disabled: boolean }>`
  font-size: 14px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.checkboxDisabled : theme.colors.text};
`

const Container = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

interface CheckboxItemProps extends CheckboxProps {
  text: string
  disabled?: boolean
  name?: string
}

export default function CheckboxItem({
  text,
  disabled = false,
  ...props
}: CheckboxItemProps) {
  return (
    <Container>
      <Checkbox {...props} />
      <StyledText disabled={disabled}>{text}</StyledText>
    </Container>
  )
}
