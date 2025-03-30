import { cleanup, init } from 'detox';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import adapter from 'detox/runners/jest/adapter';

const config = require('../package.json').detox;

jest.setTimeout(120000);
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status for every test.
beforeAll(async () => {
  await init();
  await device.launchApp();
});

// Set the default timeout
jest.setTimeout(120000);

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
