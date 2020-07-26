import { Mkdir } from './node-fs';

export function mkdirAsync(
  dirName: string
): (nodeMkdir: Mkdir) => Promise<void> {
  return nodeMkdir =>
    new Promise((resolve, reject) =>
      nodeMkdir(dirName, { recursive: true }, error =>
        error ? reject(error) : resolve()
      )
    );
}
