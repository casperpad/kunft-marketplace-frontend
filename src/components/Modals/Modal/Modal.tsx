import React, { useRef } from 'react'

import {
  ModalBody,
  ModalHeader,
  ModalTitle,
  ModalContainer,
  ModalCloseButton,
  ModalBackButton,
} from './styles'
import { ModalProps } from './types'

export const MODAL_SWIPE_TO_CLOSE_VELOCITY = 300

const Modal: React.FC<ModalProps> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = '24px',
  minWidth = '320px',
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    // @ts-ignore
    <ModalContainer ref={wrapperRef} minWidth={minWidth} {...props}>
      <ModalHeader>
        <ModalTitle>
          {onBack && <ModalBackButton onBack={onBack} />}
          {title}
        </ModalTitle>
        {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
      </ModalHeader>
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  )
}

export default Modal
