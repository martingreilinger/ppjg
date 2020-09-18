import {generatorConfigWithCliArgs, helpFlagSet, helpMessage} from './cli-utils';

describe('CliUtils', () => {
  describe('evaluates if the "help flag" is set', () => {
    [
      {args: [], result: false},
      {args: ['-h'], result: true},
      {args: ['--help'], result: true},
    ].forEach(({args, result}) =>
      it(`returns ${result} if args include ${args}`, () => {
        const flagIncluded = helpFlagSet(args);

        expect(flagIncluded).toBe(result);
      }),
    );
  });

  it('returns a help message including the current version', () => {
    const version = 'custom version';
    const nonWebpackRequire = jest.fn().mockReturnValue({version});
    global.__non_webpack_require__ = nonWebpackRequire;

    const message = helpMessage();

    expect(nonWebpackRequire).toHaveBeenCalled();
    expect(message).toContain(version);
  });

  describe('create a partial generator config from cli args', () => {
    const outDir = 'build';
    const configName = 'conf';

    it('properties are undefined when no args are given', () => {
      const config = generatorConfigWithCliArgs([]);

      expect(config.outDir).toBeUndefined();
      expect(config.publishConfigFileName).toBeUndefined();
    });

    [
      {argType: 'short', args: ['-o', outDir, '-c', configName]},
      {argType: 'long', args: ['--outDir', outDir, '--config', configName]},
    ].forEach(({argType, args}) =>
      it(`properties are defined when the ${argType} args are given`, () => {
        const config = generatorConfigWithCliArgs(args);

        expect(config.outDir).toBe(outDir);
        expect(config.publishConfigFileName).toBe(configName);
      }));
  });
});
