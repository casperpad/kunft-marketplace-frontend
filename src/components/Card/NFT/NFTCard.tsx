import React from 'react'

import { BigNumberish } from '@ethersproject/bignumber'
import Image from 'next/image'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import styled from 'styled-components'

import { Box, Flex } from '@components/Box'
import { DefaultButton, CardButton } from '@components/Button'
import { Text } from '@components/Text'

import { NFTType } from '../../../types/nft.types'

const StarsButton = styled(DefaultButton)`
  color: ${({ theme }) => theme.colors.primary};
`

const SaleButton = styled(CardButton)`
  opacity: 0;
  position: absolute;
  width: 100%;
`

const ImageContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const StyledImage = styled(Image)`
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`

const NFTCardContainer = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  width: 320px;
  font-family: 'Avenir';
  font-weight: lighter;
  margin: 40px 10px;
  transition: all 0.3s;
  cursor: pointer;
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

interface NFTCardProps {
  image: string
  name: string
  price: BigNumberish
  stars: number
  userStarred: boolean
  type: NFTType
  onStarClick?: () => void
  onClick?: () => void
}

export default function NFTCard({
  image,
  name,
  price,
  stars,
  userStarred,
  type,
  onStarClick,
  ...props
}: NFTCardProps) {
  const text = type === 'Sale' ? 'BUY NOW' : 'MAKE OFFER'
  const show = true

  return (
    <NFTCardContainer>
      <ImageContainer>
        <StyledImage
          src={image}
          width={320}
          height={320}
          layout="responsive"
          alt={name}
        />
      </ImageContainer>
      <Box px="28px" py={[14, 17]}>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          fontSize="27px"
          alignItems="center"
        >
          <Text fontFamily="Castle">{name}</Text>
          <Text>Price</Text>
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          fontSize="20px"
          mt="4px"
          alignItems="center"
        >
          <Flex flexDirection="row" alignItems="center">
            <StarsButton color="transparent" onClick={onStarClick}>
              {userStarred ? <BsHeartFill /> : <BsHeart />}
            </StarsButton>
            <Text ml="4px">{stars}</Text>
          </Flex>
          <Text color="primary">{price.toLocaleString()}</Text>
        </Flex>
      </Box>
      {show && <SaleButton onClick={props.onClick} text={text} />}
    </NFTCardContainer>
  )
}
