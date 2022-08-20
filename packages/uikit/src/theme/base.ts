export const breakpointMap: { [key: string]: number } = {
  xs: 375,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xl2: 1280,
  xl3: 1512,
};

const breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xl2: `@media screen and (min-width: ${breakpointMap.xl2}px)`,
  xl3: `@media screen and (min-width: ${breakpointMap.xl3}px)`,
};

const shadows = {
  hover: "0px 4px 4px 0px #00000040",
  base: "0px 4px 4px 0px #00000040",
  slider: "0px 0px 4px 4px #00000040",
  level1: "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  active: "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)",
  success: "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
  warning: "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
  focus: "0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)",
  inset: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
  tooltip: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
};

const zIndices = {
  ribbon: 5,
  dropdown: 7,
  navbar: 10,
  overlay: 20,
  modal: 100,
};

export default {
  breakpoints,
  mediaQueries,
  shadows,
  zIndices,
};
