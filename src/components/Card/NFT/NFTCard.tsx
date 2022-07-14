import React from 'react'

import { BigNumberish } from '@ethersproject/bignumber'
import { BsHeart, BsHeartFill } from 'react-icons/bs'

import { Box, Flex } from '@components/Box'
import { CustomLink } from '@components/Link'
import { Text } from '@components/Text'

import { NFTType } from '../../../types/nft.types'

import {
  StarsButton,
  SaleButton,
  StyledImage,
  ImageContainer,
  Container,
  NameContainer,
  ValueContainer,
} from './NFTCard.styles'

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
  const show = type !== 'NoneSale'

  return (
    <CustomLink href="/nftview">
      <Container>
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
          <NameContainer>
            <Text fontFamily="Castle">{name}</Text>
            <Text>Price</Text>
          </NameContainer>
          <ValueContainer>
            <Flex flexDirection="row" alignItems="center">
              <StarsButton color="transparent" onClick={onStarClick}>
                {userStarred ? <BsHeartFill /> : <BsHeart />}
              </StarsButton>
              <Text ml="4px">{stars}</Text>
            </Flex>
            <Text color="primary">{price.toLocaleString()}</Text>
          </ValueContainer>
        </Box>
        {show && <SaleButton onClick={props.onClick} text={text} />}
      </Container>
    </CustomLink>
  )
}
