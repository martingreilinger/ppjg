import { readFile, writePackageJson } from './io-utils';
import { PackageJsonModel } from './package-json.model';
import { PPJGConfModel } from './ppjg-conf.model';

function getKeys(object: PackageJsonModel): ReadonlyArray<string> {
  return Object.keys(object);
}

function filterNonPersistentKeys(
  keysToPersist: ReadonlyArray<string>
): (key: string) => boolean {
  return key => keysToPersist.indexOf(key) > -1;
}

(async () => {
  const config = await readFile<PPJGConfModel>('ppj.conf.js');
  const cpj = await readFile<PackageJsonModel>('package.json');

  const persistedValues = getKeys(cpj)
    .filter(filterNonPersistentKeys(config.persist))
    .reduce(copyValue(), {});

  return writePackageJson(Object.assign(persistedValues, config.alter));
})().then(() => console.log('completed'));

function copyValue(): (pj: PackageJsonModel, key: string) => PackageJsonModel {
  return (pj, key) => Object.assign(pj, { [key]: pj[key] });
}
