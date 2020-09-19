export interface PublishConfigModel {
  persist?: Array<string>;
  alter?: PackageJsonModel;
}

export interface PackageJsonModel {
  [key: string]: unknown;
}

export declare interface GeneratorConfigModel {
  publishConfigFileName: string;
  outDir: string;
}

export declare function generatePublishPackageJson(config?:  Partial<GeneratorConfigModel>): Promise<void>;
