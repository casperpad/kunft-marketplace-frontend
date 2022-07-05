import styled from 'styled-components'
import {
  background,
  border,
  layout,
  position,
  space,
  typography,
} from 'styled-system'

import { BoxProps } from './types'

const Box = styled.div<BoxProps>`
  ${background}
  ${border}
  ${layout}
  ${position}
  ${space}
  ${typography}
`

export default Box
