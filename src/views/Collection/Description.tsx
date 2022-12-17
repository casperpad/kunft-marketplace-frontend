import React, { useState, useEffect } from 'react'
import {
  Image,
  VerifiedIcon,
  Heading,
  Flex,
  IconButton,
  useTooltip,
} from '@kunftmarketplace/uikit'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IoMdShare } from 'react-icons/io'
import styled from 'styled-components'
import { CasperExplorerLink, Text } from '@/components'
import { useSsr } from '@/hooks'
import { Collection } from '@/types'
import { getCsprExplorer } from '@/utils/casper'

export default function Description({
  collection: { name, verified, logo, contractPackageHash, description },
}: {
  collection: Collection
}) {
  const [copied, setCopied] = useState(false)
  const { targetRef: targetRefFineTuned, tooltip } = useTooltip(
    copied ? 'Copied' : 'Share',
    {
      placement: 'top',
    },
  )
  const { isBrowser } = useSsr()

  useEffect(() => {
    if (copied) setTimeout(() => setCopied(false), 1000)
  }, [copied])
  return (
    <Container>
      <CollectionLogoWrapper>
        <CollectionLogo
          src={logo}
          width="120px"
          height="120px"
          display="fixed"
        />
        {verified && <VerifiedIcon width={32} height={32} />}
      </CollectionLogoWrapper>
      <Flex flexDirection="column" alignItems="start" gap={16}>
        <Flex flexDirection="column" gap={8}>
          <Heading as="h1">{name}</Heading>
          {description && <Text as="p">{description}</Text>}
        </Flex>
        <Flex flexDirection="row" alignItems="center" gap={8}>
          <CopyToClipboard
            text={isBrowser ? window.location.href : ''}
            onCopy={() => setCopied(true)}
          >
            <ButtonWrapper ref={targetRefFineTuned}>
              <IconButton scale="sm">
                <IoMdShare />
              </IconButton>
              {tooltip}
            </ButtonWrapper>
          </CopyToClipboard>

          <CasperExplorerLink
            href={getCsprExplorer(contractPackageHash, 'contract-package')}
          />
        </Flex>
      </Flex>
    </Container>
  )
}

const Container = styled(Flex)`
  flex-direction: row;
  align-items: center;
  gap: 32px;
  margin: 24px;
`

const CollectionLogo = styled(Image)`
  border-radius: 20%;
`

const CollectionLogoWrapper = styled.div`
  position: relative;
  width: max-content;
  svg {
    position: absolute;
    bottom: 0px;
    right: 0px;
  }
`

const ButtonWrapper = styled.div`
  button {
    border-radius: 20%;
  }
`
