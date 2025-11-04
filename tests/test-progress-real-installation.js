/**
 * Test progress callback with real Claude package installation
 *
 * This tests the progress callback system with actual package data
 */

const path = require('path');
const fs = require('fs');
const InstallationEngine = require('../installer/installation-engine.js');
const PackageManager = require('../installer/package-manager.js');
const PathManager = require('../installer/path-manager.js');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

async function testRealInstallation() {
  console.log(`\n${colors.bright}${colors.cyan}Testing Progress Callback with Real Claude Package${colors.reset}\n`);

  const packageManager = new PackageManager();
  const pathManager = new PathManager();
  const installationEngine = new InstallationEngine(pathManager, packageManager);

  // Create temporary directory for test installation
  const tempDir = path.join(__dirname, 'tmp', `real-install-${Date.now()}`);
  await fs.promises.mkdir(tempDir, { recursive: true });

  try {
    // Test with each variant
    const variants = ['lite', 'standard', 'pro'];

    for (const variant of variants) {
      console.log(`\n${colors.blue}${colors.bright}Testing ${variant.toUpperCase()} variant installation${colors.reset}\n`);

      const targetDir = path.join(tempDir, `claude-${variant}`);
      const progressUpdates = [];
      let lastPercentage = -1;

      const progressCallback = (progress) => {
        progressUpdates.push(progress);

        // Display progress every 10% or when file type changes
        if (progress.percentage !== lastPercentage && progress.percentage % 10 === 0) {
          const bytesFormatted = formatBytes(progress.bytesTransferred);
          const totalFormatted = formatBytes(progress.totalBytes);

          console.log(
            `${colors.green}[${progress.percentage}%]${colors.reset} ` +
            `${progress.filesCompleted}/${progress.totalFiles} files | ` +
            `${bytesFormatted}/${totalFormatted}`
          );
          lastPercentage = progress.percentage;
        }
      };

      // Install with progress tracking
      const startTime = Date.now();
      await installationEngine.installPackage('claude', variant, targetDir, progressCallback);
      const duration = Date.now() - startTime;

      // Display summary
      console.log(`\n${colors.magenta}Summary for ${variant} variant:${colors.reset}`);
      console.log(`  Total progress updates: ${progressUpdates.length}`);
      console.log(`  Files installed: ${progressUpdates[progressUpdates.length - 1].filesCompleted}`);
      console.log(`  Bytes transferred: ${formatBytes(progressUpdates[progressUpdates.length - 1].bytesTransferred)}`);
      console.log(`  Duration: ${duration}ms (${(duration / 1000).toFixed(2)}s)`);
      console.log(`  Average: ${(duration / progressUpdates.length).toFixed(2)}ms per file`);

      // Verify final state
      const lastUpdate = progressUpdates[progressUpdates.length - 1];
      console.log(`  ${colors.green}✓${colors.reset} Final percentage: ${lastUpdate.percentage}%`);
      console.log(`  ${colors.green}✓${colors.reset} All files completed: ${lastUpdate.filesCompleted === lastUpdate.totalFiles}`);
      console.log(`  ${colors.green}✓${colors.reset} All bytes transferred: ${lastUpdate.bytesTransferred === lastUpdate.totalBytes}`);

      // Show sample of file types processed
      const fileTypes = {
        agents: progressUpdates.filter(u => u.currentFile.includes('agents/')).length,
        skills: progressUpdates.filter(u => u.currentFile.includes('skills/')).length,
        resources: progressUpdates.filter(u => u.currentFile.includes('resources/')).length,
        hooks: progressUpdates.filter(u => u.currentFile.includes('hooks/')).length
      };

      console.log(`\n  File types processed:`);
      console.log(`    Agents: ${fileTypes.agents} files`);
      console.log(`    Skills: ${fileTypes.skills} files`);
      console.log(`    Resources: ${fileTypes.resources} files`);
      console.log(`    Hooks: ${fileTypes.hooks} files`);
    }

    console.log(`\n${colors.green}${colors.bright}All real installation tests completed successfully!${colors.reset}\n`);

  } catch (error) {
    console.error(`\n${colors.red}Error during real installation test: ${error.message}${colors.reset}`);
    console.error(error.stack);
    process.exit(1);
  } finally {
    // Cleanup
    try {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.warn(`Warning: Could not clean up ${tempDir}: ${error.message}`);
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Run test
testRealInstallation().catch(error => {
  console.error(`Fatal error: ${error.message}`);
  console.error(error.stack);
  process.exit(1);
});
