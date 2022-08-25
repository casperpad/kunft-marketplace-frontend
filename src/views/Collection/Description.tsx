import React from 'react'
import {
  Image,
  VerifiedIcon,
  Heading,
  Flex,
  IconButton,
  useTooltip,
} from '@kunftmarketplace/uikit'
import { IoMdShare } from 'react-icons/io'
import styled from 'styled-components'
import { CasperExplorerLink } from '@/components'
import { Collection } from '@/types'
import { getCsprExplorer } from '@/utils/casper'

export default function Description({
  collection: { name, verified, logo, contractPackageHash },
}: {
  collection: Collection
}) {
  const {
    tooltipVisible: tooltipVisibleFineTuned,
    targetRef: targetRefFineTuned,
    tooltip: tooltipFineTuned,
  } = useTooltip('Share', {
    placement: 'top',
  })
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
      <Flex flexDirection="row" alignItems="center" gap={16}>
        <Heading as="h1">{name}</Heading>
        <Flex flexDirection="row" alignItems="center" gap={8}>
          <ButtonWrapper ref={targetRefFineTuned}>
            <IconButton scale="sm">
              <IoMdShare />
            </IconButton>
            {tooltipVisibleFineTuned && tooltipFineTuned}
          </ButtonWrapper>
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
