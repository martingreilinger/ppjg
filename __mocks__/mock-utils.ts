export const asMock = (mock: unknown): jest.Mock => mock as jest.Mock;

export const resetMock = (mock: unknown): jest.Mock => asMock(mock).mockReset();

export const resetMocks = (...mocks: unknown[]): jest.Mock[] =>
  mocks.map(resetMock);
