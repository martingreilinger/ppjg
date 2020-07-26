import { PackageJsonModel } from './package-json.model';

export interface PublishConfigModel {
  persist?: Array<string>;
  alter?: PackageJsonModel;
}
