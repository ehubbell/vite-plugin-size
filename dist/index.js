import Fs from "fs-extra";
import bytes from "bytes";
import chalk from "chalk";
import { gzipSizeFromFileSync } from "gzip-size";
const fileStats = async (pathName) => {
  return await Fs.promises.stat(pathName);
};
const formatStats = async (pathName) => {
  let stats = await Fs.promises.stat(pathName);
  stats.gzip = gzipSizeFromFileSync(pathName);
  return stats;
};
const computeFileStats = async (pathName) => {
  const stats = await formatStats(pathName);
  return [stats.size, stats.gzip];
};
const computeDirectoryStats = async (pathName, nested = false) => {
  const entries = await Fs.promises.readdir(pathName);
  const stats = await Promise.all(
    entries.map(async (entry) => {
      const stats2 = await fileStats(pathName + "/" + entry);
      return stats2.isDirectory() ? await computeDirectoryStats(pathName + "/" + entry, true) : formatStats(pathName + "/" + entry);
    })
  );
  if (nested) return stats.flat();
  const size = stats.flat().reduce((a, b) => a + b.size, 0);
  const gzip = stats.flat().reduce((a, b) => a + b.gzip, 0);
  return [size, gzip];
};
const computeSize = async (pathName) => {
  const file = await fileStats(pathName);
  const [size, gzip] = file.isDirectory() ? await computeDirectoryStats(pathName) : computeFileStats(pathName);
  console.log(chalk.blue(`size (${pathName}): `), chalk.dim(`${bytes.format(size, { unitSeparator: " " })} bundle | ${bytes.format(gzip, { unitSeparator: " " })} gzip`));
};
const runSize = (pathName) => {
  return {
    name: "run-size",
    closeBundle: async () => computeSize(pathName)
  };
};
export {
  runSize
};
//# sourceMappingURL=index.js.map
