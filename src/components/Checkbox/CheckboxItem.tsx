/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components'

import { Text } from '@components/Text'

import Checkbox from './Checkbox'

const StyledText = styled(Text)<{ disabled: boolean }>`
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.checkbox : theme.colors.text};
`

const Container = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

interface CheckboxItemProps {
  text: string
  disabled?: boolean
  checked: boolean
  setChecked: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CheckboxItem({
  text,
  disabled = false,
  checked,
  setChecked,
}: CheckboxItemProps) {
  return (
    <Container>
      <Checkbox
        checked={checked}
        onChange={(e) => !disabled && setChecked(e.target.checked)}
      />
      <StyledText disabled={disabled}>{text}</StyledText>
    </Container>
  )
}