import { promises } from 'fs';
import { esImport } from './es-import';
import { ensureDirExists } from './directory-utils';
import { buildFilePath, buildPublishPackageJsonPath } from './path-utils';
import { PackageJsonModel } from '../package-json.model';
import { PublishConfigModel } from '../publish-config.model';

const PACKAGE_JSON_FILE_NAME = 'package.json';

export const readPackageJson = (): Promise<PackageJsonModel> =>
  readFile<PackageJsonModel>(PACKAGE_JSON_FILE_NAME);

export const readPublishConfig = (
  publishConfigFileName: string,
): Promise<PublishConfigModel> =>
  readFile<PublishConfigModel>(publishConfigFileName);

const readFile = <T>(filename: string): Promise<T> =>
  esImport<T>(buildFilePath(filename));

export const writePackageJson = (outDir: string) => (
  data: PackageJsonModel,
): Promise<void> =>
  ensureDirExists(outDir).then(() =>
    promises.writeFile(
      buildPublishPackageJsonPath(outDir),
      stringifyPackageJson(data),
    ),
  );

const stringifyPackageJson = (data: PackageJsonModel): string =>
  JSON.stringify(data, null, 2);
