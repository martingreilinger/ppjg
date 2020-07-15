import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { preparePublishPackageJson } from './ppjg';
import { DEFAULT_CONFIG_NAME } from './defaults';
import { IOAdaper } from './io-adapter';
import { cwd } from 'process';
import { mkdir, writeFileSync } from 'fs';

const ioAdapter: IOAdaper = {
  cwd,
  mkdir,
  writeFileSync,
  importESM: (moduleName: string) => import(moduleName)
};

export async function generatePublishPackageJson(
  configFileName: string = DEFAULT_CONFIG_NAME
): Promise<void> {
  return Promise.all([
    readFile<PackageJsonModel>('package.json')(ioAdapter),
    readFile<PPJGConfModel>(configFileName)(ioAdapter)
  ])
    .then(preparePublishPackageJson)
    .then(publishPackageJson => writePackageJson(publishPackageJson)(ioAdapter))
    .then(() =>
      console.log(
        '\x1b[1m%s\x1b[0m \x1b[32m%s\x1b[32m',
        '[PPJG]',
        'Successfully generated a package.json for publishing!'
      )
    );
}

export default generatePublishPackageJson;
