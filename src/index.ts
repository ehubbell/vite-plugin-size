import bytes from 'bytes';
import chalk from 'chalk';
import fs from 'fs-extra';
import { gzipSizeFromFileSync } from 'gzip-size';

const fileStats = async (pathName: string) => {
	return await fs.promises.stat(pathName);
};

const formatStats = async pathName => {
	const stats = await fs.promises.stat(pathName);
	stats.gzip = gzipSizeFromFileSync(pathName);
	return stats;
};

const computeFileStats = async pathName => {
	const stats = await formatStats(pathName);
	return [stats.size, stats.gzip];
};

const computeDirectoryStats = async (pathName, nested = false) => {
	const entries = await fs.promises.readdir(pathName);
	const stats = await Promise.all(
		entries.map(async entry => {
			const stats = await fileStats(pathName + '/' + entry);
			return stats.isDirectory()
				? await computeDirectoryStats(pathName + '/' + entry, true)
				: formatStats(pathName + '/' + entry);
		}),
	);
	if (nested) return stats.flat();
	const size = stats.flat().reduce((a, b) => a + b.size, 0);
	const gzip = stats.flat().reduce((a, b) => a + b.gzip, 0);
	return [size, gzip];
};

export const runSize = (pathName = 'dist'): any => {
	return {
		name: 'run-size',
		closeBundle: async () => {
			const file = await fileStats(pathName);
			const [size, gzip] = file.isDirectory() ? await computeDirectoryStats(pathName) : computeFileStats(pathName);
			// NPM includes license, readme, and package.json as well
			const formattedSize = bytes.format(size, { unitSeparator: ' ' });
			const formattedGZip = bytes.format(gzip, { unitSeparator: ' ' });
			const decoratedTitle = chalk.blue(`bundle size (${pathName}): `);
			const decoratedStats = chalk.dim(`${formattedSize} bundle | ${formattedGZip} gzip`);
			console.log(decoratedTitle, decoratedStats);
		},
	};
};

// Docs
