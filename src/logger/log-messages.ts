import { Logger } from './logger';
import { successPrefix, errorMessage, errorPrefix } from './log-styles';

const logPrefix = '[PPJG]';

const successMessage = 'Successfully generated a package.json for publishing!';

export const logSuccess = () => (logger: Logger): void =>
  logger.log(`${successPrefix(logPrefix)} ${successMessage}`);

export const logError = (error: Error) => (logger: Logger): void => {
  const errorDescription = `${error.name}: \n ${error.message}`;

  logger.log(`${errorPrefix(logPrefix)} ${errorMessage(errorDescription)}`);
};
