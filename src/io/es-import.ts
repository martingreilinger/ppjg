/** Webpack replaces calls to `import()` from within a bundle.
    This module is not parsed by webpack and exports a the the real `import` */
export const esImport = <T>(moduleName: string): Promise<T> =>
  import(moduleName);
