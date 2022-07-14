import styled from 'styled-components'

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  border: 0;

  &:after {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.checkbox};
    border: 1px solid ${({ theme }) => theme.colors.border};
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }

  &:before {
    content: '';
    position: absolute;
    background-color: ${({ theme }) => theme.colors.primary};
    border: 0;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
  }

  &:checked {
    &:before {
      display: block;
    }
  }
`

export default Checkbox
