import {cwd} from 'process';

export function buildFilePath(filename: string, dir?: string): string {
  return `${cwd()}/${dir ? dir + '/' : ''}${filename}`;
}

export function buildPublishPackageJsonPath(outDir: string): string {
  return buildFilePath('package.json', outDir);
}
