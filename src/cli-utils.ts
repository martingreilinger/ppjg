import {PackageJsonModel} from './package-json.model';
import {GeneratorConfigModel} from './generator-config.model';

declare global {
  function __non_webpack_require__<T>(module: string): T;
}

const helpFlags = ['-h', '--help'];
const outDirFlags = ['-o', '--outDir'];
const configFlags = ['-c', '--config'];

export const helpFlagSet = (processArgs: string[]): boolean => !!includedArg(processArgs, ...helpFlags);

const includedArg = (processArgs: string[], ...args: readonly string[]): string | undefined =>
  args.find(arg => processArgs.includes(arg));

export const helpMessage = (): string => `PPJG - Publish Package Json Generator
Version ${__non_webpack_require__<PackageJsonModel>('./package.json').version}

Syntax:   ppjg [options]
Examples: ppjg
          ppjg -o public
          ppjg --outDir public -c publish.conf.js
          
Options:
${helpFlags.join(',')}                Print this message.
${outDirFlags.join(',')} DIRECTORY    Specify a specific output directory (default is 'out')
${configFlags.join(',')} FILE         Specify a different generator config file (default is 'ppj.config.js')
`;

export const generatorConfigWithCliArgs = (processArgs: string[]): Partial<GeneratorConfigModel> => ({
  outDir: getProcessArgumentValue(processArgs, ...outDirFlags),
  publishConfigFileName: getProcessArgumentValue(processArgs, ...configFlags),
});

const getProcessArgumentValue = (processArgs: string[], ...args: readonly string[]): string | undefined => {
  const included = includedArg(processArgs, ...args);

  return included ? processArgs[processArgs.indexOf(included) + 1] : undefined;
};
