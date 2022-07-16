/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components'

import { Box, Text } from '@components/index'

import Checkbox from './Checkbox'

const StyledText = styled(Text)<{ disabled: boolean }>`
  margin-left: 8px;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.checkbox : theme.colors.text};
`

const Container = styled(Box)`
  display: inline-block;
  vertical-align: middle;
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
      <label>
        <Checkbox
          checked={checked}
          onChange={(e) => !disabled && setChecked(e.target.checked)}
        />
        <StyledText disabled={disabled}>{text}</StyledText>
      </label>
    </Container>
  )
}
