import bytes from 'bytes';
import chalk from 'chalk';
import Fs from 'fs-extra';
import { gzipSizeFromFileSync } from 'gzip-size';

const fileStats = async (pathName: string) => {
	return await Fs.promises.stat(pathName);
};

const formatStats = async pathName => {
	const stats = await Fs.promises.stat(pathName);
	stats.gzip = gzipSizeFromFileSync(pathName);
	return stats;
};

const computeFileStats = async pathName => {
	const stats = await formatStats(pathName);
	return [stats.size, stats.gzip];
};

const computeDirectoryStats = async (pathName, nested = false) => {
	const entries = await Fs.promises.readdir(pathName);
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

const computeSize = async pathName => {
	const file = await fileStats(pathName);
	const [size, gzip] = file.isDirectory() ? await computeDirectoryStats(pathName) : computeFileStats(pathName);
	const formattedSize = bytes.format(size, { unitSeparator: ' ' });
	const formattedGZip = bytes.format(gzip, { unitSeparator: ' ' });
	const decoratedTitle = chalk.blue(`bundle size (${pathName}): `);
	const decoratedStats = chalk.dim(`${formattedSize} bundle | ${formattedGZip} gzip`);
	console.log(decoratedTitle, decoratedStats);
};

export const runSize = (pathName: string): any => {
	return {
		name: 'run-size',
		closeBundle: async () => computeSize(pathName),
	};
};

// Docs
