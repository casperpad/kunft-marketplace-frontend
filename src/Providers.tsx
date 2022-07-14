import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ModalProvider, BaseModalBackground } from 'styled-react-modal'

import CasperWeb3Provider from './provider/CasperWeb3Provider'
import { light } from './theme'

const StyledThemeProvider = (props: any) => {
  return <ThemeProvider theme={light} {...props} />
}

const BlurBackground = styled(BaseModalBackground)`
  backdrop-filter: blur(3px);
  background-color: rgb(0, 0, 0, 0);
`

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CasperWeb3Provider>
      <StyledThemeProvider>
        <ModalProvider backgroundComponent={BlurBackground}>
          {children}
        </ModalProvider>
      </StyledThemeProvider>
    </CasperWeb3Provider>
  )
}
