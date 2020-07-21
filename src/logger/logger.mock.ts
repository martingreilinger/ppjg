import { Logger } from './logger';

export class LoggerMock implements Logger {
  log: jest.Mock = jest.fn();
}
