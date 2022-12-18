import Image from 'next/image'
import styled from 'styled-components'

import { Flex, Grid, Box, Text, Layout } from '@/components'

export const AvatarWrapper = styled(Box)`
  min-width: 235px;
  height: 235px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
`

export const StyledImage = styled(Image)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 100%;
  &:hover {
    border-radius: 0px;
  }
`

export const Title = styled(Text)`
  font-size: 27px;

  ${({ theme }) => theme.mediaQueries.xl2} {
    font-size: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    font-size: 27px;
  }
`

export const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 12px;
`

export const NameContainer = styled(Box)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 34px 34px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 235px;
  }

  .star-svg {
    display: inline;
  }
`

export const UserInfo = styled(Flex)`
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const NFTContainer = styled(Grid)`
  display: grid;
  width: 100%;
  gap: 20px;
  margin: 0px 40px 0px 40px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export const Container = styled(Layout)`
  padding-left: 14px;
  padding-right: 14px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 56px;
    padding-right: 56px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 76px;
    padding-right: 76px;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    padding-left: 86px;
    padding-right: 86px;
  }
`
