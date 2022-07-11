export const breakpointMap: { [key: string]: number } = {
  xs: 375,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xl2: 1280,
  xl3: 1512,
}

const breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`,
)

const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xl2: `@media screen and (min-width: ${breakpointMap.xl2}px)`,
  xl3: `@media screen and (min-width: ${breakpointMap.xl3}px)`,
}

const shadows = {
  active: '0px 4px 4px 0px #00000040',
  hover: '0px 4px 4px 0px #00000040',
  base: '0px 4px 4px 0px #00000040',
  slider: '0px 0px 4px 4px #00000040',
}

export default {
  breakpoints,
  mediaQueries,
  shadows,
}
