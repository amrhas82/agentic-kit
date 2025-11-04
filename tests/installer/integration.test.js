/**
 * Comprehensive Integration Tests for Installation Engine
 *
 * Tests the complete installation workflow end-to-end with real Claude package content.
 * This file tests all three variants (Lite, Standard, Pro) with realistic scenarios including:
 * - Successful installation of each variant
 * - Installation with progress callbacks
 * - Manifest generation and content verification
 * - Rollback functionality
 * - Error handling
 * - Cross-variant verification (Lite < Standard < Pro)
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const InstallationEngine = require('../../installer/installation-engine.js');
const PackageManager = require('../../installer/package-manager.js');
const PathManager = require('../../installer/path-manager.js');

// ANSI color codes for test output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
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
      console.log(`  ${colors.red}${error.stack.split('\n').slice(1, 3).join('\n')}${colors.reset}`);
    }
  }
}

/**
 * Test helper - create temporary test directory
 */
async function createTempDir(name) {
  const tmpDir = path.join(__dirname, '..', 'tmp', `integration-${name}-${Date.now()}`);
  await fs.promises.mkdir(tmpDir, { recursive: true });
  return tmpDir;
}

/**
 * Test helper - cleanup temporary directory
 */
async function cleanupTempDir(dir) {
  try {
    if (fs.existsSync(dir)) {
      await fs.promises.rm(dir, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn(`Warning: Could not clean up ${dir}: ${error.message}`);
  }
}

/**
 * Test helper - count files recursively in a directory
 */
async function countFilesRecursive(dir) {
  let count = 0;

  async function traverse(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const items = await fs.promises.readdir(currentDir);

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = await fs.promises.stat(itemPath);

      if (stat.isDirectory()) {
        await traverse(itemPath);
      } else {
        count++;
      }
    }
  }

  await traverse(dir);
  return count;
}

/**
 * Test helper - get directory size recursively
 */
async function getDirectorySize(dir) {
  let size = 0;

  async function traverse(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const items = await fs.promises.readdir(currentDir);

    for (const item of items) {
      const itemPath = path.join(currentDir, item);
      const stat = await fs.promises.stat(itemPath);

      if (stat.isDirectory()) {
        await traverse(itemPath);
      } else {
        size += stat.size;
      }
    }
  }

  await traverse(dir);
  return size;
}

/**
 * Test helper - verify manifest structure and content
 */
function verifyManifest(manifest, variant, expectedAgentCount, expectedSkillCount) {
  // Verify basic structure
  assert.ok(manifest.tool, 'Manifest should have tool field');
  assert.ok(manifest.name, 'Manifest should have name field');
  assert.ok(manifest.version, 'Manifest should have version field');
  assert.ok(manifest.installed_at, 'Manifest should have installed_at field');
  assert.ok(manifest.variant, 'Manifest should have variant field');

  // Verify variant-specific fields
  assert.strictEqual(manifest.variant, variant, `Manifest variant should be ${variant}`);

  // Verify variantInfo
  assert.ok(manifest.variantInfo, 'Manifest should have variantInfo');
  assert.ok(manifest.variantInfo.name, 'variantInfo should have name');
  assert.ok(manifest.variantInfo.description, 'variantInfo should have description');
  assert.ok(manifest.variantInfo.useCase, 'variantInfo should have useCase');
  assert.ok(manifest.variantInfo.targetUsers, 'variantInfo should have targetUsers');

  // Verify installedFiles
  assert.ok(manifest.installedFiles, 'Manifest should have installedFiles');
  assert.ok(Array.isArray(manifest.installedFiles.agents), 'installedFiles.agents should be array');
  assert.ok(Array.isArray(manifest.installedFiles.skills), 'installedFiles.skills should be array');
  assert.ok(Array.isArray(manifest.installedFiles.resources), 'installedFiles.resources should be array');
  assert.ok(Array.isArray(manifest.installedFiles.hooks), 'installedFiles.hooks should be array');

  // Verify component counts
  assert.ok(manifest.components, 'Manifest should have components');
  assert.strictEqual(manifest.components.agents, expectedAgentCount,
    `Should have ${expectedAgentCount} agents`);
  assert.strictEqual(manifest.components.skills, expectedSkillCount,
    `Should have ${expectedSkillCount} skills`);

  // Verify counts match array lengths
  assert.strictEqual(manifest.components.agents, manifest.installedFiles.agents.length,
    'Agent count should match installedFiles.agents length');
  assert.strictEqual(manifest.components.skills, manifest.installedFiles.skills.length,
    'Skill count should match installedFiles.skills length');
  assert.strictEqual(manifest.components.resources, manifest.installedFiles.resources.length,
    'Resource count should match installedFiles.resources length');
  assert.strictEqual(manifest.components.hooks, manifest.installedFiles.hooks.length,
    'Hook count should match installedFiles.hooks length');
}

// Main test suite
async function runIntegrationTests() {
  console.log(`\n${colors.bright}${colors.cyan}Comprehensive Installation Engine Integration Tests${colors.reset}\n`);
  console.log(`${colors.yellow}Testing with real Claude package content${colors.reset}\n`);

  // Initialize managers with real package directory
  const packageManager = new PackageManager();
  const pathManager = new PathManager();
  const installationEngine = new InstallationEngine(pathManager, packageManager);

  let tempDir = null;

  try {
    tempDir = await createTempDir('main');

    // ===================================
    // Test Group 1: Successful Installation of Each Variant
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 1: Successful Installation of Each Variant${colors.reset}\n`);

    let liteDir, standardDir, proDir;
    let liteManifest, standardManifest, proManifest;

    // Test 1: Install Lite variant successfully
    await test('Install Lite variant with real Claude package', async () => {
      liteDir = path.join(tempDir, 'claude-lite');
      await installationEngine.installPackage('claude', 'lite', liteDir);

      // Verify installation completed
      assert.ok(fs.existsSync(liteDir), 'Installation directory should exist');
      assert.ok(fs.existsSync(path.join(liteDir, 'manifest.json')), 'Manifest should exist');
    });

    // Test 2: Verify Lite variant content
    await test('Lite variant has correct file count (3 agents, 0 skills)', async () => {
      // Verify agents directory
      const agentsDir = path.join(liteDir, 'agents');
      assert.ok(fs.existsSync(agentsDir), 'Agents directory should exist');
      const agentFiles = await fs.promises.readdir(agentsDir);
      assert.strictEqual(agentFiles.length, 3, 'Should have exactly 3 agent files');

      // Verify specific agents
      assert.ok(agentFiles.includes('master.md'), 'Should include master.md');
      assert.ok(agentFiles.includes('orchestrator.md'), 'Should include orchestrator.md');
      assert.ok(agentFiles.includes('scrum-master.md'), 'Should include scrum-master.md');

      // Verify skills directory is empty or doesn't exist
      const skillsDir = path.join(liteDir, 'skills');
      if (fs.existsSync(skillsDir)) {
        const skillDirs = await fs.promises.readdir(skillsDir);
        assert.strictEqual(skillDirs.length, 0, 'Should have 0 skill directories');
      }

      // Verify resources and hooks exist
      assert.ok(fs.existsSync(path.join(liteDir, 'resources')), 'Resources directory should exist');
      assert.ok(fs.existsSync(path.join(liteDir, 'hooks')), 'Hooks directory should exist');
    });

    // Test 3: Verify Lite manifest
    await test('Lite variant manifest is correct and complete', async () => {
      const manifestPath = path.join(liteDir, 'manifest.json');
      liteManifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      verifyManifest(liteManifest, 'lite', 3, 0);

      // Verify specific agent names
      assert.ok(liteManifest.installedFiles.agents.includes('master'), 'Should list master agent');
      assert.ok(liteManifest.installedFiles.agents.includes('orchestrator'), 'Should list orchestrator agent');
      assert.ok(liteManifest.installedFiles.agents.includes('scrum-master'), 'Should list scrum-master agent');
    });

    // Test 4: Install Standard variant successfully
    await test('Install Standard variant with real Claude package', async () => {
      standardDir = path.join(tempDir, 'claude-standard');
      await installationEngine.installPackage('claude', 'standard', standardDir);

      assert.ok(fs.existsSync(standardDir), 'Installation directory should exist');
      assert.ok(fs.existsSync(path.join(standardDir, 'manifest.json')), 'Manifest should exist');
    });

    // Test 5: Verify Standard variant content
    await test('Standard variant has correct file count (13 agents, 8 skills)', async () => {
      // Verify agents
      const agentsDir = path.join(standardDir, 'agents');
      const agentFiles = await fs.promises.readdir(agentsDir);
      assert.strictEqual(agentFiles.length, 13, 'Should have all 13 agent files');

      // Verify skills
      const skillsDir = path.join(standardDir, 'skills');
      assert.ok(fs.existsSync(skillsDir), 'Skills directory should exist');
      const skillDirs = await fs.promises.readdir(skillsDir);
      assert.strictEqual(skillDirs.length, 8, 'Should have 8 skill directories');

      // Verify specific core skills
      const expectedSkills = ['pdf', 'docx', 'xlsx', 'pptx', 'canvas-design',
                             'theme-factory', 'brand-guidelines', 'internal-comms'];
      for (const skill of expectedSkills) {
        assert.ok(skillDirs.includes(skill), `Should include ${skill} skill`);

        // Verify skill directory has content
        const skillPath = path.join(skillsDir, skill);
        const skillFiles = await fs.promises.readdir(skillPath);
        assert.ok(skillFiles.length > 0, `${skill} directory should have files`);
      }
    });

    // Test 6: Verify Standard manifest
    await test('Standard variant manifest is correct and complete', async () => {
      const manifestPath = path.join(standardDir, 'manifest.json');
      standardManifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      verifyManifest(standardManifest, 'standard', 13, 8);

      // Verify core skills are listed
      const expectedSkills = ['pdf', 'docx', 'xlsx', 'pptx', 'canvas-design',
                             'theme-factory', 'brand-guidelines', 'internal-comms'];
      for (const skill of expectedSkills) {
        assert.ok(standardManifest.installedFiles.skills.includes(skill),
          `Should list ${skill} in installedFiles`);
      }
    });

    // Test 7: Install Pro variant successfully
    await test('Install Pro variant with real Claude package', async () => {
      proDir = path.join(tempDir, 'claude-pro');
      await installationEngine.installPackage('claude', 'pro', proDir);

      assert.ok(fs.existsSync(proDir), 'Installation directory should exist');
      assert.ok(fs.existsSync(path.join(proDir, 'manifest.json')), 'Manifest should exist');
    });

    // Test 8: Verify Pro variant content
    await test('Pro variant has correct file count (13 agents, 22 skills)', async () => {
      // Verify agents
      const agentsDir = path.join(proDir, 'agents');
      const agentFiles = await fs.promises.readdir(agentsDir);
      assert.strictEqual(agentFiles.length, 13, 'Should have all 13 agent files');

      // Verify skills
      const skillsDir = path.join(proDir, 'skills');
      const skillDirs = await fs.promises.readdir(skillsDir);
      assert.strictEqual(skillDirs.length, 22, 'Should have all 22 skill directories');

      // Verify all skills have content
      for (const skill of skillDirs) {
        const skillPath = path.join(skillsDir, skill);
        const skillFiles = await fs.promises.readdir(skillPath);
        assert.ok(skillFiles.length > 0, `${skill} directory should have files`);
      }
    });

    // Test 9: Verify Pro manifest
    await test('Pro variant manifest is correct and complete', async () => {
      const manifestPath = path.join(proDir, 'manifest.json');
      proManifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));
      verifyManifest(proManifest, 'pro', 13, 22);

      // Verify all skills are listed
      assert.strictEqual(proManifest.installedFiles.skills.length, 22,
        'Should list all 22 skills in installedFiles');
    });

    // ===================================
    // Test Group 2: Progress Callbacks
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 2: Installation with Progress Callbacks${colors.reset}\n`);

    // Test 10: Progress callback with Lite variant
    await test('Progress callback works correctly with Lite variant', async () => {
      const testDir = path.join(tempDir, 'progress-lite');
      const progressUpdates = [];

      const progressCallback = (progress) => {
        progressUpdates.push(progress);
      };

      await installationEngine.installPackage('claude', 'lite', testDir, progressCallback);

      // Verify progress updates
      assert.ok(progressUpdates.length > 0, 'Should have progress updates');
      assert.strictEqual(progressUpdates[progressUpdates.length - 1].percentage, 100,
        'Final progress should be 100%');
      assert.ok(progressUpdates[progressUpdates.length - 1].filesCompleted > 0,
        'Should have completed files');
      assert.ok(progressUpdates[progressUpdates.length - 1].bytesTransferred > 0,
        'Should have transferred bytes');
    });

    // Test 11: Progress callback with Standard variant
    await test('Progress callback works correctly with Standard variant', async () => {
      const testDir = path.join(tempDir, 'progress-standard');
      const progressUpdates = [];

      const progressCallback = (progress) => {
        progressUpdates.push(progress);
      };

      await installationEngine.installPackage('claude', 'standard', testDir, progressCallback);

      // Verify more progress updates due to more files
      assert.ok(progressUpdates.length > 100, 'Standard should have many progress updates (100+)');
      assert.strictEqual(progressUpdates[progressUpdates.length - 1].percentage, 100,
        'Final progress should be 100%');

      // Verify progress is sequential
      for (let i = 1; i < progressUpdates.length; i++) {
        assert.ok(progressUpdates[i].filesCompleted >= progressUpdates[i - 1].filesCompleted,
          'Files completed should not decrease');
        assert.ok(progressUpdates[i].bytesTransferred >= progressUpdates[i - 1].bytesTransferred,
          'Bytes transferred should not decrease');
      }
    });

    // Test 12: Progress callback includes all required fields
    await test('Progress callback includes all required fields', async () => {
      const testDir = path.join(tempDir, 'progress-fields');
      let firstUpdate = null;

      const progressCallback = (progress) => {
        if (!firstUpdate) firstUpdate = progress;
      };

      await installationEngine.installPackage('claude', 'lite', testDir, progressCallback);

      // Verify all fields are present
      assert.ok(firstUpdate, 'Should have at least one progress update');
      assert.ok(typeof firstUpdate.currentFile === 'string', 'currentFile should be string');
      assert.ok(typeof firstUpdate.filesCompleted === 'number', 'filesCompleted should be number');
      assert.ok(typeof firstUpdate.totalFiles === 'number', 'totalFiles should be number');
      assert.ok(typeof firstUpdate.percentage === 'number', 'percentage should be number');
      assert.ok(typeof firstUpdate.bytesTransferred === 'number', 'bytesTransferred should be number');
      assert.ok(typeof firstUpdate.totalBytes === 'number', 'totalBytes should be number');
    });

    // ===================================
    // Test Group 3: Cross-Variant Verification
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 3: Cross-Variant Verification${colors.reset}\n`);

    // Test 13: Verify Lite < Standard < Pro (file counts)
    await test('Verify Lite < Standard < Pro (file counts)', async () => {
      const liteFileCount = await countFilesRecursive(liteDir);
      const standardFileCount = await countFilesRecursive(standardDir);
      const proFileCount = await countFilesRecursive(proDir);

      assert.ok(liteFileCount < standardFileCount,
        `Lite (${liteFileCount}) should have fewer files than Standard (${standardFileCount})`);
      assert.ok(standardFileCount < proFileCount,
        `Standard (${standardFileCount}) should have fewer files than Pro (${proFileCount})`);
    });

    // Test 14: Verify Lite < Standard < Pro (disk space)
    await test('Verify Lite < Standard < Pro (disk space)', async () => {
      const liteSize = await getDirectorySize(liteDir);
      const standardSize = await getDirectorySize(standardDir);
      const proSize = await getDirectorySize(proDir);

      assert.ok(liteSize < standardSize,
        `Lite (${formatBytes(liteSize)}) should be smaller than Standard (${formatBytes(standardSize)})`);
      assert.ok(standardSize < proSize,
        `Standard (${formatBytes(standardSize)}) should be smaller than Pro (${formatBytes(proSize)})`);
    });

    // Test 15: Verify variant descriptions differ
    await test('Verify variant descriptions and metadata differ', async () => {
      assert.notStrictEqual(liteManifest.variantInfo.description,
        standardManifest.variantInfo.description,
        'Lite and Standard descriptions should differ');
      assert.notStrictEqual(standardManifest.variantInfo.description,
        proManifest.variantInfo.description,
        'Standard and Pro descriptions should differ');
      assert.notStrictEqual(liteManifest.variantInfo.useCase,
        proManifest.variantInfo.useCase,
        'Lite and Pro use cases should differ');
    });

    // Test 16: Verify Lite content is subset of Standard
    await test('Verify Lite content is subset of Standard', async () => {
      // Lite agents should be in Standard
      for (const agent of liteManifest.installedFiles.agents) {
        assert.ok(standardManifest.installedFiles.agents.includes(agent),
          `Lite agent ${agent} should be in Standard`);
      }

      // Lite has no skills, so this is automatically true
      assert.strictEqual(liteManifest.installedFiles.skills.length, 0,
        'Lite should have no skills');
    });

    // Test 17: Verify Standard content is subset of Pro
    await test('Verify Standard content is subset of Pro', async () => {
      // Standard agents should be in Pro
      for (const agent of standardManifest.installedFiles.agents) {
        assert.ok(proManifest.installedFiles.agents.includes(agent),
          `Standard agent ${agent} should be in Pro`);
      }

      // Standard skills should be in Pro
      for (const skill of standardManifest.installedFiles.skills) {
        assert.ok(proManifest.installedFiles.skills.includes(skill),
          `Standard skill ${skill} should be in Pro`);
      }
    });

    // ===================================
    // Test Group 4: Rollback Functionality
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 4: Rollback Functionality${colors.reset}\n`);

    // Test 18: Rollback removes all installed files
    await test('Rollback removes all installed files', async () => {
      const rollbackDir = path.join(tempDir, 'rollback-test');

      // Install
      await installationEngine.installPackage('claude', 'lite', rollbackDir);
      assert.ok(fs.existsSync(path.join(rollbackDir, 'manifest.json')),
        'Manifest should exist after installation');

      // Rollback
      await installationEngine.rollbackInstallation('claude', rollbackDir);

      // Verify all installed files removed
      assert.ok(!fs.existsSync(path.join(rollbackDir, 'manifest.json')),
        'Manifest should be removed');

      // Count remaining files
      const remainingFiles = fs.existsSync(rollbackDir)
        ? await countFilesRecursive(rollbackDir)
        : 0;
      assert.strictEqual(remainingFiles, 0, 'All installed files should be removed');
    });

    // Test 19: Rollback preserves user files
    await test('Rollback preserves user-created files', async () => {
      const rollbackDir = path.join(tempDir, 'rollback-preserve');

      // Install
      await installationEngine.installPackage('claude', 'standard', rollbackDir);

      // Create user files
      const userFile1 = path.join(rollbackDir, 'my-custom-file.txt');
      const userFile2 = path.join(rollbackDir, 'agents', 'my-agent.md');
      await fs.promises.writeFile(userFile1, 'User content');
      await fs.promises.writeFile(userFile2, '# My Custom Agent');

      // Rollback
      await installationEngine.rollbackInstallation('claude', rollbackDir);

      // Verify user files preserved
      assert.ok(fs.existsSync(userFile1), 'User file in root should be preserved');
      assert.ok(fs.existsSync(userFile2), 'User file in agents directory should be preserved');

      // Verify installed files removed
      assert.ok(!fs.existsSync(path.join(rollbackDir, 'manifest.json')),
        'Manifest should be removed');
      assert.ok(!fs.existsSync(path.join(rollbackDir, 'agents', 'master.md')),
        'Installed agent should be removed');
    });

    // Test 20: Rollback works with different variants
    await test('Rollback works correctly with Pro variant', async () => {
      const rollbackDir = path.join(tempDir, 'rollback-pro');

      // Install Pro variant (most files)
      await installationEngine.installPackage('claude', 'pro', rollbackDir);

      // Verify installation
      const filesBeforeRollback = await countFilesRecursive(rollbackDir);
      assert.ok(filesBeforeRollback > 300, 'Pro should install many files (300+)');

      // Rollback
      await installationEngine.rollbackInstallation('claude', rollbackDir);

      // Verify all removed
      const filesAfterRollback = fs.existsSync(rollbackDir)
        ? await countFilesRecursive(rollbackDir)
        : 0;
      assert.strictEqual(filesAfterRollback, 0, 'All files should be removed');
    });

    // Test 21: Rollback cleans up empty directories
    await test('Rollback removes empty directories', async () => {
      const rollbackDir = path.join(tempDir, 'rollback-cleanup');

      // Install
      await installationEngine.installPackage('claude', 'lite', rollbackDir);

      // Verify directories exist
      assert.ok(fs.existsSync(path.join(rollbackDir, 'agents')), 'Agents dir should exist');
      assert.ok(fs.existsSync(path.join(rollbackDir, 'resources')), 'Resources dir should exist');

      // Rollback
      await installationEngine.rollbackInstallation('claude', rollbackDir);

      // Verify empty directories are cleaned up
      const agentsExists = fs.existsSync(path.join(rollbackDir, 'agents'));
      const resourcesExists = fs.existsSync(path.join(rollbackDir, 'resources'));

      if (agentsExists) {
        const agentFiles = await fs.promises.readdir(path.join(rollbackDir, 'agents'));
        assert.strictEqual(agentFiles.length, 0, 'Agents directory should be empty if it exists');
      }
      if (resourcesExists) {
        const resourceFiles = await fs.promises.readdir(path.join(rollbackDir, 'resources'));
        assert.strictEqual(resourceFiles.length, 0, 'Resources directory should be empty if it exists');
      }
    });

    // ===================================
    // Test Group 5: Error Handling
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 5: Error Handling${colors.reset}\n`);

    // Test 22: Error on non-existent tool
    await test('Installation fails gracefully for non-existent tool', async () => {
      const errorDir = path.join(tempDir, 'error-no-tool');
      let errorThrown = false;

      try {
        await installationEngine.installPackage('nonexistent-tool', 'lite', errorDir);
      } catch (error) {
        errorThrown = true;
        assert.ok(error.message.includes('not found') || error.message.includes('Invalid package'),
          'Error message should mention not found or invalid package');
      }

      assert.ok(errorThrown, 'Should throw error for non-existent tool');
    });

    // Test 23: Error on invalid variant
    await test('Installation fails gracefully for invalid variant', async () => {
      const errorDir = path.join(tempDir, 'error-bad-variant');
      let errorThrown = false;

      try {
        await installationEngine.installPackage('claude', 'invalid-variant', errorDir);
      } catch (error) {
        errorThrown = true;
        assert.ok(error.message.includes('variant') || error.message.includes('not found'),
          'Error message should mention variant or not found');
      }

      assert.ok(errorThrown, 'Should throw error for invalid variant');
    });

    // Test 24: Error handling doesn't leave partial installation
    await test('Failed installation triggers automatic rollback', async () => {
      const errorDir = path.join(tempDir, 'error-auto-rollback');

      // Try to install invalid variant (will fail and rollback)
      try {
        await installationEngine.installPackage('claude', 'invalid-variant', errorDir);
      } catch (error) {
        // Expected to fail
      }

      // Verify no partial installation left behind
      if (fs.existsSync(errorDir)) {
        const remainingFiles = await countFilesRecursive(errorDir);
        assert.strictEqual(remainingFiles, 0,
          'Failed installation should not leave files behind');
      }
    });

    // ===================================
    // Test Group 6: Manifest Verification
    // ===================================
    console.log(`\n${colors.blue}${colors.bright}Test Group 6: Manifest Content Verification${colors.reset}\n`);

    // Test 25: Manifest file lists match actual installed files
    await test('Manifest agent list matches actual installed agents', async () => {
      const verifyDir = path.join(tempDir, 'verify-manifest');
      await installationEngine.installPackage('claude', 'standard', verifyDir);

      const manifestPath = path.join(verifyDir, 'manifest.json');
      const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));

      // Check each agent in manifest exists
      for (const agent of manifest.installedFiles.agents) {
        const agentPath = path.join(verifyDir, 'agents', `${agent}.md`);
        assert.ok(fs.existsSync(agentPath),
          `Agent ${agent} listed in manifest should exist at ${agentPath}`);
      }

      // Check each skill in manifest exists
      for (const skill of manifest.installedFiles.skills) {
        const skillPath = path.join(verifyDir, 'skills', skill);
        assert.ok(fs.existsSync(skillPath),
          `Skill ${skill} listed in manifest should exist at ${skillPath}`);
      }
    });

    // Test 26: Manifest timestamps are valid
    await test('Manifest timestamps are valid and recent', async () => {
      const verifyDir = path.join(tempDir, 'verify-timestamp');
      await installationEngine.installPackage('claude', 'lite', verifyDir);

      const manifestPath = path.join(verifyDir, 'manifest.json');
      const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));

      // Verify installed_at is valid ISO timestamp
      const installedAt = new Date(manifest.installed_at);
      assert.ok(!isNaN(installedAt.getTime()), 'installed_at should be valid date');

      // Verify it's recent (within last minute)
      const now = new Date();
      const diffMs = now - installedAt;
      assert.ok(diffMs >= 0 && diffMs < 60000,
        'installed_at should be recent (within last minute)');
    });

    // Test 27: Manifest version information is present
    await test('Manifest includes version information', async () => {
      const verifyDir = path.join(tempDir, 'verify-version');
      await installationEngine.installPackage('claude', 'lite', verifyDir);

      const manifestPath = path.join(verifyDir, 'manifest.json');
      const manifest = JSON.parse(await fs.promises.readFile(manifestPath, 'utf8'));

      assert.ok(manifest.version, 'Manifest should include version');
      assert.ok(typeof manifest.version === 'string', 'Version should be a string');
      assert.ok(manifest.version.length > 0, 'Version should not be empty');
    });

  } finally {
    // Cleanup
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }

  // Print summary
  console.log(`\n${colors.bright}Integration Test Summary${colors.reset}`);
  console.log(`Total: ${totalTests}`);
  console.log(`${colors.green}Passed: ${passedTests}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failedTests}${colors.reset}`);

  if (failedTests === 0) {
    console.log(`\n${colors.green}${colors.bright}All integration tests passed!${colors.reset}\n`);
  } else {
    console.log(`\n${colors.red}${colors.bright}Some integration tests failed.${colors.reset}\n`);
    process.exit(1);
  }
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Run tests
runIntegrationTests().catch(error => {
  console.error(`${colors.red}Fatal error running integration tests: ${error.message}${colors.reset}`);
  console.error(error.stack);
  process.exit(1);
});
