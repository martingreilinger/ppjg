import { getOutDirPath } from './path-utils';

function outDirRegex(outDir = 'out'): RegExp {
  return new RegExp(`.*/${outDir}/package.json`);
}

describe('PathUtils', () => {
  test('provides out dir path for the generated package json', () => {
    const outPath = getOutDirPath();

    expect(outPath).toMatch(outDirRegex());
  });

  test('provides out dir path with custom directory', () => {
    const outDir = 'target';
    const outPath = getOutDirPath(outDir);

    expect(outPath).toMatch(outDirRegex(outDir));
  });
});
