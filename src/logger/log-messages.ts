import { Logger } from './logger';
import { successPrefix, errorMessage, errorPrefix } from './log-styles';

const logPrefix = '[PPJG]';

const successMessage = 'Successfully generated a package.json for publishing!';

export const logSuccess = (logger: Logger) => (): void =>
  log(successPrefix(logPrefix), successMessage)(logger);

export const logError = (logger: Logger) => (error: Error): void => {
  const errorDescription = `${error.name}: \n ${error.message}`;

  log(errorPrefix(logPrefix), errorMessage(errorDescription))(logger);
};

const log = (prefix: string, message: string) => (logger: Logger): void =>
  logger.log(`${prefix} ${message}`);
