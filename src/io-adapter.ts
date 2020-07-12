import { WorkingDirResolver } from './working-dir-resolver';
import { Mkdir, WriteFileSync } from './node-fs';

export interface IOAdaper {
  cwd: WorkingDirResolver;
  require: NodeRequire;
  mkdir: Mkdir;
  writeFileSync: WriteFileSync;
}
