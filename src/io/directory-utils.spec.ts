import { promises } from 'fs';
import { resetMock, asMock } from '../../__mocks__/mock-utils';
import { ensureDirExists } from './directory-utils';

jest.mock('fs');

describe('DirectoryUtils', () => {
  const dirName = 'dir';

  beforeEach(() => resetMock(promises.mkdir));

  describe('returns a success promise', () => {
    it('when no error is encountered', done => {
      asMock(promises.mkdir).mockReturnValue(Promise.resolve());

      ensureDirExists(dirName)
        .then(() => expect(promises.mkdir).toHaveBeenCalledWith(dirName))
        .then(done)
        .catch(done.fail);
    });

    it('when the directory already exists', done => {
      asMock(promises.mkdir).mockReturnValue(Promise.reject({ errno: -17 }));

      ensureDirExists(dirName)
        .then(() => expect(promises.mkdir).toHaveBeenCalledWith(dirName))
        .then(done)
        .catch(done.fail);
    });
  });

  it('returns an error promisse when unknown error is encountered', done => {
    const unknownError = { errno: 99, message: 'Error' };
    asMock(promises.mkdir).mockReturnValue(Promise.reject(unknownError));

    ensureDirExists(dirName)
      .then(() => done.fail('Expected promise should be rejected!'))
      .catch(error => {
        expect(error).toBe(unknownError);
        done();
      });
  });
});
