import Image from 'next/image'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { DefaultButton, CardButton } from '@components/Button'

export const StarsButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.primary};
`

export const SaleButton = styled(CardButton)`
  opacity: 0;
  position: absolute;
  width: 100%;
  font-size: 17px;
  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 22px;
  }
`

export const ImageContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

export const StyledImage = styled(Image)`
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`

const StyledFlex = styled(Flex)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const DataContainer = styled(Box)`
  padding: 10px 18px 7px;
  ${({ theme }) => theme.mediaQueries.xl3} {
    padding: 17px 28px 14px;
  }
`

export const NameContainer = styled(StyledFlex)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 27px;
  }
`

export const ValueContainer = styled(StyledFlex)`
  font-size: 15px;
  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 20px;
  }
`

export const Container = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-family: 'Avenir';
  font-weight: lighter;
  transition: all 0.3s;
  cursor: pointer;
  min-width: min-content;
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
