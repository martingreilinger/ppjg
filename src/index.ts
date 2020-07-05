import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { filterNonPersistentKeys, getKeys, cloneValuesToPersist } from './ppjg';

(async () => {
  const config = await readFile<PPJGConfModel>('ppj.conf.js');
  const sourcePackageJson = await readFile<PackageJsonModel>('package.json');

  const persistedValues = getKeys(sourcePackageJson)
    .filter(filterNonPersistentKeys(config.persist))
    .reduce(cloneValuesToPersist(sourcePackageJson), {});

  return writePackageJson(Object.assign(persistedValues, config.alter));
})().then(() => console.log('generated a package.json for publishing'));
