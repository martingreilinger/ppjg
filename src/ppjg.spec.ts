import { preparePublishPackageJson } from './ppjg';

describe('ppjg', () => {
  const packageJson = {
    name: 'test',
    version: '2.0.0'
  };

  test('will generate an empty package.json if no ppjg config options are provided', () => {
    const ppjConfig = {};

    const publishPackageJson = preparePublishPackageJson([
      packageJson,
      ppjConfig
    ]);

    expect(publishPackageJson).toStrictEqual({});
  });

  test('will persist configured properties', () => {
    const ppjConfig = {
      persist: ['name']
    };

    const publishPackageJson = preparePublishPackageJson([
      packageJson,
      ppjConfig
    ]);

    expect(publishPackageJson).toStrictEqual({ name: 'test' });
  });

  test('will alter configured properties', () => {
    const ppjConfig = {
      alter: {
        version: '3.0.1-beta'
      }
    };

    const publishPackageJson = preparePublishPackageJson([
      packageJson,
      ppjConfig
    ]);

    expect(publishPackageJson).toStrictEqual({ version: '3.0.1-beta' });
  });

  test('will generate a new publish json based on the provided config', () => {
    const ppjConfig = {
      persist: ['name', 'version'],
      alter: {
        description: 'a test package',
        author: {
          name: 'author',
          email: 'mail@com'
        }
      }
    };
    const expectedPublishConfig = {
      name: 'test',
      version: '2.0.0',
      description: 'a test package',
      author: {
        name: 'author',
        email: 'mail@com'
      }
    };

    const publishPackageJson = preparePublishPackageJson([
      packageJson,
      ppjConfig
    ]);

    expect(publishPackageJson).toStrictEqual(expectedPublishConfig);
  });
});
