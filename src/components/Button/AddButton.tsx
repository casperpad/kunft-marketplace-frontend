import React from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import styled from 'styled-components'
import { border, layout, space, typography } from 'styled-system'
import { BaseButtonProps } from './types'

interface AddButtonProps extends BaseButtonProps {
  onClick?: any
}

const StyledButton = styled.button<BaseButtonProps>`
  background-color: transparent;
  position: sticky;
  right: 2rem;
  bottom: 2rem;
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.primary};
  ${border}
  ${layout}
  ${space}
  ${typography}
`

export default function AddButton(props: AddButtonProps) {
  return (
    <StyledButton type="button" {...props}>
      <MdAddCircleOutline />
    </StyledButton>
  )
}
