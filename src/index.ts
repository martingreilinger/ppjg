import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';
import { filterNonPersistentKeys, getKeys, cloneValuesToPersist } from './ppjg';

(async () => {
  const config = await readFile<PPJGConfModel>('ppj.conf.js');
  const cpj = await readFile<PackageJsonModel>('package.json');

  const persistedValues = getKeys(cpj)
    .filter(filterNonPersistentKeys(config.persist))
    .reduce(cloneValuesToPersist(), {});

  return writePackageJson(Object.assign(persistedValues, config.alter));
})().then(() => console.log('completed'));
