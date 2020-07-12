import { PathProvider } from './path-provider';

export function buildFilePath(filename: string, dir?: string): PathProvider {
  return wdr => `${wdr()}/${dir ? dir + '/' : ''}${filename}`;
}

export function buildPublishPackageJsonPath(outDir: string): PathProvider {
  return wdr => buildFilePath('package.json', outDir)(wdr);
}
