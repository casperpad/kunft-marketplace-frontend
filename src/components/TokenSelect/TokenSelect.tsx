import React from 'react'
import styled from 'styled-components'

interface PayToken {
  contractPackageHash: string
  image?: string
}

interface TokenSelectProps {
  payToken: PayToken
}

export default function TokenSelect() {
  return (
    <Select>
      <option value="" hidden>
        Type
      </option>
      <option value="1">Audi</option>
      <option value="2">BMW</option>
      <option value="3">Citroen</option>
      <option value="4">Ford</option>
    </Select>
  )
}

const Select = styled.select`
  width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`
