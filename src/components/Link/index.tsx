import React from 'react'
import NextLink from 'next/link'
import styled, { css } from 'styled-components'

interface LinkProps {
  href: string
  children: React.ReactNode
  active?: boolean
}

export default function Link({ href, children, active, ...props }: LinkProps) {
  return (
    <NextLink href={href} passHref>
      <StyledLink {...props} active={active}>
        {children}
      </StyledLink>
    </NextLink>
  )
}

const StyledLink = styled.a<{ active?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s;
  ${({ active }) => {
    if (active)
      return css`
        color: ${({ theme }) => `${theme.colors.primary}`};
      `
  }};
  &:hover {
    color: ${({ theme }) => `${theme.colors.primary}88`};
  }
`
