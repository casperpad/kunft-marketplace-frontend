import React, { useState } from 'react'
import { Text, Flex, Input, InputGroup, Heading } from '@kunftmarketplace/uikit'
import Select from 'react-select'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'

import { useERC20 } from '@/hooks'
import TransferTab from './TransferTab'

const NETWORKS = [
  {
    value: {
      nodeAddress:
        'https://dev.casper.the-swappery.io/api/cors?url=http://65.109.54.159:7777/rpc',
      chainName: 'casper',
    },
    label: 'Mainnet',
  },
  {
    value: {
      nodeAddress:
        'https://dev.casper.the-swappery.io/api/cors?url=http://65.21.227.126:7777/rpc',
      chainName: 'casper-test',
    },
    label: 'Testnet',
  },
]

export default function ERC20() {
  const [contractHash, setContractHash] = useState('')
  const [network, setNetwork] = useState(NETWORKS[0])

  const {
    balanceOf,
    transfer,
    name,
    symbol,
    totalSupply,
    loading,
    decimals,
    error,
  } = useERC20({
    contractHash: `hash-${contractHash}`,
    ...network.value,
  })

  return (
    <Flex
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      width="100%"
      height="100vh"
      gap={32}
    >
      <Heading as="h1">
        You can transfer and approve your ERC20 token here.
      </Heading>
      <Select value={network} options={NETWORKS} onChange={setNetwork} />
      <Flex flexDirection="column" gap={16}>
        <Flex flexDirection="column" gap={8} minWidth={350}>
          <InputGroup label="Contract Hash">
            <Input
              scale="lg"
              type="text"
              placeholder="Input contractHash"
              value={contractHash}
              onChange={(e) => setContractHash(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Flex justifyContent="start" flexDirection="column" alignItems="center">
          {loading ? (
            'Loading'
          ) : (
            <>
              <Text>Name: {name}</Text>
              <Text>Symbol: {symbol}</Text>
              <Text>TotalSupply:{totalSupply}</Text>
            </>
          )}
          {error}
        </Flex>
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Transfer</Tab>
          <Tab>Approve</Tab>
          <Tab>Transfer from</Tab>
          <Tab>Balance Check</Tab>
        </TabList>

        <TabPanel>
          <TransferTab
            transfer={transfer}
            balanceOf={balanceOf}
            decimals={decimals}
          />
        </TabPanel>
        <TabPanel>
          <Heading as="h2">Coming soon</Heading>
        </TabPanel>
        <TabPanel>
          <Heading as="h2">Coming soon</Heading>
        </TabPanel>
        <TabPanel>
          <Heading as="h2">Coming soon</Heading>
        </TabPanel>
      </Tabs>
    </Flex>
  )
}
