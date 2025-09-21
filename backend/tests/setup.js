// Test setup file
const path = require('path');

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.PORT = '5001'; // Use different port for tests

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Global test timeout
jest.setTimeout(10000);
