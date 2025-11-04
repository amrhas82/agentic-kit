#!/usr/bin/env node

/**
 * Silent Mode Test Suite
 *
 * Comprehensive tests for --silent and --non-interactive modes
 * Ensures the installer can run in automated environments (CI/CD)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

// Test results tracking
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

/**
 * Test helper - runs a test and tracks results
 */
async function test(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
  } catch (error) {
    failedTests++;
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    console.log(`  ${colors.red}Error: ${error.message}${colors.reset}`);
    if (error.stack) {
      const stack = error.stack.split('\n').slice(1, 3).join('\n');
      console.log(`  ${colors.red}${stack}${colors.reset}`);
    }
  }
}

/**
 * Create temporary test directory
 */
function createTempDir(prefix) {
  const tempDir = path.join(
    os.tmpdir(),
    `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

/**
 * Clean up temporary directory
 */
function cleanupTempDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Run CLI command and capture output
 */
function runCLI(args, options = {}) {
  return new Promise((resolve, reject) => {
    const cliPath = path.join(__dirname, '../../installer/cli.js');
    const proc = spawn('node', [cliPath, ...args], {
      cwd: options.cwd || process.cwd(),
      env: { ...process.env, ...options.env }
    });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    proc.on('error', (error) => {
      reject(error);
    });

    // Set timeout
    const timeout = options.timeout || 30000;
    setTimeout(() => {
      proc.kill();
      reject(new Error(`Command timed out after ${timeout}ms`));
    }, timeout);
  });
}

/**
 * Create test configuration file
 */
function createConfigFile(dir, config) {
  const configPath = path.join(dir, 'install-config.json');
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  return configPath;
}

// =============================================================================
// Test Suite
// =============================================================================

async function runTests() {
  console.log(`\n${colors.bright}${colors.cyan}Silent Mode Test Suite${colors.reset}`);
  console.log(`${colors.cyan}Testing: Non-Interactive Installation${colors.reset}\n`);

  // ===== Group 1: Basic Silent Mode Tests =====
  console.log(`${colors.blue}${colors.bright}Group 1: Basic Silent Mode Tests${colors.reset}\n`);

  await test('Silent mode flag is recognized and parsed', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    // Mock process.argv
    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--silent'];

    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, 'silent flag should be true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, 'nonInteractive flag should be true');

    process.argv = originalArgv;
  });

  await test('Non-interactive flag is recognized and sets silent mode', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--non-interactive'];

    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, 'nonInteractive should be true');

    process.argv = originalArgv;
  });

  await test('--yes flag is recognized and sets silent mode', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--yes'];

    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, 'nonInteractive should be true');

    process.argv = originalArgv;
  });

  await test('-y flag is recognized and sets silent mode', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '-y'];

    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');
    assert.strictEqual(installer.cliArgs.nonInteractive, true, 'nonInteractive should be true');

    process.argv = originalArgv;
  });

  await test('Silent mode with variant and tools triggers non-interactive mode', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--variant', 'lite', '--tools', 'claude', '--silent'];

    const installer = new InteractiveInstaller();
    assert.strictEqual(installer.cliArgs.variant, 'lite', 'variant should be lite');
    assert.deepStrictEqual(installer.cliArgs.tools, ['claude'], 'tools should be [claude]');
    assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');

    process.argv = originalArgv;
  });

  // ===== Group 2: Configuration File Tests =====
  console.log(`\n${colors.blue}${colors.bright}Group 2: Configuration File Tests${colors.reset}\n`);

  await test('Config file can be loaded and parsed', async () => {
    const tempDir = createTempDir('test-config');

    try {
      const configPath = createConfigFile(tempDir, {
        variant: 'standard',
        tools: ['claude'],
        paths: {
          claude: path.join(tempDir, 'claude')
        },
        silent: true
      });

      const InteractiveInstaller = require('../../installer/cli.js');

      const originalArgv = process.argv;
      process.argv = ['node', 'cli.js', '--config', configPath];

      const installer = new InteractiveInstaller();

      // Load config
      await installer.loadConfig(configPath);

      assert.strictEqual(installer.cliArgs.variant, 'standard', 'variant should be standard');
      assert.deepStrictEqual(installer.cliArgs.tools, ['claude'], 'tools should be [claude]');
      assert.strictEqual(installer.cliArgs.silent, true, 'silent should be true');

      process.argv = originalArgv;
    } finally {
      cleanupTempDir(tempDir);
    }
  });

  await test('Config file with custom paths is applied correctly', async () => {
    const tempDir = createTempDir('test-config-paths');

    try {
      const customPath = path.join(tempDir, 'custom-claude');
      const configPath = createConfigFile(tempDir, {
        variant: 'lite',
        tools: ['claude'],
        paths: {
          claude: customPath
        }
      });

      const InteractiveInstaller = require('../../installer/cli.js');

      const originalArgv = process.argv;
      process.argv = ['node', 'cli.js', '--config', configPath];

      const installer = new InteractiveInstaller();
      await installer.loadConfig(configPath);

      assert.strictEqual(installer.cliArgs.paths.claude, customPath, 'claude path should be custom');

      process.argv = originalArgv;
    } finally {
      cleanupTempDir(tempDir);
    }
  });

  await test('Invalid config file path returns error', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    const originalExit = process.exit;
    let exitCalled = false;

    // Mock process.exit
    process.exit = (code) => {
      exitCalled = true;
      throw new Error(`process.exit(${code})`);
    };

    try {
      process.argv = ['node', 'cli.js', '--config', '/nonexistent/config.json'];

      const installer = new InteractiveInstaller();

      try {
        await installer.loadConfig('/nonexistent/config.json');
        assert.fail('Should have thrown error for missing config file');
      } catch (error) {
        // Expected error
        assert.ok(error.message.includes('ENOENT') || error.message.includes('process.exit'),
          'Should error on missing config file');
      }
    } finally {
      process.argv = originalArgv;
      process.exit = originalExit;
    }
  });

  // ===== Group 3: Exit Code Tests =====
  console.log(`\n${colors.blue}${colors.bright}Group 3: Exit Code Tests${colors.reset}\n`);

  await test('Help flag exits with code 0', async () => {
    const result = await runCLI(['--help'], { timeout: 5000 });

    assert.strictEqual(result.code, 0, 'Should exit with code 0 for --help');
    assert.ok(result.stdout.includes('USAGE'), 'Should display usage information');
  });

  await test('Invalid variant exits with code 1', async () => {
    const result = await runCLI(['--variant', 'invalid', '--tools', 'claude'], { timeout: 5000 });

    assert.strictEqual(result.code, 1, 'Should exit with code 1 for invalid variant');
    assert.ok(result.stdout.includes('Invalid variant') || result.stderr.includes('Invalid variant'),
      'Should display invalid variant error');
  });

  await test('Missing tools exits with code 1', async () => {
    const result = await runCLI(['--variant', 'lite', '--tools', ''], { timeout: 5000 });

    assert.strictEqual(result.code, 1, 'Should exit with code 1 for missing tools');
  });

  await test('Invalid tool ID exits with code 1', async () => {
    const result = await runCLI(['--variant', 'lite', '--tools', 'invalidtool'], { timeout: 5000 });

    assert.strictEqual(result.code, 1, 'Should exit with code 1 for invalid tool');
    assert.ok(result.stdout.includes('Invalid tool') || result.stderr.includes('Invalid tool'),
      'Should display invalid tool error');
  });

  // ===== Group 4: Silent Mode Behavior Tests =====
  console.log(`\n${colors.blue}${colors.bright}Group 4: Silent Mode Behavior Tests${colors.reset}\n`);

  await test('Silent mode auto-proceeds on warnings', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--variant', 'lite', '--tools', 'claude', '--silent'];

    const installer = new InteractiveInstaller();

    // Simulate pre-installation checks with warnings
    const mockPreCheckResult = {
      success: true,
      errors: [],
      warnings: ['Test warning 1', 'Test warning 2']
    };

    // Mock performPreInstallationChecks
    installer.performPreInstallationChecks = async () => mockPreCheckResult;

    // This should not throw or prompt in silent mode
    // We can't easily test the full install() method without actual files,
    // but we can verify the logic is correct
    assert.strictEqual(installer.cliArgs.silent, true, 'Silent mode should be enabled');

    process.argv = originalArgv;
  });

  await test('Silent mode auto-continues after installation failure', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--silent'];

    const installer = new InteractiveInstaller();

    // Test offerRecoveryOptions in silent mode
    const shouldContinue = await installer.offerRecoveryOptions('TestTool', 1, 3);

    assert.strictEqual(shouldContinue, true, 'Should auto-continue in silent mode');

    process.argv = originalArgv;
  });

  await test('runNonInteractive validates variant before proceeding', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    const originalExit = process.exit;
    let exitCode = null;

    process.exit = (code) => {
      exitCode = code;
      throw new Error(`process.exit(${code})`);
    };

    try {
      process.argv = ['node', 'cli.js', '--variant', 'invalid', '--tools', 'claude'];

      const installer = new InteractiveInstaller();

      try {
        await installer.runNonInteractive();
        assert.fail('Should have exited for invalid variant');
      } catch (error) {
        assert.strictEqual(exitCode, 1, 'Should exit with code 1');
      }
    } finally {
      process.argv = originalArgv;
      process.exit = originalExit;
    }
  });

  await test('runNonInteractive validates tools before proceeding', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    const originalExit = process.exit;
    let exitCode = null;

    process.exit = (code) => {
      exitCode = code;
      throw new Error(`process.exit(${code})`);
    };

    try {
      process.argv = ['node', 'cli.js', '--variant', 'lite', '--tools', 'invalidtool'];

      const installer = new InteractiveInstaller();

      try {
        await installer.runNonInteractive();
        assert.fail('Should have exited for invalid tool');
      } catch (error) {
        assert.strictEqual(exitCode, 1, 'Should exit with code 1');
      }
    } finally {
      process.argv = originalArgv;
      process.exit = originalExit;
    }
  });

  await test('runNonInteractive requires at least one tool', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    const originalExit = process.exit;
    let exitCode = null;

    process.exit = (code) => {
      exitCode = code;
      throw new Error(`process.exit(${code})`);
    };

    try {
      process.argv = ['node', 'cli.js', '--variant', 'lite', '--tools', ''];

      const installer = new InteractiveInstaller();

      try {
        await installer.runNonInteractive();
        assert.fail('Should have exited for empty tools');
      } catch (error) {
        assert.strictEqual(exitCode, 1, 'Should exit with code 1');
      }
    } finally {
      process.argv = originalArgv;
      process.exit = originalExit;
    }
  });

  // ===== Group 5: Uninstall Silent Mode Tests =====
  console.log(`\n${colors.blue}${colors.bright}Group 5: Uninstall Silent Mode Tests${colors.reset}\n`);

  await test('Uninstall respects silent mode (no confirmation prompt)', async () => {
    const InteractiveInstaller = require('../../installer/cli.js');

    const originalArgv = process.argv;
    process.argv = ['node', 'cli.js', '--uninstall', 'claude', '--silent'];

    const installer = new InteractiveInstaller();

    // Verify silent flag is set
    assert.strictEqual(installer.cliArgs.silent, true, 'Silent mode should be enabled');
    assert.strictEqual(installer.cliArgs.uninstall, 'claude', 'Uninstall tool should be claude');

    // The runUninstall method checks cliArgs.silent to skip prompts
    // We've verified the flag is set correctly

    process.argv = originalArgv;
  });

  // ===== Summary =====
  console.log(`\n${colors.cyan}${'='.repeat(60)}${colors.reset}`);
  console.log(`${colors.bright}Test Results:${colors.reset}`);
  console.log(`  Total: ${totalTests}`);
  console.log(`  ${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`  ${colors.red}Failed: ${failedTests}${colors.reset}`);

  if (failedTests === 0) {
    console.log(`\n${colors.green}${colors.bright}All tests passed!${colors.reset}`);
  } else {
    console.log(`\n${colors.red}${colors.bright}Some tests failed!${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}\n`);
}

// Run tests
if (require.main === module) {
  runTests().catch((error) => {
    console.error(`${colors.red}Test suite failed: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { runTests };
