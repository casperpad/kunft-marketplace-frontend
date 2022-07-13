import Image from 'next/image'
import styled from 'styled-components'

import { DefaultButton, CardButton } from '@components/Button'

export const StarsButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.primary};
`

export const SaleButton = styled(CardButton)`
  opacity: 0;
  position: absolute;
  width: 100%;
`

export const ImageContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const StyledImage = styled(Image)`
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`

export const Container = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-family: 'Avenir';
  font-weight: lighter;
  margin: 40px 10px;
  transition: all 0.3s;
  cursor: pointer;
  width: 320px;
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.hover};
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    ${StyledImage} {
    }
    ${SaleButton} {
      opacity: 1;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`
