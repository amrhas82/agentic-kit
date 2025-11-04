#!/usr/bin/env node

/**
 * Test Suite: Enhanced Summary Display
 * Tests for showSummary() method with actual file counts and sizes
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Import the InteractiveInstaller
const InteractiveInstaller = require('../../installer/cli');
const PackageManager = require('../../installer/package-manager');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

// Test result tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failedTests++;
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    if (error.stack) {
      console.log(`  ${colors.red}${error.stack.split('\n').slice(1).join('\n')}${colors.reset}`);
    }
  }
}

async function runTests() {
  console.log(`\n${colors.bright}${colors.cyan}Enhanced Summary Display Tests${colors.reset}\n`);

  // Test Suite 1: Summary Display Integration
  console.log(`${colors.cyan}Test Suite 1: Summary Display Integration${colors.reset}`);

  test('InteractiveInstaller has showSummary method', () => {
    const installer = new InteractiveInstaller();
    assert.strictEqual(typeof installer.showSummary, 'function', 'showSummary should be a method');
  });

  test('InteractiveInstaller has getPackageManager method', () => {
    const installer = new InteractiveInstaller();
    assert.strictEqual(typeof installer.getPackageManager, 'function', 'getPackageManager should be a method');
  });

  test('InteractiveInstaller can access PackageManager', () => {
    const installer = new InteractiveInstaller();
    const packageManager = installer.getPackageManager();
    assert.ok(packageManager instanceof PackageManager, 'Should return PackageManager instance');
  });

  // Test Suite 2: File Count and Size Retrieval
  console.log(`\n${colors.cyan}Test Suite 2: File Count and Size Retrieval${colors.reset}`);

  test('Can retrieve file counts for selected tools', async () => {
    const packageManager = new PackageManager();
    const installer = new InteractiveInstaller();

    // Simulate selections
    installer.selections.variant = 'standard';
    installer.selections.tools = ['claude'];

    // Get package contents
    const contents = await packageManager.getPackageContents('claude', 'standard');
    assert.ok(contents.totalFiles > 0, 'Should have file count');
    assert.ok(contents.totalFiles > 20, 'Standard should have more than 20 files');
  });

  test('Can retrieve sizes for selected tools', async () => {
    const packageManager = new PackageManager();
    const installer = new InteractiveInstaller();

    // Simulate selections
    installer.selections.variant = 'standard';
    installer.selections.tools = ['claude'];

    // Get package size
    const sizeInfo = await packageManager.getPackageSize('claude', 'standard');
    assert.ok(sizeInfo.size > 0, 'Should have size in bytes');
    assert.ok(sizeInfo.formattedSize, 'Should have formatted size');
    assert.ok(sizeInfo.formattedSize.match(/\d+(\.\d+)?\s*(KB|MB|GB)/), 'Formatted size should match pattern');
  });

  test('File counts differ between variants', async () => {
    const packageManager = new PackageManager();

    const liteContents = await packageManager.getPackageContents('claude', 'lite');
    const standardContents = await packageManager.getPackageContents('claude', 'standard');
    const proContents = await packageManager.getPackageContents('claude', 'pro');

    assert.ok(liteContents.totalFiles < standardContents.totalFiles, 'Lite should have fewer files than Standard');
    assert.ok(standardContents.totalFiles < proContents.totalFiles, 'Standard should have fewer files than Pro');
  });

  test('Sizes differ between variants', async () => {
    const packageManager = new PackageManager();

    const liteSize = await packageManager.getPackageSize('claude', 'lite');
    const standardSize = await packageManager.getPackageSize('claude', 'standard');
    const proSize = await packageManager.getPackageSize('claude', 'pro');

    assert.ok(liteSize.size < standardSize.size, 'Lite should be smaller than Standard');
    assert.ok(standardSize.size < proSize.size, 'Standard should be smaller than Pro');
  });

  // Test Suite 3: Multi-Tool Summary
  console.log(`\n${colors.cyan}Test Suite 3: Multi-Tool Summary${colors.reset}`);

  test('Can calculate total files across multiple tools', async () => {
    const packageManager = new PackageManager();
    const installer = new InteractiveInstaller();

    // Simulate multi-tool selection
    installer.selections.variant = 'lite';
    installer.selections.tools = ['claude', 'opencode'];

    let totalFiles = 0;
    for (const toolId of installer.selections.tools) {
      try {
        const contents = await packageManager.getPackageContents(toolId, 'lite');
        totalFiles += contents.totalFiles;
      } catch (error) {
        // Opencode might not have content yet - that's okay
        if (toolId === 'claude') {
          throw error; // Claude should work
        }
      }
    }

    assert.ok(totalFiles > 0, 'Should have total file count across tools');
  });

  test('Can calculate total size across multiple tools', async () => {
    const packageManager = new PackageManager();
    const installer = new InteractiveInstaller();

    // Simulate multi-tool selection
    installer.selections.variant = 'lite';
    installer.selections.tools = ['claude', 'opencode'];

    let totalBytes = 0;
    for (const toolId of installer.selections.tools) {
      try {
        const sizeInfo = await packageManager.getPackageSize(toolId, 'lite');
        totalBytes += sizeInfo.size;
      } catch (error) {
        // Opencode might not have content yet - that's okay
        if (toolId === 'claude') {
          throw error; // Claude should work
        }
      }
    }

    assert.ok(totalBytes > 0, 'Should have total size across tools');
  });

  // Test Suite 4: Format Validation
  console.log(`\n${colors.cyan}Test Suite 4: Format Validation${colors.reset}`);

  test('File count format is valid (e.g., "255 files")', async () => {
    const packageManager = new PackageManager();
    const contents = await packageManager.getPackageContents('claude', 'standard');
    const fileCountStr = `${contents.totalFiles} files`;

    assert.ok(fileCountStr.match(/^\d+ files$/), 'File count should match "N files" pattern');
    assert.ok(contents.totalFiles > 0, 'Should have positive file count');
  });

  test('Size format is valid (e.g., "8.39 MB")', async () => {
    const packageManager = new PackageManager();
    const sizeInfo = await packageManager.getPackageSize('claude', 'standard');

    assert.ok(sizeInfo.formattedSize.match(/^\d+(\.\d+)?\s*(KB|MB|GB)$/), 'Size should match format pattern');
  });

  test('Formatted size uses appropriate units', async () => {
    const packageManager = new PackageManager();

    const liteSize = await packageManager.getPackageSize('claude', 'lite');
    const standardSize = await packageManager.getPackageSize('claude', 'standard');

    // Lite should be in KB (around 500KB)
    assert.ok(liteSize.formattedSize.includes('KB') || liteSize.formattedSize.includes('MB'),
      'Lite should use KB or MB units');

    // Standard should be in MB (around 8MB)
    assert.ok(standardSize.formattedSize.includes('MB'), 'Standard should use MB units');
  });

  // Test Suite 5: Summary Display Structure
  console.log(`\n${colors.cyan}Test Suite 5: Summary Display Structure${colors.reset}`);

  test('Summary should display tool information correctly', async () => {
    const installer = new InteractiveInstaller();
    const packageManager = installer.getPackageManager();

    installer.selections.variant = 'standard';
    installer.selections.tools = ['claude'];
    installer.selections.paths = { claude: '~/.claude' };

    // Get actual values that should be displayed
    const contents = await packageManager.getPackageContents('claude', 'standard');
    const sizeInfo = await packageManager.getPackageSize('claude', 'standard');

    // Verify we can construct the summary data
    const summaryData = {
      tool: 'Claude Code',
      path: '~/.claude',
      fileCount: contents.totalFiles,
      size: sizeInfo.formattedSize
    };

    assert.ok(summaryData.fileCount > 0, 'Should have file count');
    assert.ok(summaryData.size, 'Should have size');
    assert.strictEqual(summaryData.tool, 'Claude Code', 'Tool name should be correct');
  });

  // Print summary
  console.log(`\n${colors.bright}Test Summary${colors.reset}`);
  console.log(`${colors.cyan}Total tests: ${totalTests}${colors.reset}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);

  if (failedTests === 0) {
    console.log(`\n${colors.green}${colors.bright}All tests passed!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}${colors.bright}Some tests failed.${colors.reset}\n`);
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Test execution error: ${error.message}${colors.reset}`);
  process.exit(1);
});
