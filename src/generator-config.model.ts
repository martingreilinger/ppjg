import { IOAdaper } from './io/io-adapter';

export interface GeneratorConfigModel {
  publishConfigFileName: string;
  outDir: string;
  ioAdapter: IOAdaper;
}
