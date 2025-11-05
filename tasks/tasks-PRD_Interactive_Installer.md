# Task Breakdown: Interactive Multi-Tool Installer System

Generated from: PRD_Interactive_Installer.md

## Relevant Files

### Package Structure
- `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/claude/variants.json` - Variant configuration for Claude (Lite/Standard/Pro)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/opencode/variants.json` - Variant configuration for Opencode
- `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/ampcode/variants.json` - Variant configuration for Ampcode
- `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/droid/variants.json` - Variant configuration for Droid
- `/home/hamr/Documents/PycharmProjects/agentic-kit/shared/agents/` - Common agent definitions shared across tools
- `/home/hamr/Documents/PycharmProjects/agentic-kit/shared/skills/` - Common skill definitions shared across tools
- `/home/hamr/Documents/PycharmProjects/agentic-kit/shared/resources/` - Common resources shared across tools
- `/home/hamr/Documents/PycharmProjects/agentic-kit/shared/hooks/` - Common hooks shared across tools

### Installer Components
- `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/cli.js` - Interactive CLI installer (partially implemented)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/path-manager.js` - Path management and validation (implemented)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/package-manager.js` - Package management with variant selection (needs variants.json support)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/installation-engine.js` - File operations and rollback (implemented)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/verification-system.js` - Installation verification (implemented)

### Tool Configuration
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tools/claude/manifest-template.json` - Claude manifest template (exists)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tools/opencode/manifest-template.json` - Opencode manifest template (exists)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tools/ampcode/manifest-template.json` - Ampcode manifest template (exists)
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tools/droid/manifest-template.json` - Droid manifest template (exists)

### Testing
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/cli.test.js` - CLI installer unit tests
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/package-manager.test.js` - Package manager tests
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/integration.test.js` - End-to-end integration tests
- `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/fixtures/` - Test fixtures and mock data

### Documentation
- `/home/hamr/Documents/PycharmProjects/agentic-kit/docs/INSTALLER_GUIDE.md` - User guide for the installer
- `/home/hamr/Documents/PycharmProjects/agentic-kit/docs/VARIANT_CONFIGURATION.md` - Guide for variants.json configuration
- `/home/hamr/Documents/PycharmProjects/agentic-kit/CHANGELOG.md` - Update with installation system changes

### Notes

**Testing Framework:**
- Use Node.js built-in `assert` module or install Jest/Mocha for testing
- Test isolation: Use temporary directories for installation tests
- Mock file system operations where appropriate
- Test all variants (Lite/Standard/Pro) across all tools

**Architectural Patterns:**
- Follow existing modular architecture (PathManager, PackageManager, InstallationEngine, VerificationSystem)
- Use async/await for all file operations
- Implement proper error handling with try-catch blocks
- Use readline for interactive CLI prompts
- ANSI color codes for terminal formatting (existing pattern in cli.js)

**Critical Considerations:**
- **Variant Configuration System**: The PRD describes a variant configuration system using variants.json files that needs to be implemented. The current package-manager.js assumes a directory structure (packages/{tool}/{variant}/), but the PRD's preferred approach uses a single package per tool with variants.json defining content selection
- **Package Structure Migration**: Currently, packages exist at `/packages/{tool}/` but need to support the variant selection system. The PRD describes two architectures - we need to choose and implement one
- **Existing Code**: The installer components are partially implemented but need updates to support variants.json and multi-tool installation
- **File Operations**: Ensure atomic operations with proper rollback on failure
- **Permission Handling**: Must validate permissions before installation and provide clear error messages

**Important PRD Requirements:**
1. Default tool selection: No tools selected (minimum 1 required)
2. Custom path confirmation: Must show confirmation dialog when custom paths are specified
3. Progress tracking: Real-time progress bars with file counts and ETA
4. Rollback capability: Restore previous state on failure
5. Post-installation verification: Validate all files and generate report
6. Support 4 tools: Claude Code, Opencode, Ampcode, Droid with proper path isolation

**Development Approach:**
- Start by creating variants.json for Claude (use existing content as baseline)
- Extend package-manager.js to read and apply variants.json configurations
- Update cli.js to integrate with enhanced package manager
- Add progress tracking with real-time updates
- Implement comprehensive testing for all variants and tools
- Document variant configuration format and customization options

## Tasks

- [x] 1.0 Create Variant Configuration System
  - [x] 1.1 Analyze existing Claude package structure at `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/claude/` to count agents (13 total) and skills (22 total), identify core agents for Lite variant (master, orchestrator, scrum-master), and identify 8 core skills for Standard variant (pdf, docx, xlsx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms)
  - [x] 1.2 Create variants.json file at `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/claude/variants.json` with three variant definitions: "lite" (3 agents, 0 skills), "standard" (all agents, 8 skills), and "pro" (all agents, all skills), using selection patterns "*" for all items, ["item1", "item2"] for specific items, and [] for none
  - [x] 1.3 Copy Claude's variants.json structure to create placeholder configuration files for Opencode at `/packages/opencode/variants.json`, Ampcode at `/packages/ampcode/variants.json`, and Droid at `/packages/droid/variants.json`, updating descriptions to reflect tool-specific optimizations (CLI-based, amplified workflows, mobile-focused)
  - [x] 1.4 Create shared component directory structure by verifying `/home/hamr/Documents/PycharmProjects/agentic-kit/shared/` exists, creating subdirectories `shared/agents/`, `shared/skills/`, `shared/resources/`, `shared/hooks/`, and copying common definitions from Claude package for reference
  - [x] 1.5 Write manual test script `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/test-variants-parsing.js` to test reading variants.json for each tool, parsing all three variants, testing wildcard expansion ("*"), specific item selection (["item1", "item2"]), empty selection ([]), and validating JSON structure

- [x] 2.0 Enhance Package Manager with Variant Selection
  - [x] 2.1 Add method `loadVariantConfig(toolId)` to PackageManager class in `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/package-manager.js` that reads `/packages/{toolId}/variants.json`, parses JSON, caches loaded configurations, and validates required variant fields (lite, standard, pro) exist
  - [x] 2.2 Implement method `selectVariantContent(toolId, variant)` in PackageManager that loads variant configuration, extracts selected variant, implements wildcard expansion (agents: ["*"] returns all agent filenames), implements specific selection (agents: ["master", "orchestrator"] returns only those), implements empty selection (skills: [] returns empty array), and returns object with arrays of selected filenames for agents, skills, resources, hooks
  - [x] 2.3 Modify existing `getPackageContents(toolId, variant)` method in package-manager.js to change from reading `packages/{toolId}/{variant}/` directory to reading `packages/{toolId}/` with variant filtering, call `selectVariantContent(toolId, variant)` to get list of files to include, count only selected files based on variants.json configuration, and update file path construction to use base package directory
  - [x] 2.4 Modify `getPackageSize(toolId, variant)` in package-manager.js to use `selectVariantContent(toolId, variant)` to get selected files, calculate total size only for selected files not entire package directory, handle nested directories within agents/, skills/, resources/, hooks/, and return size in bytes and formatted size (KB/MB/GB)
  - [x] 2.5 Modify `validatePackage(toolId, variant)` in package-manager.js to check variants.json exists and is valid JSON, verify selected variant exists in variants.json, validate all files specified in variant configuration exist in package directory, verify directories exist for wildcard selections ["*"], verify each specific file exists for specific selections ["file1", "file2"], and return detailed validation results
  - [x] 2.6 Create test file `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/package-manager.test.js` to test `loadVariantConfig()` with valid and invalid JSON, test `selectVariantContent()` with wildcards, specific selections, empty selections, test `getPackageContents()` returns correct counts, test `getPackageSize()` calculates correct sizes, test `validatePackage()` catches missing files and invalid configurations, and use temporary directories for test isolation

- [x] 3.0 Update Installation Engine for Variant-Based Installation
  - [x] 3.1 Modify `installPackage(toolId, variant, targetPath)` method in `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/installation-engine.js` to call `packageManager.selectVariantContent(toolId, variant)` to get file list, change source directory from `packages/{toolId}/{variant}/` to `packages/{toolId}/`, update installation logic to copy only selected files not entire directories, maintain directory structure (copy selected agents to `{targetPath}/agents/`), and add progress tracking with events or callbacks for each file copied
  - [x] 3.2 Create method `copySelectedFiles(toolId, variant, sourceBase, targetPath, progressCallback)` in InstallationEngine that gets selected content from PackageManager, creates target subdirectories for each category (agents, skills, resources, hooks), copies only files specified in variant configuration, calls progressCallback for each file with {currentFile, totalFiles, bytesTransferred}, handles nested directories, ensures atomic operations with rollback on failure, and returns detailed copy report
  - [x] 3.3 Add event emitter or callback system to InstallationEngine constructor, create method `reportProgress(toolId, current, total, currentFile)`, emit progress events during file copying ('file-start', 'file-complete', 'progress', 'complete'), include progress percentage, current file path, bytes transferred, ETA calculation, update `copySelectedFiles()` to call reportProgress after each file, add timing tracking (start time, current time, estimated completion time), and support multiple simultaneous tool installations with separate progress tracking
  - [x] 3.4 Modify `generateManifest(toolId, variant, targetPath)` in installation-engine.js to include variant name in manifest ("variant": "standard"), add list of installed files from `selectVariantContent()` result, include variant description from variants.json, add installation details (selected agents count, selected skills count), include optimization information from manifest template, add checksum or file hash for integrity verification (optional), and write manifest.json to target path with proper formatting (2-space indentation)
  - [x] 3.5 Review `rollbackInstallation(toolId, targetPath)` method to ensure rollback removes only files installed in current session, maintain installation log with file-level granularity, delete each installed file individually during rollback, restore from backup if available, clean up empty directories after rollback, preserve any user-created files not part of installation, and log rollback actions for troubleshooting
  - [x] 3.6 Create test file `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/installation-engine.test.js` to test installation of Lite variant (verify only 3 agents, no skills), test Standard variant (verify 13 agents + 8 skills), test Pro variant (verify all agents + all skills), test progress reporting callbacks, test rollback (install, fail midway, verify original state restored), test selective copying, and use temporary directories with cleanup after each test

- [x] 4.0 Enhance Interactive CLI with Multi-Tool Support
  - [x] 4.1 Modify `selectTools()` method in `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/cli.js` to display checkboxes (☐ unchecked, ☑ checked), add keyboard navigation support (arrow keys to move, space to toggle), show default paths next to each tool name, implement minimum selection validation (require at least 1 tool), add color highlighting for selected tools using existing ANSI color codes, display selection count ("Selected: 2/4 tools"), and allow Enter to proceed only when 1+ tools selected
  - [x] 4.2 In `configurePaths()` method, detect when user enters custom path (different from default), display custom path confirmation dialog with yellow warning color, show proposed custom path prominently, validate path before confirmation (check permissions, parent directory exists, disk space), display validation results ("✓ Valid path" or "✗ Permission denied"), require explicit confirmation ("Confirm custom path? (y/N): "), revert to default path if 'N' or Enter pressed, proceed with custom path if 'Y' pressed, and show final path choice after confirmation
  - [x] 4.3 Update `showSummary()` method to call `packageManager.getPackageContents(toolId, variant)` for each selected tool, call `packageManager.getPackageSize(toolId, variant)` for each tool, replace "TBD" placeholders with actual file counts (e.g., "124 files"), replace "TBD" size with formatted sizes (e.g., "1.8MB"), add subtotal row showing total files and size across all tools, check for existing installations using `pathManager.checkExistingInstallation()`, display warning with file count if overwriting ("⚠️ 89 files will be overwritten"), and highlight custom paths with asterisk (*) and footnote
  - [x] 4.4 Update `install()` method to show real-time progress bars using ANSI escape codes to update in place (without scrolling), display progress bar for each tool ("[████████████████████] 100% (124/124 files)"), show overall progress across all tools ("Total: 217/248 files (87%)"), display current file being copied ("Copying: agents/master.md"), calculate and show transfer speed ("1.2MB/1.6MB"), calculate and show elapsed time ("Elapsed: 0:45"), calculate and show ETA ("ETA: 0:12"), and update progress display at least every 100ms for smooth animation
  - [x] 4.5 After installation completes, call `verificationSystem.verifyInstallation()` for each tool, display verification status ("✓ Claude Code verified successfully"), show manifest location for each tool, display component counts from manifest ("13 agents, 8 skills, 1 resource, 2 hooks"), show any warnings or issues from verification, provide next steps ("Run 'claude' to start using Claude Code"), generate and save installation report to `~/.agentic-kit-install.log`, and display report location
  - [x] 4.6 Wrap all installation steps in try-catch blocks, display clear error messages using red color ("✗ Installation failed: {reason}"), for permission errors suggest using sudo or changing target directory, for disk space errors show required vs available space and suggest cleanup, for network errors suggest checking connection or using offline mode, for missing package errors suggest reinstalling agentic-kit, offer rollback option on failure ("Press R to rollback, Q to quit"), call `installationEngine.rollbackInstallation()` if rollback selected, and display rollback status
  - [x] 4.7 Create test file `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/cli.test.js` to test complete installation flow (select variant → select tools → configure paths → install), mock readline input to simulate user interactions, test tool selection validation (verify error when no tools selected), test custom path confirmation flow, test installation summary display (verify correct file counts), test progress reporting (verify progress updates displayed), test error handling (simulate failures and verify error messages), test rollback (simulate failure and verify rollback execution), and use test fixtures and temporary directories

- [x] 5.0 Implement Advanced Features
  - [x] 5.1 Create file `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/state-manager.js` with StateManager class containing methods saveState(), loadState(), clearState(), save installation state to `~/.agentic-kit-install-state.json` after each file copied (include selected tools, variant, paths, files copied, timestamp), on installer startup check for existing state file, if found offer to resume ("Previous installation detected. Resume? (Y/n)"), if resumed skip completed steps and continue from last file, and clear state file after successful installation or if user declines resume
  - [x] 5.2 Add method `uninstall(toolId, targetPath)` to InstallationEngine that reads manifest.json from target path to get list of installed files, prompts user for confirmation ("Uninstall {toolId}? This will remove {fileCount} files. (y/N)"), if confirmed deletes all files listed in manifest, deletes manifest.json itself, removes empty directories after uninstalling files, preserves any user-created files not in manifest, creates backup before uninstalling (`{targetPath}.uninstall-backup.{timestamp}`), displays uninstall progress ("Removing: agents/master.md"), and displays summary ("✓ {toolId} uninstalled successfully. Backup: {backupPath}")
  - [x] 5.3 Modify `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/cli.js` to add command-line argument parsing supporting `--uninstall <tool>` flag (example: `node installer/cli.js --uninstall claude`), parse command-line args using process.argv, if `--uninstall` flag detected skip interactive flow, detect installation from manifest at default or specified path, call `installationEngine.uninstall(tool, path)`, display uninstall confirmation and progress, and exit after uninstall completes
  - [x] 5.4 Add support for `--silent` or `--config <file>` command-line flags, create configuration file format (JSON with variant, tools, paths), example config.json: `{"variant": "standard", "tools": ["claude", "opencode"], "paths": {"claude": "~/.claude"}}`, if `--config` specified load configuration from file, skip all interactive prompts, use configuration values for variant, tools, paths, display minimal output (only installation progress and results), use for CI/CD and automated deployments, and add `--yes` flag to auto-confirm all prompts in silent mode
  - [x] 5.5 Create method `upgradeVariant(toolId, currentVariant, newVariant, targetPath)` in InstallationEngine that reads existing manifest.json to get current variant and installed files, compares current variant with new variant using variants.json, determines files to add (in newVariant but not currentVariant) and files to remove (in currentVariant but not newVariant), displays upgrade summary ("+X files, -Y files"), prompts for confirmation ("Upgrade from {current} to {new}? (Y/n)"), creates backup before upgrading, copies new files and removes obsolete files, updates manifest.json with new variant and file list, verifies upgraded installation, and supports both upgrade (lite→standard→pro) and downgrade (pro→standard→lite)
  - [x] 5.6 Create test file `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/installer/integration.test.js` to test full installation flow for all variants × all tools (12 combinations), test resume capability (interrupt installation, verify resume works), test uninstall (install then uninstall, verify clean removal), test upgrade (install lite, upgrade to standard, verify correct files), test downgrade (install pro, downgrade to standard, verify correct files), test silent mode (install using config file, verify non-interactive), test error recovery (simulate failures at various stages, verify rollback), test multi-tool installation, and use temporary directories with cleanup after tests

- [ ] 6.0 Create Tool-Specific Package Content
  - [x] 6.1 Create documentation file `/home/hamr/Documents/PycharmProjects/agentic-kit/docs/PACKAGE_BASELINE.md` listing all 13 agents in Claude package with descriptions, listing all skills with identification of which 8 are "core" for Standard variant, documenting Claude-specific optimizations (conversational AI patterns, markdown formatting), documenting agent prompt structures and conventions, documenting skill implementation patterns, documenting resource formats (YAML, markdown), and documenting hook integration points to guide creation of other tool packages
  - [x] 6.2 Copy base agents from `/home/hamr/Documents/PycharmProjects/agentic-kit/packages/claude/agents/` to `/packages/opencode/agents/`, adapt agent prompts for CLI-based AI codegen workflows, modify agent instructions to reference terminal commands and CLI patterns, copy base skills from `/packages/claude/skills/` to `/packages/opencode/skills/`, adapt skills for command-line integration, create Opencode-specific resources in `/packages/opencode/resources/`, create Opencode-specific hooks in `/packages/opencode/hooks/`, verify variants.json correctly references all content, and update manifest template with Opencode optimizations ("optimization": "cli-codegen")
  - [x] 6.3 Copy base agents from `/packages/claude/agents/` to `/packages/ampcode/agents/`, enhance agent prompts for amplified AI codegen workflows and automation, add automation-focused instructions to agents, copy base skills from `/packages/claude/skills/` to `/packages/ampcode/skills/`, enhance skills for accelerated development patterns, create Ampcode-specific resources in `/packages/ampcode/resources/`, create Ampcode-specific hooks in `/packages/ampcode/hooks/`, verify variants.json correctly references all content, and update manifest template with Ampcode optimizations ("optimization": "amplified-codegen")
  - [x] 6.4 Copy base agents from `/packages/claude/agents/` to `/packages/droid/agents/`, adapt agent prompts for mobile/Android development and AI codegen, add mobile-specific patterns and Android platform knowledge, copy base skills from `/packages/claude/skills/` to `/packages/droid/skills/`, adapt skills for mobile development workflows, create Droid-specific resources in `/packages/droid/resources/` (Android templates, mobile patterns), create Droid-specific hooks in `/packages/droid/hooks/`, verify variants.json correctly references all content, and update manifest template with Droid optimizations ("optimization": "mobile-codegen")
  - [x] 6.5 Review all skills in each package to identify these 8 core skills: pdf, docx, xlsx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms, update variants.json in all packages (claude, opencode, ampcode, droid) to list these 8 in Standard variant, verify these skills exist in each package and create placeholders if missing, ensure Pro variant includes all skills using ["*"] wildcard, and document skill selection rationale in `/docs/VARIANT_CONFIGURATION.md`
  - [x] 6.6 Run `packageManager.validatePackage(toolId, variant)` for each tool and variant, verify all agents referenced in variants.json exist, verify all skills referenced exist, verify all resources and hooks referenced exist, check for broken references or missing files, fix any validation errors, create validation report at `/docs/PACKAGE_VALIDATION_REPORT.md`, and include file counts, sizes, and validation status for each tool/variant combination

- [ ] 7.0 Documentation and Polish
  - [x] 7.1 Create file `/home/hamr/Documents/PycharmProjects/agentic-kit/docs/INSTALLER_GUIDE.md` documenting installation process step-by-step, explaining variant selection (Lite vs Standard vs Pro with use cases), explaining tool selection (when to use Claude/Opencode/Ampcode/Droid), documenting custom path configuration and when to use it, providing examples of common installation scenarios, documenting command-line flags (--silent, --config, --uninstall, --yes), including troubleshooting section (common errors and solutions), and adding FAQ section addressing typical user questions
  - [x] 7.2 Create file `/home/hamr/Documents/PycharmProjects/agentic-kit/docs/VARIANT_CONFIGURATION.md` documenting variants.json format and structure, explaining selection patterns ("*" for all, ["item"] for specific, [] for none), providing examples of custom variant definitions, documenting how to add new variants beyond Lite/Standard/Pro, explaining relationship between variants.json and package content, including best practices for maintaining variants.json, and adding examples of tool-specific variant customizations
  - [x] 7.3 Open `/home/hamr/Documents/PycharmProjects/agentic-kit/README.md` to add "Installation" section describing the new interactive installer, include quick start (`npm install -g @amrhas82/agentic-kit && agentic-kit install`), document available installation options (variants, tools, paths), link to detailed INSTALLER_GUIDE.md, add screenshots or GIFs demonstrating installation flow (optional, describe in text), update architecture section to mention multi-tool support, and add badges or indicators for supported tools (Claude, Opencode, Ampcode, Droid)
  - [x] 7.4 Open `/home/hamr/Documents/PycharmProjects/agentic-kit/CHANGELOG.md` to add new version section (1.1.0 or 1.2.0 based on current version), list major features (Interactive multi-tool installer, variant selection system, progress tracking, rollback capability), list added files (installer/cli.js, installer/package-manager.js, etc.), document breaking changes if any, credit contributors if applicable, and add date of release
  - [x] 7.5 Create installer demo video or GIF by recording terminal session demonstrating installation (showing all 4 steps: variant selection, tool selection, path configuration, installation), showing progress bars and real-time feedback, showing successful installation and verification, converting to GIF using tool like asciinema or terminalizer, adding to /docs/ directory and linking from README.md, or if not possible creating detailed ASCII art mockups in documentation
  - [x] 7.6 Open `/home/hamr/Documents/PycharmProjects/agentic-kit/package.json` to add script `"install-interactive": "node installer/cli.js"`, add script `"uninstall-tool": "node installer/cli.js --uninstall"`, add script `"test-installer": "node tests/installer/integration.test.js"`, update bin entry to include installer command if needed, test all scripts to ensure they work correctly, and document scripts in README.md

- [ ] 8.0 Testing and Quality Assurance
  - [x] 8.1 Create directory `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/fixtures/`, create sample variants.json files for testing, create mock package structures with agents, skills, resources, hooks, create mock manifest templates, create helper functions for setting up test environments, create cleanup utilities for removing test artifacts, and document fixture structure in `/tests/fixtures/README.md`
  - [ ] 8.2 Test Claude Lite (verify 3 agents, 0 skills installed), test Claude Standard (verify 13 agents, 8 skills installed), test Claude Pro (verify 13 agents, 22 skills installed), test Opencode Lite/Standard/Pro with same verification approach, test Ampcode Lite/Standard/Pro with same verification approach, test Droid Lite/Standard/Pro with same verification approach, verify file counts match expected counts from variants.json, verify manifest.json contains correct component counts, and test in temporary directories with cleanup after each test
  - [ ] 8.3 Test installing Claude + Opencode simultaneously, test installing all 4 tools simultaneously, test installing tools with different variants (Claude Standard + Droid Pro), verify each tool installed to correct path with isolation, verify no file conflicts between tools, verify progress reporting for multiple tools, and verify each tool has correct manifest
  - [ ] 8.4 Test insufficient disk space by mocking low disk space and verifying error message, test permission denied using unwritable path and verifying error message and suggested fix, test interrupted installation by killing process midway, restarting, and verifying resume works, test missing package files by removing a required file and verifying validation catches it, test corrupted variants.json using malformed JSON and verifying error handling, test network interruption (if downloading) by simulating failure and verifying retry or offline mode, and test rollback by forcing failure after partial install and verifying rollback restores original state
  - [ ] 8.5 Test default paths (verify expanded correctly from ~ to home directory), test custom paths (verify validation and confirmation flow), test relative paths (verify converted to absolute paths), test paths with spaces (verify handled correctly), test paths with special characters (verify escaped properly), test existing installation overwrite (verify backup created and warning shown), and test permission validation (verify checks pass/fail correctly)
  - [ ] 8.6 Test on Linux (verify paths, file operations, permissions), test on macOS (verify paths, file operations, permissions), test on Windows (verify path handling with drive letters and backslashes, verify Node.js 14+ compatibility), verify ANSI color codes render correctly on all platforms, verify progress bars render correctly on all terminals, test with different terminal emulators (bash, zsh, Windows Terminal, etc.), and document any platform-specific issues and workarounds
  - [ ] 8.7 Measure installation time for each variant (target < 2 minutes per PRD), measure memory usage during installation (target < 50MB per PRD), test with large numbers of files (verify performance doesn't degrade), test with slow file systems (verify installation still completes), measure startup time (target < 3 seconds per PRD), profile bottlenecks if performance targets not met, and optimize file operations if needed (batch operations, parallel copying)
  - [ ] 8.8 Consolidate all tests into `/home/hamr/Documents/PycharmProjects/agentic-kit/tests/run-all-tests.js`, run unit tests (package-manager, path-manager, installation-engine, verification-system), run integration tests (full installation flows, error scenarios, multi-tool), run platform tests (Linux, macOS, Windows if available), generate test report (pass/fail counts, coverage, duration), add test script to package.json (`"test": "node tests/run-all-tests.js"`), set up CI/CD to run tests automatically on commits (optional), and document how to run tests in `/docs/TESTING.md`

- [ ] 9.0 Final Integration and Release Preparation
  - [ ] 9.1 Install all variants of all tools to actual default locations (use test account or VM), verify Claude Code can detect and use installed agents and skills, verify Opencode can detect installed content (if Opencode available for testing), verify Ampcode can detect installed content (if Ampcode available for testing), verify Droid can detect installed content (if Droid available for testing), test upgrading from Lite to Standard to Pro and verify tools recognize new content, test uninstalling and reinstalling to verify clean installation, and document any integration issues found and fix them
  - [ ] 9.2 Create file `/home/hamr/Documents/PycharmProjects/agentic-kit/installer/report-template.js`, define report structure (tools installed, variants, paths, file counts, timestamps, errors, warnings), create method `generateReport(installationData)` that populates template, format report as human-readable text with sections and formatting, include summary at top (success/failure, total files, total size, total time), include details for each tool (component counts, path, verification status), include system information (Node.js version, platform, architecture), save report to `~/.agentic-kit-install.log` after each installation, and display report location to user after installation
  - [ ] 9.3 Add optional usage statistics collection (opt-in only), collect anonymous data (variant selected, tools selected, installation time, success/failure), do NOT collect file paths, user information, or system details beyond OS type, add prompt ("Help improve agentic-kit by sharing anonymous usage data? (y/N)"), store consent in `~/.agentic-kit-config.json`, if consented send data to analytics endpoint or log locally, provide opt-out mechanism (`--no-telemetry` flag), and document data collection policy in docs/PRIVACY.md
  - [ ] 9.4 Review all file operations for path traversal vulnerabilities, ensure user input is validated and sanitized (paths, tool names, variants), verify no arbitrary code execution vulnerabilities in variants.json parsing, check for race conditions in file operations, verify rollback doesn't expose sensitive data, ensure backup files don't have overly permissive permissions, test with malicious input (directory traversal attempts like ../../etc/passwd, command injection), and document security considerations in `/docs/SECURITY.md`
  - [ ] 9.5 Add method `detectLegacyInstallation()` in PathManager to detect existing installations from previous agentic-kit versions, offer to migrate ("Legacy installation detected. Migrate to new installer? (Y/n)"), if migrated read existing files and create manifest for them, apply variant classification (if only 3 agents classify as Lite, if 13 agents + some skills classify as Standard), preserve user customizations if possible, and document migration process in `/docs/MIGRATION.md`
  - [ ] 9.6 Perform fresh installation on clean system (VM or test account), test all installation flows (interactive, silent, with config file), test all variants and all tools, verify all documentation is accurate and up-to-date, verify all error messages are clear and actionable, test uninstall and verify complete cleanup, verify no orphaned files or directories left behind, check package.json version is updated appropriately, tag release in git with version number, and prepare release notes summarizing new features
  - [ ] 9.7 Update version in `/home/hamr/Documents/PycharmProjects/agentic-kit/package.json` to reflect new release (e.g., 1.2.0), update version in installer welcome screen (cli.js), run `npm run validate` to ensure package integrity, commit all changes (`git add . && git commit -m "Release v1.2.0: Interactive multi-tool installer"`), create git tag (`git tag v1.2.0`), push to repository (`git push && git push --tags`), publish to npm (`npm publish`), verify published package (`npm info @amrhas82/agentic-kit`), test installation from npm (`npm install -g @amrhas82/agentic-kit`), and announce release (update README, create GitHub release, notify users)

---

## Summary

This task breakdown covers the complete implementation of the Interactive Multi-Tool Installer System as specified in PRD_Interactive_Installer.md. The implementation follows a logical sequence:

1. **Variant Configuration System** (Tasks 1.x): Create the foundational variants.json files that enable package variant selection
2. **Package Manager Enhancement** (Tasks 2.x): Update PackageManager to read and apply variant configurations
3. **Installation Engine Update** (Tasks 3.x): Modify InstallationEngine to install only variant-selected content
4. **Interactive CLI Enhancement** (Tasks 4.x): Complete the user-facing interactive installer with progress tracking
5. **Advanced Features** (Tasks 5.x): Add resume, uninstall, and upgrade capabilities
6. **Tool-Specific Content** (Tasks 6.x): Create optimized packages for all 4 tools
7. **Documentation** (Tasks 7.x): Comprehensive user and developer documentation
8. **Testing** (Tasks 8.x): Thorough testing across variants, tools, and platforms
9. **Release Preparation** (Tasks 9.x): Final integration and production release

**Total Task Count**: 9 parent tasks, 55 sub-tasks

**Estimated Timeline**: 2-3 weeks for junior developer with review and testing cycles

**Key Dependencies**:
- Node.js 14+ (already specified in package.json)
- File system access for installation
- No external dependencies currently listed in package.json
- Testing may require temporary directory access

**Success Criteria**:
- All PRD requirements met including 4-step installation flow
- Support for 4 tools with proper isolation
- 3 variants per tool with correct file selection
- Installation time < 2 minutes
- 100% post-install verification pass
- Comprehensive test coverage with automated test suite
