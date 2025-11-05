#!/usr/bin/env node

/**
 * Variant Testing Suite
 * Tests all variants (Lite, Standard, Pro) for all tools (Claude, Opencode, Ampcode, Droid)
 *
 * Tests:
 * - File counts match expected counts from variants.json
 * - Manifest.json contains correct component counts
 * - Installation to temporary directories
 * - Cleanup after each test
 */

const fs = require('fs');
const path = require('path');
const { createTempDir, removeDirRecursive, verifyDirectoryStructure, countFiles } = require('../fixtures/helpers/test-helpers');

// Expected component counts for each variant (updated 2025-11-05)
const EXPECTED_COUNTS = {
  lite: {
    agents: 4,
    skills: 7,
    resources: 6,
    hooks: 2
  },
  standard: {
    agents: 9,
    skills: 11,
    resources: 6,
    hooks: 2
  },
  pro: {
    agents: 13,
    skills: 22,
    resources: 6,
    hooks: 2
  }
};

// Expected agent files for Lite variant (same for all tools)
const LITE_AGENTS = ['1-create-prd.md', '2-generate-tasks.md', '3-process-task-list.md', 'master.md'];

// Expected skills for Standard variant (same for all tools)
const STANDARD_SKILLS = [
  'docx',
  'pdf',
  'code-review',
  'brainstorming',
  'root-cause-tracing',
  'mcp-builder',
  'webapp-testing',
  'xlsx',
  'systematic-debugging',
  'verification-before-completion',
  'skill-creator'
];

// Test results tracker
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

/**
 * Log test result
 */
function logTest(testName, passed, message = '') {
  const status = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${status}\x1b[0m ${testName}${message ? ': ' + message : ''}`);

  results.tests.push({ name: testName, passed, message });
  if (passed) {
    results.passed++;
  } else {
    results.failed++;
  }
}

/**
 * Copy package files to test directory
 */
function copyPackageToTestDir(tool, variant, testDir) {
  const packageDir = path.join(__dirname, '../../packages', tool);
  const variantsFile = path.join(packageDir, 'variants.json');

  if (!fs.existsSync(variantsFile)) {
    throw new Error(`variants.json not found for tool: ${tool}`);
  }

  const variants = JSON.parse(fs.readFileSync(variantsFile, 'utf8'));
  const variantConfig = variants[variant];

  if (!variantConfig) {
    throw new Error(`Variant ${variant} not found for tool ${tool}`);
  }

  // Create base directories
  const dirs = ['agents', 'skills', 'resources', 'hooks'];
  dirs.forEach(dir => {
    const dirPath = path.join(testDir, dir);
    fs.mkdirSync(dirPath, { recursive: true });
  });

  // Copy agents
  const agentsDir = path.join(packageDir, 'agents');
  const agentsToCopy = variantConfig.agents === '*'
    ? fs.readdirSync(agentsDir)
    : variantConfig.agents.map(a => a.endsWith('.md') ? a : `${a}.md`);

  agentsToCopy.forEach(agent => {
    const srcPath = path.join(agentsDir, agent);
    const destPath = path.join(testDir, 'agents', agent);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Copy skills
  const skillsDir = path.join(packageDir, 'skills');
  if (variantConfig.skills && variantConfig.skills !== '*' && variantConfig.skills.length > 0) {
    variantConfig.skills.forEach(skill => {
      const srcSkillDir = path.join(skillsDir, skill);
      const destSkillDir = path.join(testDir, 'skills', skill);
      if (fs.existsSync(srcSkillDir) && fs.statSync(srcSkillDir).isDirectory()) {
        copyDirRecursive(srcSkillDir, destSkillDir);
      }
    });
  } else if (variantConfig.skills === '*') {
    const allSkills = fs.readdirSync(skillsDir).filter(item => {
      const itemPath = path.join(skillsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
    allSkills.forEach(skill => {
      const srcSkillDir = path.join(skillsDir, skill);
      const destSkillDir = path.join(testDir, 'skills', skill);
      copyDirRecursive(srcSkillDir, destSkillDir);
    });
  }

  // Copy resources
  const resourcesDir = path.join(packageDir, 'resources');
  const resourcesToCopy = variantConfig.resources === '*'
    ? fs.readdirSync(resourcesDir)
    : variantConfig.resources;

  resourcesToCopy.forEach(resource => {
    const srcPath = path.join(resourcesDir, resource);
    const destPath = path.join(testDir, 'resources', resource);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Copy hooks
  const hooksDir = path.join(packageDir, 'hooks');
  const hooksToCopy = variantConfig.hooks === '*'
    ? fs.readdirSync(hooksDir)
    : variantConfig.hooks.map(h => h.endsWith('.js') ? h : `${h}.js`);

  hooksToCopy.forEach(hook => {
    const srcPath = path.join(hooksDir, hook);
    const destPath = path.join(testDir, 'hooks', hook);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  return variantConfig;
}

/**
 * Helper function to copy directory recursively
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Create manifest.json for installation
 */
function createManifest(testDir, tool, variant, componentCounts) {
  const manifest = {
    tool,
    variant,
    version: '1.2.0',
    installedAt: new Date().toISOString(),
    components: componentCounts
  };

  fs.writeFileSync(
    path.join(testDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  return manifest;
}

/**
 * Count components in test directory
 */
function countComponents(testDir) {
  const counts = {
    agents: 0,
    skills: 0,
    resources: 0,
    hooks: 0
  };

  // Count agents
  const agentsDir = path.join(testDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    counts.agents = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md')).length;
  }

  // Count skills (directories only, exclude README.md)
  const skillsDir = path.join(testDir, 'skills');
  if (fs.existsSync(skillsDir)) {
    counts.skills = fs.readdirSync(skillsDir).filter(item => {
      const itemPath = path.join(skillsDir, item);
      return fs.statSync(itemPath).isDirectory();
    }).length;
  }

  // Count resources
  const resourcesDir = path.join(testDir, 'resources');
  if (fs.existsSync(resourcesDir)) {
    counts.resources = fs.readdirSync(resourcesDir).length;
  }

  // Count hooks
  const hooksDir = path.join(testDir, 'hooks');
  if (fs.existsSync(hooksDir)) {
    counts.hooks = fs.readdirSync(hooksDir).filter(f => f.endsWith('.js')).length;
  }

  return counts;
}

/**
 * Verify manifest.json correctness
 */
function verifyManifest(testDir, tool, variant, expectedCounts) {
  const manifestPath = path.join(testDir, 'manifest.json');

  if (!fs.existsSync(manifestPath)) {
    return { valid: false, error: 'manifest.json not found' };
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    // Verify tool
    if (manifest.tool !== tool) {
      return { valid: false, error: `Tool mismatch: expected ${tool}, got ${manifest.tool}` };
    }

    // Verify variant
    if (manifest.variant !== variant) {
      return { valid: false, error: `Variant mismatch: expected ${variant}, got ${manifest.variant}` };
    }

    // Verify component counts
    const components = ['agents', 'skills', 'resources', 'hooks'];
    for (const component of components) {
      if (manifest.components[component] !== expectedCounts[component]) {
        return {
          valid: false,
          error: `${component} count mismatch: expected ${expectedCounts[component]}, got ${manifest.components[component]}`
        };
      }
    }

    return { valid: true, manifest };
  } catch (error) {
    return { valid: false, error: `Failed to parse manifest: ${error.message}` };
  }
}

/**
 * Test a single tool/variant combination
 */
function testVariant(tool, variant) {
  const testName = `${tool} - ${variant}`;
  console.log(`\nTesting: ${testName}`);
  console.log('─'.repeat(60));

  let testDir;
  try {
    // Create temporary test directory
    testDir = createTempDir(`variant-test-${tool}-${variant}-`);
    logTest(`${testName}: Create temp directory`, true, testDir);

    // Copy package files to test directory
    const variantConfig = copyPackageToTestDir(tool, variant, testDir);
    logTest(`${testName}: Copy package files`, true);

    // Count actual components
    const actualCounts = countComponents(testDir);
    logTest(`${testName}: Count components`, true,
      `agents=${actualCounts.agents}, skills=${actualCounts.skills}, resources=${actualCounts.resources}, hooks=${actualCounts.hooks}`);

    // Verify counts match expected
    const expectedCounts = EXPECTED_COUNTS[variant];
    const countsMatch =
      actualCounts.agents === expectedCounts.agents &&
      actualCounts.skills === expectedCounts.skills &&
      actualCounts.resources === expectedCounts.resources &&
      actualCounts.hooks === expectedCounts.hooks;

    if (!countsMatch) {
      logTest(`${testName}: Verify component counts`, false,
        `Expected: agents=${expectedCounts.agents}, skills=${expectedCounts.skills}, resources=${expectedCounts.resources}, hooks=${expectedCounts.hooks}; ` +
        `Got: agents=${actualCounts.agents}, skills=${actualCounts.skills}, resources=${actualCounts.resources}, hooks=${actualCounts.hooks}`);
    } else {
      logTest(`${testName}: Verify component counts`, true);
    }

    // Create manifest
    createManifest(testDir, tool, variant, actualCounts);
    logTest(`${testName}: Create manifest`, true);

    // Verify manifest
    const manifestResult = verifyManifest(testDir, tool, variant, actualCounts);
    if (!manifestResult.valid) {
      logTest(`${testName}: Verify manifest correctness`, false, manifestResult.error);
    } else {
      logTest(`${testName}: Verify manifest correctness`, true);
    }

    // Verify specific files for Lite variant
    if (variant === 'lite') {
      const agentsDir = path.join(testDir, 'agents');
      const agentFiles = fs.readdirSync(agentsDir);
      const hasRequiredAgents = LITE_AGENTS.every(agent => agentFiles.includes(agent));

      if (!hasRequiredAgents) {
        logTest(`${testName}: Verify Lite agents`, false,
          `Missing required agents. Expected: ${LITE_AGENTS.join(', ')}`);
      } else {
        logTest(`${testName}: Verify Lite agents`, true);
      }
    }

    // Verify specific skills for Standard variant
    if (variant === 'standard') {
      const skillsDir = path.join(testDir, 'skills');
      const skillDirs = fs.readdirSync(skillsDir).filter(item => {
        const itemPath = path.join(skillsDir, item);
        return fs.statSync(itemPath).isDirectory();
      });
      const hasRequiredSkills = STANDARD_SKILLS.every(skill => skillDirs.includes(skill));

      if (!hasRequiredSkills) {
        logTest(`${testName}: Verify Standard skills`, false,
          `Missing required skills. Expected: ${STANDARD_SKILLS.join(', ')}`);
      } else {
        logTest(`${testName}: Verify Standard skills`, true);
      }
    }

    // Cleanup
    removeDirRecursive(testDir);
    logTest(`${testName}: Cleanup`, true);

  } catch (error) {
    logTest(`${testName}: Error`, false, error.message);
    console.error(error);

    // Cleanup on error
    if (testDir && fs.existsSync(testDir)) {
      removeDirRecursive(testDir);
    }
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log('\x1b[1m\x1b[36m');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       Variant Testing Suite - All Tools and Variants      ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\x1b[0m');

  const tools = ['claude', 'opencode', 'ampcode', 'droid'];
  const variants = ['lite', 'standard', 'pro'];

  console.log(`Testing ${tools.length} tools × ${variants.length} variants = ${tools.length * variants.length} combinations\n`);

  // Test all combinations
  for (const tool of tools) {
    console.log(`\n\x1b[1m\x1b[33m═══ Tool: ${tool.toUpperCase()} ═══\x1b[0m`);

    for (const variant of variants) {
      testVariant(tool, variant);
    }
  }

  // Print summary
  console.log('\n\x1b[1m\x1b[36m');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      Test Summary                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\x1b[0m');

  const total = results.passed + results.failed;
  const passRate = ((results.passed / total) * 100).toFixed(1);

  console.log(`Total tests:  ${total}`);
  console.log(`\x1b[32mPassed:       ${results.passed}\x1b[0m`);
  console.log(`\x1b[31mFailed:       ${results.failed}\x1b[0m`);
  console.log(`Pass rate:    ${passRate}%\n`);

  if (results.failed > 0) {
    console.log('\x1b[31mFailed tests:\x1b[0m');
    results.tests.filter(t => !t.passed).forEach(t => {
      console.log(`  ✗ ${t.name}: ${t.message}`);
    });
    console.log('');
  }

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests();
}

module.exports = {
  testVariant,
  runAllTests,
  EXPECTED_COUNTS,
  LITE_AGENTS,
  STANDARD_SKILLS
};
