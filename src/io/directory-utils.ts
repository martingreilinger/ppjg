import { promises } from 'fs';

export const ensureDirExists = (dirName: string): Promise<void> =>
  promises.mkdir(dirName).catch(ignoreErrorIfFolderExists);

const ignoreErrorIfFolderExists = (
  error: NodeJS.ErrnoException,
): Promise<void> =>
  error.errno !== FOLDER_ALREAD_EXISTS_ERROR_NUMBER
    ? Promise.reject(error)
    : Promise.resolve();

const FOLDER_ALREAD_EXISTS_ERROR_NUMBER = -17;
