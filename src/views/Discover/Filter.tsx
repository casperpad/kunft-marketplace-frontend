import { useState, useEffect } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { DiscoverFilter } from '@components/Filter'
import useWindowSize from '@hooks/useWindowResize'

const FilterContainer = styled(Flex)`
  position: sticky;
  top: 184px;
  transition: all 0.3s;
  height: max-content;
`

const CustomFilter = styled(DiscoverFilter)`
  overflow: hidden;
`

const ShowButton = styled.div`
  position: absolute;
  right: 10px;
  top: 5px;
  opacity: 1;
  z-index: 30;
  font-size: 30px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: ${({ theme }) => theme.colors.background};

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: none;
  }
`

const Container = styled(Flex)`
  position: absolute;
  left: 0;
  top: 0;
  padding: 80px 0px 120px 46px;
  z-index: 20;
  background-color: ${({ theme }) => theme.colors.background};
  height: 100%;
  transition: all 0.3s;

  ${({ theme }) => theme.mediaQueries.xl} {
    position: relative;
  }
`

export default function Filter() {
  const [show, setShow] = useState(true)
  const size = useWindowSize()

  useEffect(() => {
    if (size[0] === 0) return
    if (size[0] >= 1080) setShow(true)
    else setShow(false)
  }, [size])

  return (
    <Container>
      <FilterContainer width={show ? '240px' : '0px'}>
        <ShowButton
          onClick={() => {
            if (size[0] < 1080) setShow(!show)
          }}
        >
          {show ? <BsArrowLeftCircle /> : <BsArrowRightCircle />}
        </ShowButton>
        <CustomFilter />
      </FilterContainer>
    </Container>
  )
}
