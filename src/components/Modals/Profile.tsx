import React, { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import Modal from 'styled-react-modal'

import { Box, Flex } from '@/components/Box'
import { CardButton } from '@/components/Button'
import { ModalInput } from '@/components/Input'
import { Text } from '@/components/Text'
import { User } from '@/types'

export type SubmitProps = {
  name: string
  avatar?: string
  description?: string
  email: string
}

interface ProfileProps extends User {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  onSave: (user: SubmitProps) => Promise<void>
}

export default function Profile({
  show,
  setShow,
  onSave,
  ...user
}: ProfileProps) {
  const profileAvatar = user.avatar || '/assets/images/Avatar/Default.svg'
  const [name, setName] = useState(user.name || '')
  const [email, setEmail] = useState(user.email || '')
  const [avatar, setAvatar] = useState(user.avatar)
  const [description, setDescription] = useState(user.description || '')

  const closeModal = () => {
    setShow(false)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmitProps>()

  const onSubmit = handleSubmit(async () => {
    const newUser: SubmitProps = {
      name: name!,
      email: email!,
      avatar,
      description,
    }
    await onSave(newUser)
  })

  return (
    <StyledModal
      isOpen={show}
      onBackgroundClick={closeModal}
      onEscapeKeydown={closeModal}
    >
      <form>
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
          <ModalInput
            placeholder="Input Username"
            value={name}
            {...register('name', { required: true })}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <StyledError>This field is required</StyledError>}
        </InputContainer>
        <InputContainer>
          <Text fontSize="15px" color="background">
            WALLET ADDRESS
          </Text>
          <ModalInput
            placeholder="Wallet Address"
            readOnly
            backgroundColor="inputSecondary"
            value={user.publicKey}
          />
        </InputContainer>
        <InputContainer>
          <Text fontSize="15px" color="background">
            EMAIL ADDRESS
          </Text>
          <ModalInput
            placeholder="Input Email Address"
            type="email"
            value={email}
            {...register('email', {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <StyledError>
              {errors.email.message || 'This field is required'}
            </StyledError>
          )}
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
          <ModalInput
            placeholder="Input NFT URL"
            value={avatar}
            {...register('avatar')}
            onChange={(e) => setAvatar(e.target.value)}
          />
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
          <ModalInput
            placeholder="Tell the world something about yourself"
            value={description}
            {...register('description')}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputContainer>
        <SaveButton type="submit" text="SAVE" onClick={onSubmit} />
      </form>
    </StyledModal>
  )
}

const StyledError = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 10px;
`

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
