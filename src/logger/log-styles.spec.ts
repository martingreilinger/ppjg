import { successPrefix, errorPrefix, errorMessage } from './log-styles';

describe('log styles', () => {
  const content = 'content';

  it('addes correctly success style information to the prefix', () => {
    const result = successPrefix(content);

    expect(result).toBe(`\x1b[1m\x1b[32m${content}\x1b[0m`);
  });

  it('addes correctly error style information to the prefix', () => {
    const result = errorPrefix(content);

    expect(result).toBe(`\x1b[1m\x1b[41m${content}\x1b[0m`);
  });

  it('addes correctly error style information to a message', () => {
    const result = errorMessage(content);

    expect(result).toBe(`\x1b[31m${content}\x1b[0m`);
  });
});
