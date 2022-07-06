import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Range from './Range'

export default {
  title: 'Components/Slider/Range',
  component: Range,
  argTypes: {},
} as ComponentMeta<typeof Range>

const Template: ComponentStory<typeof Range> = (args) => <Range {...args} />

export const RangeSlider = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RangeSlider.args = {
  min: 0,
  max: 1000,
  step: 100,
}
