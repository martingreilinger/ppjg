import { buildPublishPackageJsonPath, buildFilePath } from './path-utils';
import { WorkingDirResolver } from './working-dir-resolver';

const workingDirResolverStub: WorkingDirResolver = () => '';

describe('PathUtils', () => {
  test('builds a file path without sub folder', () => {
    const file = 'target.yaml';

    const outPath = buildFilePath(file)(workingDirResolverStub);

    expect(outPath).toMatch(`/${file}`);
  });

  test('build file path for pubish package.json', () => {
    const dir = 'target';

    const outPath = buildPublishPackageJsonPath(dir)(workingDirResolverStub);

    expect(outPath).toBe(`/${dir}/package.json`);
  });
});
