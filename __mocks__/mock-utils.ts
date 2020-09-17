const asMock = (mock: unknown) => mock as jest.Mock;

export const resetMock = (...mocks: unknown[]): jest.Mock[] =>
  mocks.map(asMock).map(mock => mock.mockReset());
