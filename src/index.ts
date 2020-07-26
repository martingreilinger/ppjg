import { cwd } from 'process';
import { DEFAULT_CONFIG_NAME } from './defaults';
import { IOAdaper } from './io-adapter';
import { Logger } from './logger/logger';
import { logSuccess, logError } from './logger/log-messages';
import { mkdir, writeFileSync } from 'fs';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { preparePublishPackageJson } from './ppjg';
import { readFile, writePackageJson } from './io-utils';

const ioAdapter: IOAdaper = {
  cwd,
  mkdir,
  writeFileSync,
  importESM: (moduleName: string) => import(moduleName)
};

const logger: Logger = console;

export async function generatePublishPackageJson(
  configFileName: string = DEFAULT_CONFIG_NAME
): Promise<void> {
  return Promise.all([
    readFile<PackageJsonModel>('package.json')(ioAdapter),
    readFile<PPJGConfModel>(configFileName)(ioAdapter)
  ])
    .then(preparePublishPackageJson)
    .then(publishPackageJson => writePackageJson(publishPackageJson)(ioAdapter))
    .then(() => logSuccess()(logger))
    .catch(error => logError(error)(logger));
}

export default generatePublishPackageJson;
