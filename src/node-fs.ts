import { PathLike, MakeDirectoryOptions, WriteFileOptions } from 'fs';

export type Mkdir = (
  path: PathLike,
  options: MakeDirectoryOptions & { recursive: true },
  callback: (err: NodeJS.ErrnoException | null, path: string) => void
) => void;

export type WriteFileSync = (
  path: PathLike | number,
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions
) => void;
