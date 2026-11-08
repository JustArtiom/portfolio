import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === `production`;

export default defineConfig({
  entry: [`backend`],
  splitting: true,
  silent: true,
  minify: isProduction,
  // Production bundles every dependency in, so the server runs the output
  // with plain `node` and never needs an npm install (see cicd.yml).
  noExternal: isProduction ? [/.*/] : [],
  clean: true,
  format: `cjs`,
  outDir: `dist_backend`,
});
