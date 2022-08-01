import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import Modal from 'styled-react-modal'

import { Box, Flex } from '@/components/Box'
import { CardButton } from '@/components/Button'
import { ModalInput } from '@/components/Input'
import { Text } from '@/components/Text'

const StyledImage = styled(Image)`
  border-radius: 100%;
  min-width: 100px;
`

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

interface ProfileProps {
  name?: string
  walletAddress?: string
  emailAddress?: string
  NFTurl?: string
  description?: string
  avatar?: string
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Profile({ avatar, show, setShow }: ProfileProps) {
  const profileAvatar = avatar || '/assets/images/Avatar/Default.svg'

  const closeModal = () => {
    setShow(false)
  }

  return (
    <StyledModal
      isOpen={show}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <Flex
        flexDirection="row"
        alignItems="center"
        mb="9px"
        justifyContent="space-between"
      >
        <StyledImage src={profileAvatar} alt="" width={100} height={100} />
        <Text fontSize="30px" color="background" textAlign="center" ml="19px">
          PROFILE SETTINGS
        </Text>
      </Flex>
      <InputContainer>
        <Text fontSize="15px" color="background">
          USERNAME
        </Text>
        <ModalInput placeholder="Input Username" />
      </InputContainer>
      <InputContainer>
        <Text fontSize="15px" color="background">
          WALLET ADDRESS
        </Text>
        <ModalInput
          placeholder="Wallet Address"
          readOnly
          backgroundColor="inputSecondary"
        />
      </InputContainer>
      <InputContainer>
        <Text fontSize="15px" color="background">
          EMAIL ADDRESS
        </Text>
        <ModalInput placeholder="Input Email Address" />
      </InputContainer>
      <InputContainer>
        <Flex flexDirection="row" alignItems="end">
          <Text fontSize="15px" color="background">
            DISPLAY PICTURE NFT
          </Text>
          <Text fontSize="8px" color="background">
            Optional
          </Text>
        </Flex>
        <ModalInput placeholder="Input NFT URL" />
      </InputContainer>
      <InputContainer>
        <Flex flexDirection="row" alignItems="end">
          <Text fontSize="15px" color="background">
            PROFILE BIO
          </Text>
          <Text fontSize="8px" color="background">
            Optional
          </Text>
        </Flex>
        <ModalInput placeholder="Tell the world something about yourself" />
      </InputContainer>
      <SaveButton text="SAVE" />
    </StyledModal>
  )
}
