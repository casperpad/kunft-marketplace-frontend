import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DiscoverFilter from './Discover'

export default {
  title: 'Components/Filter/Discover',
  component: DiscoverFilter,
  argTypes: {},
} as ComponentMeta<typeof DiscoverFilter>

const Template: ComponentStory<typeof DiscoverFilter> = () => <DiscoverFilter />

export const Filter = Template.bind({})
