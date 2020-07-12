import { WorkingDirResolver } from './working-dir-resolver';

export type PathProvider = (workingDirResolver: WorkingDirResolver) => string;
