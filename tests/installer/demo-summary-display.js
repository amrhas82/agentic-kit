#!/usr/bin/env node

/**
 * Visual Demo: Enhanced Summary Display
 * Shows the improved showSummary() method with actual file counts and sizes
 */

const InteractiveInstaller = require('../../installer/cli');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

async function demonstrateEnhancedSummary() {
  console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  Enhanced Summary Display - Visual Demonstration${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

  console.log('This demo shows how the enhanced showSummary() method displays');
  console.log('actual file counts and sizes for selected tools.\n');

  // Demo 1: Single Tool - Lite Variant
  console.log(`${colors.bright}Demo 1: Single Tool (Claude) - Lite Variant${colors.reset}`);
  console.log('─────────────────────────────────────────────────────────\n');

  const installer1 = new InteractiveInstaller();
  installer1.selections.variant = 'lite';
  installer1.selections.tools = ['claude'];
  installer1.selections.paths = { claude: '~/.claude' };

  // Get the package manager to show actual data
  const pm1 = installer1.getPackageManager();
  const contents1 = await pm1.getPackageContents('claude', 'lite');
  const size1 = await pm1.getPackageSize('claude', 'lite');

  console.log(`Selected: Lite variant with Claude Code`);
  console.log(`Expected display:`);
  console.log(`  - File count: ${contents1.totalFiles} files`);
  console.log(`  - Size: ${size1.formattedSize}`);
  console.log(`  - Path: ~/.claude (default)`);

  // Demo 2: Single Tool - Standard Variant
  console.log(`\n${colors.bright}Demo 2: Single Tool (Claude) - Standard Variant${colors.reset}`);
  console.log('─────────────────────────────────────────────────────────\n');

  const installer2 = new InteractiveInstaller();
  installer2.selections.variant = 'standard';
  installer2.selections.tools = ['claude'];
  installer2.selections.paths = { claude: '~/.claude' };

  const pm2 = installer2.getPackageManager();
  const contents2 = await pm2.getPackageContents('claude', 'standard');
  const size2 = await pm2.getPackageSize('claude', 'standard');

  console.log(`Selected: Standard variant with Claude Code`);
  console.log(`Expected display:`);
  console.log(`  - File count: ${contents2.totalFiles} files`);
  console.log(`  - Size: ${size2.formattedSize}`);
  console.log(`  - Path: ~/.claude (default)`);
  console.log(`\n${colors.green}Note: Standard has significantly more files due to 8 core skills!${colors.reset}`);

  // Demo 3: Single Tool - Pro Variant
  console.log(`\n${colors.bright}Demo 3: Single Tool (Claude) - Pro Variant${colors.reset}`);
  console.log('─────────────────────────────────────────────────────────\n');

  const installer3 = new InteractiveInstaller();
  installer3.selections.variant = 'pro';
  installer3.selections.tools = ['claude'];
  installer3.selections.paths = { claude: '~/.claude' };

  const pm3 = installer3.getPackageManager();
  const contents3 = await pm3.getPackageContents('claude', 'pro');
  const size3 = await pm3.getPackageSize('claude', 'pro');

  console.log(`Selected: Pro variant with Claude Code`);
  console.log(`Expected display:`);
  console.log(`  - File count: ${contents3.totalFiles} files`);
  console.log(`  - Size: ${size3.formattedSize}`);
  console.log(`  - Path: ~/.claude (default)`);
  console.log(`\n${colors.green}Note: Pro includes all 22 skills for maximum functionality!${colors.reset}`);

  // Demo 4: Custom Path
  console.log(`\n${colors.bright}Demo 4: Custom Path Display${colors.reset}`);
  console.log('─────────────────────────────────────────────────────────\n');

  const installer4 = new InteractiveInstaller();
  installer4.selections.variant = 'standard';
  installer4.selections.tools = ['claude'];
  installer4.selections.paths = { claude: '/custom/path/claude' };

  console.log(`Selected: Standard variant with custom path`);
  console.log(`Expected display:`);
  console.log(`  - File count: ${contents2.totalFiles} files`);
  console.log(`  - Size: ${size2.formattedSize}`);
  console.log(`  - Path: /custom/path/claude ${colors.yellow}*${colors.reset}`);
  console.log(`  - Footnote: "* Custom path specified"`);

  // Demo 5: Variant Comparison Table
  console.log(`\n${colors.bright}Demo 5: Variant Comparison${colors.reset}`);
  console.log('─────────────────────────────────────────────────────────\n');

  console.log('┌─────────────┬────────────┬─────────────┐');
  console.log('│ Variant     │ Files      │ Size        │');
  console.log('├─────────────┼────────────┼─────────────┤');
  console.log(`│ Lite        │ ${String(contents1.totalFiles).padEnd(10)} │ ${size1.formattedSize.padEnd(11)} │`);
  console.log(`│ Standard    │ ${String(contents2.totalFiles).padEnd(10)} │ ${size2.formattedSize.padEnd(11)} │`);
  console.log(`│ Pro         │ ${String(contents3.totalFiles).padEnd(10)} │ ${size3.formattedSize.padEnd(11)} │`);
  console.log('└─────────────┴────────────┴─────────────┘');

  console.log(`\n${colors.cyan}Key observations:${colors.reset}`);
  console.log(`  • Lite is minimal (${contents1.totalFiles} files, ${size1.formattedSize}) - great for CI/CD`);
  console.log(`  • Standard jumps to ${contents2.totalFiles} files due to 8 skill packages`);
  console.log(`  • Pro has all ${contents3.totalFiles} files with complete functionality`);
  console.log(`  • Size progression: ${size1.formattedSize} → ${size2.formattedSize} → ${size3.formattedSize}`);

  // Summary of improvements
  console.log(`\n${colors.bright}${colors.green}Key Improvements in showSummary()${colors.reset}\n`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Actual File Counts:${colors.reset} No more "TBD" - shows real file counts`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Formatted Sizes:${colors.reset} Human-readable sizes (KB, MB, GB)`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Multi-Tool Totals:${colors.reset} Shows aggregate totals across all tools`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Custom Path Marking:${colors.reset} Asterisk (*) indicates custom paths`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Error Handling:${colors.reset} Gracefully shows "N/A" if data unavailable`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Performance:${colors.reset} Efficient async data retrieval from PackageManager`);
  console.log(`${colors.green}✓${colors.reset} ${colors.bright}Variant-Aware:${colors.reset} Correctly calculates sizes for each variant`);

  console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}  Demo Complete - Enhanced Summary Display${colors.reset}`);
  console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);
}

// Run demonstration
demonstrateEnhancedSummary().catch(error => {
  console.error(`Demo error: ${error.message}`);
  process.exit(1);
});
