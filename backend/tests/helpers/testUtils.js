// Test helpers and utilities
const fs = require('fs').promises;
const path = require('path');

/**
 * Create a mock file system for testing
 */
const createMockFileSystem = (files) => {
  const originalReadFile = fs.readFile;
  
  jest.spyOn(fs, 'readFile').mockImplementation((filePath) => {
    const fileName = path.basename(filePath);
    
    if (files[fileName]) {
      return Promise.resolve(JSON.stringify(files[fileName]));
    }
    
    return originalReadFile.call(fs, filePath);
  });
  
  return () => {
    fs.readFile.mockRestore();
  };
};

/**
 * Create mock Express request object
 */
const createMockRequest = (overrides = {}) => {
  return {
    params: {},
    query: {},
    body: {},
    ...overrides
  };
};

/**
 * Create mock Express response object
 */
const createMockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
};

/**
 * Create mock Express next function
 */
const createMockNext = () => {
  return jest.fn();
};

/**
 * Wait for async operations to complete
 */
const waitFor = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  createMockFileSystem,
  createMockRequest,
  createMockResponse,
  createMockNext,
  waitFor
};
