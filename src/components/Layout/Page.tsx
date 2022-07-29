import styled from 'styled-components'

export const Page = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
  margin-top: 65px;
  min-height: calc(100vh - 65px);
`
