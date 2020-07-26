import { IOAdaper } from './io-adapter';
import { Logger } from './logger/logger';

export interface GeneratorConfigModel {
  publishConfigFileName: string;
  outDir: string;
  logger: Logger;
  ioAdapter: IOAdaper;
}
