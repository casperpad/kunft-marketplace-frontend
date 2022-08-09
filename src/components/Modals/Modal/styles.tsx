import React from 'react'
import { IoMdClose, IoMdArrowBack } from 'react-icons/io'
import styled from 'styled-components'
import Flex from '../../Box/Flex'
// import { MotionBox } from "../../components/Box";
// import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
// import { IconButton } from "../../components/Button";
import { ModalProps } from './types'

export const mobileFooterHeight = 73

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  display: flex;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ background }) => background || 'transparent'};
  }
`

export const ModalTitle = styled(Flex)`
  font-size: 20px;
  font-family: 'Castle';
  align-items: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  max-height: calc(90vh - ${mobileFooterHeight}px);
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-height: 90vh;
  }
`

export const ModalCloseButton: React.FC<{
  onDismiss: ModalProps['onDismiss']
}> = ({ onDismiss }) => {
  return (
    <button type="button" onClick={onDismiss} aria-label="Close the dialog">
      <IoMdClose />
    </button>
  )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({
  onBack,
}) => {
  return (
    <button type="button" onClick={onBack} aria-label="Close the dialog">
      <IoMdArrowBack />
    </button>
  )
}

export const ModalContainer = styled.div<{ minWidth: string }>`
  overflow: hidden;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows.base};
  /* border-radius: 5px 5px 0px 0px; */
  width: 80%;
  max-height: 90vh;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: fixed;
  min-width: ${({ minWidth }) => minWidth};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: none !important;

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    position: auto;
    bottom: auto;
    border-radius: 12px;
    max-width: 100%;
    max-height: 100vh;
  }
`
