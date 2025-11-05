#!/usr/bin/env node

/**
 * Interactive CLI Installer for Agentic Kit
 * 
 * Provides 4-step installation process:
 * 1. Package variant selection (Lite/Standard/Pro)
 * 2. Tool selection (Claude/Opencode/Ampcode/Droid)
 * 3. Path configuration with confirmation
 * 4. Installation summary and execution
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

class InteractiveInstaller {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.selections = {
      variant: null,
      tools: [],
      paths: {}
    };

    // Command-line arguments
    this.cliArgs = this.parseCommandLineArgs();

    // Initialize PackageManager for accessing package information
    const PackageManager = require('./package-manager');
    this.packageManager = new PackageManager();

    this.tools = [
      {
        id: 'claude',
        name: 'Claude Code',
        path: '~/.claude',
        description: 'AI-powered development assistant',
        useCase: 'General software development with conversational AI',
        targetUsers: 'All developers'
      },
      {
        id: 'opencode',
        name: 'Opencode',
        path: '~/.config/opencode',
        description: 'CLI-optimized AI codegen tool',
        useCase: 'Terminal-based development and automation',
        targetUsers: 'CLI power users, DevOps teams'
      },
      {
        id: 'ampcode',
        name: 'Ampcode',
        path: '~/.config/amp',
        description: 'Amplified AI development accelerator',
        useCase: 'Velocity-focused workflows and rapid prototyping',
        targetUsers: 'Teams seeking development acceleration'
      },
      {
        id: 'droid',
        name: 'Droid',
        path: '~/.factory',
        description: 'Android-focused AI development companion',
        useCase: 'Mobile app development with Android Studio',
        targetUsers: 'Android developers, mobile teams'
      }
    ];
    
    this.variants = [
      { id: 'lite', name: 'Lite', agents: 3, skills: 0, description: 'Minimal setup, CI/CD' },
      { id: 'standard', name: 'Standard', agents: 13, skills: 8, description: 'Most users, general dev' },
      { id: 'pro', name: 'Pro', agents: 13, skills: 14, description: 'Advanced users, full features' }
    ];
  }

  /**
   * Parse command-line arguments
   * Supports various flags for non-interactive operation
   *
   * @returns {Object} - Parsed arguments object
   */
  parseCommandLineArgs() {
    const args = process.argv.slice(2);
    const parsed = {
      help: false,
      uninstall: null,
      upgrade: null,
      upgradeVariant: null,
      variant: null,
      tools: [],
      paths: {},
      silent: false,
      nonInteractive: false,
      config: null
    };

    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg === '--help' || arg === '-h') {
        parsed.help = true;
      } else if (arg === '--uninstall') {
        parsed.uninstall = args[++i];
      } else if (arg === '--upgrade') {
        parsed.upgrade = args[++i];
        parsed.upgradeVariant = args[++i];
      } else if (arg === '--variant') {
        parsed.variant = args[++i];
      } else if (arg === '--tools') {
        parsed.tools = args[++i].split(',').map(t => t.trim());
      } else if (arg === '--path') {
        const pathArg = args[++i];
        const [tool, pathValue] = pathArg.split('=');
        parsed.paths[tool] = pathValue;
      } else if (arg === '--silent' || arg === '--non-interactive' || arg === '--yes' || arg === '-y') {
        parsed.silent = true;
        parsed.nonInteractive = true;
      } else if (arg === '--config') {
        parsed.config = args[++i];
      }
    }

    return parsed;
  }

  /**
   * Display help information
   * Shows usage, options, and examples
   */
  showHelp() {
    console.log(`
${colors.bright}${colors.cyan}Agentic Kit Installer${colors.reset}

${colors.bright}USAGE:${colors.reset}
  node installer/cli.js [OPTIONS]

${colors.bright}OPTIONS:${colors.reset}
  ${colors.green}--help, -h${colors.reset}
      Display this help message

  ${colors.green}--uninstall <tool>${colors.reset}
      Uninstall a specific tool
      Example: node installer/cli.js --uninstall claude

  ${colors.green}--upgrade <tool> <variant>${colors.reset}
      Upgrade or downgrade a tool to a different variant
      Example: node installer/cli.js --upgrade claude pro
      Example: node installer/cli.js --upgrade claude lite

  ${colors.green}--variant <lite|standard|pro>${colors.reset}
      Select package variant (non-interactive mode)
      Example: node installer/cli.js --variant standard --tools claude

  ${colors.green}--tools <tool1,tool2,...>${colors.reset}
      Select tools to install (comma-separated, non-interactive mode)
      Example: node installer/cli.js --variant standard --tools claude,opencode

  ${colors.green}--path <tool>=<path>${colors.reset}
      Specify custom installation path for a tool
      Example: node installer/cli.js --variant standard --tools claude --path claude=/custom/path

  ${colors.green}--silent, --non-interactive, --yes, -y${colors.reset}
      Run in silent mode (no prompts, auto-confirm all)
      Example: node installer/cli.js --variant standard --tools claude --silent

  ${colors.green}--config <file>${colors.reset}
      Load configuration from JSON file
      Example: node installer/cli.js --config install-config.json

${colors.bright}TOOLS:${colors.reset}
  ${colors.cyan}claude${colors.reset}     - Claude Code (AI-powered development assistant)
  ${colors.cyan}opencode${colors.reset}   - Opencode (CLI-optimized AI codegen tool)
  ${colors.cyan}ampcode${colors.reset}    - Ampcode (Amplified AI development accelerator)
  ${colors.cyan}droid${colors.reset}      - Droid (Android-focused AI development companion)

${colors.bright}VARIANTS:${colors.reset}
  ${colors.cyan}lite${colors.reset}       - Minimal setup (3 agents, 0 skills) - For CI/CD
  ${colors.cyan}standard${colors.reset}   - Standard setup (13 agents, 8 skills) - For most users
  ${colors.cyan}pro${colors.reset}        - Full setup (13 agents, 22 skills) - For advanced users

${colors.bright}EXAMPLES:${colors.reset}
  # Interactive installation (default)
  node installer/cli.js

  # Install Claude with Standard variant (non-interactive)
  node installer/cli.js --variant standard --tools claude

  # Install multiple tools with custom paths
  node installer/cli.js --variant pro --tools claude,opencode --path claude=~/.claude-custom

  # Uninstall a tool
  node installer/cli.js --uninstall claude

  # Silent installation for CI/CD
  node installer/cli.js --variant lite --tools claude --silent

${colors.bright}For more information, visit:${colors.reset}
  https://github.com/amrhas82/agentic-kit
`);
  }

  async run() {
    try {
      // Handle --help flag
      if (this.cliArgs.help) {
        this.showHelp();
        process.exit(0);
      }

      // Handle --uninstall flag
      if (this.cliArgs.uninstall) {
        await this.runUninstall(this.cliArgs.uninstall);
        process.exit(0);
      }

      // Handle --upgrade flag
      if (this.cliArgs.upgrade) {
        await this.runUpgrade(this.cliArgs.upgrade, this.cliArgs.upgradeVariant);
        process.exit(0);
      }

      // Handle --config flag
      if (this.cliArgs.config) {
        await this.loadConfig(this.cliArgs.config);
      }

      // Handle non-interactive mode
      if (this.cliArgs.variant && this.cliArgs.tools.length > 0) {
        await this.runNonInteractive();
        process.exit(0);
      }

      // Interactive mode
      this.showWelcome();

      // Check for interrupted installation
      const InstallationEngine = require('./installation-engine');
      const PathManager = require('./path-manager');
      const pathManager = new PathManager();
      const installationEngine = new InstallationEngine(pathManager, this.packageManager);

      const hasInterrupted = await installationEngine.hasInterruptedInstallation();

      if (hasInterrupted) {
        const shouldResume = await this.promptResume(installationEngine);

        if (shouldResume) {
          await this.resumeInstallation(installationEngine);
          return; // Exit after resume
        } else {
          // Clear state and start fresh
          await installationEngine.getStateManager().clearState();
          console.log(`${colors.yellow}Starting fresh installation...${colors.reset}\n`);
        }
      }

      // Normal installation flow
      await this.selectVariant();
      await this.selectTools();
      await this.configurePaths();
      await this.showSummary();
      await this.install();
    } catch (error) {
      await this.handleFatalError(error);
    } finally {
      this.rl.close();
    }
  }

  /**
   * Run uninstall command for a specific tool
   * Detects installation, prompts for confirmation, and executes uninstall
   *
   * @param {string} toolId - Tool to uninstall (claude, opencode, ampcode, droid)
   */
  async runUninstall(toolId) {
    console.log(`\n${colors.bright}${colors.cyan}Agentic Kit Uninstaller${colors.reset}\n`);

    // Validate tool ID
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) {
      console.log(`${colors.red}Error: Unknown tool '${toolId}'${colors.reset}`);
      console.log(`${colors.yellow}Available tools: ${this.tools.map(t => t.id).join(', ')}${colors.reset}\n`);
      process.exit(1);
    }

    // Detect installation at default path
    const os = require('os');
    const defaultPath = tool.path.startsWith('~')
      ? path.join(os.homedir(), tool.path.slice(1))
      : path.resolve(tool.path);

    // Check if manifest exists at default path
    const manifestPath = path.join(defaultPath, 'manifest.json');
    let targetPath = defaultPath;

    if (!fs.existsSync(manifestPath)) {
      console.log(`${colors.yellow}No installation found at default path: ${defaultPath}${colors.reset}\n`);

      // If not in silent mode, ask for custom path
      if (!this.cliArgs.silent) {
        const customPath = await this.askQuestion(
          `${colors.cyan}Enter installation path (or press Enter to cancel):${colors.reset} `,
          ''
        );

        if (!customPath) {
          console.log(`${colors.yellow}Uninstall cancelled${colors.reset}\n`);
          return;
        }

        targetPath = customPath.startsWith('~')
          ? path.join(os.homedir(), customPath.slice(1))
          : path.resolve(customPath);

        const customManifestPath = path.join(targetPath, 'manifest.json');
        if (!fs.existsSync(customManifestPath)) {
          console.log(`${colors.red}Error: No installation found at ${targetPath}${colors.reset}\n`);
          process.exit(1);
        }
      } else {
        console.log(`${colors.red}Error: No installation found at default path${colors.reset}\n`);
        process.exit(1);
      }
    }

    console.log(`${colors.bright}Tool:${colors.reset} ${tool.name}`);
    console.log(`${colors.bright}Path:${colors.reset} ${targetPath}\n`);

    // Initialize InstallationEngine
    const PathManager = require('./path-manager');
    const InstallationEngine = require('./installation-engine');
    const pathManager = new PathManager();
    const installationEngine = new InstallationEngine(pathManager, this.packageManager);

    try {
      // Read manifest to get file count
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const fileCount = manifest.installedFiles
        ? Object.values(manifest.installedFiles).reduce((sum, arr) => sum + arr.length, 0)
        : 0;

      // Confirmation prompt (unless in silent mode)
      if (!this.cliArgs.silent) {
        console.log(`${colors.yellow}This will remove ${fileCount} file(s) and create a backup.${colors.reset}\n`);

        const confirm = await this.askQuestion(
          `${colors.bright}Proceed with uninstallation? (y/N):${colors.reset} `,
          'n'
        );

        if (confirm.toLowerCase() !== 'y') {
          console.log(`${colors.yellow}Uninstall cancelled${colors.reset}\n`);
          return;
        }
      }

      console.log(`\n${colors.bright}Uninstalling ${tool.name}...${colors.reset}\n`);

      // Uninstall with progress callback
      const result = await installationEngine.uninstall(
        toolId,
        targetPath,
        null, // confirmCallback (already confirmed above)
        (progress) => {
          // Display progress
          const percentage = Math.round((progress.filesRemoved / progress.totalFiles) * 100);
          process.stdout.write(`\r${colors.cyan}Progress:${colors.reset} ${percentage}% (${progress.filesRemoved}/${progress.totalFiles} files removed)`);
        }
      );

      // Clear progress line
      process.stdout.write('\r' + ' '.repeat(80) + '\r');

      // Display results
      console.log(`${colors.green}✓ ${tool.name} uninstalled successfully${colors.reset}`);
      console.log(`${colors.cyan}Files removed:${colors.reset} ${result.filesRemoved}`);
      console.log(`${colors.cyan}Directories removed:${colors.reset} ${result.directoriesRemoved}`);
      console.log(`${colors.cyan}Backup created:${colors.reset} ${result.backupPath}\n`);

      if (result.warnings.length > 0) {
        console.log(`${colors.yellow}Warnings:${colors.reset}`);
        result.warnings.forEach(warning => {
          console.log(`  ${colors.yellow}⚠${colors.reset} ${warning.message}`);
        });
        console.log('');
      }

      if (result.errors.length > 0) {
        console.log(`${colors.red}Errors:${colors.reset}`);
        result.errors.forEach(error => {
          console.log(`  ${colors.red}✗${colors.reset} ${error.message}`);
        });
        console.log('');
      }

    } catch (error) {
      console.error(`\n${colors.red}✗ Uninstall failed: ${error.message}${colors.reset}\n`);
      process.exit(1);
    }
  }

  /**
   * Run upgrade/downgrade command for a specific tool
   * Changes the variant of an installed tool
   *
   * @param {string} toolId - Tool to upgrade (claude, opencode, ampcode, droid)
   * @param {string} newVariant - Target variant (lite, standard, pro)
   */
  async runUpgrade(toolId, newVariant) {
    console.log(`\n${colors.bright}${colors.cyan}Agentic Kit Variant Upgrade${colors.reset}\n`);

    // Validate tool ID
    const tool = this.tools.find(t => t.id === toolId);
    if (!tool) {
      console.log(`${colors.red}Error: Unknown tool '${toolId}'${colors.reset}`);
      console.log(`${colors.yellow}Available tools: ${this.tools.map(t => t.id).join(', ')}${colors.reset}\n`);
      process.exit(1);
    }

    // Validate variant
    const validVariants = ['lite', 'standard', 'pro'];
    if (!validVariants.includes(newVariant)) {
      console.log(`${colors.red}Error: Invalid variant '${newVariant}'${colors.reset}`);
      console.log(`${colors.yellow}Valid variants: ${validVariants.join(', ')}${colors.reset}\n`);
      process.exit(1);
    }

    // Detect installation at default path
    const os = require('os');
    const defaultPath = tool.path.startsWith('~')
      ? path.join(os.homedir(), tool.path.slice(1))
      : path.resolve(tool.path);

    // Check if manifest exists at default path
    const manifestPath = path.join(defaultPath, 'manifest.json');
    let targetPath = defaultPath;

    if (!fs.existsSync(manifestPath)) {
      console.log(`${colors.yellow}No installation found at default path: ${defaultPath}${colors.reset}\n`);

      // If not in silent mode, ask for custom path
      if (!this.cliArgs.silent) {
        const customPath = await this.askQuestion(
          `${colors.cyan}Enter installation path (or press Enter to cancel):${colors.reset} `,
          ''
        );

        if (!customPath) {
          console.log(`${colors.yellow}Upgrade cancelled${colors.reset}\n`);
          return;
        }

        targetPath = customPath.startsWith('~')
          ? path.join(os.homedir(), customPath.slice(1))
          : path.resolve(customPath);

        const customManifestPath = path.join(targetPath, 'manifest.json');
        if (!fs.existsSync(customManifestPath)) {
          console.log(`${colors.red}Error: No installation found at ${targetPath}${colors.reset}\n`);
          process.exit(1);
        }
      } else {
        console.log(`${colors.red}Error: No installation found at default path${colors.reset}\n`);
        process.exit(1);
      }
    }

    // Read current variant
    const manifest = JSON.parse(fs.readFileSync(path.join(targetPath, 'manifest.json'), 'utf8'));
    const currentVariant = manifest.variant;

    console.log(`${colors.bright}Tool:${colors.reset} ${tool.name}`);
    console.log(`${colors.bright}Current variant:${colors.reset} ${currentVariant}`);
    console.log(`${colors.bright}Target variant:${colors.reset} ${newVariant}`);
    console.log(`${colors.bright}Path:${colors.reset} ${targetPath}\n`);

    // Check if same variant
    if (currentVariant === newVariant) {
      console.log(`${colors.yellow}Already using variant: ${newVariant}${colors.reset}\n`);
      return;
    }

    // Initialize InstallationEngine
    const PathManager = require('./path-manager');
    const InstallationEngine = require('./installation-engine');
    const pathManager = new PathManager();
    const installationEngine = new InstallationEngine(pathManager, this.packageManager);

    try {
      // Confirmation callback (unless in silent mode)
      const confirmCallback = this.cliArgs.silent ? null : (data) => {
        return new Promise(async (resolve) => {
          const action = data.filesAdded > data.filesRemoved ? 'Upgrade' : 'Downgrade';
          console.log(`${colors.yellow}${action} Summary:${colors.reset}`);
          console.log(`  ${colors.green}+${data.filesAdded} file(s) to add${colors.reset}`);
          console.log(`  ${colors.red}-${data.filesRemoved} file(s) to remove${colors.reset}\n`);

          const confirm = await this.askQuestion(
            `${colors.bright}Proceed with ${action.toLowerCase()}? (y/N):${colors.reset} `,
            'n'
          );

          resolve(confirm.toLowerCase() === 'y');
        });
      };

      // Progress callback
      let lastStage = '';
      const progressCallback = (progress) => {
        if (progress.stage !== lastStage) {
          if (lastStage) {
            process.stdout.write('\n');
          }
          lastStage = progress.stage;

          const stageMessages = {
            reading_manifest: 'Reading current installation...',
            comparing_variants: 'Comparing variants...',
            creating_backup: 'Creating backup...',
            removing_files: `Removing ${progress.count || 0} file(s)...`,
            adding_files: `Adding ${progress.count || 0} file(s)...`,
            updating_manifest: 'Updating manifest...',
            verifying: 'Verifying installation...',
            complete: 'Complete!'
          };

          const message = stageMessages[progress.stage] || progress.stage;
          process.stdout.write(`${colors.cyan}${message}${colors.reset}`);
        }
      };

      console.log(`${colors.bright}Upgrading ${tool.name}...${colors.reset}\n`);

      // Execute upgrade
      const result = await installationEngine.upgradeVariant(
        toolId,
        newVariant,
        targetPath,
        confirmCallback,
        progressCallback
      );

      // Clear progress line
      process.stdout.write('\n\n');

      // Display results
      if (!result.success) {
        console.log(`${colors.red}✗ Upgrade failed: ${result.error}${colors.reset}\n`);
        process.exit(1);
      }

      const action = result.filesAdded > result.filesRemoved ? 'Upgrade' : 'Downgrade';
      console.log(`${colors.green}✓ ${tool.name} ${action.toLowerCase()}d successfully${colors.reset}`);
      console.log(`${colors.cyan}From variant:${colors.reset} ${result.fromVariant}`);
      console.log(`${colors.cyan}To variant:${colors.reset} ${result.toVariant}`);
      console.log(`${colors.cyan}Files added:${colors.reset} ${result.filesAdded}`);
      console.log(`${colors.cyan}Files removed:${colors.reset} ${result.filesRemoved}`);
      console.log(`${colors.cyan}Backup created:${colors.reset} ${result.backupPath}\n`);

      if (result.verification && !result.verification.valid) {
        console.log(`${colors.yellow}Warnings:${colors.reset}`);
        result.verification.issues.forEach(issue => {
          console.log(`  ${colors.yellow}⚠${colors.reset} ${issue.message}`);
        });
        console.log('');
      }

    } catch (error) {
      console.error(`\n${colors.red}✗ Upgrade failed: ${error.message}${colors.reset}\n`);
      process.exit(1);
    }
  }

  /**
   * Load configuration from JSON file
   * Used with --config flag
   *
   * @param {string} configPath - Path to configuration file
   */
  async loadConfig(configPath) {
    try {
      const configContent = await fs.promises.readFile(configPath, 'utf8');
      const config = JSON.parse(configContent);

      // Validate and apply configuration
      if (config.variant) {
        this.cliArgs.variant = config.variant;
      }

      if (config.tools && Array.isArray(config.tools)) {
        this.cliArgs.tools = config.tools;
      }

      if (config.paths && typeof config.paths === 'object') {
        this.cliArgs.paths = { ...this.cliArgs.paths, ...config.paths };
      }

      if (config.silent !== undefined) {
        this.cliArgs.silent = config.silent;
        this.cliArgs.nonInteractive = config.silent;
      }

      console.log(`${colors.green}✓ Configuration loaded from ${configPath}${colors.reset}\n`);

    } catch (error) {
      console.error(`${colors.red}Error loading configuration: ${error.message}${colors.reset}\n`);
      process.exit(1);
    }
  }

  /**
   * Run non-interactive installation
   * Uses command-line arguments instead of prompts
   */
  async runNonInteractive() {
    console.log(`\n${colors.bright}${colors.cyan}Agentic Kit Installer (Non-Interactive Mode)${colors.reset}\n`);

    // Validate variant
    const variant = this.cliArgs.variant;
    if (!['lite', 'standard', 'pro'].includes(variant)) {
      console.log(`${colors.red}Error: Invalid variant '${variant}'${colors.reset}`);
      console.log(`${colors.yellow}Valid variants: lite, standard, pro${colors.reset}\n`);
      process.exit(1);
    }

    // Validate tools
    const validTools = this.tools.map(t => t.id);
    const invalidTools = this.cliArgs.tools.filter(t => !validTools.includes(t));
    if (invalidTools.length > 0) {
      console.log(`${colors.red}Error: Invalid tool(s): ${invalidTools.join(', ')}${colors.reset}`);
      console.log(`${colors.yellow}Valid tools: ${validTools.join(', ')}${colors.reset}\n`);
      process.exit(1);
    }

    if (this.cliArgs.tools.length === 0) {
      console.log(`${colors.red}Error: At least one tool must be specified${colors.reset}\n`);
      process.exit(1);
    }

    // Set selections
    this.selections.variant = variant;
    this.selections.tools = this.cliArgs.tools;

    // Set paths (use custom paths or defaults)
    const os = require('os');
    for (const toolId of this.selections.tools) {
      const tool = this.tools.find(t => t.id === toolId);

      if (this.cliArgs.paths[toolId]) {
        this.selections.paths[toolId] = this.cliArgs.paths[toolId];
      } else {
        this.selections.paths[toolId] = tool.path;
      }
    }

    // Display summary
    const variantInfo = this.variants.find(v => v.id === variant);
    console.log(`${colors.bright}Installation Summary:${colors.reset}`);
    console.log(`${colors.cyan}Variant:${colors.reset} ${variantInfo.name} (${variantInfo.agents} agents, ${variantInfo.skills} skills)`);
    console.log(`${colors.cyan}Tools:${colors.reset} ${this.selections.tools.join(', ')}`);
    console.log('');

    for (const toolId of this.selections.tools) {
      const tool = this.tools.find(t => t.id === toolId);
      const isCustom = this.selections.paths[toolId] !== tool.path;
      console.log(`${colors.bright}${tool.name}${colors.reset}`);
      console.log(`  Path: ${this.selections.paths[toolId]}${isCustom ? ' (custom)' : ''}`);
    }
    console.log('');

    // Run installation
    try {
      await this.install();
    } catch (error) {
      console.error(`${colors.red}✗ Installation failed: ${error.message}${colors.reset}\n`);
      process.exit(1);
    }
  }

  /**
   * Handle fatal errors with detailed error messages and actionable advice
   * Categorizes errors and provides specific guidance for each type
   *
   * @param {Error} error - The error that occurred
   */
  async handleFatalError(error) {
    console.log(''); // Add spacing

    // Categorize the error and provide appropriate guidance
    const errorInfo = this.categorizeError(error);

    console.log(`${colors.red}${colors.bright}✗ Installation Failed${colors.reset}`);
    console.log(`${colors.red}${'─'.repeat(60)}${colors.reset}\n`);

    console.log(`${colors.bright}Error Type:${colors.reset} ${errorInfo.type}`);
    console.log(`${colors.bright}Message:${colors.reset} ${error.message}\n`);

    if (errorInfo.advice.length > 0) {
      console.log(`${colors.yellow}${colors.bright}Suggested Actions:${colors.reset}`);
      errorInfo.advice.forEach((advice, index) => {
        console.log(`  ${index + 1}. ${advice}`);
      });
      console.log('');
    }

    // Display additional technical details if available
    if (errorInfo.technicalDetails) {
      console.log(`${colors.cyan}Technical Details:${colors.reset}`);
      console.log(`  ${errorInfo.technicalDetails}\n`);
    }

    // Exit with error code
    process.exit(1);
  }

  /**
   * Categorize errors and provide actionable advice
   *
   * @param {Error} error - The error to categorize
   * @returns {object} Object with type, advice array, and technical details
   */
  categorizeError(error) {
    const message = error.message.toLowerCase();
    const code = error.code;

    // Permission errors
    if (code === 'EACCES' || code === 'EPERM' || message.includes('permission denied')) {
      return {
        type: 'Permission Error',
        advice: [
          'Try running the installer with elevated permissions: sudo node installer/cli.js',
          'Or choose a different installation directory where you have write access',
          'Check directory permissions: ls -la on the parent directory'
        ],
        technicalDetails: `Error code: ${code || 'EACCES'}`
      };
    }

    // Disk space errors
    if (code === 'ENOSPC' || message.includes('no space') || message.includes('disk space')) {
      return {
        type: 'Disk Space Error',
        advice: [
          'Free up disk space by removing unnecessary files',
          'Check available space: df -h',
          'Consider installing to a different location with more space',
          'The installer requires at least 50MB of free space'
        ],
        technicalDetails: 'Installation requires approximately 10MB per tool'
      };
    }

    // Network errors (if applicable)
    if (code === 'ENOTFOUND' || code === 'ETIMEDOUT' || message.includes('network') || message.includes('connection')) {
      return {
        type: 'Network Error',
        advice: [
          'Check your internet connection',
          'Verify proxy settings if behind a corporate firewall',
          'Try again in a few moments',
          'Use offline installation mode if available'
        ],
        technicalDetails: `Network error code: ${code || 'UNKNOWN'}`
      };
    }

    // File not found / missing package errors
    if (code === 'ENOENT' || message.includes('no such file') || message.includes('not found') || message.includes('invalid package')) {
      return {
        type: 'Missing Package Error',
        advice: [
          'Ensure agentic-kit is properly installed: npm install -g @amrhas82/agentic-kit',
          'Verify the packages directory exists and contains required files',
          'Try reinstalling agentic-kit: npm uninstall -g @amrhas82/agentic-kit && npm install -g @amrhas82/agentic-kit',
          'Check that you are running the installer from the correct directory'
        ],
        technicalDetails: `Missing file or package validation failed`
      };
    }

    // Path validation errors (check before invalid input errors)
    if (message.includes('path') && (message.includes('invalid') || message.includes('absolute') || message.includes('must be absolute'))) {
      return {
        type: 'Path Validation Error',
        advice: [
          'Ensure the path is absolute (starts with / or ~)',
          'Verify the parent directory exists',
          'Check that you have write permissions for the specified path',
          'Use default paths if custom paths are causing issues'
        ],
        technicalDetails: 'Paths must be absolute and writable'
      };
    }

    // Invalid input errors
    if (message.includes('invalid') || message.includes('must be') || message.includes('required')) {
      return {
        type: 'Invalid Input Error',
        advice: [
          'Review your selections and ensure all required options are provided',
          'At least one tool must be selected',
          'Paths must be absolute (start with / or ~)',
          'Restart the installer and try again'
        ],
        technicalDetails: error.message
      };
    }

    // Installation failures (general)
    if (message.includes('install') || message.includes('copy') || message.includes('failed')) {
      return {
        type: 'Installation Error',
        advice: [
          'Check available disk space: df -h',
          'Verify write permissions on the target directory',
          'Ensure no other process is using the installation directory',
          'Try installing to a different location',
          'Review the installation log at ~/.agentic-kit-install.log for details'
        ],
        technicalDetails: 'Installation process encountered an error during file operations'
      };
    }

    // Generic error
    return {
      type: 'Unknown Error',
      advice: [
        'Try running the installer again',
        'Check system logs for more details',
        'Report this issue at: https://github.com/amrhas82/agentic-kit/issues',
        'Include the error message and your system information (OS, Node version)'
      ],
      technicalDetails: error.stack ? error.stack.split('\n')[1] : 'No additional details'
    };
  }

  /**
   * Offer recovery options when an installation fails
   * Allows user to continue with remaining tools or cancel
   *
   * @param {string} failedTool - Name of the tool that failed
   * @param {number} currentIndex - Current tool index (1-based)
   * @param {number} totalTools - Total number of tools
   * @returns {Promise<boolean>} True to continue, false to cancel
   */
  async offerRecoveryOptions(failedTool, currentIndex, totalTools) {
    const remainingTools = totalTools - currentIndex;

    console.log(`${colors.yellow}┌─────────────────────────────────────────────────────────────┐${colors.reset}`);
    console.log(`${colors.yellow}│ Installation Failure - Recovery Options                    │${colors.reset}`);
    console.log(`${colors.yellow}└─────────────────────────────────────────────────────────────┘${colors.reset}\n`);

    console.log(`${colors.bright}Status:${colors.reset} ${failedTool} installation failed`);
    console.log(`${colors.bright}Remaining:${colors.reset} ${remainingTools} tool${remainingTools > 1 ? 's' : ''} to install\n`);

    // In silent mode, auto-continue with remaining tools
    if (this.cliArgs.silent) {
      console.log(`${colors.yellow}Silent mode: auto-continuing with remaining tools${colors.reset}\n`);
      console.log(`${colors.yellow}Note:${colors.reset} The failed installation has been rolled back automatically.`);
      console.log(`${colors.yellow}No partial files remain for ${failedTool}.${colors.reset}\n`);
      return true;
    }

    console.log(`${colors.cyan}Options:${colors.reset}`);
    console.log(`  ${colors.green}C${colors.reset} - Continue with remaining tools (recommended)`);
    console.log(`  ${colors.red}Q${colors.reset} - Quit installation (successful installations will be kept)\n`);

    console.log(`${colors.yellow}Note:${colors.reset} The failed installation has been rolled back automatically.`);
    console.log(`${colors.yellow}No partial files remain for ${failedTool}.${colors.reset}\n`);

    const answer = await this.askQuestion(
      `${colors.bright}Choose an option (C/Q):${colors.reset} `,
      'C'
    );

    const choice = answer.toUpperCase();

    if (choice === 'C' || choice === '') {
      console.log(`${colors.green}Continuing with remaining tools...${colors.reset}\n`);
      return true;
    } else if (choice === 'Q') {
      return false;
    } else {
      // Invalid choice, ask again
      console.log(`${colors.red}Invalid choice. Please enter C or Q.${colors.reset}\n`);
      return this.offerRecoveryOptions(failedTool, currentIndex, totalTools);
    }
  }

  /**
   * Prompt user to resume interrupted installation
   * Shows summary of previous installation progress
   *
   * @param {InstallationEngine} installationEngine - Installation engine instance
   * @returns {Promise<boolean>} - True if user wants to resume, false otherwise
   */
  async promptResume(installationEngine) {
    const summary = await installationEngine.getResumeSummary();

    if (!summary) {
      return false;
    }

    console.clear();
    console.log(`\n${colors.yellow}${colors.bright}Previous Installation Detected${colors.reset}`);
    console.log(`${colors.yellow}${'─'.repeat(60)}${colors.reset}\n`);

    // Format timestamp
    const startedAt = new Date(summary.startedAt);
    const lastUpdated = new Date(summary.lastUpdated);
    const timeDiff = Math.floor((lastUpdated - startedAt) / 1000 / 60);

    console.log(`${colors.cyan}Session ID:${colors.reset} ${summary.sessionId}`);
    console.log(`${colors.cyan}Started:${colors.reset} ${startedAt.toLocaleString()}`);
    console.log(`${colors.cyan}Last Updated:${colors.reset} ${lastUpdated.toLocaleString()} (${timeDiff} min ago)`);
    console.log(`${colors.cyan}Variant:${colors.reset} ${summary.variant}`);
    console.log('');

    // Show progress
    console.log(`${colors.bright}Progress:${colors.reset}`);
    console.log(`  Tools: ${summary.completedTools}/${summary.totalTools} completed`);

    if (summary.completedToolsList.length > 0) {
      console.log(`\n${colors.green}Completed:${colors.reset}`);
      summary.completedToolsList.forEach(toolId => {
        console.log(`  ${colors.green}✓${colors.reset} ${toolId}`);
      });
    }

    if (summary.failedToolsList.length > 0) {
      console.log(`\n${colors.red}Failed:${colors.reset}`);
      summary.failedToolsList.forEach(toolId => {
        console.log(`  ${colors.red}✗${colors.reset} ${toolId}`);
      });
    }

    if (summary.currentTool) {
      console.log(`\n${colors.yellow}Current Tool:${colors.reset} ${summary.currentTool}`);
      const progress = summary.currentToolProgress;
      if (progress.totalFiles > 0) {
        console.log(`  Progress: ${progress.filesCompleted}/${progress.totalFiles} files (${progress.percentComplete}%)`);
      }
    }

    console.log('');
    console.log(`${colors.bright}Would you like to resume this installation?${colors.reset}`);
    console.log(`  ${colors.green}Y${colors.reset} - Resume from where it left off`);
    console.log(`  ${colors.yellow}N${colors.reset} - Start fresh (previous state will be cleared)\n`);

    const answer = await this.askQuestion(
      `${colors.bright}Resume installation? (Y/n):${colors.reset} `,
      'Y'
    );

    return answer.toLowerCase() !== 'n';
  }

  /**
   * Resume interrupted installation
   * Uses saved state to continue from where it left off
   *
   * @param {InstallationEngine} installationEngine - Installation engine instance with loaded state
   */
  async resumeInstallation(installationEngine) {
    const state = installationEngine.getStateManager().getState();

    if (!state) {
      console.log(`${colors.red}Error: Could not load installation state${colors.reset}`);
      return;
    }

    console.log(`\n${colors.bright}${colors.green}Resuming installation...${colors.reset}\n`);

    // Restore selections from state
    this.selections.variant = state.variant;
    this.selections.tools = state.tools;
    this.selections.paths = state.paths;

    // Use installMultipleTools with resume flag
    try {
      const results = await installationEngine.installMultipleTools(
        state.variant,
        state.tools,
        state.paths,
        (progress) => {
          // Progress callback (same as normal installation)
          this.drawProgressBar(
            progress.filesCompleted,
            progress.totalFiles,
            progress.percentage,
            progress.currentFile,
            this.formatBytes(progress.bytesTransferred),
            this.formatBytes(progress.totalBytes),
            this.formatBytes(progress.bytesTransferred / ((Date.now() - Date.now()) / 1000 || 1)) + '/s',
            '0:00',
            '0:00'
          );
        },
        true // resume = true
      );

      // Display results
      console.log(`\n${colors.bright}Installation Complete${colors.reset}\n`);

      if (results.successful.length > 0) {
        console.log(`${colors.green}Successfully installed:${colors.reset}`);
        results.successful.forEach(toolId => {
          console.log(`  ${colors.green}✓${colors.reset} ${toolId}`);
        });
      }

      if (results.skipped.length > 0) {
        console.log(`\n${colors.yellow}Skipped (already completed):${colors.reset}`);
        results.skipped.forEach(toolId => {
          console.log(`  ${colors.yellow}○${colors.reset} ${toolId}`);
        });
      }

      if (results.failed.length > 0) {
        console.log(`\n${colors.red}Failed:${colors.reset}`);
        results.failed.forEach(failure => {
          console.log(`  ${colors.red}✗${colors.reset} ${failure.toolId}: ${failure.error}`);
        });
      }

    } catch (error) {
      console.error(`${colors.red}Resume failed: ${error.message}${colors.reset}`);
      throw error;
    }
  }

  showWelcome() {
    console.clear();
    console.log(`
${colors.bright}${colors.cyan}┌─────────────────────────────────────────────────────────────┐${colors.reset}
${colors.bright}${colors.cyan}│              Agentic Kit Installer v1.1.0                    │${colors.reset}
${colors.bright}${colors.cyan}│         Multi-Tool AI Development Kit Installer               │${colors.reset}
${colors.bright}${colors.cyan}└─────────────────────────────────────────────────────────────┘${colors.reset}

${colors.bright}This installer will set up AI development tools for:${colors.reset}
• Claude Code • Opencode • Ampcode • Droid

${colors.yellow}Press Enter to begin or Ctrl+C to exit${colors.reset}
    `);

    return new Promise(resolve => {
      this.rl.question('', resolve);
    });
  }
  
  async selectVariant() {
    console.log(`\n${colors.bright}Step 1/4 — Choose Package Variant${colors.reset}\n`);
    
    console.log('┌─────────────┬─────────┬─────────┬─────────────────────────────┐');
    console.log('│ Variant     │ Agents  │ Skills  │ Description                 │');
    console.log('├─────────────┼─────────┼─────────┼─────────────────────────────┤');
    
    this.variants.forEach((variant, index) => {
      const selected = index === 1 ? '●' : '○';
      const color = index === 1 ? colors.blue : colors.reset;
      console.log(`│ ${selected} ${color}${variant.name.padEnd(10)}${colors.reset} │ ${variant.agents.toString().padEnd(7)} │ ${variant.skills.toString().padEnd(7)} │ ${variant.description.padEnd(27)} │`);
    });
    
    console.log('└─────────────┴─────────┴─────────┴─────────────────────────────┘');
    console.log('\nUse arrow keys to navigate, Enter to select');
    
    // Default to Standard
    this.selections.variant = 'standard';
    
    return new Promise(resolve => {
      this.rl.question('\nPress Enter to continue (default: Standard)', (answer) => {
        if (answer && ['lite', 'standard', 'pro'].includes(answer.toLowerCase())) {
          this.selections.variant = answer.toLowerCase();
        }
        resolve();
      });
    });
  }
  
  async selectTools() {
    console.log(`\n${colors.bright}Step 2/4 — Choose Tools (Minimum 1 required)${colors.reset}\n`);

    console.log(`${colors.cyan}Available Tools:${colors.reset}\n`);

    // Display each tool with detailed information
    this.tools.forEach((tool, index) => {
      const num = index + 1;
      console.log(`${colors.bright}${num}. ${tool.name}${colors.reset}`);
      console.log(`   ${colors.cyan}Description:${colors.reset} ${tool.description}`);
      console.log(`   ${colors.cyan}Best for:${colors.reset} ${tool.useCase}`);
      console.log(`   ${colors.cyan}Target Users:${colors.reset} ${tool.targetUsers}`);
      console.log(`   ${colors.cyan}Default Path:${colors.reset} ${tool.path}`);
      console.log('');
    });

    console.log(`${colors.yellow}Select tools by entering IDs separated by spaces${colors.reset}`);
    console.log(`${colors.yellow}Examples:${colors.reset}`);
    console.log(`  "claude"                 - Install Claude Code only`);
    console.log(`  "claude opencode"        - Install Claude Code and Opencode`);
    console.log(`  "claude opencode ampcode droid" - Install all tools`);

    return new Promise(resolve => {
      this.rl.question(`\n${colors.bright}Select tools:${colors.reset} `, (answer) => {
        if (answer.trim()) {
          const selected = answer.toLowerCase().split(/\s+/);
          this.selections.tools = selected.filter(id =>
            this.tools.some(tool => tool.id === id)
          );

          // Show invalid tool IDs if any
          const invalid = selected.filter(id =>
            !this.tools.some(tool => tool.id === id)
          );
          if (invalid.length > 0) {
            console.log(`${colors.yellow}Warning: Unrecognized tool IDs ignored: ${invalid.join(', ')}${colors.reset}`);
          }
        }

        if (this.selections.tools.length === 0) {
          console.log(`${colors.red}Error: At least one tool must be selected${colors.reset}`);
          console.log(`${colors.yellow}Valid tool IDs: ${this.tools.map(t => t.id).join(', ')}${colors.reset}\n`);
          throw new Error('At least one tool must be selected');
        }

        // Show selection summary
        console.log(`\n${colors.green}Selected ${this.selections.tools.length}/${this.tools.length} tools:${colors.reset}`);
        this.selections.tools.forEach(id => {
          const tool = this.tools.find(t => t.id === id);
          console.log(`  ${colors.green}✓${colors.reset} ${tool.name}`);
        });

        resolve();
      });
    });
  }
  
  async configurePaths() {
    console.log(`\n${colors.bright}Step 3/4 — Path Configuration${colors.reset}\n`);

    console.log('Default installation paths for selected tools:\n');

    for (const toolId of this.selections.tools) {
      const tool = this.tools.find(t => t.id === toolId);
      console.log(`${colors.bright}${tool.name}${colors.reset}`);
      console.log(`${colors.cyan}Default path:${colors.reset} ${tool.path}`);

      const customPath = await this.askQuestion(
        `Enter path (or press Enter for default): `,
        tool.path
      );

      // Detect custom path
      if (customPath !== tool.path) {
        // Show custom path confirmation dialog
        const confirmed = await this.showCustomPathConfirmation(tool, customPath);

        if (confirmed) {
          this.selections.paths[toolId] = customPath;
          console.log(`${colors.green}✓ Using custom path: ${customPath}${colors.reset}\n`);
        } else {
          this.selections.paths[toolId] = tool.path;
          console.log(`${colors.blue}Using default path: ${tool.path}${colors.reset}\n`);
        }
      } else {
        this.selections.paths[toolId] = tool.path;
        console.log(`${colors.green}✓ Using default path${colors.reset}\n`);
      }
    }
  }

  async showCustomPathConfirmation(tool, customPath) {
    console.log(`\n${colors.yellow}┌─────────────────────────────────────────────────────────────┐${colors.reset}`);
    console.log(`${colors.yellow}│ Custom Path Confirmation                                    │${colors.reset}`);
    console.log(`${colors.yellow}└─────────────────────────────────────────────────────────────┘${colors.reset}\n`);

    console.log(`${colors.bright}Tool:${colors.reset} ${tool.name}`);
    console.log(`${colors.bright}Proposed custom path:${colors.reset} ${customPath}`);
    console.log(`${colors.bright}Default path:${colors.reset} ${tool.path}\n`);

    // Validate the custom path
    const validation = this.validatePath(customPath);

    // Display validation results
    console.log(`${colors.cyan}Validation Results:${colors.reset}`);

    if (validation.valid) {
      console.log(`${colors.green}✓ Path is valid${colors.reset}`);
      if (validation.parentExists) {
        console.log(`${colors.green}✓ Parent directory exists${colors.reset}`);
      }
      if (validation.hasPermission) {
        console.log(`${colors.green}✓ Write permission available${colors.reset}`);
      }
      if (validation.hasDiskSpace) {
        console.log(`${colors.green}✓ Sufficient disk space${colors.reset}`);
      }
    } else {
      // Show validation warnings/errors
      validation.issues.forEach(issue => {
        const icon = issue.severity === 'error' ? '✗' : '⚠';
        const color = issue.severity === 'error' ? colors.red : colors.yellow;
        console.log(`${color}${icon} ${issue.message}${colors.reset}`);
      });
    }

    console.log('');

    // Require explicit confirmation
    if (!validation.valid && validation.issues.some(i => i.severity === 'error')) {
      console.log(`${colors.red}Cannot use this path due to validation errors${colors.reset}`);
      console.log(`${colors.yellow}Press Enter to use default path instead${colors.reset}`);
      await this.askQuestion('');
      return false;
    }

    // Ask for confirmation
    const answer = await this.askQuestion(
      `${colors.bright}Confirm custom path? (y/N):${colors.reset} `,
      'n'
    );

    return answer.toLowerCase() === 'y';
  }

  validatePath(customPath) {
    const result = {
      valid: true,
      issues: [],
      parentExists: false,
      hasPermission: false,
      hasDiskSpace: false
    };

    // Expand tilde to home directory
    const expandedPath = customPath.startsWith('~')
      ? path.join(require('os').homedir(), customPath.slice(1))
      : path.resolve(customPath);

    try {
      // Check if path is absolute or can be resolved
      if (!path.isAbsolute(expandedPath)) {
        result.issues.push({
          severity: 'error',
          message: 'Path must be absolute'
        });
        result.valid = false;
      }

      // Check parent directory exists
      const parentDir = path.dirname(expandedPath);
      if (fs.existsSync(parentDir)) {
        result.parentExists = true;

        // Check write permission on parent directory
        try {
          fs.accessSync(parentDir, fs.constants.W_OK);
          result.hasPermission = true;
        } catch (err) {
          result.issues.push({
            severity: 'error',
            message: 'No write permission for parent directory'
          });
          result.valid = false;
        }

        // Check disk space (require at least 50MB free)
        try {
          const stats = fs.statfsSync ? fs.statfsSync(parentDir) : null;
          if (stats) {
            const availableSpace = stats.bavail * stats.bsize;
            const requiredSpace = 50 * 1024 * 1024; // 50MB

            if (availableSpace >= requiredSpace) {
              result.hasDiskSpace = true;
            } else {
              result.issues.push({
                severity: 'warning',
                message: `Low disk space (${Math.round(availableSpace / 1024 / 1024)}MB available, 50MB recommended)`
              });
            }
          } else {
            // Cannot check disk space on this platform
            result.hasDiskSpace = true; // Assume OK
          }
        } catch (err) {
          // Disk space check failed, but don't block installation
          result.hasDiskSpace = true; // Assume OK
        }
      } else {
        result.issues.push({
          severity: 'warning',
          message: 'Parent directory does not exist (will be created)'
        });
        // Still allow installation if parent can be created
        result.parentExists = false;
        result.hasPermission = true; // Assume OK if we can check grandparent
        result.hasDiskSpace = true; // Assume OK
      }

      // Check if path already exists
      if (fs.existsSync(expandedPath)) {
        result.issues.push({
          severity: 'warning',
          message: 'Path already exists (files may be overwritten)'
        });
      }

    } catch (err) {
      result.issues.push({
        severity: 'error',
        message: `Path validation error: ${err.message}`
      });
      result.valid = false;
    }

    return result;
  }
  
  async showSummary() {
    console.log(`\n${colors.bright}Step 4/4 — Installation Summary${colors.reset}\n`);

    const variant = this.variants.find(v => v.id === this.selections.variant);
    console.log(`Package: ${variant.name} (${variant.agents} agents, ${variant.skills} skills)`);
    console.log(`Tools: ${this.selections.tools.map(id =>
      this.tools.find(t => t.id === id).name
    ).join(', ')}\n`);

    console.log('Installation Details:');
    console.log('┌─────────────┬──────────────────┬──────────┬─────────────┐');
    console.log('│ Tool        │ Path             │ Files    │ Size        │');
    console.log('├─────────────┼──────────────────┼──────────┼─────────────┤');

    // Collect actual file counts and sizes for each tool
    let totalFiles = 0;
    let totalBytes = 0;
    const toolData = [];

    for (const toolId of this.selections.tools) {
      const tool = this.tools.find(t => t.id === toolId);
      const installPath = this.selections.paths[toolId];
      const isCustom = installPath !== tool.path;

      try {
        // Get actual package contents and size from PackageManager
        const contents = await this.packageManager.getPackageContents(toolId, this.selections.variant);
        const sizeInfo = await this.packageManager.getPackageSize(toolId, this.selections.variant);

        toolData.push({
          tool,
          path: installPath,
          isCustom,
          fileCount: contents.totalFiles,
          size: sizeInfo.formattedSize
        });

        totalFiles += contents.totalFiles;
        totalBytes += sizeInfo.size;
      } catch (error) {
        // If package data not available, show placeholder
        toolData.push({
          tool,
          path: installPath,
          isCustom,
          fileCount: 'N/A',
          size: 'N/A'
        });
      }
    }

    // Display tool rows with actual data
    for (const data of toolData) {
      const pathDisplay = data.isCustom ? `${data.path} *` : data.path;

      // Format file count and size for display
      const fileCountStr = typeof data.fileCount === 'number' ? `${data.fileCount}` : data.fileCount;
      const sizeStr = data.size;

      console.log(`│ ${data.tool.name.padEnd(11)} │ ${pathDisplay.padEnd(16)} │ ${fileCountStr.padEnd(8)} │ ${sizeStr.padEnd(11)} │`);
    }

    console.log('└─────────────┴──────────────────┴──────────┴─────────────┘');

    // Show custom path footnote if applicable
    if (toolData.some(d => d.isCustom)) {
      console.log('\n* Custom path specified');
    }

    // Show totals if we have data
    if (totalFiles > 0) {
      // Format total size
      const totalSizeFormatted = this.formatBytes(totalBytes);
      console.log(`\n${colors.cyan}Total:${colors.reset} ${totalFiles} files, ${totalSizeFormatted}`);
    }

    console.log('\nPress Enter to install or Esc to cancel');

    return new Promise(resolve => {
      this.rl.question('', resolve);
    });
  }

  /**
   * Format bytes to human-readable size (helper method for summary display)
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size string (e.g., "8.39 MB")
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get PackageManager instance (for testing and internal use)
   * @returns {PackageManager} Package manager instance
   */
  getPackageManager() {
    return this.packageManager;
  }

  /**
   * Perform pre-installation checks to catch potential issues early
   * Validates packages, paths, permissions, and disk space
   *
   * @returns {Promise<object>} Object with success flag, errors array, and warnings array
   */
  async performPreInstallationChecks() {
    const errors = [];
    const warnings = [];
    const os = require('os');

    // Check Node.js version (require 14+)
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (majorVersion < 14) {
      errors.push(`Node.js version ${nodeVersion} is too old. Please upgrade to Node.js 14 or higher.`);
    }

    // Validate each selected tool's package
    for (const toolId of this.selections.tools) {
      try {
        const validation = await this.packageManager.validatePackage(toolId, this.selections.variant);
        if (!validation.valid) {
          errors.push(`Package validation failed for ${toolId}: ${validation.error}`);
        }
      } catch (error) {
        errors.push(`Cannot validate package for ${toolId}: ${error.message}`);
      }
    }

    // Validate all installation paths
    for (const toolId of this.selections.tools) {
      const targetPath = this.selections.paths[toolId];
      const expandedPath = targetPath.startsWith('~')
        ? path.join(os.homedir(), targetPath.slice(1))
        : path.resolve(targetPath);

      // Check parent directory write permissions
      const parentDir = path.dirname(expandedPath);
      try {
        if (fs.existsSync(parentDir)) {
          fs.accessSync(parentDir, fs.constants.W_OK);
        } else {
          // Check if we can create parent directory
          const grandParentDir = path.dirname(parentDir);
          if (fs.existsSync(grandParentDir)) {
            fs.accessSync(grandParentDir, fs.constants.W_OK);
          } else {
            errors.push(`Cannot create installation path for ${toolId}: parent directories do not exist`);
          }
        }
      } catch (error) {
        errors.push(`No write permission for ${toolId} installation path: ${targetPath}`);
      }

      // Check if path already exists and has content
      if (fs.existsSync(expandedPath)) {
        try {
          const files = fs.readdirSync(expandedPath);
          if (files.length > 0) {
            warnings.push(`${toolId} installation path already exists and contains ${files.length} file(s). Existing installation will be backed up.`);
          }
        } catch (error) {
          warnings.push(`Cannot read existing installation directory for ${toolId}`);
        }
      }
    }

    // Check available disk space
    try {
      // Calculate total required space for all selected tools
      let totalRequiredSpace = 0;
      for (const toolId of this.selections.tools) {
        try {
          const sizeInfo = await this.packageManager.getPackageSize(toolId, this.selections.variant);
          totalRequiredSpace += sizeInfo.size;
        } catch (error) {
          // Skip if we can't determine size
        }
      }

      // Check disk space on home directory
      const homeDir = os.homedir();
      if (fs.statfsSync) {
        const stats = fs.statfsSync(homeDir);
        const availableSpace = stats.bavail * stats.bsize;
        const requiredSpace = totalRequiredSpace * 1.5; // 50% buffer for safety

        if (availableSpace < requiredSpace) {
          const availableMB = Math.round(availableSpace / 1024 / 1024);
          const requiredMB = Math.round(requiredSpace / 1024 / 1024);
          errors.push(`Insufficient disk space: ${availableMB}MB available, ${requiredMB}MB required`);
        } else if (availableSpace < totalRequiredSpace * 2) {
          const availableMB = Math.round(availableSpace / 1024 / 1024);
          warnings.push(`Low disk space: ${availableMB}MB available. Consider freeing up space.`);
        }
      }
    } catch (error) {
      // Disk space check not available on this platform
      warnings.push('Could not check disk space (platform limitation)');
    }

    // Check for conflicting installations
    for (const toolId of this.selections.tools) {
      const targetPath = this.selections.paths[toolId];
      const expandedPath = targetPath.startsWith('~')
        ? path.join(os.homedir(), targetPath.slice(1))
        : path.resolve(targetPath);

      const manifestPath = path.join(expandedPath, 'manifest.json');
      if (fs.existsSync(manifestPath)) {
        try {
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          if (manifest.tool !== toolId) {
            warnings.push(`Path ${targetPath} contains a different tool (${manifest.tool}). This may cause conflicts.`);
          }
        } catch (error) {
          warnings.push(`Cannot read existing manifest at ${targetPath}`);
        }
      }
    }

    return {
      success: errors.length === 0,
      errors,
      warnings
    };
  }

  async install() {
    console.log(`\n${colors.bright}Installing ${this.selections.variant} package...${colors.reset}\n`);

    // Perform pre-installation checks
    console.log(`${colors.cyan}Performing pre-installation checks...${colors.reset}`);
    const preCheckResult = await this.performPreInstallationChecks();

    if (!preCheckResult.success) {
      console.log(`\n${colors.red}Pre-installation checks failed:${colors.reset}`);
      preCheckResult.errors.forEach(error => {
        console.log(`  ${colors.red}✗${colors.reset} ${error}`);
      });

      if (preCheckResult.warnings.length > 0) {
        console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
        preCheckResult.warnings.forEach(warning => {
          console.log(`  ${colors.yellow}⚠${colors.reset} ${warning}`);
        });
      }

      throw new Error('Pre-installation checks failed. Please resolve the issues above and try again.');
    }

    if (preCheckResult.warnings.length > 0) {
      console.log(`${colors.yellow}Warnings detected:${colors.reset}`);
      preCheckResult.warnings.forEach(warning => {
        console.log(`  ${colors.yellow}⚠${colors.reset} ${warning}`);
      });

      // In silent mode, auto-proceed with warnings
      if (!this.cliArgs.silent) {
        const proceed = await this.askQuestion(
          `\n${colors.bright}Continue despite warnings? (Y/n):${colors.reset} `,
          'Y'
        );

        if (proceed.toLowerCase() === 'n') {
          throw new Error('Installation cancelled by user due to warnings');
        }
      } else {
        console.log(`${colors.yellow}Silent mode: auto-proceeding despite warnings${colors.reset}`);
      }
    }

    console.log(`${colors.green}✓ Pre-installation checks passed${colors.reset}\n`);

    // Initialize InstallationEngine
    const PathManager = require('./path-manager');
    const InstallationEngine = require('./installation-engine');

    const pathManager = new PathManager();
    const installationEngine = new InstallationEngine(pathManager, this.packageManager);

    // Initialize state management for resume capability
    installationEngine.getStateManager().initializeState(
      this.selections.variant,
      this.selections.tools,
      this.selections.paths
    );
    await installationEngine.getStateManager().saveState({ stage: 'initializing' });

    // Track overall progress
    let overallFilesCompleted = 0;
    let overallTotalFiles = 0;
    let successfulInstalls = [];
    let failedInstalls = [];
    let verificationResults = [];

    // Calculate total files across all tools (only for valid tools)
    const toolFileCount = {};
    for (const toolId of this.selections.tools) {
      try {
        const contents = await this.packageManager.getPackageContents(toolId, this.selections.variant);
        toolFileCount[toolId] = contents.totalFiles;
        overallTotalFiles += contents.totalFiles;
      } catch (error) {
        // Skip tools that don't have valid packages
        toolFileCount[toolId] = 0;
      }
    }

    const startTime = Date.now();

    // Install each selected tool
    for (let i = 0; i < this.selections.tools.length; i++) {
      const toolId = this.selections.tools[i];
      const tool = this.tools.find(t => t.id === toolId);
      const targetPath = this.selections.paths[toolId];

      console.log(`\n${colors.bright}[${i + 1}/${this.selections.tools.length}] Installing ${tool.name}...${colors.reset}`);
      console.log(`${colors.cyan}Target:${colors.reset} ${targetPath}\n`);

      // Track files completed for this tool
      let toolFilesCompleted = 0;
      let toolStartTime = Date.now();

      try {
        // Install with progress callback
        await installationEngine.installPackage(
          toolId,
          this.selections.variant,
          targetPath,
          (progress) => {
            // Update tool files completed (only count new files)
            if (progress.filesCompleted > toolFilesCompleted) {
              const newFiles = progress.filesCompleted - toolFilesCompleted;
              overallFilesCompleted += newFiles;
              toolFilesCompleted = progress.filesCompleted;
            }

            // Calculate elapsed time and speed
            const elapsedMs = Date.now() - toolStartTime;
            const elapsedSec = Math.floor(elapsedMs / 1000);
            const elapsedMin = Math.floor(elapsedSec / 60);
            const elapsedSecRemainder = elapsedSec % 60;
            const elapsedFormatted = `${elapsedMin}:${elapsedSecRemainder.toString().padStart(2, '0')}`;

            // Calculate transfer speed (bytes per second)
            const speed = elapsedMs > 0 ? progress.bytesTransferred / (elapsedMs / 1000) : 0;
            const speedFormatted = this.formatBytes(speed);

            // Calculate ETA
            const remainingBytes = progress.totalBytes - progress.bytesTransferred;
            const etaSec = speed > 0 ? Math.floor(remainingBytes / speed) : 0;
            const etaMin = Math.floor(etaSec / 60);
            const etaSecRemainder = etaSec % 60;
            const etaFormatted = `${etaMin}:${etaSecRemainder.toString().padStart(2, '0')}`;

            // Draw progress bar for current tool
            this.drawProgressBar(
              progress.filesCompleted,
              progress.totalFiles,
              progress.percentage,
              progress.currentFile,
              this.formatBytes(progress.bytesTransferred),
              this.formatBytes(progress.totalBytes),
              speedFormatted,
              elapsedFormatted,
              etaFormatted
            );

            // Draw overall progress
            // Cap overall percentage at 100% to handle file count mismatches
            const overallPercentage = overallTotalFiles > 0
              ? Math.min(100, Math.round((overallFilesCompleted / overallTotalFiles) * 100))
              : 0;

            this.drawOverallProgress(
              overallFilesCompleted,
              overallTotalFiles,
              overallPercentage,
              i + 1,
              this.selections.tools.length
            );
          }
        );

        // Clear progress lines after completion
        process.stdout.write('\x1b[2K\r'); // Clear current line
        process.stdout.write('\x1b[1A\x1b[2K\r'); // Clear previous line

        console.log(`${colors.green}✓ ${tool.name} installed successfully${colors.reset}`);
        console.log(`  ${colors.cyan}Location:${colors.reset} ${targetPath}`);
        console.log(`  ${colors.cyan}Files:${colors.reset} ${toolFilesCompleted} files`);

        // Verify installation
        console.log(`  ${colors.cyan}Verifying installation...${colors.reset}`);
        const verification = await installationEngine.verifyInstallation(toolId, targetPath);

        if (verification.valid) {
          console.log(`  ${colors.green}✓ Verification passed${colors.reset}`);
        } else {
          console.log(`  ${colors.yellow}⚠ Verification completed with issues${colors.reset}`);
        }

        successfulInstalls.push({
          toolId,
          name: tool.name,
          path: targetPath,
          fileCount: toolFilesCompleted
        });

        verificationResults.push(verification);

        // Mark tool as completed in state
        await installationEngine.getStateManager().completeCurrentTool();

      } catch (error) {
        // Clear progress lines on error
        process.stdout.write('\x1b[2K\r');
        process.stdout.write('\x1b[1A\x1b[2K\r');

        // Categorize the error for better user guidance
        const errorInfo = this.categorizeError(error);

        console.error(`${colors.red}✗ Failed to install ${tool.name}${colors.reset}`);
        console.error(`  ${colors.red}Error Type:${colors.reset} ${errorInfo.type}`);
        console.error(`  ${colors.red}Message:${colors.reset} ${error.message}\n`);

        // Display actionable advice
        if (errorInfo.advice.length > 0) {
          console.error(`  ${colors.yellow}Suggested Actions:${colors.reset}`);
          errorInfo.advice.slice(0, 3).forEach((advice, index) => {
            console.error(`    ${index + 1}. ${advice}`);
          });
          console.error('');
        }

        failedInstalls.push({
          toolId,
          name: tool.name,
          path: targetPath,
          error: error.message,
          errorType: errorInfo.type
        });

        // Mark tool as failed in state
        await installationEngine.getStateManager().failCurrentTool(error);

        // Offer recovery options if there are more tools to install
        if (i < this.selections.tools.length - 1) {
          const shouldContinue = await this.offerRecoveryOptions(tool.name, i + 1, this.selections.tools.length);

          if (!shouldContinue) {
            console.log(`\n${colors.yellow}Installation cancelled by user${colors.reset}`);
            break; // Stop installing remaining tools
          }
        }
      }
    }

    // Calculate total elapsed time
    const totalElapsedMs = Date.now() - startTime;
    const totalElapsedSec = Math.floor(totalElapsedMs / 1000);
    const totalElapsedMin = Math.floor(totalElapsedSec / 60);
    const totalElapsedSecRemainder = totalElapsedSec % 60;
    const totalElapsedFormatted = `${totalElapsedMin}:${totalElapsedSecRemainder.toString().padStart(2, '0')}`;

    // Display final summary
    console.log(`\n${colors.bright}Installation Complete${colors.reset}`);
    console.log(`${colors.cyan}Total time:${colors.reset} ${totalElapsedFormatted}`);
    console.log(`${colors.cyan}Total files:${colors.reset} ${overallFilesCompleted} files\n`);

    if (successfulInstalls.length > 0) {
      console.log(`${colors.green}Successfully installed:${colors.reset}`);
      for (const install of successfulInstalls) {
        console.log(`  ${colors.green}✓${colors.reset} ${install.name} (${install.fileCount} files)`);
      }
    }

    if (failedInstalls.length > 0) {
      console.log(`\n${colors.red}Failed installations:${colors.reset}`);
      for (const install of failedInstalls) {
        console.log(`  ${colors.red}✗${colors.reset} ${install.name} (${install.errorType}): ${install.error}`);
      }
      console.log(`\n${colors.yellow}Note: Failed installations have been automatically rolled back${colors.reset}`);
      console.log(`${colors.yellow}No partial installations remain on your system${colors.reset}`);

      // Offer retry options for failed installations
      if (failedInstalls.length > 0 && successfulInstalls.length > 0) {
        console.log(`\n${colors.cyan}You can retry failed installations by running the installer again${colors.reset}`);
      }
    }

    // Display detailed verification reports for successful installations
    if (successfulInstalls.length > 0 && verificationResults.length > 0) {
      console.log(`\n${colors.bright}${'='.repeat(60)}${colors.reset}`);
      for (let i = 0; i < successfulInstalls.length; i++) {
        const install = successfulInstalls[i];
        const verification = verificationResults[i];
        this.displayVerificationReport(verification, install.name);
      }
      console.log(`${colors.bright}${'='.repeat(60)}${colors.reset}\n`);
    }

    // Generate and save installation report
    if (successfulInstalls.length > 0 || failedInstalls.length > 0) {
      await this.generateInstallationReport(
        successfulInstalls,
        failedInstalls,
        verificationResults,
        totalElapsedMs
      );
    }

    // Clear installation state if all tools completed successfully
    if (failedInstalls.length === 0) {
      await installationEngine.getStateManager().clearState();
      console.log(`${colors.green}✓ Installation state cleared${colors.reset}`);
    } else {
      console.log(`\n${colors.yellow}Installation state preserved for resume capability${colors.reset}`);
      console.log(`${colors.yellow}Run the installer again to retry failed tools${colors.reset}`);
    }
  }

  /**
   * Draw progress bar for current tool installation
   * Updates in place without scrolling using ANSI escape codes
   */
  drawProgressBar(filesCompleted, totalFiles, percentage, currentFile, bytesTransferred, totalBytes, speed, elapsed, eta) {
    // Move cursor to beginning of line and clear it
    process.stdout.write('\x1b[2K\r');

    // Calculate progress bar width (40 characters)
    const barWidth = 40;
    const filledWidth = Math.round((percentage / 100) * barWidth);
    const emptyWidth = barWidth - filledWidth;

    // Build progress bar
    const bar = '█'.repeat(filledWidth) + '░'.repeat(emptyWidth);

    // Truncate current file name if too long
    const maxFileNameLength = 50;
    let displayFileName = currentFile;
    if (displayFileName.length > maxFileNameLength) {
      displayFileName = '...' + displayFileName.slice(-(maxFileNameLength - 3));
    }

    // Display progress bar
    process.stdout.write(
      `[${colors.cyan}${bar}${colors.reset}] ${percentage}% (${filesCompleted}/${totalFiles} files)\n`
    );

    // Display current file and stats
    process.stdout.write(
      `${colors.yellow}Copying:${colors.reset} ${displayFileName} | ` +
      `${bytesTransferred}/${totalBytes} | ` +
      `${speed}/s | ` +
      `Elapsed: ${elapsed} | ` +
      `ETA: ${eta}`
    );

    // Move cursor up one line to overwrite on next update
    process.stdout.write('\x1b[1A');
  }

  /**
   * Draw overall progress across all tools
   */
  drawOverallProgress(filesCompleted, totalFiles, percentage, currentTool, totalTools) {
    // This is called after the tool progress, so cursor is already up one line
    // Move down to write overall progress below the tool progress
    process.stdout.write('\x1b[2B'); // Move down 2 lines
    process.stdout.write('\x1b[2K\r'); // Clear line

    // Display overall progress
    process.stdout.write(
      `${colors.bright}Overall:${colors.reset} Tool ${currentTool}/${totalTools} | ` +
      `${filesCompleted}/${totalFiles} files (${percentage}%)`
    );

    // Move cursor back up
    process.stdout.write('\x1b[1A'); // Move up 1 line to be ready for next tool progress update
  }
  
  askQuestion(prompt, defaultValue = '') {
    return new Promise(resolve => {
      this.rl.question(prompt, (answer) => {
        resolve(answer.trim() || defaultValue);
      });
    });
  }

  /**
   * Display verification report for a single tool
   * Shows verification status, component counts, and any issues/warnings
   *
   * @param {object} verification - Verification result from InstallationEngine
   * @param {string} toolName - Display name of the tool
   */
  displayVerificationReport(verification, toolName) {
    console.log(`\n${colors.bright}Verification Report: ${toolName}${colors.reset}`);
    console.log('─'.repeat(60));

    if (verification.valid) {
      console.log(`${colors.green}✓ Installation verified successfully${colors.reset}`);
    } else {
      console.log(`${colors.red}✗ Verification failed${colors.reset}`);
    }

    // Display manifest location
    const manifestPath = path.join(verification.targetPath, 'manifest.json');
    console.log(`\n${colors.cyan}Manifest:${colors.reset} ${manifestPath}`);

    // Display variant and version info
    if (verification.variant) {
      console.log(`${colors.cyan}Variant:${colors.reset} ${verification.variant}`);
    }
    if (verification.version) {
      console.log(`${colors.cyan}Version:${colors.reset} ${verification.version}`);
    }

    // Display component counts
    console.log(`\n${colors.cyan}Components:${colors.reset}`);
    const components = verification.components;
    const agentCount = components.agents.found;
    const skillCount = components.skills.found;
    const resourceCount = components.resources.found;
    const hookCount = components.hooks.found;

    const componentSummary = [];
    if (agentCount > 0) componentSummary.push(`${agentCount} agent${agentCount !== 1 ? 's' : ''}`);
    if (skillCount > 0) componentSummary.push(`${skillCount} skill${skillCount !== 1 ? 's' : ''}`);
    if (resourceCount > 0) componentSummary.push(`${resourceCount} resource${resourceCount !== 1 ? 's' : ''}`);
    if (hookCount > 0) componentSummary.push(`${hookCount} hook${hookCount !== 1 ? 's' : ''}`);

    console.log(`  ${componentSummary.join(', ')}`);

    // Display issues if any
    if (verification.issues.length > 0) {
      console.log(`\n${colors.red}Issues:${colors.reset}`);
      for (const issue of verification.issues) {
        console.log(`  ${colors.red}✗${colors.reset} ${issue.message}`);
      }
    }

    // Display warnings if any
    if (verification.warnings.length > 0) {
      console.log(`\n${colors.yellow}Warnings:${colors.reset}`);
      for (const warning of verification.warnings) {
        console.log(`  ${colors.yellow}⚠${colors.reset} ${warning.message}`);
      }
    }

    // Display next steps for successful installations
    if (verification.valid) {
      console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
      console.log(`  To use ${toolName}, navigate to: ${verification.targetPath}`);

      // Provide tool-specific usage hints
      const toolId = verification.toolId;
      if (toolId === 'claude') {
        console.log(`  ${colors.cyan}Quick start:${colors.reset} Run 'claude' to start using Claude Code`);
      } else if (toolId === 'opencode') {
        console.log(`  ${colors.cyan}Quick start:${colors.reset} Run 'opencode' to start using Opencode`);
      } else if (toolId === 'ampcode') {
        console.log(`  ${colors.cyan}Quick start:${colors.reset} Run 'ampcode' to start using Ampcode`);
      } else if (toolId === 'droid') {
        console.log(`  ${colors.cyan}Quick start:${colors.reset} Run 'droid' to start using Droid`);
      }
    }
  }

  /**
   * Generate and save installation report to ~/.agentic-kit-install.log
   * Creates a detailed log of the installation session
   *
   * @param {array} successfulInstalls - Array of successful installation objects
   * @param {array} failedInstalls - Array of failed installation objects
   * @param {array} verificationResults - Array of verification result objects
   * @param {number} totalElapsedMs - Total elapsed time in milliseconds
   */
  async generateInstallationReport(successfulInstalls, failedInstalls, verificationResults, totalElapsedMs) {
    const os = require('os');
    const reportPath = path.join(os.homedir(), '.agentic-kit-install.log');

    const timestamp = new Date().toISOString();
    const totalElapsedSec = Math.floor(totalElapsedMs / 1000);
    const totalElapsedMin = Math.floor(totalElapsedSec / 60);
    const totalElapsedSecRemainder = totalElapsedSec % 60;
    const totalElapsedFormatted = `${totalElapsedMin}:${totalElapsedSecRemainder.toString().padStart(2, '0')}`;

    // Build report content
    let report = '';
    report += '='.repeat(80) + '\n';
    report += 'Agentic Kit Installation Report\n';
    report += '='.repeat(80) + '\n';
    report += `Timestamp: ${timestamp}\n`;
    report += `Variant: ${this.selections.variant}\n`;
    report += `Total Time: ${totalElapsedFormatted}\n`;
    report += `Total Tools: ${this.selections.tools.length}\n`;
    report += `Successful: ${successfulInstalls.length}\n`;
    report += `Failed: ${failedInstalls.length}\n`;
    report += '\n';

    // Successful installations
    if (successfulInstalls.length > 0) {
      report += '-'.repeat(80) + '\n';
      report += 'Successful Installations\n';
      report += '-'.repeat(80) + '\n';

      for (let i = 0; i < successfulInstalls.length; i++) {
        const install = successfulInstalls[i];
        const verification = verificationResults[i];

        report += `\n[${i + 1}] ${install.name}\n`;
        report += `    Tool ID: ${install.toolId}\n`;
        report += `    Path: ${install.path}\n`;
        report += `    Files Installed: ${install.fileCount}\n`;

        if (verification) {
          report += `    Verification: ${verification.valid ? 'PASSED' : 'FAILED'}\n`;

          if (verification.components) {
            const c = verification.components;
            report += `    Components:\n`;
            report += `      - Agents: ${c.agents.found}/${c.agents.expected}\n`;
            report += `      - Skills: ${c.skills.found}/${c.skills.expected}\n`;
            report += `      - Resources: ${c.resources.found}/${c.resources.expected}\n`;
            report += `      - Hooks: ${c.hooks.found}/${c.hooks.expected}\n`;
          }

          if (verification.issues && verification.issues.length > 0) {
            report += `    Issues:\n`;
            for (const issue of verification.issues) {
              report += `      - ${issue.message}\n`;
            }
          }

          if (verification.warnings && verification.warnings.length > 0) {
            report += `    Warnings:\n`;
            for (const warning of verification.warnings) {
              report += `      - ${warning.message}\n`;
            }
          }
        }
      }
    }

    // Failed installations
    if (failedInstalls.length > 0) {
      report += '\n';
      report += '-'.repeat(80) + '\n';
      report += 'Failed Installations\n';
      report += '-'.repeat(80) + '\n';

      for (let i = 0; i < failedInstalls.length; i++) {
        const install = failedInstalls[i];
        report += `\n[${i + 1}] ${install.name}\n`;
        report += `    Tool ID: ${install.toolId}\n`;
        report += `    Path: ${install.path}\n`;
        report += `    Error: ${install.error}\n`;
      }
    }

    report += '\n';
    report += '='.repeat(80) + '\n';
    report += 'End of Report\n';
    report += '='.repeat(80) + '\n';

    // Append to log file
    try {
      await fs.promises.appendFile(reportPath, report);
      console.log(`\n${colors.cyan}Installation report saved to:${colors.reset} ${reportPath}`);
    } catch (error) {
      console.warn(`${colors.yellow}Warning: Could not save installation report: ${error.message}${colors.reset}`);
    }
  }
}

// Run installer if called directly
if (require.main === module) {
  const installer = new InteractiveInstaller();
  installer.run().catch(console.error);
}

module.exports = InteractiveInstaller;