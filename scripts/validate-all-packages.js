#!/usr/bin/env node

/**
 * validate-all-packages.js
 * Comprehensive validation of all tool packages and variants
 *
 * Validates:
 * - 4 tools: claude, opencode, ampcode, droid
 * - 1 variant: pro
 * - 4 total combinations
 */

const path = require('path');
const fs = require('fs');
const PackageManager = require('../installer/package-manager');

const TOOLS = ['claude', 'opencode', 'ampcode', 'droid'];
const VARIANTS = ['pro'];

async function getDirectorySize(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let totalSize = 0;

  function calculateSize(currentPath) {
    const stats = fs.statSync(currentPath);

    if (stats.isFile()) {
      totalSize += stats.size;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    }
  }

  calculateSize(dirPath);
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function countFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  let count = 0;

  function countRecursive(currentPath) {
    const stats = fs.statSync(currentPath);

    if (stats.isFile()) {
      count++;
    } else if (stats.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        countRecursive(path.join(currentPath, file));
      });
    }
  }

  countRecursive(dirPath);
  return count;
}

async function validateAllPackages() {
  const projectRoot = path.resolve(__dirname, '..');
  const packageManager = new PackageManager(projectRoot);

  console.log('Starting comprehensive package validation...\n');
  console.log(`Project root: ${projectRoot}\n`);

  const results = [];
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const tool of TOOLS) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Validating tool: ${tool.toUpperCase()}`);
    console.log('='.repeat(60));

    for (const variant of VARIANTS) {
      console.log(`\n  Variant: ${variant}`);

      try {
        // Run validation
        const validation = await packageManager.validatePackage(tool, variant);

        // Get package contents to count items
        const packagePath = path.join(projectRoot, 'packages', tool);
        let agentCount = 0;
        let skillCount = 0;
        let resourceCount = 0;
        let hookCount = 0;
        let variantFileCount = 0;
        let variantSizeBytes = 0;
        let variantSizeFormatted = '0 Bytes';

        if (validation.valid) {
          try {
            const contents = await packageManager.getPackageContents(tool, variant);
            agentCount = contents.agents?.length || 0;
            skillCount = contents.skills?.length || 0;
            resourceCount = contents.resources?.length || 0;
            hookCount = contents.hooks?.length || 0;

            // Calculate variant-specific file count and size
            variantFileCount = agentCount + skillCount + resourceCount + hookCount;

            // Get accurate variant size
            const sizeInfo = await packageManager.getPackageSize(tool, variant);
            variantSizeBytes = sizeInfo.size;
            variantSizeFormatted = sizeInfo.formattedSize;
          } catch (contentError) {
            console.log(`       Warning: Could not get package contents: ${contentError.message}`);
          }
        }

        // Get overall package path info
        const totalFileCount = await countFiles(packagePath);
        const totalSizeBytes = await getDirectorySize(packagePath);
        const totalSizeFormatted = formatBytes(totalSizeBytes);

        // Collect detailed info
        const result = {
          tool,
          variant,
          valid: validation.valid,
          errors: validation.issues || [],
          warnings: [],
          checkedFiles: validation.checkedFiles || 0,
          missingFiles: validation.missingFiles || 0,
          agentCount,
          skillCount,
          resourceCount,
          hookCount,
          variantFileCount,
          variantSizeBytes,
          variantSizeFormatted,
          totalFileCount,
          totalSizeBytes,
          totalSizeFormatted
        };

        results.push(result);

        // Display results
        if (validation.valid) {
          console.log(`    ✅ Status: VALID`);
        } else {
          console.log(`    ❌ Status: INVALID`);
        }

        console.log(`    📊 Checked Files: ${result.checkedFiles}`);
        console.log(`    ❌ Missing Files: ${result.missingFiles}`);
        console.log(`    🤖 Agents: ${result.agentCount}`);
        console.log(`    🛠️  Skills: ${result.skillCount}`);
        console.log(`    📦 Resources: ${result.resourceCount}`);
        console.log(`    🪝 Hooks: ${result.hookCount}`);
        console.log(`    💾 Variant Size: ${result.variantSizeFormatted}`);

        if (validation.issues && validation.issues.length > 0) {
          console.log(`    ⚠️  Issues: ${validation.issues.length}`);
          validation.issues.forEach(issue => console.log(`       - ${issue}`));
          totalErrors += validation.issues.length;
        }

      } catch (error) {
        console.log(`    ❌ VALIDATION FAILED: ${error.message}`);

        results.push({
          tool,
          variant,
          valid: false,
          errors: [error.message],
          warnings: [],
          checkedFiles: 0,
          missingFiles: 0,
          agentCount: 0,
          skillCount: 0,
          resourceCount: 0,
          hookCount: 0,
          variantFileCount: 0,
          variantSizeBytes: 0,
          variantSizeFormatted: '0 Bytes',
          totalFileCount: 0,
          totalSizeBytes: 0,
          totalSizeFormatted: '0 Bytes'
        });

        totalErrors++;
      }
    }
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(60));

  const validCount = results.filter(r => r.valid).length;
  const invalidCount = results.filter(r => !r.valid).length;

  console.log(`\nTotal combinations: ${results.length}`);
  console.log(`✅ Valid: ${validCount}`);
  console.log(`❌ Invalid: ${invalidCount}`);
  console.log(`⚠️  Total errors: ${totalErrors}`);
  console.log(`⚠️  Total warnings: ${totalWarnings}`);

  if (validCount === results.length) {
    console.log(`\n🎉 All packages validated successfully!`);
  } else {
    console.log(`\n⚠️  ${invalidCount} package(s) failed validation`);
  }

  return {
    results,
    summary: {
      total: results.length,
      valid: validCount,
      invalid: invalidCount,
      errors: totalErrors,
      warnings: totalWarnings
    }
  };
}

// Run validation
if (require.main === module) {
  validateAllPackages()
    .then(data => {
      // Save results to JSON for report generation
      const outputPath = path.join(__dirname, '..', 'validation-results.json');
      fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
      console.log(`\n📄 Detailed results saved to: ${outputPath}`);

      process.exit(data.summary.invalid > 0 ? 1 : 0);
    })
    .catch(error => {
      console.error('Validation script failed:', error);
      process.exit(1);
    });
}

module.exports = { validateAllPackages };
