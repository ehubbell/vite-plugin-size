# Overview

A simple vite plugin that will log your build's size (compressed & uncompressed) on every build.

## Prerequisites

- Node
- Yalc

## Installation

```
npm i vite-plugin-size -D
```

## Usage

Simply add the plugin and declare the directory (optional) you want to measure:

```ts
// vite.config.ts

import path from "path";
import { defineConfig } from "vite";
import { runSize } from "vite-plugin-size";

export default defineConfig(({ mode }) => {
  return {
    base: "./",
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "Project",
        formats: ["es", "cjs"],
        fileName: (format, entryName) => `${entryName}$.${format}.js`,
      },
    },
    plugins: [runSize('dist')],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "/src"),
      },
    },
  };
});
```

## Development

This project uses [yalc](https://npmjs.com/package/yalc) for local development.

- npm run dev
- switch to project
- npx yalc add vite-plugin-size
- After that, this library will hot reload into the consuming application

## Scripts

- We've included a couple of helpful scripts for faster development.
- deploy: `npm run deploy -- 'commit message'`
- publish: `npm run publish -- 'commit message' [major|minor|patch]`

## Husky

- Husky configuration is setup to lint and format the repo on every commit
- Edit the `.husky/pre-commit` file to change your settings

## Author

- [Eric Hubbell](http://www.erichubbell.com)
- eric@erichubbell.com
