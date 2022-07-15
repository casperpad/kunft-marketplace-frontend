import React from 'react'
import styled from 'styled-components'
import Modal from 'styled-react-modal'

import { Box } from '@components/Box'
import { CardButton } from '@components/Button'
import { ModalInput } from '@components/Input'
import { Text } from '@components/Text'

const InputContainer = styled(Box)`
  margin-top: 12px;
  font-family: 'Avenir';
`

const SaveButton = styled(CardButton)`
  position: absolute;
  width: 100%;
  bottom: 0px;
  left: 0px;
  transform: translateY(100%);
`

const MyModal = Modal.styled``

const StyledModal = styled(MyModal)`
  position: relative;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: 10px 10px 0px 0px;
  margin: auto 10px;

  max-width: 700px;
  z-index: 300;

  padding: 30px 47px 38px 48px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 38px 57px 48px 64px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 44px 67px 56px 74px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    padding: 44px 77px 56px 84px;
  }
`

interface ImportTokenProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ImportToken({ show, setShow }: ImportTokenProps) {
  const closeModal = () => {
    setShow(false)
  }

  return (
    <StyledModal
      isOpen={show}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <InputContainer>
        <Text fontSize="15px" color="background">
          CONTRACT ADDRESS
        </Text>
        <ModalInput
          placeholder="Input Contract Address"
          readOnly
          backgroundColor="inputSecondary"
        />
      </InputContainer>
      <InputContainer>
        <Text fontSize="15px" color="background">
          TOKEN ID
        </Text>
        <ModalInput placeholder="Input Token ID" />
      </InputContainer>
      <SaveButton text="IMPORT" />
    </StyledModal>
  )
}
