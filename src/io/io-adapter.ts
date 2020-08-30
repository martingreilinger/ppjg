import { WorkingDirResolver } from './working-dir-resolver';
import { Mkdir, WriteFileSync } from './node-fs';

export interface IOAdaper {
  cwd: WorkingDirResolver;
  mkdir: Mkdir;
  writeFileSync: WriteFileSync;
  esImport<T>(moduleName: string): Promise<T>;
}
