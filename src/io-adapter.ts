import { WorkingDirResolver } from './working-dir-resolver';
import { Mkdir, WriteFileSync } from './node-fs';

export interface IOAdaper {
  cwd: WorkingDirResolver;
  mkdir: Mkdir;
  writeFileSync: WriteFileSync;
  importESM<T>(moduleName: string): Promise<T>;
}
