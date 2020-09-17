import { esImport } from './es-import';
import { buildFilePath, buildPublishPackageJsonPath } from './path-utils';
import { ensureDirExists } from './directory-utils';
import {
  readPackageJson,
  readPublishConfig,
  writePackageJson,
} from './io-utils';
import { resetMocks, asMock } from '../../__mocks__/mock-utils';
import { promises } from 'fs';

jest.mock('fs');
jest.mock('./es-import');
jest.mock('./path-utils');
jest.mock('./directory-utils');

describe('IOUtils', () => {
  const fileData = {};
  const filePath = 'filePath';

  beforeEach(() => {
    resetMocks(
      esImport,
      buildFilePath,
      buildPublishPackageJsonPath,
      ensureDirExists,
      promises.writeFile,
    );

    asMock(buildFilePath).mockReturnValue(filePath);
    asMock(buildPublishPackageJsonPath).mockReturnValue(filePath);
    asMock(esImport).mockReturnValue(Promise.resolve(fileData));
  });

  it('can read the package json file', done => {
    readPackageJson()
      .then(data => {
        expect(data).toBe(fileData);
        expect(buildFilePath).toHaveBeenCalledWith('package.json');
        expect(esImport).toHaveBeenCalledWith(filePath);
        done();
      })
      .catch(done.fail);
  });

  it('can read the publish config', done => {
    const configFileName = 'ppj.config.js';

    readPublishConfig(configFileName)
      .then(data => {
        expect(data).toBe(fileData);
        expect(buildFilePath).toHaveBeenCalledWith(configFileName);
        expect(esImport).toHaveBeenCalledWith(filePath);

        done();
      })
      .catch(done.fail);
  });

  it('can write the generated package json file into the out dir', done => {
    const outdir = 'build';
    const data = {};
    const stringifiedData = 'data';
    const stringifySpy = jest
      .spyOn(JSON, 'stringify')
      .mockReturnValue(stringifiedData);
    asMock(ensureDirExists).mockReturnValue(Promise.resolve());
    asMock(promises.writeFile).mockReturnValue(Promise.resolve());

    writePackageJson(outdir)(data)
      .then(() => {
        expect(ensureDirExists).toHaveBeenCalledWith(outdir);
        expect(stringifySpy).toHaveBeenCalledWith(data, null, 2);
        expect(promises.writeFile).toHaveBeenCalledWith(
          filePath,
          stringifiedData,
        );

        done();
      })
      .catch(done.fail);
  });
});
