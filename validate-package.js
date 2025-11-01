#!/usr/bin/env node

/**
 * Package Validation Script
 *
 * This script runs before npm publish to ensure all required files exist
 * and all variants are properly configured.
 *
 * Validates:
 * - All manifest files exist
 * - All variants are properly configured
 * - No critical files are missing
 * - Manifest JSON is valid
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

let errorCount = 0;
let warningCount = 0;

/**
 * Log error message and increment error count
 */
function error(message) {
  console.error(`${colors.red}✗ ERROR:${colors.reset} ${message}`);
  errorCount++;
}

/**
 * Log warning message and increment warning count
 */
function warn(message) {
  console.warn(`${colors.yellow}⚠ WARNING:${colors.reset} ${message}`);
  warningCount++;
}

/**
 * Log success message
 */
function success(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

/**
 * Log info message
 */
function info(message) {
  console.log(`${colors.cyan}ℹ${colors.reset} ${message}`);
}

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

/**
 * Validate a JSON file
 */
function validateJsonFile(filePath, label) {
  if (!fileExists(filePath)) {
    error(`${label} not found: ${filePath}`);
    return null;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(content);
    success(`${label} is valid`);
    return parsed;
  } catch (err) {
    error(`${label} has invalid JSON: ${err.message}`);
    return null;
  }
}

/**
 * Validate required files exist
 */
function validateRequiredFiles() {
  info('\nValidating required files...');

  const requiredFiles = [
    { path: './cli.js', label: 'CLI script' },
    { path: './README.md', label: 'README' },
    { path: './QUICK-START.md', label: 'Quick Start Guide' },
    { path: './VARIANTS.md', label: 'Variants Documentation' },
    { path: './TROUBLESHOOTING.md', label: 'Troubleshooting Guide' },
    { path: './validate-references.sh', label: 'Reference Validation Script' },
    { path: './agents', label: 'Agents directory', isDir: true },
    { path: './skills', label: 'Skills directory', isDir: true },
    { path: './hooks', label: 'Hooks directory', isDir: true },
    { path: './.claude-plugin', label: 'Plugin directory', isDir: true }
  ];

  requiredFiles.forEach(({ path: filePath, label, isDir }) => {
    if (!fileExists(filePath)) {
      error(`${label} not found: ${filePath}`);
    } else {
      if (isDir) {
        const stat = fs.statSync(filePath);
        if (!stat.isDirectory()) {
          error(`${label} is not a directory: ${filePath}`);
        } else {
          success(`${label} exists`);
        }
      } else {
        success(`${label} exists`);
      }
    }
  });
}

/**
 * Validate plugin manifest files
 */
function validateManifests() {
  info('\nValidating plugin manifests...');

  const variants = ['lite', 'standard', 'pro'];
  const manifestData = {};

  // Validate main plugin.json
  const mainManifest = validateJsonFile('./.claude-plugin/plugin.json', 'Main plugin manifest');
  if (mainManifest) {
    manifestData.main = mainManifest;
  }

  // Validate each variant manifest
  variants.forEach(variant => {
    const manifestPath = `./.claude-plugin/plugin-${variant}.json`;
    const manifest = validateJsonFile(manifestPath, `${variant} variant manifest`);

    if (manifest) {
      manifestData[variant] = manifest;

      // Validate variant field matches
      if (manifest.variant !== variant) {
        error(`Variant mismatch in ${manifestPath}: expected '${variant}', found '${manifest.variant}'`);
      }

      // Validate required fields
      const requiredFields = ['name', 'version', 'description', 'variant'];
      requiredFields.forEach(field => {
        if (!manifest[field]) {
          error(`Missing required field '${field}' in ${manifestPath}`);
        }
      });
    }
  });

  return manifestData;
}

/**
 * Validate variant configurations
 */
function validateVariantConfigurations(manifestData) {
  info('\nValidating variant configurations...');

  const expectedConfigs = {
    lite: { agents: 3, skills: 0, agentIds: ['master', 'orchestrator', 'scrum-master'] },
    standard: { agents: 13, skills: 8 },
    pro: { agents: 13, skills: 14 }
  };

  Object.keys(expectedConfigs).forEach(variant => {
    const manifest = manifestData[variant];
    if (!manifest) {
      return; // Already reported as error in validateManifests
    }

    const expected = expectedConfigs[variant];
    const actual = {
      agents: manifest.agents ? (Array.isArray(manifest.agents) ? manifest.agents.length : Object.keys(manifest.agents).length) : 0,
      skills: manifest.skills ? (Array.isArray(manifest.skills) ? manifest.skills.length : Object.keys(manifest.skills).length) : 0
    };

    // Check agent count
    if (expected.agents !== actual.agents) {
      error(`${variant} variant: Expected ${expected.agents} agents, found ${actual.agents}`);
    } else {
      success(`${variant} variant has correct number of agents (${actual.agents})`);
    }

    // Check skill count
    if (expected.skills !== actual.skills) {
      error(`${variant} variant: Expected ${expected.skills} skills, found ${actual.skills}`);
    } else {
      success(`${variant} variant has correct number of skills (${actual.skills})`);
    }

    // For lite variant, validate specific agents
    if (variant === 'lite' && manifest.agents && expected.agentIds) {
      const actualAgentIds = Array.isArray(manifest.agents)
        ? manifest.agents.map(a => a.id)
        : Object.keys(manifest.agents);

      expected.agentIds.forEach(agentId => {
        if (!actualAgentIds.includes(agentId)) {
          error(`${variant} variant: Missing required agent '${agentId}'`);
        }
      });
    }
  });
}

/**
 * Validate package.json
 */
function validatePackageJson() {
  info('\nValidating package.json...');

  const pkg = validateJsonFile('./package.json', 'package.json');
  if (!pkg) {
    return;
  }

  // Check required fields
  const requiredFields = ['name', 'version', 'description', 'bin', 'files'];
  requiredFields.forEach(field => {
    if (!pkg[field]) {
      error(`Missing required field '${field}' in package.json`);
    } else {
      success(`package.json has '${field}' field`);
    }
  });

  // Validate bin field points to cli.js
  if (pkg.bin && pkg.bin['agentic-kit']) {
    if (pkg.bin['agentic-kit'] !== './cli.js') {
      warn(`bin field points to '${pkg.bin['agentic-kit']}' instead of './cli.js'`);
    } else {
      success('bin field correctly points to ./cli.js');
    }
  }

  // Validate files field includes critical files
  if (pkg.files) {
    const criticalFiles = ['.claude-plugin/', 'agents/', 'skills/', 'hooks/', 'cli.js', 'README.md'];
    criticalFiles.forEach(file => {
      if (!pkg.files.includes(file)) {
        error(`package.json files field missing critical file: ${file}`);
      }
    });
    success('package.json files field includes all critical files');
  }

  // Check for repository URL
  if (pkg.repository && pkg.repository.url) {
    if (pkg.repository.url.includes('yourusername')) {
      warn('repository URL still contains placeholder "yourusername"');
    } else {
      success('repository URL is configured');
    }
  } else {
    warn('Missing repository URL in package.json');
  }

  // Check for author
  if (pkg.author) {
    if (pkg.author.includes('Your Name') || pkg.author.includes('your.email@example.com')) {
      warn('author field still contains placeholder values');
    } else {
      success('author field is configured');
    }
  } else {
    warn('Missing author in package.json');
  }
}

/**
 * Validate CLI script has shebang
 */
function validateCliScript() {
  info('\nValidating CLI script...');

  const cliPath = './cli.js';
  if (!fileExists(cliPath)) {
    return; // Already reported as error
  }

  try {
    const content = fs.readFileSync(cliPath, 'utf8');
    const lines = content.split('\n');

    if (lines[0].startsWith('#!/usr/bin/env node')) {
      success('cli.js has correct shebang');
    } else {
      error('cli.js missing or incorrect shebang line');
    }

    // Check if file is executable (on Unix-like systems)
    if (process.platform !== 'win32') {
      try {
        const stats = fs.statSync(cliPath);
        const isExecutable = !!(stats.mode & fs.constants.S_IXUSR);
        if (isExecutable) {
          success('cli.js is executable');
        } else {
          warn('cli.js is not executable (run: chmod +x cli.js)');
        }
      } catch (err) {
        warn(`Could not check if cli.js is executable: ${err.message}`);
      }
    }
  } catch (err) {
    error(`Could not read cli.js: ${err.message}`);
  }
}

/**
 * Main validation function
 */
function main() {
  console.log(`\n${colors.bright}${colors.cyan}=== Package Validation ===${colors.reset}\n`);

  // Run all validations
  validatePackageJson();
  validateRequiredFiles();
  const manifestData = validateManifests();
  validateVariantConfigurations(manifestData);
  validateCliScript();

  // Print summary
  console.log(`\n${colors.bright}${colors.cyan}=== Validation Summary ===${colors.reset}\n`);

  if (errorCount === 0 && warningCount === 0) {
    console.log(`${colors.green}${colors.bright}✓ All validations passed!${colors.reset}`);
    console.log(`${colors.green}Package is ready for publication.${colors.reset}\n`);
    process.exit(0);
  } else {
    if (errorCount > 0) {
      console.log(`${colors.red}${colors.bright}✗ ${errorCount} error(s) found${colors.reset}`);
    }
    if (warningCount > 0) {
      console.log(`${colors.yellow}⚠ ${warningCount} warning(s) found${colors.reset}`);
    }

    if (errorCount > 0) {
      console.log(`\n${colors.red}${colors.bright}Package validation failed. Please fix errors before publishing.${colors.reset}\n`);
      process.exit(1);
    } else {
      console.log(`\n${colors.yellow}Package has warnings but can be published. Consider addressing warnings.${colors.reset}\n`);
      process.exit(0);
    }
  }
}

// Run validation
main();
