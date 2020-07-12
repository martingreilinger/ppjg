import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { filterNonPersistentKeys, getKeys, cloneValuesToPersist } from './ppjg';
import { DEFAULT_CONFIG_NAME } from './defaults';
import { IOAdaper } from './io-adapter';
import { cwd } from 'process';
import { mkdir, writeFileSync } from 'fs';

const ioAdapter: IOAdaper = {
  cwd,
  require,
  mkdir,
  writeFileSync
};

export async function generatePublishPackageJson(
  configFileName: string = DEFAULT_CONFIG_NAME
): Promise<void> {
  const config: PPJGConfModel = readFile<PPJGConfModel>(configFileName)(
    ioAdapter
  );

  const sourcePackageJson = readFile<PackageJsonModel>('package.json')(
    ioAdapter
  );

  const persistedValues = getKeys(sourcePackageJson)
    .filter(filterNonPersistentKeys(config.persist || []))
    .reduce(cloneValuesToPersist(sourcePackageJson), {});

  const publishPackageJson = Object.assign(persistedValues, config.alter || {});

  return await writePackageJson(publishPackageJson)(ioAdapter).then(() =>
    console.log(
      '\x1b[1m%s\x1b[0m \x1b[32m%s\x1b[32m',
      '[PPJG]',
      'Successfully generated a package.json for publishing!'
    )
  );
}

export default generatePublishPackageJson;
