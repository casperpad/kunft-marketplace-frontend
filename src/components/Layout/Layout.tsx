import React from 'react'

import { Box, BoxProps } from '@components/Box'

const Layout: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box px="86px" py="80px" mx="auto" {...props}>
      {children}
    </Box>
  )
}

export default Layout
