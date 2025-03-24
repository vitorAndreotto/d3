export const logger = {
  info: (context: string, message: any) => {
    console.log(
      '\x1b[32m%s\x1b[0m %s \x1b[36m%s\x1b[0m',
      `[${context}]`,
      '→',
      typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    );
  },
  warn: (context: string, message: any) => {
    console.log(
      '\x1b[33m%s\x1b[0m %s \x1b[36m%s\x1b[0m',
      `[${context}]`,
      '⚠',
      typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    );
  },
  error: (context: string, message: any) => {
    console.log(
      '\x1b[31m%s\x1b[0m %s \x1b[36m%s\x1b[0m',
      `[${context}]`,
      '✖',
      typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    );
  }
};
