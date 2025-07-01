import { runSize } from './src';
import path from 'path';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
	return {
		base: './',
		build: {
			sourcemap: mode === 'development',
			lib: {
				entry: path.resolve(__dirname, 'src/index.ts'),
				formats: ['es', 'cjs'],
				name: 'Size',
				fileName: (format, entryName) => `${entryName}.${format}.js`,
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
		plugins: [runSize('dist')],
		resolve: {
			alias: {
				src: path.resolve(__dirname, '/src'),
			},
		},
	};
});
