import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import NFTCard from './NFTCard'

export default {
  title: 'Card/NFTCard',
  component: NFTCard,
  argTypes: {},
} as ComponentMeta<typeof NFTCard>

const Template: ComponentStory<typeof NFTCard> = (args) => <NFTCard {...args} />

export const Sale = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sale.args = {
  image:
    'https://beta.api.solanalysis.com/images/200x200/filters:frames(,0)/https://nftstorage.link/ipfs/QmcvLNTddgxTaZB9y3ZXauUyXP6wZsPW2u5ihpJuFupJa7/0.png',
  name: 'KUNFT',
  price: 4.23,
  stars: 5,
  type: 'Sale',
  userStarred: true,
}
