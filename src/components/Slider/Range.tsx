import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import styled from 'styled-components'

const StyledSlider = styled(Slider)`
  .rc-slider-track {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    height: 2px;
  }
  .rc-slider-rail {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary}44;
    height: 2px;
  }
  .rc-slider-handle {
    border: 2px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    opacity: 1;
    border-radius: 100%;
    margin-top: -6px;
    height: 14px;
    width: 14px;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.slider};
  }
`

interface RangeProps {
  min?: number
  max?: number
  step?: number
  onValueChange: (val: any) => void
}

export default function Range({
  min = 0,
  max = 50000,
  step = 10,
  onValueChange,
}: RangeProps) {
  const handleChange = (value: any) => {
    onValueChange(value)
  }

  return (
    <StyledSlider
      range
      min={min}
      max={max}
      step={step}
      allowCross={false}
      defaultValue={[min, max]}
      onChange={handleChange}
    />
  )
}
