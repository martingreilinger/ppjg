import { cwd } from 'process';

export function getOutDirPath(outDir = 'out'): string {
  return `${cwd()}/${outDir}/package.json`;
}

export function getFilePath(filename: string): string {
  return `${cwd()}/${filename}`;
}
