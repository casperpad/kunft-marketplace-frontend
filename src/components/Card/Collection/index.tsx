import React, { useRef } from 'react'
import { Image } from '@kunftmarketplace/uikit'
import Avatar from 'react-avatar'
import { MdVerified } from 'react-icons/md'
import styled from 'styled-components'

import { useWindowSize } from '@/hooks'
import { Collection } from '@/types'
import Link from '../../Link'

export default function CollectionCard({
  slug,
  logo,
  name,
  verified,
}: Collection) {
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [width] = useWindowSize()
  return (
    <Link href={`/collections/${slug}`}>
      <StyledCollectionCard ref={ref}>
        {logo ? (
          <ImageWrapper>
            <StyledImage
              src={logo}
              width={320}
              height={320}
              display="cover"
              alt={name}
            />
          </ImageWrapper>
        ) : (
          <Avatar
            name={name}
            size={`${ref.current?.clientWidth || 320}`}
            round="10px"
          />
        )}
        <StyledNameContainer>
          <span>{name}</span>
          {verified ? <MdVerified /> : null}
        </StyledNameContainer>
      </StyledCollectionCard>
    </Link>
  )
}

const StyledCollectionCard = styled.div`
  position: relative;
  background-color: transparent;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.base};
  font-family: 'Avenir';
  font-weight: lighter;
  transition: all 0.3s;
  height: max-content;
  margin-bottom: 40px;
`

const StyledNameContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  font-size: 20px;
  width: 100%;
  padding: 4px 0px;
  svg {
    color: #4980f8;
    &:hover {
      color: #4980f8;
    }
  }
`

const StyledImage = styled(Image)`
  transition: all 1s;
  &:hover {
    transform: scale(1.15);
  }
`
const ImageWrapper = styled.div`
  border-radius: 10px 10px 0px 0px;
  position: relative;
  overflow: hidden;
  z-index: 1;
`
