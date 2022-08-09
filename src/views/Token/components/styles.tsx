import styled from 'styled-components'

import { Flex } from '@/components'

export const Container = styled(Flex)`
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: calc((100% - 64px) / 3);
  min-height: 200px;
  overflow: auto;
  resize: vertical;
  font-family: 'Avenir';
`

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;

  thead {
    font-size: 15px;
    tr {
      background: white !important;
      border-bottom: 1px solid black;
    }
  }
  tr:nth-child(odd) {
    background: ${({ theme }) => `${theme.colors.primary}0F`};
  }
  tr:nth-child(even) {
    background: ${({ theme }) => `${theme.colors.primary}05`};
  }
  tr {
    height: 50px;
  }
  td {
    text-align: center;
    margin-left: auto;
  }
`

export const TitleContainer = styled(Flex)`
  font-family: 'Avenir';
  font-size: 25px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  height: 70px;
  padding-left: 33px;
  align-items: center;
`
