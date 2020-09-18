import {generatePublishPackageJson} from './index';
import {generatorConfigWithCliArgs, helpFlagSet, helpMessage} from './cli-utils';

// remove node and file path from process args
const processArgs = process.argv.slice(2);

helpFlagSet(processArgs)
  ? console.log(helpMessage())
  : generatePublishPackageJson(generatorConfigWithCliArgs(processArgs));
