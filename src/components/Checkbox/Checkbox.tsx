import styled from 'styled-components'

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Icon = styled.div`
  position: relative;
  border: 0;
  width: 4px;
  height: 4px;
  left: 3px;
  top: 3px;
  background-color: ${({ theme }) => theme.colors.primary};
`

const StyledCheckbox = styled.div<{
  checked: boolean
}>`
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid ${({ theme }) => `${theme.colors.border}44`};
  background-color: ${({ theme }) => theme.colors.checkbox};

  ${Icon} {
    visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
  }
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

export interface CheckboxProps {
  name?: string
  value?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Checkbox({ checked, ...props }: CheckboxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked || false}>
        <Icon />
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
