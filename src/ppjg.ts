import { PackageJsonModel } from './package-json.model';
import { PublishConfigModel } from './publish-config.model';

export function preparePublishPackageJson([sourcePackageJson, config]: [
  PackageJsonModel,
  PublishConfigModel
]): PackageJsonModel {
  const persistedValues = getKeys(sourcePackageJson)
    .filter(filterNonPersistentKeys(config.persist || []))
    .reduce(cloneValuesToPersist(sourcePackageJson), {});

  return Object.assign(persistedValues, config.alter || {});
}

function getKeys(object: PackageJsonModel): ReadonlyArray<string> {
  return Object.keys(object);
}

function filterNonPersistentKeys(
  keysToPersist: ReadonlyArray<string>,
): (key: string) => boolean {
  return key => keysToPersist.indexOf(key) > -1;
}

function cloneValuesToPersist(
  src: PackageJsonModel,
): (pj: PackageJsonModel, key: string) => PackageJsonModel {
  return (pj, key) => Object.assign(pj, { [key]: src[key] });
}
