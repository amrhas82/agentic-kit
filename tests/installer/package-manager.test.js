/**
 * Package Manager Tests
 *
 * Tests for variant configuration loading and parsing
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const PackageManager = require('../../installer/package-manager.js');

// ANSI color codes for better test output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

// Test utilities
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
  const symbol = passed ? '✓' : '✗';
  const color = passed ? 'green' : 'red';
  log(`  ${symbol} ${name}`, color);
  if (details && !passed) {
    log(`    ${details}`, 'gray');
  }
}

// Test counters
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

// Test runner
function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    logTest(name, true);
  } catch (error) {
    failedTests++;
    logTest(name, false, error.message);
  }
}

// Async test runner
async function testAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    passedTests++;
    logTest(name, true);
  } catch (error) {
    failedTests++;
    logTest(name, false, error.message);
  }
}

// Test suite header
function describe(name) {
  log(`\n${name}`, 'cyan');
}

// Main test execution
async function runTests() {
  log('\n=== Package Manager Tests ===', 'blue');
  log('Testing variant configuration loading and parsing\n', 'gray');

  const pm = new PackageManager();

  // Test 2.1: loadVariantConfig() method
  describe('loadVariantConfig(toolId)');

  await testAsync('should load and parse valid variants.json for Claude', async () => {
    const config = await pm.loadVariantConfig('claude');
    assert(config !== null, 'Config should not be null');
    assert(typeof config === 'object', 'Config should be an object');
  });

  await testAsync('should cache loaded configurations', async () => {
    // Load first time
    const config1 = await pm.loadVariantConfig('claude');
    // Load second time (should use cache)
    const config2 = await pm.loadVariantConfig('claude');
    assert.strictEqual(config1, config2, 'Should return same cached object');
  });

  await testAsync('should validate all three required variants exist (lite, standard, pro)', async () => {
    const config = await pm.loadVariantConfig('claude');
    assert(config.lite, 'lite variant should exist');
    assert(config.standard, 'standard variant should exist');
    assert(config.pro, 'pro variant should exist');
  });

  await testAsync('should validate variant has required fields', async () => {
    const config = await pm.loadVariantConfig('claude');
    const liteVariant = config.lite;

    assert(liteVariant.name, 'Variant should have name field');
    assert(liteVariant.description, 'Variant should have description field');
    assert(liteVariant.agents !== undefined, 'Variant should have agents field');
    assert(liteVariant.skills !== undefined, 'Variant should have skills field');
    assert(liteVariant.resources !== undefined, 'Variant should have resources field');
    assert(liteVariant.hooks !== undefined, 'Variant should have hooks field');
  });

  await testAsync('should load variants.json for all tools (claude, opencode, ampcode, droid)', async () => {
    const tools = ['claude', 'opencode', 'ampcode', 'droid'];
    for (const tool of tools) {
      const config = await pm.loadVariantConfig(tool);
      assert(config !== null, `Config for ${tool} should not be null`);
      assert(config.lite && config.standard && config.pro, `${tool} should have all variants`);
    }
  });

  await testAsync('should throw error for non-existent tool', async () => {
    try {
      await pm.loadVariantConfig('nonexistent-tool');
      throw new Error('Should have thrown error for non-existent tool');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('ENOENT'),
        'Error should indicate file not found');
    }
  });

  await testAsync('should throw error for invalid JSON', async () => {
    // Create temporary invalid JSON file
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-invalid');
    const tempFile = path.join(tempDir, 'variants.json');

    try {
      // Create temp directory and invalid JSON file
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      fs.writeFileSync(tempFile, '{ invalid json }');

      // Test
      try {
        await pm.loadVariantConfig('test-invalid');
        throw new Error('Should have thrown error for invalid JSON');
      } catch (error) {
        assert(error.message.includes('JSON') || error.message.includes('parse'),
          'Error should indicate JSON parsing failure');
      }
    } finally {
      // Cleanup
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should throw error if required variants are missing', async () => {
    // Create temporary file with missing variant
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-incomplete');
    const tempFile = path.join(tempDir, 'variants.json');

    try {
      // Create temp directory and incomplete variants.json
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      fs.writeFileSync(tempFile, JSON.stringify({
        lite: { name: 'Lite', agents: [], skills: [], resources: [], hooks: [] },
        standard: { name: 'Standard', agents: [], skills: [], resources: [], hooks: [] }
        // Missing 'pro' variant
      }));

      // Test
      try {
        await pm.loadVariantConfig('test-incomplete');
        throw new Error('Should have thrown error for missing variant');
      } catch (error) {
        assert(error.message.includes('pro') || error.message.includes('variant'),
          'Error should indicate missing variant');
      }
    } finally {
      // Cleanup
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  describe('getVariantMetadata(toolId, variant)');

  await testAsync('should retrieve metadata for a specific variant', async () => {
    const metadata = await pm.getVariantMetadata('claude', 'lite');
    assert(metadata !== null, 'Metadata should not be null');
    assert(metadata.name === 'Lite', 'Name should match');
    assert(typeof metadata.description === 'string', 'Should have description');
    assert(typeof metadata.useCase === 'string', 'Should have useCase');
    assert(typeof metadata.targetUsers === 'string', 'Should have targetUsers');
  });

  await testAsync('should retrieve metadata for all variants', async () => {
    const variants = ['lite', 'standard', 'pro'];
    for (const variant of variants) {
      const metadata = await pm.getVariantMetadata('claude', variant);
      assert(metadata !== null, `Metadata for ${variant} should not be null`);
      assert(metadata.name, `${variant} should have name`);
    }
  });

  await testAsync('should throw error for invalid variant name', async () => {
    try {
      await pm.getVariantMetadata('claude', 'invalid-variant');
      throw new Error('Should have thrown error for invalid variant');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('invalid'),
        'Error should indicate invalid variant');
    }
  });

  describe('selectVariantContent(toolId, variant, availableContent)');

  // Helper to get available content from Claude package
  const getAvailableClaudeContent = async () => {
    const baseDir = path.join(__dirname, '..', '..', 'packages', 'claude');

    const getFilesInDir = async (dir) => {
      if (!fs.existsSync(dir)) return [];
      const items = await fs.promises.readdir(dir);
      // Filter out directories, return only files
      const files = [];
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stat = await fs.promises.stat(itemPath);
        if (stat.isFile()) {
          // Return just the filename without extension for agents
          if (dir.includes('agents')) {
            files.push(item.replace('.md', ''));
          } else {
            files.push(item);
          }
        } else if (stat.isDirectory()) {
          // For skills (which are directories), just include the directory name
          files.push(item);
        }
      }
      return files;
    };

    return {
      agents: await getFilesInDir(path.join(baseDir, 'agents')),
      skills: await getFilesInDir(path.join(baseDir, 'skills')),
      resources: await getFilesInDir(path.join(baseDir, 'resources')),
      hooks: await getFilesInDir(path.join(baseDir, 'hooks'))
    };
  };

  await testAsync('should expand wildcard "*" to all available items', async () => {
    const available = await getAvailableClaudeContent();
    const selected = await pm.selectVariantContent('claude', 'pro', available);

    // Pro variant uses "*" for all categories
    assert.strictEqual(selected.agents.length, available.agents.length,
      `Should select all ${available.agents.length} agents`);
    assert.strictEqual(selected.skills.length, available.skills.length,
      `Should select all ${available.skills.length} skills`);
    assert.strictEqual(selected.resources.length, available.resources.length,
      `Should select all ${available.resources.length} resources`);
    assert.strictEqual(selected.hooks.length, available.hooks.length,
      `Should select all ${available.hooks.length} hooks`);
  });

  await testAsync('should select specific items when array is provided', async () => {
    const available = await getAvailableClaudeContent();
    const selected = await pm.selectVariantContent('claude', 'lite', available);

    // Lite variant has specific agents: ["master", "orchestrator", "scrum-master"]
    assert.strictEqual(selected.agents.length, 3, 'Should select exactly 3 agents');
    assert(selected.agents.includes('master'), 'Should include master agent');
    assert(selected.agents.includes('orchestrator'), 'Should include orchestrator agent');
    assert(selected.agents.includes('scrum-master'), 'Should include scrum-master agent');

    // Lite variant has empty skills array
    assert.strictEqual(selected.skills.length, 0, 'Should select no skills');
  });

  await testAsync('should select standard variant with specific skills', async () => {
    const available = await getAvailableClaudeContent();
    const selected = await pm.selectVariantContent('claude', 'standard', available);

    // Standard variant has all agents (wildcard)
    assert.strictEqual(selected.agents.length, available.agents.length,
      'Should select all agents');

    // Standard variant has 8 specific skills
    assert.strictEqual(selected.skills.length, 8, 'Should select exactly 8 skills');

    const expectedSkills = ['pdf', 'docx', 'xlsx', 'pptx', 'canvas-design',
                           'theme-factory', 'brand-guidelines', 'internal-comms'];
    for (const skill of expectedSkills) {
      assert(selected.skills.includes(skill), `Should include ${skill} skill`);
    }
  });

  await testAsync('should handle empty array selection []', async () => {
    const available = await getAvailableClaudeContent();
    const selected = await pm.selectVariantContent('claude', 'lite', available);

    // Lite has empty skills array
    assert.strictEqual(selected.skills.length, 0, 'Empty array should result in no selections');
    assert(Array.isArray(selected.skills), 'Should return empty array, not undefined');
  });

  await testAsync('should validate that specified items exist in available content', async () => {
    const available = {
      agents: ['master', 'orchestrator'],
      skills: ['pdf', 'docx'],
      resources: ['config.yaml'],
      hooks: ['startup.js']
    };

    // Create temp variants.json with non-existent item
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-validation');
    const tempFile = path.join(tempDir, 'variants.json');

    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      fs.writeFileSync(tempFile, JSON.stringify({
        lite: {
          name: 'Test',
          description: 'Test',
          agents: ['master', 'nonexistent-agent'],  // nonexistent-agent doesn't exist
          skills: [],
          resources: '*',
          hooks: '*'
        },
        standard: {
          name: 'Standard',
          description: 'Standard',
          agents: '*',
          skills: '*',
          resources: '*',
          hooks: '*'
        },
        pro: {
          name: 'Pro',
          description: 'Pro',
          agents: '*',
          skills: '*',
          resources: '*',
          hooks: '*'
        }
      }));

      try {
        await pm.selectVariantContent('test-validation', 'lite', available);
        throw new Error('Should have thrown error for non-existent item');
      } catch (error) {
        assert(error.message.includes('nonexistent-agent') || error.message.includes('not found'),
          'Error should indicate missing item');
      }
    } finally {
      // Cleanup
      if (fs.existsSync(tempFile)) {
        fs.unlinkSync(tempFile);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should return object with all content categories', async () => {
    const available = await getAvailableClaudeContent();
    const selected = await pm.selectVariantContent('claude', 'standard', available);

    assert(selected !== null, 'Result should not be null');
    assert(typeof selected === 'object', 'Result should be an object');
    assert(Array.isArray(selected.agents), 'Should have agents array');
    assert(Array.isArray(selected.skills), 'Should have skills array');
    assert(Array.isArray(selected.resources), 'Should have resources array');
    assert(Array.isArray(selected.hooks), 'Should have hooks array');
  });

  await testAsync('should work with all tools (claude, opencode, ampcode, droid)', async () => {
    const available = await getAvailableClaudeContent();
    const tools = ['claude', 'opencode', 'ampcode', 'droid'];

    for (const tool of tools) {
      const selected = await pm.selectVariantContent(tool, 'standard', available);
      assert(selected !== null, `Should return selection for ${tool}`);
      assert(Array.isArray(selected.agents), `${tool} should have agents array`);
      assert(Array.isArray(selected.skills), `${tool} should have skills array`);
    }
  });

  describe('getPackageContents(toolId, variant)');

  await testAsync('should return contents with variant filtering for Lite variant', async () => {
    const contents = await pm.getPackageContents('claude', 'lite');

    assert(contents !== null, 'Contents should not be null');
    assert(typeof contents === 'object', 'Contents should be an object');

    // Lite variant should have exactly 3 agents
    assert.strictEqual(contents.agents.length, 3,
      'Lite variant should have exactly 3 agents');

    // Lite variant should have 0 skills
    assert.strictEqual(contents.skills.length, 0,
      'Lite variant should have 0 skills');

    // Should have resources and hooks (all selected with "*")
    assert(contents.resources.length > 0, 'Should have resources');
    assert(contents.hooks.length > 0, 'Should have hooks');

    // Should have totalFiles count
    assert(typeof contents.totalFiles === 'number', 'Should have totalFiles count');
    assert(contents.totalFiles > 0, 'totalFiles should be greater than 0');
  });

  await testAsync('should return contents with variant filtering for Standard variant', async () => {
    const contents = await pm.getPackageContents('claude', 'standard');

    assert(contents !== null, 'Contents should not be null');

    // Standard variant should have all agents (13)
    assert.strictEqual(contents.agents.length, 13,
      'Standard variant should have all 13 agents');

    // Standard variant should have exactly 8 skills
    assert.strictEqual(contents.skills.length, 8,
      'Standard variant should have exactly 8 skills');

    // Should have resources and hooks
    assert(contents.resources.length > 0, 'Should have resources');
    assert(contents.hooks.length > 0, 'Should have hooks');

    // Total files should equal sum of all categories
    const expectedTotal = contents.agents.length + contents.skills.length +
                         contents.resources.length + contents.hooks.length;
    assert.strictEqual(contents.totalFiles, expectedTotal,
      'totalFiles should equal sum of all content categories');
  });

  await testAsync('should return contents with variant filtering for Pro variant', async () => {
    const contents = await pm.getPackageContents('claude', 'pro');

    assert(contents !== null, 'Contents should not be null');

    // Pro variant should have all agents (13)
    assert.strictEqual(contents.agents.length, 13,
      'Pro variant should have all 13 agents');

    // Pro variant should have all skills (22)
    assert.strictEqual(contents.skills.length, 22,
      'Pro variant should have all 22 skills');

    // Should have all resources and hooks
    assert(contents.resources.length > 0, 'Should have all resources');
    assert(contents.hooks.length > 0, 'Should have all hooks');
  });

  await testAsync('should return file paths in contents arrays', async () => {
    const contents = await pm.getPackageContents('claude', 'lite');

    // Each array should contain file paths or names
    assert(Array.isArray(contents.agents), 'agents should be an array');
    assert(Array.isArray(contents.skills), 'skills should be an array');
    assert(Array.isArray(contents.resources), 'resources should be an array');
    assert(Array.isArray(contents.hooks), 'hooks should be an array');

    // Check that agents array contains valid paths/names
    if (contents.agents.length > 0) {
      assert(typeof contents.agents[0] === 'string',
        'Agent entries should be strings');
    }
  });

  await testAsync('should throw error for non-existent tool', async () => {
    try {
      await pm.getPackageContents('nonexistent-tool', 'lite');
      throw new Error('Should have thrown error for non-existent tool');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('ENOENT'),
        'Error should indicate tool not found');
    }
  });

  await testAsync('should throw error for invalid variant', async () => {
    try {
      await pm.getPackageContents('claude', 'invalid-variant');
      throw new Error('Should have thrown error for invalid variant');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('invalid'),
        'Error should indicate invalid variant');
    }
  });

  describe('getPackageSize(toolId, variant)');

  await testAsync('should calculate size for Lite variant', async () => {
    const sizeInfo = await pm.getPackageSize('claude', 'lite');

    assert(sizeInfo !== null, 'Size info should not be null');
    assert(typeof sizeInfo === 'object', 'Size info should be an object');
    assert(typeof sizeInfo.size === 'number', 'Should have numeric size');
    assert(sizeInfo.size >= 0, 'Size should be non-negative');
    assert(typeof sizeInfo.formattedSize === 'string', 'Should have formatted size');
  });

  await testAsync('should calculate size for Standard variant', async () => {
    const sizeInfo = await pm.getPackageSize('claude', 'standard');

    assert(sizeInfo !== null, 'Size info should not be null');
    assert(typeof sizeInfo.size === 'number', 'Should have numeric size');
    assert(sizeInfo.size > 0, 'Size should be greater than 0');
  });

  await testAsync('should calculate size for Pro variant', async () => {
    const sizeInfo = await pm.getPackageSize('claude', 'pro');

    assert(sizeInfo !== null, 'Size info should not be null');
    assert(typeof sizeInfo.size === 'number', 'Should have numeric size');
    assert(sizeInfo.size > 0, 'Size should be greater than 0');
  });

  await testAsync('should have Pro variant size >= Standard variant size', async () => {
    const standardSize = await pm.getPackageSize('claude', 'standard');
    const proSize = await pm.getPackageSize('claude', 'pro');

    assert(proSize.size >= standardSize.size,
      'Pro variant should have size >= Standard variant (more content)');
  });

  await testAsync('should have Standard variant size >= Lite variant size', async () => {
    const liteSize = await pm.getPackageSize('claude', 'lite');
    const standardSize = await pm.getPackageSize('claude', 'standard');

    assert(standardSize.size >= liteSize.size,
      'Standard variant should have size >= Lite variant (more content)');
  });

  await testAsync('should format size correctly (bytes/KB/MB)', async () => {
    const sizeInfo = await pm.getPackageSize('claude', 'pro');

    assert(typeof sizeInfo.formattedSize === 'string', 'Formatted size should be a string');
    // Should contain a number followed by a unit (Bytes, KB, MB, GB)
    const hasValidFormat = /^\d+(\.\d+)?\s+(Bytes|KB|MB|GB)$/.test(sizeInfo.formattedSize);
    assert(hasValidFormat, `Formatted size should match pattern: ${sizeInfo.formattedSize}`);
  });

  await testAsync('should calculate size based on variant-filtered content', async () => {
    // Get contents for verification
    const liteContents = await pm.getPackageContents('claude', 'lite');
    const proContents = await pm.getPackageContents('claude', 'pro');

    // Pro has more files, so it should have larger size
    assert(proContents.totalFiles > liteContents.totalFiles,
      'Pro should have more files than Lite');

    const liteSize = await pm.getPackageSize('claude', 'lite');
    const proSize = await pm.getPackageSize('claude', 'pro');

    // Size should correlate with file count
    assert(proSize.size > liteSize.size,
      'Pro with more files should have larger size than Lite');
  });

  await testAsync('should handle skill directories correctly', async () => {
    // Standard and Pro have skills (directories with multiple files)
    const standardSize = await pm.getPackageSize('claude', 'standard');
    const proSize = await pm.getPackageSize('claude', 'pro');

    // Both should have non-zero size
    assert(standardSize.size > 0, 'Standard with 8 skills should have non-zero size');
    assert(proSize.size > 0, 'Pro with all skills should have non-zero size');

    // Pro has more skills, so should have larger size
    assert(proSize.size > standardSize.size,
      'Pro with all 22 skills should have larger size than Standard with 8 skills');
  });

  await testAsync('should throw error for non-existent tool', async () => {
    try {
      await pm.getPackageSize('nonexistent-tool', 'lite');
      throw new Error('Should have thrown error for non-existent tool');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('ENOENT'),
        'Error should indicate tool not found');
    }
  });

  await testAsync('should throw error for invalid variant', async () => {
    try {
      await pm.getPackageSize('claude', 'invalid-variant');
      throw new Error('Should have thrown error for invalid variant');
    } catch (error) {
      assert(error.message.includes('not found') || error.message.includes('invalid'),
        'Error should indicate invalid variant');
    }
  });

  describe('validatePackage(toolId, variant)');

  await testAsync('should validate a valid package with all required content', async () => {
    const result = await pm.validatePackage('claude', 'lite');

    assert(result !== null, 'Result should not be null');
    assert(typeof result === 'object', 'Result should be an object');
    assert(result.valid === true, 'Package should be valid');
    assert(Array.isArray(result.issues), 'Should have issues array');
    assert(result.issues.length === 0, 'Valid package should have no issues');
  });

  await testAsync('should check variants.json exists', async () => {
    // Create temp package without variants.json
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-no-variants');
    const agentsDir = path.join(tempDir, 'agents');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');

      const result = await pm.validatePackage('test-no-variants', 'lite');

      assert(result.valid === false, 'Package without variants.json should be invalid');
      assert(result.error && result.error.includes('variants.json') ||
             result.issues.some(issue => issue.includes('variants.json')),
        'Error should mention missing variants.json');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate variants.json is valid JSON', async () => {
    // Create temp package with invalid JSON
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-invalid-variants');
    const agentsDir = path.join(tempDir, 'agents');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tempDir, 'variants.json'), '{ invalid json }');
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');

      const result = await pm.validatePackage('test-invalid-variants', 'lite');

      assert(result.valid === false, 'Package with invalid JSON should be invalid');
      assert(result.error && result.error.includes('JSON') ||
             result.issues.some(issue => issue.includes('JSON')),
        'Error should mention invalid JSON');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate all required variants (lite, standard, pro) are present', async () => {
    // Create temp package with missing variant
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-missing-variant');
    const agentsDir = path.join(tempDir, 'agents');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      // variants.json missing 'pro' variant
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: { name: 'Lite', description: 'Test', agents: ['master'], skills: [], resources: '*', hooks: '*' },
        standard: { name: 'Standard', description: 'Test', agents: '*', skills: [], resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');

      const result = await pm.validatePackage('test-missing-variant', 'lite');

      assert(result.valid === false, 'Package with missing variant should be invalid');
      assert(result.error && result.error.includes('variant') ||
             result.issues.some(issue => issue.includes('variant') || issue.includes('pro')),
        'Error should mention missing variant');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate each variant has required fields', async () => {
    // Create temp package with incomplete variant definition
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-incomplete-fields');
    const agentsDir = path.join(tempDir, 'agents');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      // lite variant missing 'description' field
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: { name: 'Lite', agents: ['master'], skills: [], resources: '*', hooks: '*' },  // missing description
        standard: { name: 'Standard', description: 'Test', agents: '*', skills: [], resources: '*', hooks: '*' },
        pro: { name: 'Pro', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');

      const result = await pm.validatePackage('test-incomplete-fields', 'lite');

      assert(result.valid === false, 'Package with incomplete variant should be invalid');
      assert(result.error && result.error.includes('description') ||
             result.issues.some(issue => issue.includes('description') || issue.includes('field')),
        'Error should mention missing field');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate that variant-selected agents exist', async () => {
    // Create temp package with missing agent
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-missing-agent');
    const agentsDir = path.join(tempDir, 'agents');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: {
          name: 'Lite',
          description: 'Test',
          agents: ['master', 'nonexistent-agent'],  // nonexistent-agent doesn't exist
          skills: [],
          resources: '*',
          hooks: '*'
        },
        standard: { name: 'Standard', description: 'Test', agents: '*', skills: [], resources: '*', hooks: '*' },
        pro: { name: 'Pro', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');

      const result = await pm.validatePackage('test-missing-agent', 'lite');

      assert(result.valid === false, 'Package with missing agent should be invalid');
      assert(result.issues && result.issues.length > 0, 'Should have issues reported');
      assert(result.issues.some(issue =>
        issue.includes('nonexistent-agent') || issue.includes('agent') && issue.includes('not found')),
        'Issues should mention missing agent');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate that variant-selected skills exist', async () => {
    // Create temp package with missing skill
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-missing-skill');
    const agentsDir = path.join(tempDir, 'agents');
    const skillsDir = path.join(tempDir, 'skills');
    const pdfSkillDir = path.join(skillsDir, 'pdf');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      if (!fs.existsSync(pdfSkillDir)) {
        fs.mkdirSync(pdfSkillDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: { name: 'Lite', description: 'Test', agents: ['master'], skills: [], resources: '*', hooks: '*' },
        standard: {
          name: 'Standard',
          description: 'Test',
          agents: '*',
          skills: ['pdf', 'nonexistent-skill'],  // nonexistent-skill doesn't exist
          resources: '*',
          hooks: '*'
        },
        pro: { name: 'Pro', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');
      fs.writeFileSync(path.join(pdfSkillDir, 'skill.md'), '# PDF Skill');

      const result = await pm.validatePackage('test-missing-skill', 'standard');

      assert(result.valid === false, 'Package with missing skill should be invalid');
      assert(result.issues && result.issues.length > 0, 'Should have issues reported');
      assert(result.issues.some(issue =>
        issue.includes('nonexistent-skill') || issue.includes('skill') && issue.includes('not found')),
        'Issues should mention missing skill');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(pdfSkillDir, 'skill.md'))) {
        fs.unlinkSync(path.join(pdfSkillDir, 'skill.md'));
      }
      if (fs.existsSync(pdfSkillDir)) {
        fs.rmdirSync(pdfSkillDir);
      }
      if (fs.existsSync(skillsDir)) {
        fs.rmdirSync(skillsDir);
      }
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate wildcard selections have directories', async () => {
    // Create temp package and validate wildcard works
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-wildcard-validation');
    const agentsDir = path.join(tempDir, 'agents');
    const skillsDir = path.join(tempDir, 'skills');
    const pdfSkillDir = path.join(skillsDir, 'pdf');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      if (!fs.existsSync(pdfSkillDir)) {
        fs.mkdirSync(pdfSkillDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: { name: 'Lite', description: 'Test', agents: ['master'], skills: [], resources: '*', hooks: '*' },
        standard: { name: 'Standard', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' },
        pro: { name: 'Pro', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');
      fs.writeFileSync(path.join(pdfSkillDir, 'skill.md'), '# PDF Skill');

      const result = await pm.validatePackage('test-wildcard-validation', 'standard');

      assert(result.valid === true, 'Package with valid wildcard should be valid');
      assert(result.issues.length === 0, 'Valid package should have no issues');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(pdfSkillDir, 'skill.md'))) {
        fs.unlinkSync(path.join(pdfSkillDir, 'skill.md'));
      }
      if (fs.existsSync(pdfSkillDir)) {
        fs.rmdirSync(pdfSkillDir);
      }
      if (fs.existsSync(skillsDir)) {
        fs.rmdirSync(skillsDir);
      }
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should validate resources and hooks referenced in variants', async () => {
    // Create temp package with missing resource
    const tempDir = path.join(__dirname, '..', '..', 'packages', 'test-missing-resource');
    const agentsDir = path.join(tempDir, 'agents');
    const resourcesDir = path.join(tempDir, 'resources');

    try {
      if (!fs.existsSync(agentsDir)) {
        fs.mkdirSync(agentsDir, { recursive: true });
      }
      if (!fs.existsSync(resourcesDir)) {
        fs.mkdirSync(resourcesDir, { recursive: true });
      }
      fs.writeFileSync(path.join(tempDir, 'variants.json'), JSON.stringify({
        lite: {
          name: 'Lite',
          description: 'Test',
          agents: ['master'],
          skills: [],
          resources: ['config.yaml', 'missing.yaml'],  // missing.yaml doesn't exist
          hooks: '*'
        },
        standard: { name: 'Standard', description: 'Test', agents: '*', skills: [], resources: '*', hooks: '*' },
        pro: { name: 'Pro', description: 'Test', agents: '*', skills: '*', resources: '*', hooks: '*' }
      }));
      fs.writeFileSync(path.join(agentsDir, 'master.md'), '# Test Agent');
      fs.writeFileSync(path.join(resourcesDir, 'config.yaml'), '# Config');

      const result = await pm.validatePackage('test-missing-resource', 'lite');

      assert(result.valid === false, 'Package with missing resource should be invalid');
      assert(result.issues && result.issues.length > 0, 'Should have issues reported');
      assert(result.issues.some(issue =>
        issue.includes('missing.yaml') || issue.includes('resource') && issue.includes('not found')),
        'Issues should mention missing resource');
    } finally {
      // Cleanup
      if (fs.existsSync(path.join(resourcesDir, 'config.yaml'))) {
        fs.unlinkSync(path.join(resourcesDir, 'config.yaml'));
      }
      if (fs.existsSync(resourcesDir)) {
        fs.rmdirSync(resourcesDir);
      }
      if (fs.existsSync(path.join(tempDir, 'variants.json'))) {
        fs.unlinkSync(path.join(tempDir, 'variants.json'));
      }
      if (fs.existsSync(path.join(agentsDir, 'master.md'))) {
        fs.unlinkSync(path.join(agentsDir, 'master.md'));
      }
      if (fs.existsSync(agentsDir)) {
        fs.rmdirSync(agentsDir);
      }
      if (fs.existsSync(tempDir)) {
        fs.rmdirSync(tempDir);
      }
    }
  });

  await testAsync('should return detailed validation results', async () => {
    const result = await pm.validatePackage('claude', 'standard');

    assert(result !== null, 'Result should not be null');
    assert(typeof result === 'object', 'Result should be an object');
    assert(typeof result.valid === 'boolean', 'Should have valid boolean field');
    assert(Array.isArray(result.issues), 'Should have issues array');
    assert(typeof result.checkedFiles === 'number' && result.checkedFiles >= 0,
      'Should have checkedFiles count');
    assert(typeof result.missingFiles === 'number' && result.missingFiles >= 0,
      'Should have missingFiles count');
  });

  // Test summary
  log('\n=== Test Summary ===', 'blue');
  log(`Total tests: ${totalTests}`, 'cyan');
  log(`Passed: ${passedTests}`, 'green');
  log(`Failed: ${failedTests}`, failedTests > 0 ? 'red' : 'green');

  if (failedTests === 0) {
    log('\nAll tests passed!', 'green');
  } else {
    log('\nSome tests failed!', 'red');
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  log(`\nFatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
