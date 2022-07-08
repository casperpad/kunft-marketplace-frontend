import styled from 'styled-components'
import Input from './Input'

const ModalInput = styled(Input)`
  height: 35px;
  padding-left: 10px;
  text-align: left;
  border-radius: 10px;
  border-width: 0px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  width: 100%;
  font-size: 13px;
  &:focus {
    background-color: ${({ theme }) => theme.colors.inputSecondary};
    border-width: 0px;
  }
`

ModalInput.defaultProps = {
  textColor: 'textSecondary',
  backgroundColor: 'input',
}

export default ModalInput
