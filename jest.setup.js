// This file is used to set up the Jest environment before running tests

// Set up any global mocks or configurations here
global.console = {
  ...console,
  // Make console.error and console.warn throw errors in tests
  error: jest.fn(),
  warn: jest.fn(),
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
};

// Mock the fetch API
global.fetch = jest.fn(() => 
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    ok: true,
  })
);

// Set up any other global variables or mocks needed for tests
