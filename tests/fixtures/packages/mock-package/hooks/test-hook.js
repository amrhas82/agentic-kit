#!/usr/bin/env node

/**
 * Test Hook
 * A sample hook for automated testing
 */

console.log('Test hook executed');

module.exports = {
  name: 'test-hook',
  description: 'A test hook for fixture purposes',
  execute: () => {
    console.log('Test hook functionality');
  }
};
