#!/usr/bin/env node

/**
 * Test Helpers
 * Utilities for setting up and cleaning up test environments
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Create a temporary test directory
 * @param {string} prefix - Prefix for the temp directory name
 * @returns {string} - Path to the created temp directory
 */
function createTempDir(prefix = 'agentic-kit-test-') {
  const tempDir = path.join(os.tmpdir(), `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  fs.mkdirSync(tempDir, { recursive: true });
  return tempDir;
}

/**
 * Copy a directory recursively
 * @param {string} src - Source directory
 * @param {string} dest - Destination directory
 */
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory does not exist: ${src}`);
  }

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
 * Remove a directory recursively
 * @param {string} dirPath - Path to directory to remove
 */
function removeDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  if (fs.statSync(dirPath).isDirectory()) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(dirPath);
  }
}

/**
 * Create a test package structure
 * @param {string} baseDir - Base directory to create package in
 * @param {object} options - Options for package creation
 * @param {string[]} options.agents - List of agent files to create
 * @param {string[]} options.skills - List of skill directories to create
 * @param {string[]} options.resources - List of resource files to create
 * @param {string[]} options.hooks - List of hook files to create
 * @returns {object} - Paths to created directories
 */
function createTestPackage(baseDir, options = {}) {
  const {
    agents = ['test-agent.md'],
    skills = [],
    resources = ['test-resource.txt'],
    hooks = ['test-hook.js']
  } = options;

  const dirs = {
    agents: path.join(baseDir, 'agents'),
    skills: path.join(baseDir, 'skills'),
    resources: path.join(baseDir, 'resources'),
    hooks: path.join(baseDir, 'hooks')
  };

  // Create directories
  Object.values(dirs).forEach(dir => fs.mkdirSync(dir, { recursive: true }));

  // Create agent files
  agents.forEach(agent => {
    const agentPath = path.join(dirs.agents, agent);
    fs.writeFileSync(agentPath, `# ${agent}\n\nTest agent content\n`);
  });

  // Create skill directories
  skills.forEach(skill => {
    const skillDir = path.join(dirs.skills, skill);
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, 'skill.md'),
      `# ${skill}\n\nTest skill content\n`
    );
  });

  // Create resource files
  resources.forEach(resource => {
    const resourcePath = path.join(dirs.resources, resource);
    fs.writeFileSync(resourcePath, `Test resource: ${resource}\n`);
  });

  // Create hook files
  hooks.forEach(hook => {
    const hookPath = path.join(dirs.hooks, hook);
    fs.writeFileSync(hookPath, `#!/usr/bin/env node\n\nconsole.log('Test hook: ${hook}');\n`);
    fs.chmodSync(hookPath, 0o755);
  });

  return dirs;
}

/**
 * Create a variants.json file
 * @param {string} filePath - Path where to create the file
 * @param {object} variantsData - Variants configuration
 */
function createVariantsFile(filePath, variantsData) {
  fs.writeFileSync(filePath, JSON.stringify(variantsData, null, 2));
}

/**
 * Create a manifest.json file
 * @param {string} filePath - Path where to create the file
 * @param {object} manifestData - Manifest configuration
 */
function createManifestFile(filePath, manifestData) {
  fs.writeFileSync(filePath, JSON.stringify(manifestData, null, 2));
}

/**
 * Verify a directory structure matches expectations
 * @param {string} baseDir - Base directory to verify
 * @param {object} expected - Expected structure
 * @returns {object} - Verification results with errors if any
 */
function verifyDirectoryStructure(baseDir, expected) {
  const results = {
    success: true,
    errors: []
  };

  const components = ['agents', 'skills', 'resources', 'hooks'];

  for (const component of components) {
    const componentDir = path.join(baseDir, component);

    if (!fs.existsSync(componentDir)) {
      results.success = false;
      results.errors.push(`Missing directory: ${component}`);
      continue;
    }

    if (expected[component]) {
      const actualItems = fs.readdirSync(componentDir);
      const expectedItems = expected[component];

      for (const item of expectedItems) {
        const itemPath = path.join(componentDir, item);
        if (!fs.existsSync(itemPath)) {
          results.success = false;
          results.errors.push(`Missing ${component} item: ${item}`);
        }
      }
    }
  }

  return results;
}

/**
 * Count files in a directory recursively
 * @param {string} dirPath - Directory path
 * @returns {number} - Total file count
 */
function countFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let count = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath);
    } else {
      count++;
    }
  }

  return count;
}

/**
 * Get total size of a directory in bytes
 * @param {string} dirPath - Directory path
 * @returns {number} - Total size in bytes
 */
function getDirectorySize(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let size = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      size += getDirectorySize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  }

  return size;
}

/**
 * Create a mock installation environment
 * @returns {object} - Test environment paths and cleanup function
 */
function createTestEnvironment() {
  const tempDir = createTempDir('agentic-kit-test-env-');
  const toolsDir = path.join(tempDir, 'tools');

  // Create tool directories
  const tools = ['claude', 'opencode', 'ampcode', 'droid'];
  const toolPaths = {};

  tools.forEach(tool => {
    const toolPath = path.join(toolsDir, tool);
    fs.mkdirSync(toolPath, { recursive: true });
    toolPaths[tool] = toolPath;
  });

  return {
    tempDir,
    toolsDir,
    toolPaths,
    cleanup: () => removeDirRecursive(tempDir)
  };
}

/**
 * Load a fixture file
 * @param {string} fixtureName - Name of the fixture (relative to fixtures dir)
 * @returns {string} - Fixture content
 */
function loadFixture(fixtureName) {
  const fixturesDir = path.join(__dirname, '..');
  const fixturePath = path.join(fixturesDir, fixtureName);
  return fs.readFileSync(fixturePath, 'utf8');
}

/**
 * Load a JSON fixture
 * @param {string} fixtureName - Name of the fixture (relative to fixtures dir)
 * @returns {object} - Parsed JSON content
 */
function loadJsonFixture(fixtureName) {
  const content = loadFixture(fixtureName);
  return JSON.parse(content);
}

/**
 * Assert that two objects are deeply equal
 * @param {*} actual - Actual value
 * @param {*} expected - Expected value
 * @param {string} message - Error message if not equal
 */
function assertEqual(actual, expected, message = 'Values are not equal') {
  const actualStr = JSON.stringify(actual, null, 2);
  const expectedStr = JSON.stringify(expected, null, 2);

  if (actualStr !== expectedStr) {
    throw new Error(`${message}\nExpected: ${expectedStr}\nActual: ${actualStr}`);
  }
}

/**
 * Wait for a specified duration
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} - Promise that resolves after the delay
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  createTempDir,
  copyDirRecursive,
  removeDirRecursive,
  createTestPackage,
  createVariantsFile,
  createManifestFile,
  verifyDirectoryStructure,
  countFiles,
  getDirectorySize,
  createTestEnvironment,
  loadFixture,
  loadJsonFixture,
  assertEqual,
  sleep
};
