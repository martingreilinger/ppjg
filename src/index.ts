import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { filterNonPersistentKeys, getKeys, cloneValuesToPersist } from './ppjg';
import { DEFAULT_CONFIG_NAME } from './defaults';

export async function generatePublishPackageJson(
  configFileName: string = DEFAULT_CONFIG_NAME
): Promise<void> {
  const config: PPJGConfModel = await readFile<PPJGConfModel>(
    configFileName
  ).catch(error => {
    throw new Error('Unable to laod config: ' + error);
  });

  const sourcePackageJson = await readFile<PackageJsonModel>('package.json');

  const persistedValues = getKeys(sourcePackageJson)
    .filter(filterNonPersistentKeys(config.persist || []))
    .reduce(cloneValuesToPersist(sourcePackageJson), {});

  writePackageJson(Object.assign(persistedValues, config.alter));
  return console.log(
    '\x1b[1m%s\x1b[0m \x1b[32m%s\x1b[32m',
    '[PPJG]',
    'Successfully generated a package.json for publishing!'
  );
}

export default generatePublishPackageJson;
