import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProfileFilter from './Profile'

export default {
  title: 'Components/Filter/Profile',
  component: ProfileFilter,
  argTypes: {},
} as ComponentMeta<typeof ProfileFilter>

const Template: ComponentStory<typeof ProfileFilter> = () => <ProfileFilter />

export const Filter = Template.bind({})
