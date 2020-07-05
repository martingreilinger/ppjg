import { writeFileSync } from 'fs';
import { getFilePath, getOutDirPath } from './path-utils';

function stringifyPackageJson(data: unknown): string {
  return JSON.stringify(data, null, 2);
}

export async function readFile<T>(filename: string): Promise<T> {
  return await require(getFilePath(filename));
}

export function writePackageJson(data: unknown, outDir?: string): void {
  writeFileSync(getOutDirPath(outDir), stringifyPackageJson(data));
}
