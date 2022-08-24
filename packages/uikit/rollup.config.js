import path from "path";
import typescript from "@rollup/plugin-typescript";
import url from "@rollup/plugin-url";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  external: ["styled-components"],
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" },
  ],
  plugins: [url({ fileName: "[dirname][hash][extname]", sourceDir: path.join(__dirname, "src") }), typescript()],
};
