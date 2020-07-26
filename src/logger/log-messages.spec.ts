import { LoggerMock } from './logger.mock';
import { logSuccess, logError } from './log-messages';

class TestError extends Error {
  name = 'TestError';
}

describe('log messages', () => {
  let logger: LoggerMock;

  beforeEach(() => {
    logger = { log: jest.fn() };
  });

  it('logs success message formatted correctly', () => {
    const message = 'Successfully generated a package.json for publishing!';

    logSuccess()(logger);

    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('[PPJG]'));
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining(message));
  });

  it('logs error message formatted correctly', () => {
    const message = 'this caused issues';
    const error = new TestError(message);

    logError(error)(logger);

    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining('[PPJG]'));
    expect(logger.log).toHaveBeenCalledWith(expect.stringContaining(message));
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringContaining('TestError')
    );
  });
});
