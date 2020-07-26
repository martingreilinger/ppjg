import { DEFAULT_GENERATOR_CONFIG } from './defaults';
import { logSuccess, logError } from './logger/log-messages';
import { preparePublishPackageJson } from './ppjg';
import {
  writePackageJson,
  readPackageJson,
  readPublishConfig
} from './io-utils';
import { GeneratorConfigModel } from './generator-config.model';

export async function generatePublishPackageJson(
  config: GeneratorConfigModel = DEFAULT_GENERATOR_CONFIG
): Promise<void> {
  return Promise.all([readPackageJson(config), readPublishConfig(config)])
    .then(preparePublishPackageJson)
    .then(writePackageJson(config))
    .then(logSuccess(config.logger))
    .catch(logError(config.logger));
}

export default generatePublishPackageJson;
