import React from 'react'
import styled from 'styled-components'

interface ExternalLinkProps {
  icon: React.ReactNode
  href: string
}

export default function ExternalIconLink({ icon, href }: ExternalLinkProps) {
  return (
    <StyledExternalLink href={href} target="_none">
      {icon}
    </StyledExternalLink>
  )
}

const StyledExternalLink = styled.a``
