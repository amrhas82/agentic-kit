# Agentic Kit v1.2.0 Release Notes

**Release Date**: November 5, 2025
**Type**: Major Feature Release
**Status**: Production Ready

---

## 🎉 What's New

### Interactive Multi-Tool Installer System

The headline feature of v1.2.0 is a complete installation system supporting four AI development tools with three variant levels and comprehensive features:

#### 🚀 Core Features

- **4-Step Interactive Installation**: Guided process from variant selection to completion
- **Multi-Tool Support**: Install Claude, Opencode, Ampcode, and Droid simultaneously
- **Variant Selection**: Choose Lite (510 KB), Standard (8.4 MB), or Pro (9 MB)
- **Real-Time Progress**: Beautiful ANSI progress bars with ETA and transfer speed
- **Automatic Rollback**: Failed installations automatically restore previous state
- **Resume Capability**: Interrupted installations can be resumed from where they stopped
- **Silent Mode**: Perfect for CI/CD pipelines (`--silent --variant=standard --tools=claude`)

#### 📊 Installation Reporting (New in Phase 9)

- **Comprehensive Reports**: Detailed installation reports saved to `~/.agentic-kit-install.log`
  - Success/failure status
  - Per-tool component counts and verification
  - System information and timing data
  - Errors and warnings with context

#### 📈 Anonymous Telemetry (New in Phase 9)

- **Opt-In Only**: Clear consent prompt with transparent data policy
- **Privacy-First**: Only anonymous usage data (variant, tool count, timing, OS)
- **No Personal Data**: Never collects paths, user info, or identifying data
- **Easy Opt-Out**: Use `--no-telemetry` flag or modify config file
- **Local Storage**: Data stored locally, not sent to external servers
- **Full Documentation**: See `docs/PRIVACY.md` for complete details

#### 🔒 Security Hardening (New in Phase 9)

- **Path Traversal Prevention**: Validates all paths to prevent `../../etc/passwd` attacks
- **Symlink Protection**: Resolves and validates symlinks before operations
- **Input Validation**: Whitelisted tool names, variants, and sanitized paths
- **DoS Prevention**: File size limits (1MB) for JSON parsing
- **Null Byte Detection**: Prevents null byte injection in paths and files
- **Secure Permissions**: Sensitive files created with 0600 permissions
- **No Command Injection**: All file operations use Node.js APIs, no shell execution
- **Full Documentation**: See `docs/SECURITY.md` for security measures

#### 🔄 Legacy Migration (New in Phase 9)

- **Automatic Detection**: Finds pre-1.2.0 installations without manifests
- **Smart Classification**: Classifies legacy installations as Lite/Standard/Pro
- **Preserves Customizations**: User-created agents and skills are retained
- **Migration Prompt**: Clear prompts with migration details
- **Rollback Support**: Easy rollback if migration is unwanted
- **Full Documentation**: See `docs/MIGRATION.md` for migration guide

---

## 📦 What's Included

### Tools & Variants

| Tool | Description | Optimization |
|------|-------------|--------------|
| **Claude** | Conversational AI assistant | Markdown-first, conversational patterns |
| **Opencode** | CLI-optimized codegen | Terminal workflows, command-line first |
| **Ampcode** | Amplified development | Maximum velocity, automation |
| **Droid** | Android development | Mobile-first, Android Studio integration |

| Variant | Agents | Skills | Size | Best For |
|---------|--------|--------|------|----------|
| **Lite** | 3 | 0 | 510 KB | CI/CD, minimal setups, testing |
| **Standard** ⭐ | 13 | 8 | 8.4 MB | Most users, document processing |
| **Pro** | 13 | 22 | 9 MB | Advanced users, full feature set |

### Components

- **13 Specialized Agents**: master, orchestrator, story-writer, feature-planner, and more
- **22 Skills**: pdf, docx, xlsx, pptx, canvas-design, theme-factory, and 16 others
- **8 Core Skills** (Standard): Essential document and design tools
- **14 Advanced Skills** (Pro only): Specialized tools for power users

---

## 🚀 Installation

### Quick Start

```bash
# Install globally
npm install -g @amrhas82/agentic-kit

# Run interactive installer
agentic-kit install
```

### Silent Mode (CI/CD)

```bash
# Install Claude with Standard variant
agentic-kit install --silent --variant=standard --tools=claude

# Install all tools with Pro variant
agentic-kit install --silent --variant=pro --tools=claude,opencode,ampcode,droid
```

### Advanced Usage

```bash
# Custom path
agentic-kit install --variant=standard --tools=claude --path claude=~/my-custom-path

# Multiple tools with different paths
agentic-kit install --variant=pro --tools=claude,opencode \
  --path claude=~/.claude-custom \
  --path opencode=~/.opencode-custom

# Disable telemetry
agentic-kit install --no-telemetry

# Uninstall
agentic-kit install --uninstall claude

# Upgrade variant
agentic-kit install --upgrade claude pro
```

---

## 📚 Documentation

### New Documentation (Phase 9)

- **[PRIVACY.md](docs/PRIVACY.md)** - Transparent data collection policy
- **[SECURITY.md](docs/SECURITY.md)** - Security measures and best practices
- **[MIGRATION.md](docs/MIGRATION.md)** - Guide for migrating from < 1.2.0

### Existing Documentation

- **[INSTALLER_GUIDE.md](docs/INSTALLER_GUIDE.md)** - Complete installation guide (850+ lines)
- **[VARIANT_CONFIGURATION.md](docs/VARIANT_CONFIGURATION.md)** - Variant system details
- **[PACKAGE_BASELINE.md](docs/PACKAGE_BASELINE.md)** - Package structure reference
- **[TESTING.md](docs/TESTING.md)** - Testing strategy and execution
- **[INSTALLATION_DEMO.md](docs/INSTALLATION_DEMO.md)** - Visual demo of installer

---

## ✅ Testing & Quality Assurance

### Test Coverage

- **263 Total Tests**: All passing with zero failures
- **9 Validation Tests**: Core module validation (new in Phase 9.6)
- **88 Variant Tests**: Comprehensive variant parsing validation
- **44 Package Tests**: Package manager functionality
- **35 Installation Tests**: Installation engine testing
- **40 Integration Tests**: End-to-end scenarios
- **34 Path Tests**: Path validation and confirmation
- **13 Display Tests**: Summary display verification

### Validation Results

- ✅ All 12 tool/variant combinations validated
- ✅ Zero errors, zero warnings
- ✅ 100% installation success rate
- ✅ Production-ready status confirmed

---

## 🔧 Technical Details

### Architecture

```
agentic-kit/
├── installer/
│   ├── cli.js                    # Interactive CLI
│   ├── package-manager.js        # Variant management
│   ├── installation-engine.js    # File operations
│   ├── verification-system.js    # Post-install validation
│   ├── path-manager.js           # Path validation (enhanced security)
│   ├── state-manager.js          # Resume capability
│   ├── report-template.js        # Report generation (new Phase 9.2)
│   └── telemetry.js             # Anonymous stats (new Phase 9.3)
├── packages/
│   ├── claude/                   # Claude-optimized package
│   ├── opencode/                 # Opencode-optimized package
│   ├── ampcode/                  # Ampcode-optimized package
│   └── droid/                    # Droid-optimized package
└── tests/
    ├── installer/                # 254 installer tests
    └── validation-test.js        # 9 core validation tests (new Phase 9.6)
```

### Requirements

- **Node.js**: 14.0.0 or higher
- **npm**: 6.0.0 or higher
- **Disk Space**:
  - Lite: ~1 MB
  - Standard: ~10 MB
  - Pro: ~12 MB
- **Permissions**: Write access to installation directories

---

## 🐛 Bug Fixes

- Fixed file count mismatches in progress tracking
- Improved error messages for permission issues
- Enhanced path validation for edge cases
- Better handling of interrupted installations
- Resolved symlink-related installation issues

---

## 🔄 Migration from v1.1.x

### Automatic Migration

When you run the installer, it will automatically detect v1.1.x installations and offer to migrate:

```bash
$ agentic-kit install

⚠ Legacy installation detected at ~/.claude
  Found: 13 agents, 5 skills, 1 resource, 2 hooks

Migrate to new installer? (Y/n): y

✓ Migration complete!
```

### What's Preserved

- ✅ All existing agents and skills
- ✅ Custom user-created files
- ✅ Directory structure
- ✅ File permissions

### What's Added

- ➕ `manifest.json` with installation metadata
- ➕ Upgrade/downgrade capability
- ➕ Better uninstall support

See **[MIGRATION.md](docs/MIGRATION.md)** for detailed migration guide.

---

## 🎯 Highlights

### For Developers

- **Faster Installation**: Optimized file operations with progress tracking
- **Better Debugging**: Comprehensive reports and error messages
- **CI/CD Ready**: Silent mode with exit codes and automation support
- **Security First**: Path traversal prevention and input validation
- **Resume Support**: Never lose progress on interrupted installations

### For Teams

- **Multi-Tool Management**: Install and manage 4 tools from one installer
- **Variant Flexibility**: Easy upgrades between Lite/Standard/Pro
- **Consistent Structure**: All tools follow same structure (13 agents, 22 skills)
- **Tool-Specific Optimization**: Each tool optimized for its platform
- **Quality Assurance**: 263 tests ensure reliability

### For Organizations

- **Privacy-Focused**: Transparent telemetry with easy opt-out
- **Security-Hardened**: Comprehensive security measures documented
- **Migration Path**: Clear upgrade path from older versions
- **Documentation**: Extensive guides for all features
- **Production-Ready**: 100% validation, zero errors

---

## 📊 Statistics

- **Lines of Code**: ~8,500 (installer system)
- **Documentation**: ~5,000 lines across 8 documents
- **Tests**: 263 passing tests
- **Success Rate**: 100% installation success
- **Validation**: 12/12 tool/variant combinations validated
- **Security Checks**: 7 layers of security validation

---

## 🙏 Acknowledgments

This release represents a significant milestone in making Agentic Kit more accessible, secure, and user-friendly. Special thanks to all contributors and users who provided feedback during development.

---

## 📞 Support

- **Documentation**: https://github.com/amrhas82/agentic-kit/docs
- **Issues**: https://github.com/amrhas82/agentic-kit/issues
- **Security**: See [SECURITY.md](docs/SECURITY.md) for vulnerability reporting

---

## 🔮 What's Next (v1.3.0)

Planned features for the next release:

- GUI installer for desktop environments
- Package management (add/remove individual agents and skills)
- Automatic update notifications
- Team/enterprise deployment support
- Additional tool integrations
- Enhanced telemetry dashboard (local-only)
- Performance optimizations

---

**Enjoy Agentic Kit v1.2.0!** 🎉
