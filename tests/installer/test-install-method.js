#!/usr/bin/env node

/**
 * Manual test for CLI install() method with real-time progress bars
 *
 * Tests the enhanced install() method with:
 * - Real InstallationEngine integration
 * - Real-time progress bar display
 * - Multi-tool installation
 * - Success/failure handling
 * - Overall progress tracking
 */

const fs = require('fs');
const path = require('path');
const InteractiveInstaller = require('../../installer/cli');

// ANSI colors for test output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Test utilities
const tests = [];
const results = { passed: 0, failed: 0 };

function test(name, fn) {
  tests.push({ name, fn });
}

async function runTests() {
  console.log(`${colors.bright}${colors.cyan}Testing CLI install() Method with Progress Bars${colors.reset}\n`);

  for (const t of tests) {
    try {
      await t.fn();
      results.passed++;
      console.log(`${colors.green}✓${colors.reset} ${t.name}`);
    } catch (error) {
      results.failed++;
      console.log(`${colors.red}✗${colors.reset} ${t.name}`);
      console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    }
  }

  console.log(`\n${colors.bright}Test Summary${colors.reset}`);
  console.log(`Total: ${tests.length}`);
  console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
  if (results.failed > 0) {
    console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);
  }

  if (results.failed === 0) {
    console.log(`\n${colors.green}${colors.bright}All tests passed!${colors.reset}`);
  } else {
    process.exit(1);
  }
}

// Create temporary test directory
const tmpDir = path.join(__dirname, '../tmp', `test-cli-install-${Date.now()}`);
fs.mkdirSync(tmpDir, { recursive: true });

// Test 1: Install single tool with progress tracking
test('Install single tool (Claude Lite) with progress tracking', async () => {
  const installer = new InteractiveInstaller();

  // Mock readline close
  installer.rl.close = () => {};

  // Set up selections
  installer.selections = {
    variant: 'lite',
    tools: ['claude'],
    paths: {
      claude: path.join(tmpDir, 'claude-lite-test')
    }
  };

  // Track progress callbacks
  let progressCallbacks = 0;

  // Spy on drawProgressBar
  const originalDrawProgressBar = installer.drawProgressBar.bind(installer);
  installer.drawProgressBar = (...args) => {
    progressCallbacks++;
    // Don't actually draw during test (avoid console spam)
    // originalDrawProgressBar(...args);
  };

  // Run installation
  await installer.install();

  // Verify installation
  const manifestPath = path.join(tmpDir, 'claude-lite-test', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Manifest not created');
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.variant !== 'lite') {
    throw new Error(`Expected variant 'lite', got '${manifest.variant}'`);
  }

  if (manifest.components.agents !== 3) {
    throw new Error(`Expected 3 agents, got ${manifest.components.agents}`);
  }

  if (progressCallbacks === 0) {
    throw new Error('Progress callbacks were not called');
  }

  console.log(`  ${colors.cyan}Progress callbacks: ${progressCallbacks}${colors.reset}`);
});

// Test 2: Install multiple tools with progress tracking
test('Install multiple tools (Claude + Opencode) with progress tracking', async () => {
  const installer = new InteractiveInstaller();

  // Mock readline close
  installer.rl.close = () => {};

  // Set up selections
  installer.selections = {
    variant: 'lite',
    tools: ['claude', 'opencode'],
    paths: {
      claude: path.join(tmpDir, 'multi-claude'),
      opencode: path.join(tmpDir, 'multi-opencode')
    }
  };

  // Track progress callbacks per tool
  let totalProgressCallbacks = 0;

  // Spy on drawProgressBar
  installer.drawProgressBar = (...args) => {
    totalProgressCallbacks++;
  };

  // Run installation
  await installer.install();

  // Verify both installations
  const claudeManifestPath = path.join(tmpDir, 'multi-claude', 'manifest.json');
  const opencodeManifestPath = path.join(tmpDir, 'multi-opencode', 'manifest.json');

  if (!fs.existsSync(claudeManifestPath)) {
    throw new Error('Claude manifest not created');
  }

  if (!fs.existsSync(opencodeManifestPath)) {
    throw new Error('Opencode manifest not created');
  }

  if (totalProgressCallbacks === 0) {
    throw new Error('Progress callbacks were not called');
  }

  console.log(`  ${colors.cyan}Total progress callbacks: ${totalProgressCallbacks}${colors.reset}`);
});

// Test 3: Test installation failure and rollback
test('Installation failure triggers rollback with proper error handling', async () => {
  const installer = new InteractiveInstaller();

  // Mock readline close
  installer.rl.close = () => {};

  // Set up selections with invalid tool
  installer.selections = {
    variant: 'lite',
    tools: ['claude', 'invalid-tool'],
    paths: {
      claude: path.join(tmpDir, 'rollback-test-claude'),
      'invalid-tool': path.join(tmpDir, 'rollback-test-invalid')
    }
  };

  // Track progress callbacks
  let progressCallbacks = 0;
  installer.drawProgressBar = (...args) => {
    progressCallbacks++;
  };

  // Run installation (should partially succeed, partially fail)
  await installer.install();

  // Verify Claude was installed successfully
  const claudeManifestPath = path.join(tmpDir, 'rollback-test-claude', 'manifest.json');
  if (!fs.existsSync(claudeManifestPath)) {
    throw new Error('Claude should have been installed successfully');
  }

  // Verify invalid tool was not installed (rollback should have cleaned up)
  const invalidToolPath = path.join(tmpDir, 'rollback-test-invalid');
  const invalidManifestPath = path.join(invalidToolPath, 'manifest.json');
  if (fs.existsSync(invalidManifestPath)) {
    throw new Error('Invalid tool should not have manifest after rollback');
  }

  console.log(`  ${colors.cyan}Successfully handled partial failure with rollback${colors.reset}`);
});

// Test 4: Test progress bar helper methods
test('Progress bar helper methods work correctly', async () => {
  const installer = new InteractiveInstaller();

  // Test drawProgressBar doesn't throw errors
  installer.drawProgressBar(50, 100, 50, 'test/file.txt', '1.5 MB', '3 MB', '500 KB', '0:30', '0:30');

  // Clear the progress bar output
  process.stdout.write('\x1b[2K\r');
  process.stdout.write('\x1b[1A\x1b[2K\r');

  // Test drawOverallProgress doesn't throw errors
  installer.drawOverallProgress(150, 300, 50, 2, 3);

  // Clear the overall progress output
  process.stdout.write('\x1b[2K\r');

  console.log(`  ${colors.cyan}Progress bar rendering methods work correctly${colors.reset}`);
});

// Test 5: Test formatBytes helper
test('formatBytes helper formats sizes correctly', async () => {
  const installer = new InteractiveInstaller();

  const tests = [
    { bytes: 0, expected: '0 Bytes' },
    { bytes: 1024, expected: '1 KB' },
    { bytes: 1024 * 1024, expected: '1 MB' },
    { bytes: 1536 * 1024, expected: '1.5 MB' },
    { bytes: 8.39 * 1024 * 1024, expected: '8.39 MB' }
  ];

  for (const t of tests) {
    const result = installer.formatBytes(t.bytes);
    if (result !== t.expected) {
      throw new Error(`formatBytes(${t.bytes}) expected '${t.expected}', got '${result}'`);
    }
  }

  console.log(`  ${colors.cyan}All byte format conversions correct${colors.reset}`);
});

// Test 6: Test Standard variant installation
test('Install Standard variant with progress tracking', async () => {
  const installer = new InteractiveInstaller();

  // Mock readline close
  installer.rl.close = () => {};

  // Set up selections
  installer.selections = {
    variant: 'standard',
    tools: ['claude'],
    paths: {
      claude: path.join(tmpDir, 'claude-standard-test')
    }
  };

  // Track progress
  let progressCallbacks = 0;
  installer.drawProgressBar = (...args) => {
    progressCallbacks++;
  };

  // Run installation
  await installer.install();

  // Verify installation
  const manifestPath = path.join(tmpDir, 'claude-standard-test', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Manifest not created');
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (manifest.variant !== 'standard') {
    throw new Error(`Expected variant 'standard', got '${manifest.variant}'`);
  }

  if (manifest.components.agents !== 13) {
    throw new Error(`Expected 13 agents, got ${manifest.components.agents}`);
  }

  if (manifest.components.skills !== 8) {
    throw new Error(`Expected 8 skills, got ${manifest.components.skills}`);
  }

  if (progressCallbacks === 0) {
    throw new Error('Progress callbacks were not called');
  }

  console.log(`  ${colors.cyan}Standard variant: 13 agents, 8 skills, ${progressCallbacks} progress updates${colors.reset}`);
});

// Run all tests
runTests().catch(console.error);
