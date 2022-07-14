import { useState } from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { DiscoverFilter } from '@components/Filter'

const CustomFilter = styled(DiscoverFilter)`
  position: sticky;
  top: 184px;

  &:after {
    content: '';
    position: absolute;
    top: 10px;
    right: 25px;
  }
`

const Container = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  padding: 120px 0px 120px 46px;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;

  ${({ theme }) => theme.mediaQueries.xl} {
    position: relative;
  }
`

export default function Filter() {
  const [text, setText] = useState('hide')
  const [show, setShow] = useState(true)

  const toggleShow = () => {
    setShow(!show)
    setText((prev) => (prev === 'hide' ? 'show' : 'hide'))
  }

  return <Container>{show && <CustomFilter />}</Container>
}
