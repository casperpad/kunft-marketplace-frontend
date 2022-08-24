import { Breakpoints, Colors, MediaQueries, Shadows, ZIndices } from "./types";

export { ThemeProvider } from "styled-components";
export interface KUNFTTheme {
  isDark: boolean;
  colors: Colors;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  shadows: Shadows;
  zIndices: ZIndices;
}

export { darkColors, lightColors } from "./colors";
export { default as dark } from "./dark";
export { default as light } from "./light";
export * from "./types";
