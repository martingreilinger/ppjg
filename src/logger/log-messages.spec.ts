import {logError, logSuccess} from './log-messages';
import {resetMock} from '../../__mocks__/mock-utils';
import {log} from 'console';

jest.mock('console');

describe('log messages', () => {
  beforeEach(() => resetMock(log));

  it('logs success message formatted correctly', () => {
    const message = 'Successfully generated a package.json for publishing!';

    logSuccess();

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining('[PPJG]'),
      expect.stringContaining(message),
    );
  });

  it('logs error message formatted correctly', () => {
    const message = 'this caused issues';
    const name = 'UnexpectedError';
    const error = {name, message};

    logError(error);

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining('[PPJG]'),
      expect.stringContaining(`${name}: \n ${message}`),
    );
  });
});
