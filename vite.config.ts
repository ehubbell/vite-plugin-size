import { runSize } from './src';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';
import { runYalc } from 'vite-plugin-yalc';

export default defineConfig(({ mode }) => {
	return {
		base: './',
		build: {
			ssr: true,
			sourcemap: mode === 'development',
			lib: {
				entry: path.resolve(__dirname, 'src/index.ts'),
				formats: ['es', 'cjs'],
				name: 'Size',
			},
			rollupOptions: {
				external: [
					'node:fs',
					'node:stream',
					'node:zlib',
					'node:util',
					'constants',
					'path',
					'stream',
					'fs',
					'util',
					'assert',
				],
				plugins: [peerDepsExternal()],
			},
		},
		plugins: [runYalc(), runSize('dist')],
		resolve: {
			alias: {
				src: path.resolve(__dirname, '/src'),
			},
		},
	};
});
