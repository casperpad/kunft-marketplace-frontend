import styled from 'styled-components'
import { flexbox } from 'styled-system'

import Box from './Box'
import { FlexProps } from './types'

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox};
  /* gap:${(props) => props.gap}px */
  ${(props) => (props.gap ? `gap: ${props.gap}px;` : '')}
`

export default Flex
