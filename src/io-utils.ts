import { IOAdaper } from './io-adapter';
import { Mkdir } from './node-fs';
import { mkdirAsync } from './async-fs';
import { buildFilePath, buildPublishPackageJsonPath } from './path-utils';
import { DEFAULT_OUT_DIR } from './defaults';

export function readFile<T>(filename: string): (ioAdapter: IOAdaper) => Promise<T> {
  return ioAdapter => {
    const filePath = buildFilePath(filename)(ioAdapter.cwd);

    return ioAdapter.importESM(filePath);
  };
}

export function writePackageJson(
  data: unknown,
  outDir = DEFAULT_OUT_DIR
): (ioAdapter: IOAdaper) => Promise<void> {
  return ioAdapter =>
    ensureDirExists(outDir)(ioAdapter.mkdir).then(() =>
      ioAdapter.writeFileSync(
        buildPublishPackageJsonPath(outDir)(ioAdapter.cwd),
        stringifyPackageJson(data),
        { flag: 'w' }
      )
    );
}

function ensureDirExists(dirName: string): (mkdir: Mkdir) => Promise<void> {
  return mkdir => mkdirAsync(dirName)(mkdir).catch(ignoreErrorIfFolderExists);
}

function ignoreErrorIfFolderExists(error: NodeJS.ErrnoException): void {
  console.log('error', error);
  if (error.errno !== -17) {
    throw error;
  }
}

function stringifyPackageJson(data: unknown): string {
  return JSON.stringify(data, null, 2);
}
