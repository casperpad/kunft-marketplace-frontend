import { useState } from 'react'
import styled from 'styled-components'

import { Flex } from '@components/Box'

const Row = styled(Flex)`
  position: relative;
  max-width: 350px;
  margin-bottom: 15px;
`

const Button = styled.button<{ active: boolean }>`
  flex: 1 1 50%;
  outline: none;
  height: 48px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active, theme }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ active, theme }) => `${theme.colors.text}${active ? '' : '44'}`};
  font-size: 28px;
`

interface TabsProps {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
}

export default function Tabs({ active, setActive }: TabsProps) {
  const [TABS] = useState<string[]>(['History', 'Description'])

  return (
    <Row>
      {TABS.map((tab, index) => {
        return (
          <Button
            key={tab}
            onClick={() => setActive(index)}
            active={active === index}
          >
            {tab}
          </Button>
        )
      })}
    </Row>
  )
}
