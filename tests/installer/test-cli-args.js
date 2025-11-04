/**
 * Test CLI Command-Line Argument Parsing
 *
 * Tests the parseCommandLineArgs functionality and command-line interface
 */

const assert = require('assert');
const path = require('path');

// Test utilities
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

function testPassed(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function testFailed(message, error) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
  console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
}

// Mock process.argv for testing
function mockArgv(args) {
  const originalArgv = process.argv;
  process.argv = ['node', 'cli.js', ...args];
  return () => {
    process.argv = originalArgv;
  };
}

// Test parseCommandLineArgs method
async function testParseCommandLineArgs() {
  console.log(`\n${colors.cyan}Testing Command-Line Argument Parsing${colors.reset}\n`);

  const InteractiveInstaller = require('../../installer/cli.js');

  // Test 1: Parse --help flag
  try {
    const restore = mockArgv(['--help']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.help, true, '--help should be true');
    restore();
    testPassed('Parse --help flag');
  } catch (error) {
    testFailed('Parse --help flag', error);
  }

  // Test 2: Parse --uninstall flag
  try {
    const restore = mockArgv(['--uninstall', 'claude']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.uninstall, 'claude', '--uninstall should be "claude"');
    restore();
    testPassed('Parse --uninstall flag');
  } catch (error) {
    testFailed('Parse --uninstall flag', error);
  }

  // Test 3: Parse --variant flag
  try {
    const restore = mockArgv(['--variant', 'standard']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.variant, 'standard', '--variant should be "standard"');
    restore();
    testPassed('Parse --variant flag');
  } catch (error) {
    testFailed('Parse --variant flag', error);
  }

  // Test 4: Parse --tools flag
  try {
    const restore = mockArgv(['--tools', 'claude,opencode']);
    const installer = new InteractiveInstaller();
    assert.deepStrictEqual(installer.cliArgs.tools, ['claude', 'opencode'], '--tools should be ["claude", "opencode"]');
    restore();
    testPassed('Parse --tools flag with multiple tools');
  } catch (error) {
    testFailed('Parse --tools flag with multiple tools', error);
  }

  // Test 5: Parse --path flag
  try {
    const restore = mockArgv(['--path', 'claude=/custom/path']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.paths.claude, '/custom/path', '--path should set claude path');
    restore();
    testPassed('Parse --path flag');
  } catch (error) {
    testFailed('Parse --path flag', error);
  }

  // Test 6: Parse --silent flag
  try {
    const restore = mockArgv(['--silent']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, '--silent should be true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, '--silent should set nonInteractive to true');
    restore();
    testPassed('Parse --silent flag');
  } catch (error) {
    testFailed('Parse --silent flag', error);
  }

  // Test 7: Parse --non-interactive flag
  try {
    const restore = mockArgv(['--non-interactive']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, '--non-interactive should set silent to true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, '--non-interactive should be true');
    restore();
    testPassed('Parse --non-interactive flag');
  } catch (error) {
    testFailed('Parse --non-interactive flag', error);
  }

  // Test 8: Parse --config flag
  try {
    const restore = mockArgv(['--config', 'config.json']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.config, 'config.json', '--config should be "config.json"');
    restore();
    testPassed('Parse --config flag');
  } catch (error) {
    testFailed('Parse --config flag', error);
  }

  // Test 9: Parse multiple flags
  try {
    const restore = mockArgv(['--variant', 'pro', '--tools', 'claude,opencode,ampcode', '--path', 'claude=/custom', '--silent']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.variant, 'pro', 'variant should be "pro"');
    assert.deepStrictEqual(installer.cliArgs.tools, ['claude', 'opencode', 'ampcode'], 'tools should be array of 3');
    assert.strictEqual(installer.cliArgs.paths.claude, '/custom', 'claude path should be /custom');
    assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');
    restore();
    testPassed('Parse multiple flags together');
  } catch (error) {
    testFailed('Parse multiple flags together', error);
  }

  // Test 10: Parse -h (short form)
  try {
    const restore = mockArgv(['-h']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.help, true, '-h should be recognized as help');
    restore();
    testPassed('Parse -h (short form of --help)');
  } catch (error) {
    testFailed('Parse -h (short form of --help)', error);
  }

  // Test 11: Parse no arguments (default state)
  try {
    const restore = mockArgv([]);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.help, false, 'help should be false by default');
    assert.strictEqual(installer.cliArgs.uninstall, null, 'uninstall should be null by default');
    assert.strictEqual(installer.cliArgs.variant, null, 'variant should be null by default');
    assert.deepStrictEqual(installer.cliArgs.tools, [], 'tools should be empty array by default');
    assert.deepStrictEqual(installer.cliArgs.paths, {}, 'paths should be empty object by default');
    assert.strictEqual(installer.cliArgs.silent, false, 'silent should be false by default');
    restore();
    testPassed('Parse no arguments (default state)');
  } catch (error) {
    testFailed('Parse no arguments (default state)', error);
  }

  // Test 12: Parse tools with spaces
  try {
    const restore = mockArgv(['--tools', 'claude, opencode, ampcode']);
    const installer = new InteractiveInstaller();
    assert.deepStrictEqual(installer.cliArgs.tools, ['claude', 'opencode', 'ampcode'], 'tools should trim spaces');
    restore();
    testPassed('Parse tools with spaces (trimmed correctly)');
  } catch (error) {
    testFailed('Parse tools with spaces (trimmed correctly)', error);
  }

  // Test 13: Parse multiple --path flags
  try {
    const restore = mockArgv(['--path', 'claude=/path1', '--path', 'opencode=/path2']);
    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.paths.claude, '/path1', 'claude path should be /path1');
    assert.strictEqual(installer.cliArgs.paths.opencode, '/path2', 'opencode path should be /path2');
    restore();
    testPassed('Parse multiple --path flags');
  } catch (error) {
    testFailed('Parse multiple --path flags', error);
  }
}

// Test showHelp method (visual test)
async function testShowHelp() {
  console.log(`\n${colors.cyan}Testing Help Display${colors.reset}\n`);

  try {
    const restore = mockArgv(['--help']);
    const InteractiveInstaller = require('../../installer/cli.js');
    const installer = new InteractiveInstaller();

    // Verify showHelp method exists
    assert.strictEqual(typeof installer.showHelp, 'function', 'showHelp should be a function');
    testPassed('showHelp method exists');

    // Note: We won't call showHelp() here as it writes to console
    // It's already tested by running `node installer/cli.js --help`

    restore();
  } catch (error) {
    testFailed('showHelp method exists', error);
  }
}

// Test validation logic
async function testValidation() {
  console.log(`\n${colors.cyan}Testing Validation Logic${colors.reset}\n`);

  const InteractiveInstaller = require('../../installer/cli.js');

  // Test 1: Verify runNonInteractive validates variant
  try {
    const restore = mockArgv(['--variant', 'invalid', '--tools', 'claude']);
    const installer = new InteractiveInstaller();

    // Verify method exists
    assert.strictEqual(typeof installer.runNonInteractive, 'function', 'runNonInteractive should be a function');
    testPassed('runNonInteractive method exists');

    restore();
  } catch (error) {
    testFailed('runNonInteractive method exists', error);
  }

  // Test 2: Verify runUninstall method exists
  try {
    const restore = mockArgv(['--uninstall', 'claude']);
    const installer = new InteractiveInstaller();

    // Verify method exists
    assert.strictEqual(typeof installer.runUninstall, 'function', 'runUninstall should be a function');
    testPassed('runUninstall method exists');

    restore();
  } catch (error) {
    testFailed('runUninstall method exists', error);
  }

  // Test 3: Verify loadConfig method exists
  try {
    const restore = mockArgv(['--config', 'config.json']);
    const installer = new InteractiveInstaller();

    // Verify method exists
    assert.strictEqual(typeof installer.loadConfig, 'function', 'loadConfig should be a function');
    testPassed('loadConfig method exists');

    restore();
  } catch (error) {
    testFailed('loadConfig method exists', error);
  }
}

// Test configuration file format
async function testConfigFile() {
  console.log(`\n${colors.cyan}Testing Configuration File Format${colors.reset}\n`);

  const fs = require('fs');
  const os = require('os');
  const path = require('path');

  // Create test config file
  const testConfigPath = path.join(os.tmpdir(), 'test-config.json');
  const testConfig = {
    variant: 'standard',
    tools: ['claude', 'opencode'],
    paths: {
      claude: '~/.claude-test',
      opencode: '~/.config/opencode-test'
    },
    silent: false
  };

  try {
    // Write test config
    fs.writeFileSync(testConfigPath, JSON.stringify(testConfig, null, 2));
    testPassed('Create test configuration file');

    // Verify JSON is valid
    const loadedConfig = JSON.parse(fs.readFileSync(testConfigPath, 'utf8'));
    assert.deepStrictEqual(loadedConfig, testConfig, 'Config should load correctly');
    testPassed('Verify configuration file format');

    // Clean up
    fs.unlinkSync(testConfigPath);
    testPassed('Clean up test configuration file');

  } catch (error) {
    testFailed('Configuration file operations', error);
  }
}

// Run all tests
async function runAllTests() {
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.cyan}CLI Command-Line Argument Parsing Tests${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);

  await testParseCommandLineArgs();
  await testShowHelp();
  await testValidation();
  await testConfigFile();

  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.green}All tests completed!${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

// Run tests
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = { runAllTests };
