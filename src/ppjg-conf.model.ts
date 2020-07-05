import { PackageJsonModel } from './package-json.model';

export interface PPJGConfModel {
  persist: Array<string>;
  alter: PackageJsonModel;
}
