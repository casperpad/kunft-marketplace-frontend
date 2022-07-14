import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Navbar from './Navbar'

export default {
  title: 'Menu/Navbar',
  component: Navbar,
  argTypes: {},
} as ComponentMeta<typeof Navbar>

const Template: ComponentStory<typeof Navbar> = () => <Navbar />

export const Primary = Template.bind({})
