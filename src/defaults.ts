import { cwd } from 'process';
import { mkdir, writeFileSync } from 'fs';

import { GeneratorConfigModel } from './generator-config.model';
import { IOAdaper } from './io-adapter';
import { Logger } from './logger/logger';

export const DEFAULT_PUBLISH_CONFIG_FILE_NAME = 'ppj.conf.js';
export const DEFAULT_OUT_DIR = 'out';
export const DEFAULT_IO_ADAPTER: IOAdaper = {
  cwd,
  mkdir,
  writeFileSync,
  importESM: (moduleName: string) => import(moduleName)
};
export const DEFAULT_LOGGER: Logger = console;

export const DEFAULT_GENERATOR_CONFIG: GeneratorConfigModel = {
  publishConfigFileName: DEFAULT_PUBLISH_CONFIG_FILE_NAME,
  outDir: DEFAULT_OUT_DIR,
  logger: DEFAULT_LOGGER,
  ioAdapter: DEFAULT_IO_ADAPTER
};
