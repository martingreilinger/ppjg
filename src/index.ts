import {
  DEFAULT_OUT_DIR,
  DEFAULT_PUBLISH_CONFIG_FILE_NAME,
  DEFAULT_IO_ADAPTER,
} from './defaults';
import { logSuccess, logError } from './logger/log-messages';
import { preparePublishPackageJson } from './ppjg';
import {
  writePackageJson,
  readPackageJson,
  readPublishConfig,
} from './io/io-utils';
import { GeneratorConfigModel } from './generator-config.model';

export async function generatePublishPackageJson(
  config?: Partial<GeneratorConfigModel>,
): Promise<void> {
  const mergedConfig: GeneratorConfigModel = {
    publishConfigFileName:
      config?.publishConfigFileName || DEFAULT_PUBLISH_CONFIG_FILE_NAME,
    outDir: config?.outDir || DEFAULT_OUT_DIR,
    ioAdapter: config?.ioAdapter || DEFAULT_IO_ADAPTER,
  };

  return Promise.all([
    readPackageJson(mergedConfig),
    readPublishConfig(mergedConfig),
  ])
    .then(preparePublishPackageJson)
    .then(writePackageJson(mergedConfig))
    .then(logSuccess)
    .catch(logError);
}
