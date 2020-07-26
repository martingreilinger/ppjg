import { buildFilePath, buildPublishPackageJsonPath } from './path-utils';
import { GeneratorConfigModel } from '../generator-config.model';
import { IOAdaper } from './io-adapter';
import { mkdirAsync } from './async-fs';
import { PackageJsonModel } from '../package-json.model';

const FOLDER_ALREAD_EXISTS_ERROR_NUMBER = -17;
const PACKAGE_JSON_FILE_NAME = 'package.json';

export const readPackageJson = (
  config: GeneratorConfigModel
): Promise<PackageJsonModel> =>
  readFile<PackageJsonModel>(config.ioAdapter, PACKAGE_JSON_FILE_NAME);

export const readPublishConfig = (
  config: GeneratorConfigModel
): Promise<PackageJsonModel> =>
  readFile<PackageJsonModel>(config.ioAdapter, config.publishConfigFileName);

const readFile = <T>(ioAdapter: IOAdaper, filename: string): Promise<T> =>
  ioAdapter.importESM<T>(buildFilePath(filename)(ioAdapter.cwd));

export const writePackageJson = (config: GeneratorConfigModel) => (
  data: unknown
): Promise<void> =>
  ensureDirExists(config).then(() =>
    config.ioAdapter.writeFileSync(
      buildPublishPackageJsonPath(config.outDir)(config.ioAdapter.cwd),
      stringifyPackageJson(data),
      { flag: 'w' }
    )
  );

const ensureDirExists = (config: GeneratorConfigModel): Promise<void> =>
  mkdirAsync(config.outDir)(config.ioAdapter.mkdir).catch(
    ignoreErrorIfFolderExists
  );

const ignoreErrorIfFolderExists = (
  error: NodeJS.ErrnoException
): Promise<void> =>
  error.errno !== FOLDER_ALREAD_EXISTS_ERROR_NUMBER
    ? Promise.reject(error)
    : Promise.resolve();

const stringifyPackageJson = (data: unknown): string =>
  JSON.stringify(data, null, 2);
