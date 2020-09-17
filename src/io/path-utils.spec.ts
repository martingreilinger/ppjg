import { buildPublishPackageJsonPath, buildFilePath } from './path-utils';
import { cwd } from 'process';
import { resetMock, asMock } from '../../__mocks__/mock-utils';

jest.mock('process');

describe('PathUtils', () => {
  beforeEach(() => {
    resetMock(cwd);

    asMock(cwd).mockReturnValue('');
  });

  test('builds a file path without sub folder', () => {
    const file = 'target.yaml';

    const outPath = buildFilePath(file);

    expect(outPath).toMatch(`/${file}`);
    expect(cwd).toHaveBeenCalled();
  });

  test('build file path for pubish package.json', () => {
    const dir = 'target';

    const outPath = buildPublishPackageJsonPath(dir);

    expect(outPath).toBe(`/${dir}/package.json`);
    expect(cwd).toHaveBeenCalled();
  });
});
