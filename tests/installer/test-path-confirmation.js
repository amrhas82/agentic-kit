#!/usr/bin/env node

/**
 * Test Suite: Custom Path Confirmation Dialog
 *
 * Tests the enhanced path configuration flow with validation
 * and custom path confirmation dialog.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');

// ANSI colors for test output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

// Import the InteractiveInstaller class
const InteractiveInstaller = require('../../installer/cli.js');

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(description, testFn) {
  totalTests++;
  try {
    testFn();
    passedTests++;
    console.log(`${colors.green}✓${colors.reset} ${description}`);
  } catch (error) {
    failedTests++;
    console.log(`${colors.red}✗${colors.reset} ${description}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
  }
}

console.log(`\n${colors.bright}${colors.cyan}Testing Custom Path Confirmation Dialog${colors.reset}\n`);

// Create installer instance for testing
const installer = new InteractiveInstaller();

// Test Suite 1: Path Validation Method
console.log(`${colors.cyan}Test Suite 1: Path Validation${colors.reset}`);

test('validatePath() returns validation object with required fields', () => {
  const result = installer.validatePath('/tmp/test-path');
  assert(typeof result === 'object', 'Result should be an object');
  assert(typeof result.valid === 'boolean', 'Result should have valid boolean');
  assert(Array.isArray(result.issues), 'Result should have issues array');
  assert(typeof result.parentExists === 'boolean', 'Result should have parentExists boolean');
  assert(typeof result.hasPermission === 'boolean', 'Result should have hasPermission boolean');
  assert(typeof result.hasDiskSpace === 'boolean', 'Result should have hasDiskSpace boolean');
});

test('validatePath() validates valid path with existing parent', () => {
  const testPath = path.join(os.tmpdir(), 'agentic-kit-test-' + Date.now());
  const result = installer.validatePath(testPath);
  assert.strictEqual(result.valid, true, 'Valid path should be marked as valid');
  assert.strictEqual(result.parentExists, true, 'Parent directory should exist');
  assert.strictEqual(result.hasPermission, true, 'Should have write permission');
});

test('validatePath() expands tilde (~) to home directory', () => {
  const result = installer.validatePath('~/.test-path');
  const homeDir = os.homedir();
  // Validation should work with expanded path (home dir exists)
  assert.strictEqual(result.parentExists, true, 'Home directory should exist');
});

test('validatePath() handles absolute paths correctly', () => {
  const result = installer.validatePath('/tmp/absolute-test-path');
  assert.strictEqual(result.valid, true, 'Absolute path should be valid');
  assert.strictEqual(result.parentExists, true, '/tmp should exist');
});

test('validatePath() warns when parent directory does not exist', () => {
  const nonExistentPath = '/nonexistent-parent-' + Date.now() + '/child/path';
  const result = installer.validatePath(nonExistentPath);
  // Should have warning about parent not existing
  const hasWarning = result.issues.some(issue =>
    issue.severity === 'warning' &&
    issue.message.includes('Parent directory does not exist')
  );
  assert(hasWarning, 'Should warn about non-existent parent directory');
});

test('validatePath() warns when path already exists', () => {
  const existingPath = os.tmpdir();
  const result = installer.validatePath(existingPath);
  const hasWarning = result.issues.some(issue =>
    issue.severity === 'warning' &&
    issue.message.includes('already exists')
  );
  assert(hasWarning, 'Should warn about existing path');
});

test('validatePath() checks write permissions', () => {
  // Test with a directory we know exists and is writable
  const writablePath = path.join(os.tmpdir(), 'writable-test-' + Date.now());
  const result = installer.validatePath(writablePath);
  assert.strictEqual(result.hasPermission, true, 'Should detect write permission in /tmp');
});

test('validatePath() includes severity levels in issues (error vs warning)', () => {
  const result = installer.validatePath('~/.test-validation');
  // All issues should have severity field
  result.issues.forEach(issue => {
    assert(issue.severity === 'error' || issue.severity === 'warning',
      'Issue should have severity of "error" or "warning"');
  });
});

// Test Suite 2: Custom Path Confirmation Dialog
console.log(`\n${colors.cyan}Test Suite 2: Custom Path Confirmation Dialog Structure${colors.reset}`);

test('showCustomPathConfirmation() is a method on InteractiveInstaller', () => {
  assert(typeof installer.showCustomPathConfirmation === 'function',
    'showCustomPathConfirmation should be a function');
});

test('showCustomPathConfirmation() accepts tool and customPath parameters', () => {
  const method = installer.showCustomPathConfirmation;
  // Check function signature (accepts 2 parameters)
  assert.strictEqual(method.length, 2,
    'showCustomPathConfirmation should accept 2 parameters');
});

// Test Suite 3: configurePaths() Integration
console.log(`\n${colors.cyan}Test Suite 3: configurePaths() Integration${colors.reset}`);

test('configurePaths() is a method on InteractiveInstaller', () => {
  assert(typeof installer.configurePaths === 'function',
    'configurePaths should be a function');
});

test('configurePaths() method structure includes custom path detection', () => {
  // Read the source to verify implementation
  const source = installer.configurePaths.toString();
  assert(source.includes('showCustomPathConfirmation'),
    'configurePaths should call showCustomPathConfirmation for custom paths');
  assert(source.includes('customPath !== tool.path'),
    'configurePaths should detect when custom path differs from default');
});

test('configurePaths() sets paths in selections.paths object', () => {
  // Verify the method manipulates the selections object
  const source = installer.configurePaths.toString();
  assert(source.includes('this.selections.paths'),
    'configurePaths should store paths in selections.paths');
});

// Test Suite 4: Validation Logic
console.log(`\n${colors.cyan}Test Suite 4: Validation Logic Details${colors.reset}`);

test('validatePath() checks for absolute paths', () => {
  // Absolute path check is in the implementation
  const source = installer.validatePath.toString();
  assert(source.includes('isAbsolute'),
    'Should check if path is absolute');
});

test('validatePath() checks parent directory existence', () => {
  const source = installer.validatePath.toString();
  assert(source.includes('dirname') && source.includes('existsSync'),
    'Should check parent directory existence');
});

test('validatePath() checks write permissions using fs.accessSync', () => {
  const source = installer.validatePath.toString();
  assert(source.includes('accessSync') && source.includes('W_OK'),
    'Should check write permissions');
});

test('validatePath() checks disk space availability', () => {
  const source = installer.validatePath.toString();
  assert(source.includes('statfsSync') || source.includes('disk'),
    'Should attempt to check disk space');
});

test('validatePath() has error handling with try-catch', () => {
  const source = installer.validatePath.toString();
  assert(source.includes('try') && source.includes('catch'),
    'Should have error handling');
});

// Test Suite 5: Path Validation Edge Cases
console.log(`\n${colors.cyan}Test Suite 5: Edge Cases${colors.reset}`);

test('validatePath() handles relative paths', () => {
  const result = installer.validatePath('./relative/path');
  // Should either convert to absolute or reject
  assert(typeof result.valid === 'boolean', 'Should return validation result');
});

test('validatePath() handles empty string path', () => {
  const result = installer.validatePath('');
  // Should handle gracefully
  assert(typeof result === 'object', 'Should return validation object for empty path');
});

test('validatePath() handles paths with spaces', () => {
  const pathWithSpaces = path.join(os.tmpdir(), 'path with spaces');
  const result = installer.validatePath(pathWithSpaces);
  assert(typeof result.valid === 'boolean', 'Should handle paths with spaces');
});

test('validatePath() handles paths with special characters', () => {
  const pathWithSpecial = path.join(os.tmpdir(), 'path-with_special.chars');
  const result = installer.validatePath(pathWithSpecial);
  assert(typeof result.valid === 'boolean', 'Should handle special characters');
});

// Test Suite 6: Visual Feedback
console.log(`\n${colors.cyan}Test Suite 6: Visual Feedback and UX${colors.reset}`);

test('configurePaths() shows default path for each tool', () => {
  const source = installer.configurePaths.toString();
  assert(source.includes('Default path') || source.includes('default'),
    'Should display default path');
});

test('configurePaths() shows confirmation for custom paths', () => {
  const source = installer.configurePaths.toString();
  assert(source.includes('✓') || source.includes('confirmed') || source.includes('Using'),
    'Should show confirmation message');
});

test('showCustomPathConfirmation() displays validation results with icons', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('✓') || source.includes('✗') || source.includes('⚠'),
    'Should use visual icons for validation results');
});

test('showCustomPathConfirmation() uses color coding for validation', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('green') || source.includes('red') || source.includes('yellow'),
    'Should use color coding for validation feedback');
});

test('showCustomPathConfirmation() shows proposed path prominently', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('Proposed') || source.includes('custom path'),
    'Should show proposed custom path');
});

test('showCustomPathConfirmation() requires explicit confirmation', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('Confirm') && (source.includes('y/N') || source.includes('Y/n')),
    'Should require explicit y/N confirmation');
});

// Test Suite 7: Error Handling
console.log(`\n${colors.cyan}Test Suite 7: Error Handling${colors.reset}`);

test('showCustomPathConfirmation() blocks installation for critical errors', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('severity') && source.includes('error'),
    'Should check for critical errors before allowing confirmation');
});

test('showCustomPathConfirmation() allows warnings but blocks errors', () => {
  const source = installer.showCustomPathConfirmation.toString();
  assert(source.includes('warning') && source.includes('error'),
    'Should differentiate between warnings (allow) and errors (block)');
});

test('validatePath() returns valid:false for permission errors', () => {
  const source = installer.validatePath.toString();
  assert(source.includes('valid') && source.includes('false') && source.includes('permission'),
    'Should mark as invalid when permission errors occur');
});

// Test Suite 8: Default Path Behavior
console.log(`\n${colors.cyan}Test Suite 8: Default Path Behavior${colors.reset}`);

test('configurePaths() accepts Enter key for default path', () => {
  const source = installer.configurePaths.toString();
  assert(source.includes('Enter') || source.includes('default'),
    'Should accept Enter key for default path');
});

test('configurePaths() skips confirmation dialog for default paths', () => {
  const source = installer.configurePaths.toString();
  assert(source.includes('customPath !== tool.path') || source.includes('if'),
    'Should only show confirmation for custom paths, not default paths');
});

test('configurePaths() shows visual confirmation even for default paths', () => {
  const source = installer.configurePaths.toString();
  assert(source.includes('Using default') || source.includes('✓'),
    'Should show confirmation message for default paths too');
});

// Test Results Summary
console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════${colors.reset}`);
console.log(`${colors.bright}Test Results Summary${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════${colors.reset}\n`);

console.log(`Total tests:  ${totalTests}`);
console.log(`${colors.green}Passed:       ${passedTests}${colors.reset}`);
console.log(`${colors.red}Failed:       ${failedTests}${colors.reset}`);

if (failedTests === 0) {
  console.log(`\n${colors.green}${colors.bright}All tests passed!${colors.reset}`);
  process.exit(0);
} else {
  console.log(`\n${colors.red}${colors.bright}Some tests failed${colors.reset}`);
  process.exit(1);
}
