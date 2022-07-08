/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import NextLink from 'next/link'
import styled from 'styled-components'
import { Text } from '@components/Text'

const StyledText = styled(Text)`
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

interface CustomLinkProps {
  as?: string
  className?: string
  children: React.ReactNode
  href: string
  active?: boolean
}

const CustomLink: React.FC<CustomLinkProps> = ({
  as,
  children,
  className,
  href,
  active,
}) => {
  return (
    <NextLink href={href} as={as} passHref>
      <StyledText color={active ? 'primary' : 'text'}>
        <a className={className}>{children}</a>
      </StyledText>
    </NextLink>
  )
}

export default CustomLink
