#!/usr/bin/env node

/**
 * Agentic Toolkit CLI Wrapper
 *
 * This script provides npx support for the agentic-toolkit package.
 * It handles variant selection and provides helpful CLI output for users.
 *
 * Usage:
 *   npx agentic-kit              # Install standard variant (default)
 *   npx agentic-kit@lite         # Install lite variant
 *   npx agentic-kit@pro          # Install pro variant
 *   npx agentic-kit --variant=lite   # Install lite variant via flag
 *   npx agentic-kit --help       # Show help message
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
};

// Parse command line arguments
const args = process.argv.slice(2);
const hasHelpFlag = args.includes('--help') || args.includes('-h');
const variantFlag = args.find(arg => arg.startsWith('--variant='));
const requestedVariant = variantFlag ? variantFlag.split('=')[1] : null;

/**
 * Display help message
 */
function showHelp() {
  console.log(`
${colors.bright}${colors.cyan}Agentic Toolkit${colors.reset} - AI-Driven Software Development Toolkit

${colors.bright}DESCRIPTION:${colors.reset}
  Comprehensive toolkit with 13 specialized agents and 14 powerful skills
  for agile software development, product management, and content creation.

${colors.bright}VARIANTS:${colors.reset}
  ${colors.green}lite${colors.reset}        3 agents, 0 skills  - Minimal dependencies
  ${colors.blue}standard${colors.reset}    13 agents, 8 skills - Recommended for most users
  ${colors.magenta}pro${colors.reset}         13 agents, 14 skills - Maximum capabilities

${colors.bright}USAGE:${colors.reset}
  ${colors.cyan}npx agentic-kit${colors.reset}                # Install standard variant (default)
  ${colors.cyan}npx agentic-kit@lite${colors.reset}           # Install lite variant
  ${colors.cyan}npx agentic-kit@pro${colors.reset}            # Install pro variant
  ${colors.cyan}npx agentic-kit --variant=lite${colors.reset} # Install lite variant via flag

${colors.bright}CLAUDE CODE MARKETPLACE:${colors.reset}
  You can also install this plugin directly in Claude Code:

  ${colors.cyan}/plugin marketplace add agentic-kit${colors.reset}          # Standard variant
  ${colors.cyan}/plugin marketplace add agentic-kit-lite${colors.reset}     # Lite variant
  ${colors.cyan}/plugin marketplace add agentic-kit-pro${colors.reset}      # Pro variant

${colors.bright}AGENT INVOCATION:${colors.reset}
  After installation, invoke agents using:
  ${colors.cyan}@Master:${colors.reset} [your request]
  ${colors.cyan}@Orchestrator:${colors.reset} [your request]
  ${colors.cyan}@ProductManager:${colors.reset} [your request]

${colors.bright}MORE INFORMATION:${colors.reset}
  README:        https://github.com/yourusername/agentic-toolkit#readme
  Documentation: See README.md, QUICK-START.md, and VARIANTS.md
  Issues:        https://github.com/yourusername/agentic-toolkit/issues

${colors.bright}VERSION:${colors.reset}
  1.0.0
`);
}

/**
 * Display variant information
 */
function showVariantInfo(variant) {
  const variantInfo = {
    lite: {
      name: 'Lite',
      color: colors.green,
      agents: 3,
      skills: 0,
      description: 'Minimal dependencies with 3 core agents',
      agents_list: ['Master', 'Orchestrator', 'Scrum Master']
    },
    standard: {
      name: 'Standard',
      color: colors.blue,
      agents: 13,
      skills: 8,
      description: 'All 13 agents with 8 core production skills',
      skills_list: ['PDF', 'DOCX', 'XLSX', 'PPTX', 'Canvas Design', 'Theme Factory', 'Brand Guidelines', 'Internal Communications']
    },
    pro: {
      name: 'Pro',
      color: colors.magenta,
      agents: 13,
      skills: 16,
      description: 'All 13 agents with complete skill set (16 skills)',
      skills_list: ['All Standard skills', '+ 8 advanced skills']
    }
  };

  const info = variantInfo[variant];

  console.log(`
${colors.bright}${info.color}Agentic Toolkit - ${info.name} Variant${colors.reset}

${colors.bright}SELECTED VARIANT:${colors.reset}
  ${info.color}${info.name}${colors.reset} - ${info.description}

${colors.bright}FEATURES:${colors.reset}
  Agents: ${colors.cyan}${info.agents}${colors.reset}
  Skills: ${colors.cyan}${info.skills}${colors.reset}

${colors.bright}INSTALLATION:${colors.reset}
  This plugin is now ready to use with Claude Code.

${colors.bright}GETTING STARTED:${colors.reset}
  1. Verify installation by typing: ${colors.cyan}@Master: *help${colors.reset}
  2. See available agents and their capabilities
  3. Read QUICK-START.md for example workflows

${colors.bright}EXAMPLE COMMANDS:${colors.reset}
  ${colors.cyan}@Master:${colors.reset} Show me what you can do
  ${colors.cyan}@Orchestrator:${colors.reset} Help me plan a new feature
  ${colors.cyan}@ProductManager:${colors.reset} Create a PRD for user authentication

${colors.bright}DOCUMENTATION:${colors.reset}
  ${colors.yellow}README.md${colors.reset}           - Full documentation
  ${colors.yellow}QUICK-START.md${colors.reset}      - Getting started guide
  ${colors.yellow}VARIANTS.md${colors.reset}         - Variant comparison
  ${colors.yellow}TROUBLESHOOTING.md${colors.reset}  - Common issues and solutions

${colors.green}Installation successful!${colors.reset}
`);
}

/**
 * Detect variant from npm package tag or flags
 */
function detectVariant() {
  // Check for explicit variant flag
  if (requestedVariant) {
    if (['lite', 'standard', 'pro'].includes(requestedVariant)) {
      return requestedVariant;
    } else {
      console.error(`${colors.yellow}Warning:${colors.reset} Invalid variant '${requestedVariant}'. Using 'standard' instead.`);
      console.error(`Valid variants: lite, standard, pro`);
      return 'standard';
    }
  }

  // Check npm package tag (when installed via npm install agentic-kit@lite, etc.)
  // This would be available in process.env.npm_package_config_variant
  // For now, default to 'standard'
  return 'standard';
}

/**
 * Verify plugin manifest exists for selected variant
 */
function verifyManifest(variant) {
  const manifestPath = path.join(__dirname, '.claude-plugin', `plugin-${variant}.json`);

  if (!fs.existsSync(manifestPath)) {
    console.error(`${colors.yellow}Warning:${colors.reset} Manifest file not found: ${manifestPath}`);
    console.error(`This may indicate an incomplete installation.`);
    return false;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.variant !== variant) {
      console.error(`${colors.yellow}Warning:${colors.reset} Manifest variant mismatch. Expected '${variant}', found '${manifest.variant}'`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`${colors.yellow}Error:${colors.reset} Failed to parse manifest: ${error.message}`);
    return false;
  }
}

/**
 * Main CLI execution
 */
function main() {
  // Show help if requested
  if (hasHelpFlag) {
    showHelp();
    process.exit(0);
  }

  // Detect which variant to use
  const variant = detectVariant();

  // Display welcome message
  console.log(`${colors.bright}${colors.cyan}Initializing Agentic Toolkit...${colors.reset}\n`);

  // Verify the manifest exists
  const manifestValid = verifyManifest(variant);

  if (!manifestValid) {
    console.error(`\n${colors.yellow}Installation may be incomplete. Please check the package contents.${colors.reset}`);
    console.error(`If problems persist, reinstall with: ${colors.cyan}npm install agentic-kit@${variant}${colors.reset}\n`);
    process.exit(1);
  }

  // Show variant information
  showVariantInfo(variant);

  // For Claude Code plugin installation, the actual plugin loading
  // is handled by Claude Code itself. This CLI just provides helpful
  // output and verification.

  process.exit(0);
}

// Run the CLI
main();
