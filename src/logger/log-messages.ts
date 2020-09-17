import { successPrefix, errorMessage, errorPrefix } from './log-styles';
import { log } from 'console';

const logPrefix = '[PPJG]';
const successMessage = 'Successfully generated a package.json for publishing!';

export const logSuccess = (): void =>
  log(successPrefix(logPrefix), successMessage);

export const logError = (error: Error): void => {
  const errorDescription = `${error.name}: \n ${error.message}`;

  log(errorPrefix(logPrefix), errorMessage(errorDescription));
};
