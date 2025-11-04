/**
 * Tests for variant upgrade/downgrade functionality
 *
 * Tests cover:
 * - Upgrades: lite→standard, standard→pro, lite→pro
 * - Downgrades: pro→standard, standard→lite, pro→lite
 * - Same variant (no-op)
 * - Missing installation
 * - User file preservation
 * - Backup creation
 * - Verification after upgrade/downgrade
 */

const fs = require('fs');
const path = require('path');
const InstallationEngine = require('../../installer/installation-engine');
const PackageManager = require('../../installer/package-manager');
const PathManager = require('../../installer/path-manager');

// Test utilities
const testUtils = {
  createTempDir: () => {
    const tmpBase = path.join(__dirname, '..', 'tmp');
    if (!fs.existsSync(tmpBase)) {
      fs.mkdirSync(tmpBase, { recursive: true });
    }
    const tmpDir = path.join(tmpBase, `test-upgrade-variant-${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });
    return tmpDir;
  },

  cleanup: (dir) => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  },

  readManifest: (targetPath) => {
    const manifestPath = path.join(targetPath, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      return null;
    }
    const content = fs.readFileSync(manifestPath, 'utf8');
    return JSON.parse(content);
  },

  createUserFile: (targetPath, filename, content = 'User created file') => {
    const filePath = path.join(targetPath, filename);
    fs.writeFileSync(filePath, content);
  },

  fileExists: (filePath) => {
    return fs.existsSync(filePath);
  },

  countFiles: (dir) => {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      if (stat.isFile()) {
        count++;
      } else if (stat.isDirectory()) {
        count += testUtils.countFiles(itemPath);
      }
    }
    return count;
  }
};

// Test suite
const tests = [];
let passedTests = 0;
let failedTests = 0;

function test(description, fn) {
  tests.push({ description, fn });
}

async function runTests() {
  console.log('\n[1mRunning Variant Upgrade/Downgrade Tests[0m\n');

  for (const { description, fn } of tests) {
    try {
      await fn();
      console.log(`[32m✓[0m ${description}`);
      passedTests++;
    } catch (error) {
      console.log(`[31m✗[0m ${description}`);
      console.log(`  Error: ${error.message}`);
      if (error.stack) {
        console.log(`  Stack: ${error.stack.split('\n').slice(1, 3).join('\n')}`);
      }
      failedTests++;
    }
  }

  console.log('\n[1mTest Summary[0m');
  console.log(`Total: ${tests.length}`);
  console.log(`[32mPassed: ${passedTests}[0m`);
  console.log(`[31mFailed: ${failedTests}[0m\n`);

  if (failedTests === 0) {
    console.log('[32m[1mAll tests passed![0m');
    process.exit(0);
  } else {
    console.log('[31m[1mSome tests failed![0m');
    process.exit(1);
  }
}

// ============================================================================
// Test Cases
// ============================================================================

test('upgradeVariant() method exists on InstallationEngine', async () => {
  const pathManager = new PathManager();
  const packageManager = new PackageManager();
  const engine = new InstallationEngine(pathManager, packageManager);

  if (typeof engine.upgradeVariant !== 'function') {
    throw new Error('upgradeVariant method does not exist');
  }
});

test('upgradeVariant() upgrades from lite to standard', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant first
    await engine.installPackage('claude', 'lite', targetPath);

    // Verify lite installation
    const liteManifest = testUtils.readManifest(targetPath);
    if (!liteManifest || liteManifest.variant !== 'lite') {
      throw new Error('Lite installation failed');
    }

    const liteAgentCount = liteManifest.components.agents;
    const liteSkillCount = liteManifest.components.skills;

    // Upgrade to standard
    const result = await engine.upgradeVariant(
      'claude',
      'standard',
      targetPath,
      null, // confirmCallback
      null  // progressCallback
    );

    // Verify upgrade result
    if (!result.success) {
      throw new Error(`Upgrade failed: ${result.error}`);
    }

    if (result.filesAdded === 0) {
      throw new Error('Expected files to be added during upgrade');
    }

    // Verify manifest updated
    const standardManifest = testUtils.readManifest(targetPath);
    if (!standardManifest || standardManifest.variant !== 'standard') {
      throw new Error('Manifest not updated to standard variant');
    }

    // Standard should have more agents and skills than lite
    if (standardManifest.components.agents <= liteAgentCount) {
      throw new Error('Agent count should increase from lite to standard');
    }

    if (standardManifest.components.skills <= liteSkillCount) {
      throw new Error('Skill count should increase from lite to standard');
    }

    // Verify backup was created
    if (!result.backupPath || !fs.existsSync(result.backupPath)) {
      throw new Error('Backup not created during upgrade');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() upgrades from standard to pro', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-standard');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install standard variant
    await engine.installPackage('claude', 'standard', targetPath);
    const standardManifest = testUtils.readManifest(targetPath);
    const standardSkillCount = standardManifest.components.skills;

    // Upgrade to pro
    const result = await engine.upgradeVariant(
      'claude',
      'pro',
      targetPath
    );

    if (!result.success) {
      throw new Error(`Upgrade failed: ${result.error}`);
    }

    // Verify manifest updated
    const proManifest = testUtils.readManifest(targetPath);
    if (proManifest.variant !== 'pro') {
      throw new Error('Variant not updated to pro');
    }

    // Pro should have more skills than standard
    if (proManifest.components.skills <= standardSkillCount) {
      throw new Error('Skill count should increase from standard to pro');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() upgrades from lite to pro (skip standard)', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);
    const liteManifest = testUtils.readManifest(targetPath);

    // Upgrade directly to pro
    const result = await engine.upgradeVariant('claude', 'pro', targetPath);

    if (!result.success) {
      throw new Error('Upgrade from lite to pro failed');
    }

    // Verify manifest updated
    const proManifest = testUtils.readManifest(targetPath);
    if (proManifest.variant !== 'pro') {
      throw new Error('Variant not updated to pro');
    }

    // Pro should have significantly more components
    if (proManifest.components.agents <= liteManifest.components.agents) {
      throw new Error('Agent count should increase significantly');
    }

    if (proManifest.components.skills === 0) {
      throw new Error('Pro variant should have skills');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() downgrades from pro to standard', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-pro');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install pro variant
    await engine.installPackage('claude', 'pro', targetPath);
    const proManifest = testUtils.readManifest(targetPath);
    const proSkillCount = proManifest.components.skills;

    // Downgrade to standard
    const result = await engine.upgradeVariant('claude', 'standard', targetPath);

    if (!result.success) {
      throw new Error(`Downgrade failed: ${result.error}`);
    }

    if (result.filesRemoved === 0) {
      throw new Error('Expected files to be removed during downgrade');
    }

    // Verify manifest updated
    const standardManifest = testUtils.readManifest(targetPath);
    if (standardManifest.variant !== 'standard') {
      throw new Error('Variant not updated to standard');
    }

    // Standard should have fewer skills than pro
    if (standardManifest.components.skills >= proSkillCount) {
      throw new Error('Skill count should decrease from pro to standard');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() downgrades from standard to lite', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-standard');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install standard variant
    await engine.installPackage('claude', 'standard', targetPath);
    const standardManifest = testUtils.readManifest(targetPath);
    const standardAgentCount = standardManifest.components.agents;
    const standardSkillCount = standardManifest.components.skills;

    // Downgrade to lite
    const result = await engine.upgradeVariant('claude', 'lite', targetPath);

    if (!result.success) {
      throw new Error(`Downgrade failed: ${result.error}`);
    }

    // Verify manifest updated
    const liteManifest = testUtils.readManifest(targetPath);
    if (liteManifest.variant !== 'lite') {
      throw new Error('Variant not updated to lite');
    }

    // Lite should have fewer components
    if (liteManifest.components.agents >= standardAgentCount) {
      throw new Error('Agent count should decrease from standard to lite');
    }

    if (liteManifest.components.skills >= standardSkillCount) {
      throw new Error('Skill count should decrease from standard to lite');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() downgrades from pro to lite', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-pro');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install pro variant
    await engine.installPackage('claude', 'pro', targetPath);
    const proManifest = testUtils.readManifest(targetPath);

    // Downgrade to lite
    const result = await engine.upgradeVariant('claude', 'lite', targetPath);

    if (!result.success) {
      throw new Error(`Downgrade from pro to lite failed: ${result.error}`);
    }

    if (result.filesRemoved === 0) {
      throw new Error('Expected files to be removed');
    }

    // Verify manifest updated
    const liteManifest = testUtils.readManifest(targetPath);
    if (liteManifest.variant !== 'lite') {
      throw new Error('Variant not updated to lite');
    }

    // Lite should have minimal components
    if (liteManifest.components.skills > 0) {
      throw new Error('Lite variant should have no skills');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() handles same variant as no-op', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-standard');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install standard variant
    await engine.installPackage('claude', 'standard', targetPath);
    const beforeManifest = testUtils.readManifest(targetPath);
    const beforeTimestamp = beforeManifest.installed_at;

    // "Upgrade" to same variant
    const result = await engine.upgradeVariant('claude', 'standard', targetPath);

    if (!result.success) {
      throw new Error('Same variant upgrade should succeed');
    }

    if (result.filesAdded !== 0 || result.filesRemoved !== 0) {
      throw new Error('Same variant should not add or remove files');
    }

    // Verify manifest unchanged (except timestamp might update)
    const afterManifest = testUtils.readManifest(targetPath);
    if (afterManifest.variant !== 'standard') {
      throw new Error('Variant should remain standard');
    }

    if (afterManifest.components.agents !== beforeManifest.components.agents) {
      throw new Error('Component counts should not change');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() fails on missing installation', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'nonexistent');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Try to upgrade non-existent installation
    const result = await engine.upgradeVariant('claude', 'standard', targetPath);

    if (result.success) {
      throw new Error('Should fail when installation does not exist');
    }

    if (!result.error || !result.error.includes('manifest')) {
      throw new Error('Error message should mention missing manifest');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() preserves user-created files during upgrade', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Create user files
    testUtils.createUserFile(targetPath, 'my-notes.txt', 'My personal notes');
    testUtils.createUserFile(path.join(targetPath, 'agents'), 'custom-agent.md', 'Custom agent');

    const userNotesPath = path.join(targetPath, 'my-notes.txt');
    const customAgentPath = path.join(targetPath, 'agents', 'custom-agent.md');

    // Upgrade to standard
    await engine.upgradeVariant('claude', 'standard', targetPath);

    // Verify user files still exist
    if (!testUtils.fileExists(userNotesPath)) {
      throw new Error('User file my-notes.txt was removed');
    }

    if (!testUtils.fileExists(customAgentPath)) {
      throw new Error('User file custom-agent.md was removed');
    }

    // Verify content unchanged
    const notesContent = fs.readFileSync(userNotesPath, 'utf8');
    if (notesContent !== 'My personal notes') {
      throw new Error('User file content was modified');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() preserves user-created files during downgrade', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-pro');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install pro variant
    await engine.installPackage('claude', 'pro', targetPath);

    // Create user file in skills directory
    const skillsDir = path.join(targetPath, 'skills');
    const userSkillPath = path.join(skillsDir, 'my-custom-skill.md');
    testUtils.createUserFile(skillsDir, 'my-custom-skill.md', 'My custom skill');

    // Downgrade to lite
    await engine.upgradeVariant('claude', 'lite', targetPath);

    // Verify user file still exists
    if (!testUtils.fileExists(userSkillPath)) {
      throw new Error('User file in skills directory was removed');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() creates backup before making changes', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Upgrade to standard
    const result = await engine.upgradeVariant('claude', 'standard', targetPath);

    if (!result.backupPath) {
      throw new Error('Backup path not returned');
    }

    if (!fs.existsSync(result.backupPath)) {
      throw new Error('Backup directory does not exist');
    }

    // Verify backup contains manifest
    const backupManifest = path.join(result.backupPath, 'manifest.json');
    if (!fs.existsSync(backupManifest)) {
      throw new Error('Backup does not contain manifest');
    }

    // Verify backup manifest shows lite variant
    const backupManifestContent = JSON.parse(fs.readFileSync(backupManifest, 'utf8'));
    if (backupManifestContent.variant !== 'lite') {
      throw new Error('Backup manifest should show original variant (lite)');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() verifies installation after upgrade', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Upgrade to standard
    const result = await engine.upgradeVariant('claude', 'standard', targetPath);

    if (!result.verification) {
      throw new Error('Verification result not included');
    }

    if (!result.verification.valid) {
      throw new Error(`Verification failed: ${JSON.stringify(result.verification.issues)}`);
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() returns detailed result with file counts', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Upgrade to pro
    const result = await engine.upgradeVariant('claude', 'pro', targetPath);

    // Verify result structure
    if (typeof result.success !== 'boolean') {
      throw new Error('Result should have success boolean');
    }

    if (typeof result.filesAdded !== 'number') {
      throw new Error('Result should have filesAdded count');
    }

    if (typeof result.filesRemoved !== 'number') {
      throw new Error('Result should have filesRemoved count');
    }

    if (!result.fromVariant || !result.toVariant) {
      throw new Error('Result should include fromVariant and toVariant');
    }

    if (result.fromVariant !== 'lite' || result.toVariant !== 'pro') {
      throw new Error('From/to variants incorrect');
    }

    if (!result.backupPath) {
      throw new Error('Result should include backupPath');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() calls progress callback during upgrade', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Track progress callbacks
    const progressUpdates = [];
    const progressCallback = (progress) => {
      progressUpdates.push(progress);
    };

    // Upgrade with progress tracking
    await engine.upgradeVariant('claude', 'pro', targetPath, null, progressCallback);

    if (progressUpdates.length === 0) {
      throw new Error('Progress callback should be called during upgrade');
    }

    // Verify progress structure
    const firstUpdate = progressUpdates[0];
    if (!firstUpdate.stage) {
      throw new Error('Progress update should include stage');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() calls confirm callback before changes', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);

    // Track confirm callback
    let confirmCalled = false;
    let confirmData = null;
    const confirmCallback = (data) => {
      confirmCalled = true;
      confirmData = data;
      return true; // Confirm upgrade
    };

    // Upgrade with confirmation
    await engine.upgradeVariant('claude', 'standard', targetPath, confirmCallback);

    if (!confirmCalled) {
      throw new Error('Confirm callback should be called');
    }

    if (!confirmData || !confirmData.fromVariant || !confirmData.toVariant) {
      throw new Error('Confirm callback should receive variant info');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

test('upgradeVariant() cancels upgrade when confirm callback returns false', async () => {
  const tmpDir = testUtils.createTempDir();
  const targetPath = path.join(tmpDir, 'claude-lite');

  try {
    const pathManager = new PathManager();
    const packageManager = new PackageManager();
    const engine = new InstallationEngine(pathManager, packageManager);

    // Install lite variant
    await engine.installPackage('claude', 'lite', targetPath);
    const beforeManifest = testUtils.readManifest(targetPath);

    // Decline confirmation
    const confirmCallback = () => false;

    // Try to upgrade
    const result = await engine.upgradeVariant('claude', 'standard', targetPath, confirmCallback);

    if (result.success) {
      throw new Error('Upgrade should be cancelled when confirmation declined');
    }

    // Verify no changes were made
    const afterManifest = testUtils.readManifest(targetPath);
    if (afterManifest.variant !== beforeManifest.variant) {
      throw new Error('Variant should not change when upgrade cancelled');
    }

  } finally {
    testUtils.cleanup(tmpDir);
  }
});

// Run all tests
runTests().catch(error => {
  console.error('Test runner error:', error);
  process.exit(1);
});
