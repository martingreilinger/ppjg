import { PackageJsonModel } from './package-json.model';

export function getKeys(object: PackageJsonModel): ReadonlyArray<string> {
  return Object.keys(object);
}

export function filterNonPersistentKeys(
  keysToPersist: ReadonlyArray<string>
): (key: string) => boolean {
  return key => keysToPersist.indexOf(key) > -1;
}

export function cloneValuesToPersist(
  src: PackageJsonModel
): (pj: PackageJsonModel, key: string) => PackageJsonModel {
  return (pj, key) => Object.assign(pj, { [key]: src[key] });
}
