import { cwd } from 'process';
import { mkdir, writeFileSync } from 'fs';

import { IOAdaper } from './io/io-adapter';
import { Logger } from './logger/logger';
import { esImport } from './io/es-import';

export const DEFAULT_PUBLISH_CONFIG_FILE_NAME = 'ppj.config.js';
export const DEFAULT_OUT_DIR = 'out';
export const DEFAULT_IO_ADAPTER: IOAdaper = {
  cwd,
  mkdir,
  writeFileSync,
  esImport,
};
export const DEFAULT_LOGGER: Logger = console;
