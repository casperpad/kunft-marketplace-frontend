import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  0% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -105;
  }
  50% {
    stroke-dasharray: 80 10;
    stroke-dashoffset: -160;
  }
  100% {
    stroke-dasharray: 1 98;
    stroke-dashoffset: -300;
  }
`

const Container = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Circle = styled.circle`
  fill: transparent;
  stroke: #dd2476;
  stroke-width: 7px;
  stroke-linecap: round;
  filter: url(#shadow);

  transform-origin: center;
  animation-name: ${animation};
  animation-duration: 1.2s;
  animation-timing-function: cubic-bezier;
  animation-iteration-count: infinite;
`

export default function SimpleSpinner() {
  return (
    <Container>
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.5"
              floodColor="#fc6767"
            />
          </filter>
        </defs>
        <Circle id="spinner" cx="50" cy="50" r="45" />
      </svg>
    </Container>
  )
}
