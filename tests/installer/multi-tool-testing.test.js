#!/usr/bin/env node

/**
 * Multi-Tool Installation Testing Suite
 * Tests simultaneous installation of multiple tools with isolation verification
 *
 * Tests:
 * - Claude + Opencode simultaneous installation
 * - All 4 tools simultaneous installation
 * - Mixed variants (Claude Standard + Droid Pro, etc.)
 * - Tool isolation (no file conflicts)
 * - Correct paths for each tool
 * - Correct manifest for each tool
 */

const fs = require('fs');
const path = require('path');
const { createTempDir, removeDirRecursive, createTestEnvironment } = require('../fixtures/helpers/test-helpers');

// Expected component counts for each variant
const EXPECTED_COUNTS = {
  lite: { agents: 4, skills: 7, resources: 6, hooks: 2 },
  standard: { agents: 9, skills: 11, resources: 6, hooks: 2 },
  pro: { agents: 13, skills: 22, resources: 6, hooks: 2 }
};

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
 * Copy package files for a tool/variant to test directory
 */
function installToolPackage(tool, variant, baseDir) {
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

  // Create tool-specific base directory
  const toolDir = path.join(baseDir, tool);
  fs.mkdirSync(toolDir, { recursive: true });

  // Create component directories
  const dirs = ['agents', 'skills', 'resources', 'hooks'];
  dirs.forEach(dir => {
    const dirPath = path.join(toolDir, dir);
    fs.mkdirSync(dirPath, { recursive: true });
  });

  // Copy agents
  const agentsDir = path.join(packageDir, 'agents');
  const agentsToCopy = variantConfig.agents === '*'
    ? fs.readdirSync(agentsDir)
    : variantConfig.agents.map(a => a.endsWith('.md') ? a : `${a}.md`);

  agentsToCopy.forEach(agent => {
    const srcPath = path.join(agentsDir, agent);
    const destPath = path.join(toolDir, 'agents', agent);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Copy skills
  const skillsDir = path.join(packageDir, 'skills');
  if (variantConfig.skills && variantConfig.skills !== '*' && variantConfig.skills.length > 0) {
    variantConfig.skills.forEach(skill => {
      const srcSkillDir = path.join(skillsDir, skill);
      const destSkillDir = path.join(toolDir, 'skills', skill);
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
      const destSkillDir = path.join(toolDir, 'skills', skill);
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
    const destPath = path.join(toolDir, 'resources', resource);
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
    const destPath = path.join(toolDir, 'hooks', hook);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Create manifest
  const actualCounts = countComponents(toolDir);
  const manifest = {
    tool,
    variant,
    version: '1.2.0',
    installedAt: new Date().toISOString(),
    components: actualCounts
  };

  fs.writeFileSync(
    path.join(toolDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  return actualCounts;
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
 * Count components in a tool directory
 */
function countComponents(toolDir) {
  const counts = {
    agents: 0,
    skills: 0,
    resources: 0,
    hooks: 0
  };

  // Count agents
  const agentsDir = path.join(toolDir, 'agents');
  if (fs.existsSync(agentsDir)) {
    counts.agents = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md')).length;
  }

  // Count skills
  const skillsDir = path.join(toolDir, 'skills');
  if (fs.existsSync(skillsDir)) {
    counts.skills = fs.readdirSync(skillsDir).filter(item => {
      const itemPath = path.join(skillsDir, item);
      return fs.statSync(itemPath).isDirectory();
    }).length;
  }

  // Count resources
  const resourcesDir = path.join(toolDir, 'resources');
  if (fs.existsSync(resourcesDir)) {
    counts.resources = fs.readdirSync(resourcesDir).length;
  }

  // Count hooks
  const hooksDir = path.join(toolDir, 'hooks');
  if (fs.existsSync(hooksDir)) {
    counts.hooks = fs.readdirSync(hooksDir).filter(f => f.endsWith('.js')).length;
  }

  return counts;
}

/**
 * Verify tool isolation - ensure no overlapping files
 */
function verifyToolIsolation(baseDir, tools) {
  const allPaths = new Set();
  let hasConflicts = false;
  const conflicts = [];

  for (const tool of tools) {
    const toolDir = path.join(baseDir, tool);
    if (!fs.existsSync(toolDir)) continue;

    // Recursively get all file paths
    const getFilePaths = (dir, relativeTo) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      let paths = [];

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(relativeTo, fullPath);

        if (entry.isDirectory()) {
          paths = paths.concat(getFilePaths(fullPath, relativeTo));
        } else {
          paths.push(relativePath);
        }
      }

      return paths;
    };

    const toolPaths = getFilePaths(toolDir, baseDir);

    for (const p of toolPaths) {
      if (allPaths.has(p)) {
        hasConflicts = true;
        conflicts.push(p);
      }
      allPaths.add(p);
    }
  }

  return { isolated: !hasConflicts, conflicts };
}

/**
 * Test multi-tool installation
 */
function testMultiToolInstallation(testConfig) {
  const { name, tools } = testConfig;
  console.log(`\nTesting: ${name}`);
  console.log('─'.repeat(60));

  let testDir;
  try {
    // Create temporary test directory
    testDir = createTempDir(`multi-tool-test-`);
    logTest(`${name}: Create temp directory`, true, testDir);

    // Install each tool
    const installedTools = {};
    for (const [tool, variant] of Object.entries(tools)) {
      const counts = installToolPackage(tool, variant, testDir);
      installedTools[tool] = { variant, counts };
      logTest(`${name}: Install ${tool} (${variant})`, true,
        `agents=${counts.agents}, skills=${counts.skills}`);
    }

    // Verify tool isolation
    const isolation = verifyToolIsolation(testDir, Object.keys(tools));
    if (!isolation.isolated) {
      logTest(`${name}: Verify tool isolation`, false,
        `File conflicts detected: ${isolation.conflicts.join(', ')}`);
    } else {
      logTest(`${name}: Verify tool isolation`, true);
    }

    // Verify each tool has correct path
    for (const tool of Object.keys(tools)) {
      const toolPath = path.join(testDir, tool);
      const pathExists = fs.existsSync(toolPath);
      logTest(`${name}: Verify ${tool} path`, pathExists, toolPath);
    }

    // Verify each tool has correct manifest
    for (const [tool, { variant, counts }] of Object.entries(installedTools)) {
      const manifestPath = path.join(testDir, tool, 'manifest.json');

      if (!fs.existsSync(manifestPath)) {
        logTest(`${name}: Verify ${tool} manifest exists`, false, 'Manifest not found');
        continue;
      }

      try {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

        // Verify tool name
        if (manifest.tool !== tool) {
          logTest(`${name}: Verify ${tool} manifest tool`, false,
            `Expected ${tool}, got ${manifest.tool}`);
          continue;
        }

        // Verify variant
        if (manifest.variant !== variant) {
          logTest(`${name}: Verify ${tool} manifest variant`, false,
            `Expected ${variant}, got ${manifest.variant}`);
          continue;
        }

        // Verify component counts
        const expectedCounts = EXPECTED_COUNTS[variant];
        const countsMatch =
          counts.agents === expectedCounts.agents &&
          counts.skills === expectedCounts.skills &&
          counts.resources === expectedCounts.resources &&
          counts.hooks === expectedCounts.hooks;

        if (!countsMatch) {
          logTest(`${name}: Verify ${tool} manifest counts`, false,
            `Expected ${JSON.stringify(expectedCounts)}, got ${JSON.stringify(counts)}`);
          continue;
        }

        logTest(`${name}: Verify ${tool} manifest`, true);
      } catch (error) {
        logTest(`${name}: Verify ${tool} manifest`, false, error.message);
      }
    }

    // Cleanup
    removeDirRecursive(testDir);
    logTest(`${name}: Cleanup`, true);

  } catch (error) {
    logTest(`${name}: Error`, false, error.message);
    console.error(error);

    // Cleanup on error
    if (testDir && fs.existsSync(testDir)) {
      removeDirRecursive(testDir);
    }
  }
}

/**
 * Run all multi-tool tests
 */
function runAllTests() {
  console.log('\x1b[1m\x1b[36m');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║       Multi-Tool Installation Testing Suite               ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\x1b[0m');

  const testConfigs = [
    // Test 1: Claude + Opencode (same variant)
    {
      name: 'Claude + Opencode (Standard)',
      tools: {
        claude: 'standard',
        opencode: 'standard'
      }
    },

    // Test 2: All 4 tools (same variant)
    {
      name: 'All 4 tools (Standard)',
      tools: {
        claude: 'standard',
        opencode: 'standard',
        ampcode: 'standard',
        droid: 'standard'
      }
    },

    // Test 3: Mixed variants - Claude Standard + Droid Pro
    {
      name: 'Claude Standard + Droid Pro (mixed)',
      tools: {
        claude: 'standard',
        droid: 'pro'
      }
    },

    // Test 4: All tools with different variants
    {
      name: 'All 4 tools (mixed variants)',
      tools: {
        claude: 'lite',
        opencode: 'standard',
        ampcode: 'pro',
        droid: 'standard'
      }
    },

    // Test 5: All Lite
    {
      name: 'All 4 tools (Lite)',
      tools: {
        claude: 'lite',
        opencode: 'lite',
        ampcode: 'lite',
        droid: 'lite'
      }
    },

    // Test 6: All Pro
    {
      name: 'All 4 tools (Pro)',
      tools: {
        claude: 'pro',
        opencode: 'pro',
        ampcode: 'pro',
        droid: 'pro'
      }
    }
  ];

  console.log(`Running ${testConfigs.length} multi-tool test scenarios\n`);

  for (const config of testConfigs) {
    testMultiToolInstallation(config);
  }

  // Print summary
  console.log('\n\x1b[1m\x1b[36m');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                      Test Summary                          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log('\x1b[0m');

  const total = results.passed + results.failed;
  const passRate = total > 0 ? ((results.passed / total) * 100).toFixed(1) : '0.0';

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
  testMultiToolInstallation,
  runAllTests,
  EXPECTED_COUNTS
};
