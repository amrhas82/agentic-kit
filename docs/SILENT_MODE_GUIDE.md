# Silent Mode and CI/CD Installation Guide

## Overview

The Agentic Kit installer supports **silent mode** (also called **non-interactive mode**) for automated installations in CI/CD pipelines, Docker containers, and other scripted environments. Silent mode eliminates all user prompts and uses sensible defaults or explicitly provided configuration.

## Table of Contents

- [Quick Start](#quick-start)
- [Command-Line Flags](#command-line-flags)
- [Configuration File Format](#configuration-file-format)
- [Exit Codes](#exit-codes)
- [Silent Mode Behavior](#silent-mode-behavior)
- [CI/CD Examples](#cicd-examples)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Basic Silent Installation

```bash
# Install Claude with Lite variant in silent mode
node installer/cli.js --variant lite --tools claude --silent

# Install multiple tools with Standard variant
node installer/cli.js --variant standard --tools claude,opencode --silent
```

### Using Configuration File

```bash
# Create configuration file
cat > install-config.json <<EOF
{
  "variant": "standard",
  "tools": ["claude", "opencode"],
  "paths": {
    "claude": "~/.claude",
    "opencode": "~/.config/opencode"
  },
  "silent": true
}
EOF

# Run installation
node installer/cli.js --config install-config.json
```

## Command-Line Flags

### Required Flags (for non-interactive mode)

| Flag | Description | Example |
|------|-------------|---------|
| `--variant <lite\|standard\|pro>` | Package variant to install | `--variant standard` |
| `--tools <tool1,tool2,...>` | Comma-separated list of tools | `--tools claude,opencode` |

### Optional Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--silent` | Enable silent mode (no prompts) | `--silent` |
| `--non-interactive` | Alias for `--silent` | `--non-interactive` |
| `--yes`, `-y` | Auto-confirm all prompts (alias for `--silent`) | `--yes` |
| `--path <tool>=<path>` | Custom installation path for a tool | `--path claude=/custom/path` |
| `--config <file>` | Load configuration from JSON file | `--config config.json` |

### Utility Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--help`, `-h` | Display help information | `--help` |
| `--uninstall <tool>` | Uninstall a specific tool | `--uninstall claude` |

## Configuration File Format

Configuration files must be valid JSON with the following structure:

```json
{
  "variant": "standard",
  "tools": ["claude", "opencode"],
  "paths": {
    "claude": "~/.claude-custom",
    "opencode": "~/.config/opencode-custom"
  },
  "silent": true
}
```

### Configuration Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `variant` | string | Yes | Package variant: `lite`, `standard`, or `pro` |
| `tools` | array | Yes | List of tools to install (at least 1 required) |
| `paths` | object | No | Custom installation paths per tool |
| `silent` | boolean | No | Enable silent mode (default: `false`) |

### Valid Tool IDs

- `claude` - Claude Code
- `opencode` - Opencode
- `ampcode` - Ampcode
- `droid` - Droid

### Valid Variants

- `lite` - Minimal setup (3 agents, 0 skills) - Best for CI/CD
- `standard` - Standard setup (13 agents, 8 skills) - For most users
- `pro` - Full setup (13 agents, 22 skills) - For advanced users

## Exit Codes

The installer uses standard exit codes for automation:

| Exit Code | Meaning | Description |
|-----------|---------|-------------|
| `0` | Success | Installation completed successfully |
| `1` | Error | Installation failed or invalid input |

### Common Exit Code Scenarios

**Exit Code 0 (Success):**
- All tools installed successfully
- Help information displayed (`--help`)
- Uninstallation completed successfully

**Exit Code 1 (Error):**
- Invalid variant specified
- Invalid tool ID specified
- Missing required arguments (variant or tools)
- Installation failed due to errors
- Pre-installation checks failed
- Missing configuration file
- Invalid JSON in configuration file
- Permission denied errors
- Insufficient disk space

## Silent Mode Behavior

### Automatic Decisions

In silent mode, the installer automatically makes the following decisions:

| Scenario | Interactive Mode | Silent Mode |
|----------|------------------|-------------|
| Pre-installation warnings | Prompt user to continue | Auto-proceed with warning message |
| Installation failure (multi-tool) | Ask Continue/Quit | Auto-continue with remaining tools |
| Custom path validation | Show confirmation dialog | Use path without confirmation |
| Uninstall confirmation | Prompt Yes/No | Skip confirmation (auto-proceed) |
| Interrupted installation resume | Prompt Resume/Fresh | **Not supported** - use interactive mode |

### Default Behaviors

**Default Paths:**
- If no custom path specified via `--path`, uses default paths:
  - Claude: `~/.claude`
  - Opencode: `~/.config/opencode`
  - Ampcode: `~/.config/amp`
  - Droid: `~/.factory`

**Error Handling:**
- **Fail fast**: Exits immediately on pre-installation check failures
- **Continue on partial failure**: Continues with remaining tools if one tool fails
- **Rollback**: Failed installations are automatically rolled back (no partial installs)

### Output in Silent Mode

Silent mode provides minimal output:
- Pre-installation check results
- Installation progress (progress bar)
- Success/failure summary
- Error messages and actionable advice
- Installation report location

No output is suppressed entirely - you'll still see what's happening, just without interactive prompts.

## CI/CD Examples

### GitHub Actions

```yaml
name: Install Agentic Kit

on: [push]

jobs:
  install:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'

      - name: Install Agentic Kit
        run: |
          node installer/cli.js \
            --variant lite \
            --tools claude \
            --silent

      - name: Verify Installation
        run: |
          test -f ~/.claude/manifest.json
          echo "Installation verified successfully"
```

### GitLab CI

```yaml
install_agentic_kit:
  stage: setup
  script:
    - node installer/cli.js --variant standard --tools claude,opencode --silent
    - test -f ~/.claude/manifest.json
    - test -f ~/.config/opencode/manifest.json
  only:
    - main
```

### Jenkins Pipeline

```groovy
pipeline {
    agent any

    stages {
        stage('Install Agentic Kit') {
            steps {
                sh '''
                    node installer/cli.js \
                        --variant lite \
                        --tools claude \
                        --silent
                '''
            }
        }

        stage('Verify Installation') {
            steps {
                sh 'test -f ~/.claude/manifest.json'
            }
        }
    }
}
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy installer
COPY installer/ ./installer/
COPY packages/ ./packages/

# Install in silent mode
RUN node installer/cli.js \
    --variant lite \
    --tools claude \
    --path claude=/app/.claude \
    --silent

# Verify installation
RUN test -f /app/.claude/manifest.json

CMD ["sh"]
```

### Travis CI

```yaml
language: node_js
node_js:
  - "18"

script:
  - node installer/cli.js --variant standard --tools claude --silent
  - test -f ~/.claude/manifest.json
```

### CircleCI

```yaml
version: 2.1

jobs:
  install:
    docker:
      - image: node:18
    steps:
      - checkout
      - run:
          name: Install Agentic Kit
          command: |
            node installer/cli.js \
              --variant lite \
              --tools claude \
              --silent
      - run:
          name: Verify Installation
          command: test -f ~/.claude/manifest.json

workflows:
  version: 2
  install_workflow:
    jobs:
      - install
```

## Advanced Usage

### Using Configuration File in CI/CD

```bash
# Create config file programmatically
cat > /tmp/install-config.json <<EOF
{
  "variant": "${INSTALL_VARIANT:-standard}",
  "tools": ["claude", "opencode"],
  "paths": {
    "claude": "${CLAUDE_PATH:-~/.claude}",
    "opencode": "${OPENCODE_PATH:-~/.config/opencode}"
  },
  "silent": true
}
EOF

# Run installation
node installer/cli.js --config /tmp/install-config.json

# Check exit code
if [ $? -eq 0 ]; then
    echo "Installation successful"
else
    echo "Installation failed"
    exit 1
fi
```

### Multiple Tools with Custom Paths

```bash
node installer/cli.js \
  --variant pro \
  --tools claude,opencode,ampcode \
  --path claude=/opt/ai/claude \
  --path opencode=/opt/ai/opencode \
  --path ampcode=/opt/ai/ampcode \
  --silent
```

### Conditional Installation

```bash
#!/bin/bash

# Only install if not already present
if [ ! -f ~/.claude/manifest.json ]; then
    echo "Installing Claude..."
    node installer/cli.js --variant lite --tools claude --silent

    if [ $? -eq 0 ]; then
        echo "✓ Claude installed successfully"
    else
        echo "✗ Claude installation failed"
        exit 1
    fi
else
    echo "Claude already installed, skipping"
fi
```

## Troubleshooting

### Common Issues

**1. Exit Code 1 with "Invalid variant"**

```bash
# ✗ Wrong
node installer/cli.js --variant basic --tools claude --silent

# ✓ Correct - use lite, standard, or pro
node installer/cli.js --variant lite --tools claude --silent
```

**2. Exit Code 1 with "Invalid tool"**

```bash
# ✗ Wrong
node installer/cli.js --variant lite --tools claude-code --silent

# ✓ Correct - use exact tool IDs
node installer/cli.js --variant lite --tools claude --silent
```

**3. Pre-installation Checks Failed**

If pre-installation checks fail, review the error messages. Common causes:
- **Insufficient disk space**: Free up space or choose a different path
- **Permission denied**: Run with appropriate permissions or choose writable path
- **Missing parent directory**: Create parent directories first

```bash
# Check disk space
df -h ~

# Create parent directory if needed
mkdir -p ~/.config

# Try installation with custom path
node installer/cli.js --variant lite --tools claude --path claude=/tmp/claude --silent
```

**4. Package Validation Failed**

```bash
# Verify packages directory exists
ls -la packages/

# Check package structure
ls -la packages/claude/
ls -la packages/claude/variants.json
```

### Debugging

To debug silent mode issues:

1. **Check exit code:**
```bash
node installer/cli.js --variant lite --tools claude --silent
echo "Exit code: $?"
```

2. **Review installation log:**
```bash
cat ~/.agentic-kit-install.log
```

3. **Test without silent mode first:**
```bash
# Run interactively to see prompts
node installer/cli.js --variant lite --tools claude
```

4. **Verify configuration:**
```bash
# Test config file loading
node -e "console.log(JSON.parse(require('fs').readFileSync('config.json', 'utf8')))"
```

### Getting Help

If you encounter issues:

1. Check this guide for common scenarios
2. Review the installation log at `~/.agentic-kit-install.log`
3. Run with `--help` to see all available options
4. Try interactive mode first to diagnose issues
5. Report issues at: https://github.com/amrhas82/agentic-kit/issues

## Best Practices

### For CI/CD Pipelines

1. **Always use `--silent` flag** to prevent hanging on prompts
2. **Specify explicit paths** to avoid home directory conflicts
3. **Check exit codes** to detect failures
4. **Use Lite variant** for faster CI builds (minimal footprint)
5. **Cache installations** if possible to speed up builds
6. **Verify installation** after completion (check manifest.json exists)

### Example CI/CD Template

```bash
#!/bin/bash
set -e  # Exit on error

# Configuration
VARIANT="${AGENTIC_KIT_VARIANT:-lite}"
TOOLS="${AGENTIC_KIT_TOOLS:-claude}"
INSTALL_PATH="${AGENTIC_KIT_PATH:-/opt/agentic-kit}"

# Run installation
echo "Installing Agentic Kit ($VARIANT variant, tools: $TOOLS)..."
node installer/cli.js \
    --variant "$VARIANT" \
    --tools "$TOOLS" \
    --path claude="$INSTALL_PATH/claude" \
    --silent

# Verify installation
if [ -f "$INSTALL_PATH/claude/manifest.json" ]; then
    echo "✓ Installation successful"
    cat "$INSTALL_PATH/claude/manifest.json" | grep -E '(tool|variant|version)'
else
    echo "✗ Installation verification failed"
    exit 1
fi

echo "Agentic Kit ready for use!"
```

## Summary

Silent mode enables fully automated installations with:
- ✅ No user prompts or interaction
- ✅ Sensible defaults for all decisions
- ✅ Proper exit codes for automation
- ✅ Detailed error messages for troubleshooting
- ✅ Support for configuration files
- ✅ Multi-tool installation support
- ✅ Custom path configuration
- ✅ Automatic rollback on failures
- ✅ Comprehensive logging

Perfect for CI/CD, Docker, and automated deployment scenarios!
