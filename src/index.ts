import { DEFAULT_OUT_DIR, DEFAULT_PUBLISH_CONFIG_FILE_NAME } from './defaults';
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
  const configFileName =
    config?.publishConfigFileName || DEFAULT_PUBLISH_CONFIG_FILE_NAME;
  const outDirName = config?.outDir || DEFAULT_OUT_DIR;

  return Promise.all([readPackageJson(), readPublishConfig(configFileName)])
    .then(preparePublishPackageJson)
    .then(writePackageJson(outDirName))
    .then(logSuccess)
    .catch(logError);
}
