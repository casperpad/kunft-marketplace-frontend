import React from 'react'

import { BigNumberish } from '@ethersproject/bignumber'
import Image from 'next/image'
import Link from 'next/link'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import styled from 'styled-components'

import { NFTType } from 'types/nft.types'

const Button = styled.button`
  border: 0px;
  background-color: white;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.8;
  }
`

const StarsButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.primary};
  fill: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  line-height: 2rem;
`

const SaleButton = styled(Button)`
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  transform: translateY(100%);
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 100%;
  padding: 8px;
  font-family: 'Castle';
  font-size: 1.125rem;
  line-height: 1.75rem;
`

const ImageContainer = styled.div`
  border-radius: 100%;
  overflow: hidden;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-top: 1px solid black;
`

const FlexCol = styled.div.attrs((props: { align: string }) => props)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: ${(props) => props.align};
`

const Text = styled.div.attrs(
  (props: {
    size: string
    line_height: string
    color?: boolean
    castle?: boolean
  }) => props,
)`
  font-family: ${(props) => (props.castle ? 'Castle' : 'Avenir')};
  font-size: ${(props) => props.size};
  color: ${(props) =>
    props.color ? props.theme.colors.primary : props.theme.colors.text};
`

const NFTCardContainer = styled.div`
  position: relative;
  background-color: white;
  border-width: 1px solid;
  min-width: min-content;
  font-family: 'Avenir';
  font-weight: lighter;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-color: transparent;
    ${ImageContainer} {
      border-radius: 0;
    }
    ${FlexRow} {
      border-color: transparent;
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
  onStarClick: () => void
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
  return (
    <Link href="/component">
      <NFTCardContainer className="group">
        <ImageContainer>
          <Image
            src={image}
            width={320}
            height={320}
            layout="responsive"
            alt={name}
          />
        </ImageContainer>
        <FlexRow>
          <FlexCol align="flex-start">
            <Text castle size="30px" line_height="36px">
              {name}
            </Text>
            <StarsButton onClick={onStarClick}>
              {userStarred ? <BsHeartFill /> : <BsHeart />}
              {stars}
            </StarsButton>
          </FlexCol>
          <FlexCol align="flex-end">
            <Text size="30px" line_height="36px">
              Price
            </Text>
            <Text color size="24px" line_height="32px">
              {price.toLocaleString()}
            </Text>
          </FlexCol>
        </FlexRow>

        {(type === 'NoneSale' || type === 'Sale') && (
          <SaleButton onClick={props.onClick}>
            {type === 'Sale' ? 'BUY NOW' : 'MAKE OFFER'}
          </SaleButton>
        )}
      </NFTCardContainer>
    </Link>
  )
}
