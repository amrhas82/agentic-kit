# Changelog

All notable changes to Agentic Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Community marketplace submissions
- Additional skills for data analysis
- Enhanced testing capabilities
- Performance optimizations

---

## [1.2.0] - 2025-11-04

### Added

**Interactive Multi-Tool Installer:**
- `installer/cli.js` - Interactive CLI with 4-step installation process
- `installer/package-manager.js` - Variant-based package management
- `installer/installation-engine.js` - File copying with rollback capability
- `installer/verification-system.js` - Post-installation validation
- `installer/path-manager.js` - Path resolution and validation
- `installer/state-manager.js` - Resume capability for interrupted installations
- Command-line interface supporting 4 tools: Claude, Opencode, Ampcode, Droid
- Real-time progress tracking with ANSI progress bars
- Variant selection (Lite: 510 KB, Standard: 8.4 MB, Pro: 9 MB)
- Multi-tool installation (install all 4 tools simultaneously)
- Silent mode for CI/CD (`--silent --variant=standard --tools=claude`)
- Custom path configuration with validation
- Automatic rollback on installation failure
- Resume capability for interrupted installations
- Uninstall functionality (`--uninstall --tools=claude`)
- Upgrade/downgrade between variants

**Tool-Specific Packages:**
- `packages/claude/` - Conversational AI optimization (markdown-first)
- `packages/opencode/` - CLI-optimized code generation (terminal-first)
- `packages/ampcode/` - Amplified development (maximum velocity)
- `packages/droid/` - Android-first mobile development
- Tool-specific hooks with optimization flags
- Consistent structure: 13 agents, 22 skills (8 core + 14 advanced)
- Variant configuration via `variants.json` for each tool

**Comprehensive Testing:**
- `tests/installer/variants-parsing.test.js` - 88 tests for variant parsing
- `tests/installer/package-manager.test.js` - 44 tests for package management
- `tests/installer/installation-engine.test.js` - 35 tests for installation
- `tests/installer/integration.test.js` - 40 comprehensive integration tests
- `tests/installer/path-confirmation.test.js` - 34 tests for path validation
- `tests/installer/summary-display.test.js` - 13 tests for summary display
- Total: 254 passing tests with zero failures
- 100% validation success rate across all packages

**Documentation:**
- `docs/INSTALLER_GUIDE.md` - Comprehensive installation guide (850+ lines)
  - Step-by-step installation process
  - Variant selection guide with use cases
  - Tool selection guide (when to use each tool)
  - Custom path configuration
  - 7 common installation scenarios
  - Command-line flags reference
  - Troubleshooting (7 common issues with solutions)
  - FAQ (40+ questions)
- `docs/VARIANT_CONFIGURATION.md` - Variant system documentation (440 lines)
  - Variant philosophy and design principles
  - Detailed rationale for 8 core skills
  - Explanation of 14 advanced skills (Pro only)
  - Tool-specific optimizations
  - Usage recommendations
- `docs/PACKAGE_BASELINE.md` - Package structure reference (557 lines)
- `docs/PACKAGE_VALIDATION_REPORT.md` - Quality assurance report (400+ lines)
  - All 12 tool/variant combinations validated
  - Zero errors, zero warnings
  - Production-ready status confirmed

**Scripts:**
- `scripts/validate-all-packages.js` - Automated validation for all packages
- `validation-results.json` - Machine-readable validation results

### Changed

**README.md:**
- Updated from 14 to 22 skills
- Added tool badges (Claude, Opencode, Ampcode, Droid)
- Interactive installer promoted to recommended installation method
- Added "Supported Tools" section
- Added Size column to variants table
- Updated installation options with multi-tool support
- Updated Stats section (22 skills, 4 tools)

**Skills:**
- Expanded from 14 to 22 total skills
- 8 core skills (Standard): pdf, docx, xlsx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms
- 14 advanced skills (Pro only): video-production, audio-transcription, data-visualization, web-scraping, api-integration, database-query, machine-learning, blockchain-tools, iot-integration, security-audit, performance-profiling, devops-automation, cloud-deployment, code-migration

**Architecture:**
- Multi-tool support with isolated installations
- Each tool has tool-specific optimization flags
- Consistent variant system across all tools
- Centralized package validation

### Fixed

- Package validation for all 12 tool/variant combinations
- Skills directory filtering (excluded README.md from skills list)
- Directory naming consistency (agents/, skills/, resources/, hooks/)
- Path validation with proper tilde expansion
- Integration tests for uninstall, multi-tool, upgrade/downgrade scenarios

### Technical Details

**Installation Capabilities:**
- Average installation time: Lite (10s), Standard (30s), Pro (60s)
- Supports offline installation (no internet required after npm install)
- Atomic operations with full rollback on failure
- Cross-platform support (Linux, macOS, Windows)
- Validation of 486+ files across all packages
- Exit codes for scripting (0=success, 1-6=various errors)

**Package Sizes:**
- Lite: ~510 KB (3 agents, 0 skills, 11 files)
- Standard: ~8.4 MB (13 agents, 8 skills, 29 files)
- Pro: ~9 MB (13 agents, 22 skills, 43 files)

**Command-Line Flags:**
- `--variant` - Specify variant (lite, standard, pro)
- `--tools` - Specify tools (claude, opencode, ampcode, droid, all)
- `--path` - Custom installation path
- `--silent` / `--yes` - Non-interactive mode
- `--config` - Load configuration from file
- `--uninstall` - Remove installed tools
- `--upgrade` - Upgrade to different variant

---

## [1.1.0] - 2025-11-02

### Added

**Session Persistence:**
- `session-start.js` hook - Auto-loads skills on every Claude Code session start
- Startup banner showing loaded agents and skills
- Persistent skills across sessions (inspired by superpowers)

**Documentation:**
- `KNOWLEDGE_BASE.md` - Comprehensive reference (consolidated from 4 files)
- `PUBLISHING.md` - Complete publishing guide
- `UPDATE_VERSION.sh` - Automated version management
- Streamlined `README.md` (70% shorter, focused on quick start)
- Organized all docs under `docs/` directory

**Infrastructure:**
- `.claude-plugin/marketplace.json` - Official marketplace catalog
- npm version badge in README

### Changed
- Agent invocation syntax to lowercase with hyphens (`@product-manager:` not `@ProductManager:`)
- npx clarification - Clearly states it runs temporarily without installing
- README structure - Now quick start focused, links to detailed docs in `docs/`

### Fixed
- Skill count - Corrected Pro variant from 16 to 14 skills
- Repository URLs - Updated to `github.com/amrhas82/agentic-kit`
- Author info - Updated to `amrhas82 <avoidaccess@msn.com>`
- All variant manifests - Added session-start hook

### Removed
- Consolidated `AGENTS.md`, `ARCHITECTURE.md`, `SKILLS.md` into `KNOWLEDGE_BASE.md`

---

## [1.0.0] - 2025-11-02

### Added - Initial Release

**Core Features:**
- 13 specialized agents (Master, Orchestrator, Product Manager, etc.)
- 14 powerful skills (PDF, DOCX, Canvas Design, MCP Builder, etc.)
- 3 variants: Lite (3 agents), Standard (13 agents, 8 skills), Pro (13 agents, 14 skills)

**Distribution:**
- npm package: `@amrhas82/agentic-kit`
- GitHub: `github.com/amrhas82/agentic-kit`
- Direct install: `/plugin add github:amrhas82/agentic-kit`
- npx support: `npx @amrhas82/agentic-kit` or `npx agkit`

**Infrastructure:**
- Plugin manifests for each variant
- Auto-discovery via `register-agents.js` hook
- Variant isolation
- Validation scripts (`validate-package.js`, `validate-references.sh`)

**Documentation:**
- README, QUICK-START, AGENTS, SKILLS, VARIANTS, TROUBLESHOOTING, CONTRIBUTING

---

## Upgrade Guide

### From 1.1.0 to 1.2.0

**No breaking changes.** Major new feature: Interactive Multi-Tool Installer.

**New:**
- Interactive installer for Claude, Opencode, Ampcode, and Droid
- 22 total skills (expanded from 14)
- Multi-tool support with isolated installations
- Comprehensive testing suite (254 tests)
- Extensive documentation (INSTALLER_GUIDE.md, VARIANT_CONFIGURATION.md)
- Package validation system

**Action Required:**
- None for existing installations - upgrade is seamless
- **New users**: Use interactive installer (`npm install -g @amrhas82/agentic-kit && agentic-kit install`)
- **Existing users**: Continue using existing installation methods

**To Upgrade:**
```bash
# Via GitHub
/plugin update github:amrhas82/agentic-kit

# Via npm
npm update @amrhas82/agentic-kit

# Via npx (always latest)
npx @amrhas82/agentic-kit

# New: Interactive installer
npm install -g @amrhas82/agentic-kit
agentic-kit install
```

**What's Different:**
- Skills count: 14 → 22 (8 core + 14 advanced in Pro)
- Installation methods: Now supports 4 tools (Claude, Opencode, Ampcode, Droid)
- Variant sizes documented: Lite (510 KB), Standard (8.4 MB), Pro (9 MB)

---

### From 1.0.0 to 1.1.0

**No breaking changes.** Features and documentation improvements only.

**New:**
- Skills auto-load on session start
- Consolidated documentation in `docs/` directory
- marketplace.json for distribution

**Action Required:**
- None - upgrade is seamless
- Optional: Use lowercase agent syntax (`@master:` instead of `@Master:`)

**To Upgrade:**
```bash
# Via GitHub
/plugin update github:amrhas82/agentic-kit

# Via npm
npm update @amrhas82/agentic-kit

# Via npx (always latest)
npx @amrhas82/agentic-kit
```

---

## Version History

| Version | Date | Key Features |
|---------|------|--------------|
| **1.2.0** | 2025-11-04 | Interactive multi-tool installer, 22 skills, 4 tools support, 254 tests |
| **1.1.0** | 2025-11-02 | Session persistence, docs consolidation, marketplace catalog |
| **1.0.0** | 2025-11-02 | Initial release: 13 agents, 14 skills, 3 variants |

---

## Links

- **GitHub**: https://github.com/amrhas82/agentic-kit
- **npm**: https://www.npmjs.com/package/@amrhas82/agentic-kit
- **Issues**: https://github.com/amrhas82/agentic-kit/issues
- **Releases**: https://github.com/amrhas82/agentic-kit/releases

---

**Maintained by**: amrhas82
**License**: MIT
