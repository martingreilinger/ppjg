import { mkdirAsync } from './async-fs';

describe('async fs', () => {
  describe('when create a directy', () => {
    const directoryName = 'dir';

    test('resolves promise sucessfully', done => {
      const mkdirSpy = jest.fn((...args) => args[2]());

      mkdirAsync(directoryName)(mkdirSpy).then(() => {
        expect(mkdirSpy).toHaveBeenCalledWith(
          directoryName,
          { recursive: true },
          expect.any(Function)
        );
        done();
      }, done.fail);
    });

    test('rejects promise on error', done => {
      const expectedError = new Error('something went wrong');
      const mkdirSpy = jest.fn((...args) => args[2](expectedError));

      mkdirAsync(directoryName)(mkdirSpy).then(
        () => done.fail(),
        error => {
          expect(mkdirSpy).toHaveBeenCalledWith(
            directoryName,
            { recursive: true },
            expect.any(Function)
          );
          expect(error).toBe(expectedError);
          done();
        }
      );
    });
  });
});
