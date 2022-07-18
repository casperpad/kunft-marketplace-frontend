import { useState, useEffect } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import styled from 'styled-components'

import { Flex } from '@components/Box'
import { ProfileFilter } from '@components/Filter'
import useWindowSize from '@hooks/useWindowResize'

const FilterContainer = styled(Flex)`
  position: sticky;
  top: 184px;
  overflow: hidden;
  flex-direction: column;
  height: max-content;

  ${({ theme }) => theme.mediaQueries.xl2} {
    position: relative;
    top: 0;
    flex-wrap: wrap;
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    padding: 37px 32px;
    width: 600px;
  }

  ${({ theme }) => theme.mediaQueries.xl3} {
    width: 650px;
  }
`

const ShowButton = styled.div`
  position: absolute;
  right: 10px;
  top: 125px;
  opacity: 1;
  z-index: 30;
  font-size: 30px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    display: none;
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
  transition: all 0.3s;

  ${({ theme }) => theme.mediaQueries.xl2} {
    position: relative;
    padding: 0;
  }
`

export default function Filter() {
  const [show, setShow] = useState(true)
  const size = useWindowSize()
  const WINDOW_SIZE = 1280

  useEffect(() => {
    if (size[0] === 0) return
    if (size[0] >= WINDOW_SIZE) setShow(true)
    else setShow(false)
  }, [size])

  return (
    <Container
      width={size[0] < WINDOW_SIZE ? (show ? '310px' : '20px') : 'max-content'}
    >
      <ShowButton
        onClick={() => {
          if (size[0] < WINDOW_SIZE) setShow(!show)
        }}
      >
        {show ? <BsArrowLeftCircle /> : <BsArrowRightCircle />}
      </ShowButton>
      <FilterContainer>
        <ProfileFilter />
      </FilterContainer>
    </Container>
  )
}
