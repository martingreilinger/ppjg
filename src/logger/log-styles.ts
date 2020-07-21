const bold = '\x1b[1m';
const unset = '\x1b[0m';
const fgRed = '\x1b[31m';
const fgGreen = '\x1b[32m';
const bgRed = '\x1b[41m';

export const successPrefix = (prefix: string): string =>
  `${bold}${fgGreen}${prefix}${unset}`;

export const errorPrefix = (prefix: string): string =>
  `${bold}${bgRed}${prefix}${unset}`;

export const errorMessage = (message: string): string =>
  `${fgRed}${message}${unset}`;
