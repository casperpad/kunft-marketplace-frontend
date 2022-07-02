import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserMenu from './UserMenu'

export default {
  title: 'Menu/UserMenu/UserMenu',
  component: UserMenu,
  argTypes: {},
} as ComponentMeta<typeof UserMenu>

const Template: ComponentStory<typeof UserMenu> = (args) => (
  <UserMenu {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  // avatar:
  //   'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://nftstorage.link/ipfs/QmcvLNTddgxTaZB9y3ZXauUyXP6wZsPW2u5ihpJuFupJa7/500.png',
  copySvg: '/assets/images/UserMenu/Copy.svg',
  settingSvg: '/assets/images/UserMenu/Settings.svg',
  logSvg: '/assets/images/UserMenu/LogOut.svg',
}
