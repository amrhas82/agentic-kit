# Agentic Kit Installer Guide

**Version**: 1.2.0
**Last Updated**: 2025-11-04

A comprehensive guide to installing and managing Agentic Kit tools using the interactive multi-tool installer.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Installation Process](#installation-process)
3. [Variant Selection](#variant-selection)
4. [Tool Selection](#tool-selection)
5. [Custom Path Configuration](#custom-path-configuration)
6. [Common Installation Scenarios](#common-installation-scenarios)
7. [Command-Line Flags](#command-line-flags)
8. [Troubleshooting](#troubleshooting)
9. [FAQ](#faq)

---

## Quick Start

### Prerequisites

- **Node.js**: Version 14.0.0 or higher
- **npm**: Version 6.0.0 or higher
- **Disk Space**: At least 50 MB free
- **Permissions**: Write access to installation directories

### Installation

```bash
# Install Agentic Kit globally
npm install -g @amrhas82/agentic-kit

# Run the interactive installer
agentic-kit install
```

The installer will guide you through 4 simple steps:
1. **Select Variant** (Lite, Standard, or Pro)
2. **Select Tools** (Claude, Opencode, Ampcode, Droid)
3. **Configure Paths** (Use defaults or customize)
4. **Install** (Watch real-time progress)

---

## Installation Process

### Step 1: Launch the Installer

```bash
agentic-kit install
```

You'll see the welcome screen:

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        Agentic Kit Interactive Multi-Tool Installer      ║
║                                                          ║
║        Install AI agents and skills for multiple tools   ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

Available Tools:
  • Claude     - Conversational AI with markdown-first workflows
  • Opencode   - CLI-optimized code generation
  • Ampcode    - Amplified development with maximum velocity
  • Droid      - Android-first mobile development

Let's get started!
```

### Step 2: Select Variant

Choose the variant that matches your needs:

```
═══════════════════════════════════════════════════════════
Step 1 of 4: Select Variant
═══════════════════════════════════════════════════════════

Available variants:

1. Lite     - Minimal setup with core agents only (~500 KB)
   Best for: Quick experimentation, learning, resource-constrained systems

2. Standard - Recommended setup with agents + core skills (~8.4 MB)
   Best for: Most development workflows, document processing, design work

3. Pro      - Complete setup with all agents and skills (~9 MB)
   Best for: Advanced workflows, automation, full feature access

Select variant (1-3, or 'q' to quit):
```

**Recommendations**:
- **First-time users**: Start with **Standard** (recommended)
- **Minimal footprint**: Choose **Lite**
- **Power users**: Choose **Pro**

### Step 3: Select Tools

Choose which tools to install:

```
═══════════════════════════════════════════════════════════
Step 2 of 4: Select Tools
═══════════════════════════════════════════════════════════

Available tools:

1. Claude     - Conversational AI (markdown-first workflows)
2. Opencode   - CLI-optimized code generation
3. Ampcode    - Amplified development (maximum velocity)
4. Droid      - Android-first mobile development

Enter tool numbers to install (comma-separated, e.g., 1,2,4):
Or type 'all' to install all tools:
```

**Tips**:
- You can install multiple tools: `1,2,4`
- Install all at once: `all`
- Each tool is isolated (no conflicts)

### Step 4: Configure Paths

Review and customize installation paths:

```
═══════════════════════════════════════════════════════════
Step 3 of 4: Configure Paths
═══════════════════════════════════════════════════════════

Default installation paths:

  Claude:   /home/user/.claude/
  Opencode: /home/user/.opencode/
  Ampcode:  /home/user/.ampcode/
  Droid:    /home/user/.droid/

These paths will be automatically detected by each tool.

Do you want to customize any paths? (y/N):
```

**When to customize**:
- Installing to shared team directory
- Using a specific project structure
- Installing to external drive
- Corporate/enterprise environments

### Step 5: Confirm and Install

Review your selections:

```
═══════════════════════════════════════════════════════════
Step 4 of 4: Installation Summary
═══════════════════════════════════════════════════════════

Ready to install:

  Variant: Standard (13 agents, 8 skills, 29 files, 8.39 MB)

  Tools:
    ✓ Claude     → /home/user/.claude/

  Total: 29 files, 8.39 MB

Do you want to proceed with installation? (Y/n):
```

Watch real-time progress:

```
Installing Claude (Standard variant)...

Progress: ████████████████████ 100%

  ✓ Copied 13 agents
  ✓ Copied 8 skills
  ✓ Copied 6 resources
  ✓ Copied 2 hooks
  ✓ Created manifest

Verification: ████████████████████ 100%

  ✓ Verified 29 files
  ✓ All components accessible
  ✓ Manifest valid

Installation complete! ✓

Installed:
  • Claude Standard → /home/user/.claude/

Total time: 12.3s
```

---

## Variant Selection

### Overview

Agentic Kit offers three variants for each tool, allowing you to choose the right balance of features and disk space.

### Lite Variant

**Size**: ~510 KB
**Components**: 3 agents, 0 skills, 6 resources, 2 hooks
**Total Files**: 11

**What's Included**:
- 3 core agents:
  - `0-think-process` - Thoughtful problem analysis
  - `1-fix-process-repl` - Bug fixing and debugging
  - `2-write-with-tools` - Code generation with tools

**Best For**:
- Learning and experimentation
- Minimal installations
- Resource-constrained systems
- Quick prototyping
- CI/CD environments

**Use Cases**:
- "I want to try Agentic Kit without committing much space"
- "I only need basic code generation"
- "I'm installing on a low-resource server"
- "I want fast installation for testing"

### Standard Variant (Recommended)

**Size**: ~8.4 MB
**Components**: 13 agents, 8 skills, 6 resources, 2 hooks
**Total Files**: 29

**What's Included**:
- All 13 agents (Lite agents + 10 more):
  - `3-process-task-list` - Task management
  - `4-generate-tests` - Test generation
  - `5-refactor` - Code refactoring
  - `6-autotest-edd` - Event-driven testing
  - `7-Master-Orchestrator` - Project orchestration
  - `8-improve-system-prompt` - Prompt optimization
  - `9-design-agent` - Design workflows
  - `10-research-writer` - Research and documentation
  - Plus 5 more specialized agents

- 8 core skills:
  - **Document Processing**: pdf, docx, xlsx, pptx
  - **Design & Branding**: canvas-design, theme-factory, brand-guidelines
  - **Communication**: internal-comms

**Best For**:
- Most development workflows
- Professional development
- Document generation and processing
- Design and branding work
- Team collaboration

**Use Cases**:
- "I need document processing capabilities (PDFs, Word, Excel, PowerPoint)"
- "I want design and branding tools"
- "I'm a professional developer using this daily"
- "I need the recommended feature set"

### Pro Variant

**Size**: ~9 MB
**Components**: 13 agents, 22 skills, 6 resources, 2 hooks
**Total Files**: 43

**What's Included**:
- All Standard variant content PLUS
- 14 advanced skills:
  - `video-production` - Video editing and generation
  - `audio-transcription` - Audio processing
  - `data-visualization` - Charts and graphs
  - `web-scraping` - Data extraction
  - `api-integration` - API development
  - `database-query` - Database operations
  - `machine-learning` - ML workflows
  - `blockchain-tools` - Web3 development
  - `iot-integration` - IoT device integration
  - `security-audit` - Security analysis
  - `performance-profiling` - Performance optimization
  - `devops-automation` - DevOps workflows
  - `cloud-deployment` - Cloud operations
  - `code-migration` - Code migration tools

**Best For**:
- Advanced development workflows
- Full-stack development
- Automation and tooling
- Data science and ML
- DevOps and cloud
- Security and performance work

**Use Cases**:
- "I need advanced capabilities like ML, blockchain, or IoT"
- "I want access to all features"
- "I'm building complex automation workflows"
- "Disk space is not a concern"

### Variant Comparison Table

| Feature | Lite | Standard | Pro |
|---------|------|----------|-----|
| **Size** | 510 KB | 8.4 MB | 9 MB |
| **Agents** | 3 | 13 | 13 |
| **Skills** | 0 | 8 | 22 |
| **Resources** | 6 | 6 | 6 |
| **Hooks** | 2 | 2 | 2 |
| **Files** | 11 | 29 | 43 |
| **Document Processing** | ✗ | ✓ | ✓ |
| **Design Tools** | ✗ | ✓ | ✓ |
| **Advanced Skills** | ✗ | ✗ | ✓ |
| **ML/AI Tools** | ✗ | ✗ | ✓ |
| **DevOps/Cloud** | ✗ | ✗ | ✓ |

### Upgrading Between Variants

You can easily upgrade from Lite → Standard → Pro:

```bash
# Upgrade to a different variant
agentic-kit install

# Select the new variant when prompted
# The installer will detect existing installation and upgrade
```

**Note**: Downgrading (Pro → Standard → Lite) will remove skills and may affect existing workflows.

---

## Tool Selection

### Overview

Agentic Kit supports four AI development tools, each optimized for specific workflows:

### 1. Claude

**Optimization**: `conversational-ai`
**Focus**: Markdown-first, natural language workflows
**Best For**: Conversational development, documentation, research

**Key Features**:
- Natural language interaction
- Markdown-centric workflows
- Rich documentation generation
- Research and analysis
- Collaborative development

**Use Cases**:
- Writing documentation
- Research and analysis
- Content generation
- Conversational code development
- Team collaboration

**Installation Path**: `~/.claude/`

### 2. Opencode

**Optimization**: `cli-codegen`
**Focus**: Terminal-first, command-line workflows
**Best For**: CLI developers, terminal users, automation scripts

**Key Features**:
- Terminal-optimized interface
- Command-line focused workflows
- Script generation
- Shell integration
- DevOps automation

**Use Cases**:
- Terminal-based development
- Script and automation creation
- CLI tool development
- System administration
- DevOps workflows

**Installation Path**: `~/.opencode/`

### 3. Ampcode

**Optimization**: `amplified-codegen`
**Focus**: Velocity-focused, maximum automation
**Best For**: Rapid development, high-velocity teams, startups

**Key Features**:
- Speed-optimized workflows
- Rapid prototyping
- Bulk code generation
- Automation-first approach
- Productivity acceleration

**Use Cases**:
- Rapid prototyping
- Startup development
- High-velocity sprints
- Bulk code generation
- Productivity maximization

**Installation Path**: `~/.ampcode/`

### 4. Droid

**Optimization**: `mobile-codegen`
**Focus**: Android-first, mobile development patterns
**Best For**: Mobile developers, Android apps, mobile-first projects

**Key Features**:
- Android-optimized workflows
- Mobile UI generation
- Mobile-specific patterns
- Platform-specific optimization
- Mobile testing support

**Use Cases**:
- Android app development
- Mobile-first projects
- Cross-platform mobile apps
- Mobile UI/UX development
- Mobile testing

**Installation Path**: `~/.droid/`

### Tool Selection Guide

**Choose Based on Your Primary Workflow**:

| Primary Work | Recommended Tool |
|--------------|------------------|
| Documentation & Research | Claude |
| Terminal & CLI Development | Opencode |
| Rapid Development & Startups | Ampcode |
| Mobile & Android Development | Droid |

**Multi-Tool Installation**:

You can install multiple tools simultaneously. Each tool is completely isolated with no conflicts:

```bash
# Example: Install Claude and Opencode
agentic-kit install
# Select tools: 1,2

# Example: Install all tools
agentic-kit install
# Select tools: all
```

**Benefits of Multi-Tool Setup**:
- Switch between workflows seamlessly
- Use different tools for different projects
- Compare approaches and outputs
- Maximize productivity across contexts

---

## Custom Path Configuration

### When to Use Custom Paths

**Default Paths (Recommended)**:
- Claude: `~/.claude/`
- Opencode: `~/.opencode/`
- Ampcode: `~/.ampcode/`
- Droid: `~/.droid/`

**Use Custom Paths When**:
1. **Team Installations**: Shared directory accessible to multiple users
2. **Project-Specific**: Installing within a specific project structure
3. **External Storage**: Using external drive or network storage
4. **Corporate Policy**: Company-mandated installation locations
5. **Version Management**: Multiple versions side-by-side

### Custom Path Flow

When you choose to customize paths, the installer will:

1. **Prompt for Path**:
```
Enter custom path for Claude (or press Enter for default):
> /opt/agentic-kit/claude
```

2. **Validate Path**:
```
Validating path: /opt/agentic-kit/claude

  ✓ Path is absolute
  ✓ Parent directory exists
  ✓ Write permissions verified
  ✓ Sufficient disk space (50 MB available)
  ⚠ Directory does not exist (will be created)
```

3. **Confirm Custom Path**:
```
╔═══════════════════════════════════════════════╗
║            Custom Path Confirmation           ║
╚═══════════════════════════════════════════════╝

Tool: Claude
Proposed Path: /opt/agentic-kit/claude
Default Path:  /home/user/.claude/

This is different from the default path.

Validation Results:
  ✓ Path is valid and writable
  ✓ Sufficient disk space available
  ⚠ Directory will be created

Do you want to proceed with this custom path? (y/N):
```

### Path Validation Rules

The installer validates paths for safety and compatibility:

**Required**:
- ✓ Absolute path (not relative)
- ✓ Parent directory exists
- ✓ Write permissions
- ✓ At least 50 MB free space

**Warnings** (allowed with confirmation):
- ⚠ Directory doesn't exist (will be created)
- ⚠ Directory already exists (may overwrite)

**Errors** (installation blocked):
- ✗ Parent directory missing
- ✗ No write permissions
- ✗ Insufficient disk space

### Path Examples

**Valid Paths**:
```bash
# Home directory (default)
/home/user/.claude/

# Project-specific
/home/user/projects/my-app/.agentic/claude/

# Team shared
/opt/team/ai-tools/claude/

# External drive
/mnt/external/agentic-kit/claude/

# With tilde expansion
~/.config/agentic-kit/claude/
```

**Invalid Paths**:
```bash
# Relative path (missing leading /)
./claude/

# Non-existent parent
/nonexistent/parent/claude/

# System directory without permissions
/usr/bin/claude/

# Windows-style on Linux
C:\Users\user\claude\
```

### Tilde (~) Expansion

The installer automatically expands `~` to your home directory:

```bash
# You enter:
~/.claude/

# Expands to:
/home/user/.claude/
```

### Multiple Tool Paths

Each tool can have its own custom path:

```
Configure Paths:

  Claude:   /opt/agentic/claude/     (custom)
  Opencode: /home/user/.opencode/    (default)
  Ampcode:  /opt/agentic/ampcode/    (custom)
```

---

## Common Installation Scenarios

### Scenario 1: First-Time Installation (Recommended)

**Goal**: Install Claude with recommended settings for general development

```bash
agentic-kit install
```

**Selections**:
1. Variant: `2` (Standard)
2. Tools: `1` (Claude)
3. Paths: `N` (Use defaults)
4. Confirm: `Y`

**Result**:
- Claude Standard installed to `~/.claude/`
- 13 agents, 8 skills, 29 files
- Ready for document processing and design work

### Scenario 2: Minimal Installation

**Goal**: Quick setup with minimal disk usage

```bash
agentic-kit install
```

**Selections**:
1. Variant: `1` (Lite)
2. Tools: `1` (Claude)
3. Paths: `N` (Use defaults)
4. Confirm: `Y`

**Result**:
- Claude Lite installed to `~/.claude/`
- 3 agents, 0 skills, 11 files, 510 KB
- Basic code generation only

### Scenario 3: Multi-Tool Installation

**Goal**: Install Claude and Opencode for different workflows

```bash
agentic-kit install
```

**Selections**:
1. Variant: `2` (Standard)
2. Tools: `1,2` (Claude and Opencode)
3. Paths: `N` (Use defaults)
4. Confirm: `Y`

**Result**:
- Claude Standard → `~/.claude/`
- Opencode Standard → `~/.opencode/`
- Both tools isolated, no conflicts

### Scenario 4: Team/Shared Installation

**Goal**: Install to shared directory for team access

```bash
agentic-kit install
```

**Selections**:
1. Variant: `3` (Pro)
2. Tools: `all` (All tools)
3. Paths: `y` (Customize)
   - Claude: `/opt/team/ai-tools/claude/`
   - Opencode: `/opt/team/ai-tools/opencode/`
   - Ampcode: `/opt/team/ai-tools/ampcode/`
   - Droid: `/opt/team/ai-tools/droid/`
4. Confirm custom paths: `y` (for each)
5. Confirm: `Y`

**Result**:
- All 4 tools with Pro variant
- Installed to shared `/opt/team/ai-tools/`
- Accessible to all team members

### Scenario 5: Silent Installation (Automated)

**Goal**: Automated installation for CI/CD or scripts

```bash
agentic-kit install --silent --variant=standard --tools=claude --path claude=/opt/ci/claude
```

**Result**:
- Non-interactive installation
- Claude Standard → `/opt/ci/claude/`
- No prompts or user interaction

### Scenario 6: Upgrade from Lite to Pro

**Goal**: Upgrade existing Lite installation to Pro

```bash
agentic-kit install
```

**Selections**:
1. Variant: `3` (Pro)
2. Tools: `1` (Claude)
3. Paths: `N` (Use defaults)
4. Confirm: `Y`

**What Happens**:
- Installer detects existing installation
- Adds 14 advanced skills
- Preserves existing 13 agents
- Updates manifest

### Scenario 7: Project-Specific Installation

**Goal**: Install within a specific project

```bash
cd /home/user/projects/my-app
agentic-kit install
```

**Selections**:
1. Variant: `2` (Standard)
2. Tools: `1` (Claude)
3. Paths: `y` (Customize)
   - Claude: `/home/user/projects/my-app/.agentic/claude/`
4. Confirm custom path: `y`
5. Confirm: `Y`

**Result**:
- Claude installed within project directory
- Project-specific isolation
- Can commit `.agentic/` to version control (optional)

---

## Command-Line Flags

### Overview

Agentic Kit installer supports command-line flags for automation, scripting, and advanced usage.

### Basic Flags

#### `--help`

Display help information:

```bash
agentic-kit install --help
```

Output:
```
Agentic Kit Interactive Multi-Tool Installer

Usage:
  agentic-kit install [options]

Options:
  --variant=<name>       Specify variant (lite, standard, pro)
  --tools=<list>         Specify tools (claude, opencode, ampcode, droid, all)
  --path <tool>=<path>   Specify custom installation path for a tool
  --silent               Non-interactive installation
  --yes                  Auto-confirm all prompts
  --config=<file>        Load configuration from file
  --uninstall            Uninstall specified tools
  --help                 Display this help message

Examples:
  agentic-kit install
  agentic-kit install --variant=standard --tools=claude
  agentic-kit install --silent --config=install.json
  agentic-kit install --uninstall --tools=claude
```

#### `--version`

Display version information:

```bash
agentic-kit install --version
```

Output:
```
Agentic Kit Installer v1.2.0
Node.js v18.17.0
Platform: linux-x64
```

### Installation Flags

#### `--variant=<name>`

Specify variant without interactive prompt:

```bash
# Install Lite variant
agentic-kit install --variant=lite

# Install Standard variant
agentic-kit install --variant=standard

# Install Pro variant
agentic-kit install --variant=pro
```

**Valid Values**: `lite`, `standard`, `pro`

#### `--tools=<list>`

Specify tools without interactive prompt:

```bash
# Install single tool
agentic-kit install --tools=claude

# Install multiple tools (comma-separated)
agentic-kit install --tools=claude,opencode

# Install all tools
agentic-kit install --tools=all
```

**Valid Values**: `claude`, `opencode`, `ampcode`, `droid`, `all`

#### `--path <tool>=<path>`

Specify custom installation path for a specific tool:

```bash
# Single tool with custom path
agentic-kit install --tools=claude --path claude=/opt/ai/claude

# Note: For multiple tools with different paths, use --config file instead
```

**Path Requirements**:
- Must be absolute path
- Parent directory must exist
- Must have write permissions

#### `--silent`

Non-interactive installation (requires all parameters specified):

```bash
agentic-kit install --silent --variant=standard --tools=claude
```

**Behavior**:
- No prompts or user interaction
- Uses defaults for unspecified options
- Exits with code 0 on success, 1 on failure
- Ideal for scripts and automation

**Required with --silent**:
- `--variant` (required)
- `--tools` (required)
- `--path` (optional, uses defaults)

#### `--yes` / `-y`

Auto-confirm all prompts:

```bash
agentic-kit install --yes
agentic-kit install -y
```

**Behavior**:
- Still shows interactive prompts
- Automatically answers "yes" to all confirmations
- Useful for quick installations
- Not recommended for custom paths (always review)

#### `--config=<file>`

Load installation configuration from file:

```bash
agentic-kit install --config=install-config.json
```

**Configuration File Format** (`install-config.json`):
```json
{
  "variant": "standard",
  "tools": {
    "claude": {
      "enabled": true,
      "path": "/home/user/.claude/"
    },
    "opencode": {
      "enabled": true,
      "path": "/home/user/.opencode/"
    },
    "ampcode": {
      "enabled": false
    },
    "droid": {
      "enabled": false
    }
  },
  "options": {
    "silent": false,
    "autoConfirm": false
  }
}
```

**Benefits**:
- Reproducible installations
- Team standardization
- Version control configuration
- Complex multi-tool setups

### Uninstall Flags

#### `--uninstall`

Uninstall specified tools:

```bash
# Uninstall single tool
agentic-kit install --uninstall --tools=claude

# Uninstall multiple tools
agentic-kit install --uninstall --tools=claude,opencode

# Uninstall all tools
agentic-kit install --uninstall --tools=all
```

**Behavior**:
- Removes all installed files
- Deletes manifest
- Cleans up installation directory
- Asks for confirmation (unless --yes specified)

**Silent Uninstall**:
```bash
agentic-kit install --uninstall --silent --tools=claude --yes
```

### Flag Combinations

**Common Combinations**:

```bash
# Automated CI/CD installation
agentic-kit install --silent --variant=standard --tools=claude --path claude=/opt/ci/claude

# Quick default installation
agentic-kit install --yes

# Team configuration
agentic-kit install --config=team-config.json --yes

# Clean uninstall
agentic-kit install --uninstall --tools=all --yes
```

### Exit Codes

The installer returns the following exit codes:

- `0` - Success
- `1` - General error
- `2` - Invalid arguments
- `3` - Permission denied
- `4` - Insufficient disk space
- `5` - Installation failed
- `6` - Validation failed
- `130` - User cancelled (Ctrl+C)

**Usage in Scripts**:
```bash
#!/bin/bash

agentic-kit install --silent --variant=standard --tools=claude

if [ $? -eq 0 ]; then
  echo "Installation successful"
else
  echo "Installation failed with code $?"
  exit 1
fi
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Permission Denied"

**Error Message**:
```
✗ Permission denied: Cannot write to /opt/agentic-kit/claude/
```

**Cause**: Insufficient write permissions for installation directory

**Solutions**:

1. **Use default paths** (recommended):
```bash
agentic-kit install
# Select: Use defaults (N)
```

2. **Run with appropriate permissions**:
```bash
sudo agentic-kit install --tools=claude --path claude=/opt/agentic-kit/claude
```

3. **Choose writable location**:
```bash
agentic-kit install
# Customize path to: ~/agentic-kit/claude/
```

4. **Fix directory permissions**:
```bash
sudo chown -R $USER:$USER /opt/agentic-kit
agentic-kit install
```

---

#### Issue: "Insufficient Disk Space"

**Error Message**:
```
✗ Insufficient disk space: Only 30 MB available, need at least 50 MB
```

**Cause**: Not enough free space on target drive

**Solutions**:

1. **Free up disk space**:
```bash
# Check disk usage
df -h

# Clean npm cache
npm cache clean --force

# Remove old installations
rm -rf ~/.claude-old
```

2. **Install to different drive**:
```bash
agentic-kit install
# Customize path to external drive: /mnt/external/.claude/
```

3. **Use Lite variant**:
```bash
agentic-kit install --variant=lite
```

---

#### Issue: "Package Not Found"

**Error Message**:
```
✗ Package validation failed: variants.json not found
```

**Cause**: Corrupted or incomplete npm installation

**Solutions**:

1. **Reinstall package**:
```bash
npm uninstall -g @amrhas82/agentic-kit
npm cache clean --force
npm install -g @amrhas82/agentic-kit
```

2. **Verify installation**:
```bash
npm list -g @amrhas82/agentic-kit
```

3. **Check Node.js version**:
```bash
node --version  # Should be 14.0.0 or higher
```

---

#### Issue: "Installation Stuck/Frozen"

**Symptoms**: Progress bar stops, no activity

**Causes**: Large files, slow filesystem, or system resources

**Solutions**:

1. **Wait longer** (large files take time)
   - Pro variant: ~60 seconds
   - Standard variant: ~30 seconds
   - Lite variant: ~10 seconds

2. **Cancel and retry**:
```bash
# Press Ctrl+C
^C

# Retry installation
agentic-kit install
```

3. **Check system resources**:
```bash
# Check CPU and memory
top

# Check disk I/O
iostat -x 1
```

4. **Install to faster filesystem**:
```bash
# Avoid network drives, use local SSD
agentic-kit install --tools=claude --path claude=/home/user/.claude/
```

---

#### Issue: "Verification Failed"

**Error Message**:
```
✗ Verification failed: Expected 29 files, found 27 files
```

**Cause**: Installation interrupted or filesystem issue

**Solutions**:

1. **Uninstall and reinstall**:
```bash
agentic-kit install --uninstall --tools=claude
agentic-kit install --variant=standard --tools=claude
```

2. **Check filesystem**:
```bash
# Check for errors
dmesg | tail

# Test write access
touch ~/.claude/test-write && rm ~/.claude/test-write
```

3. **Use different path**:
```bash
agentic-kit install --tools=claude --path claude=/tmp/.claude-test/
```

---

#### Issue: "Module Not Found"

**Error Message**:
```
Error: Cannot find module 'installer/cli.js'
```

**Cause**: npm installation issue or wrong working directory

**Solutions**:

1. **Reinstall globally**:
```bash
npm install -g @amrhas82/agentic-kit
```

2. **Check npm prefix**:
```bash
npm config get prefix
# Should be: /usr/local or /home/user/.npm-global
```

3. **Fix npm permissions** (Linux/macOS):
```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

#### Issue: "Tool Not Detecting Installation"

**Symptoms**: Installed successfully but tool doesn't see agents/skills

**Solutions**:

1. **Verify installation location**:
```bash
# Check manifest exists
cat ~/.claude/manifest.json

# Verify contents
ls -la ~/.claude/
```

2. **Restart tool** (if running)

3. **Check tool configuration**:
```bash
# Claude example
cat ~/.claude/config.json

# Ensure paths are correct
```

4. **Reinstall with default paths**:
```bash
agentic-kit install --uninstall --tools=claude
agentic-kit install --variant=standard --tools=claude
# Use default paths
```

---

#### Issue: "ANSI Colors Not Displaying"

**Symptoms**: Strange characters like `\u001b[32m` in output

**Cause**: Terminal doesn't support ANSI colors

**Solutions**:

1. **Use different terminal**:
   - Linux: gnome-terminal, konsole
   - macOS: iTerm2, Terminal.app
   - Windows: Windows Terminal, PowerShell

2. **Disable colors** (if needed):
```bash
NO_COLOR=1 agentic-kit install
```

---

### Getting Help

If you encounter an issue not listed here:

1. **Check logs**:
```bash
cat ~/.agentic-kit-install.log
```

2. **File an issue**:
   - GitHub: https://github.com/amrhas82/agentic-kit/issues
   - Include: OS, Node.js version, error message, installation log

3. **Community support**:
   - Discussions: https://github.com/amrhas82/agentic-kit/discussions
   - Discord: [link if available]

---

## FAQ

### General Questions

#### Q: What is Agentic Kit?

**A**: Agentic Kit is a collection of AI agents and skills that enhance AI-powered development tools like Claude, Opencode, Ampcode, and Droid. It provides pre-built agents for common tasks (code generation, refactoring, testing) and skills for specific capabilities (document processing, design, automation).

#### Q: Which variant should I choose?

**A**:
- **First-time users**: Start with **Standard** (recommended)
- **Just trying it out**: Use **Lite** (minimal)
- **Need all features**: Choose **Pro** (complete)

#### Q: Can I install multiple tools?

**A**: Yes! You can install all 4 tools simultaneously. Each tool is completely isolated with no conflicts. They can even use different variants.

#### Q: How much disk space do I need?

**A**:
- Lite: ~510 KB per tool
- Standard: ~8.4 MB per tool
- Pro: ~9 MB per tool
- Plus: 50 MB minimum free space required

#### Q: Can I upgrade from Lite to Standard or Pro later?

**A**: Yes! Simply run the installer again and select the new variant. The installer will detect your existing installation and upgrade it.

---

### Installation Questions

#### Q: Where are tools installed by default?

**A**:
- Claude: `~/.claude/`
- Opencode: `~/.opencode/`
- Ampcode: `~/.ampcode/`
- Droid: `~/.droid/`

These paths are automatically detected by each tool.

#### Q: Can I install to a custom location?

**A**: Yes! When prompted "Do you want to customize any paths? (y/N)", answer `y` and enter your preferred path. The installer will validate it for you.

#### Q: How long does installation take?

**A**:
- Lite: ~10 seconds
- Standard: ~30 seconds
- Pro: ~60 seconds

Times vary based on system performance.

#### Q: Can I install without user interaction?

**A**: Yes! Use silent mode:
```bash
agentic-kit install --silent --variant=standard --tools=claude
```

#### Q: Do I need sudo/admin permissions?

**A**: Not for default paths (in your home directory). You only need elevated permissions if installing to system directories like `/opt/` or `/usr/local/`.

---

### Variant Questions

#### Q: What's the difference between Standard and Pro?

**A**: Standard includes 8 core skills (document processing, design, branding). Pro adds 14 advanced skills (ML, blockchain, DevOps, security, etc.). Size difference is only ~600 KB.

#### Q: Can I mix variants across tools?

**A**: Yes! You can install Claude Standard, Opencode Lite, and Ampcode Pro simultaneously. Each tool's variant is independent.

#### Q: Will Lite work for professional development?

**A**: Lite is suitable for basic code generation but lacks document processing and advanced features. We recommend Standard for professional use.

#### Q: How do I know what's in each variant?

**A**: Check the [Variant Configuration documentation](./VARIANT_CONFIGURATION.md) for detailed information about what's included in each variant.

---

### Tool Questions

#### Q: Which tool should I use?

**A**:
- **Claude**: General development, documentation, research
- **Opencode**: Terminal/CLI development, scripts
- **Ampcode**: Rapid development, high velocity
- **Droid**: Mobile/Android development

#### Q: Can I use multiple tools in the same project?

**A**: Yes! Tools are isolated and can coexist. Use different tools for different tasks or compare outputs.

#### Q: Do tools share agents and skills?

**A**: No. Each tool has its own isolated installation. This allows tool-specific optimizations.

#### Q: Can I transfer settings between tools?

**A**: Not automatically, but you can manually copy configuration files if tools are compatible.

---

### Uninstall Questions

#### Q: How do I uninstall a tool?

**A**:
```bash
agentic-kit install --uninstall --tools=claude
```

#### Q: Will uninstalling remove my settings?

**A**: By default, yes. To preserve settings, back up your config files first:
```bash
cp ~/.claude/config.json ~/claude-config-backup.json
```

#### Q: Can I uninstall all tools at once?

**A**: Yes:
```bash
agentic-kit install --uninstall --tools=all
```

#### Q: Does uninstall remove the installer itself?

**A**: No. To remove the installer:
```bash
npm uninstall -g @amrhas82/agentic-kit
```

---

### Technical Questions

#### Q: What Node.js version is required?

**A**: Node.js 14.0.0 or higher. Check your version:
```bash
node --version
```

#### Q: Can I install on Windows?

**A**: Yes! The installer supports Windows, macOS, and Linux. Paths are automatically adjusted for each platform.

#### Q: Is internet required during installation?

**A**: No. Once you've installed the npm package, installation works offline. All content is bundled.

#### Q: Can I use this in CI/CD?

**A**: Yes! Use silent mode:
```bash
agentic-kit install --silent --variant=standard --tools=claude --path claude=/opt/ci/claude
```

#### Q: Does installation require compilation?

**A**: No. All content is pre-built JavaScript and Markdown. No compilation needed.

#### Q: Can I run multiple installations simultaneously?

**A**: Not recommended. Run installations sequentially to avoid file conflicts.

---

### Troubleshooting Questions

#### Q: Installation failed. What should I do?

**A**:
1. Check the error message
2. Review the [Troubleshooting section](#troubleshooting)
3. Check logs: `cat ~/.agentic-kit-install.log`
4. Retry with: `agentic-kit install`
5. File an issue if problem persists

#### Q: Tool can't find installed agents. Why?

**A**:
1. Verify installation: `ls ~/.claude/`
2. Check manifest: `cat ~/.claude/manifest.json`
3. Restart tool
4. Reinstall if needed

#### Q: Can I install in a Docker container?

**A**: Yes! Make sure:
- Node.js 14+ is installed
- Write permissions to installation directory
- Sufficient disk space

Example Dockerfile:
```dockerfile
FROM node:18
RUN npm install -g @amrhas82/agentic-kit
RUN agentic-kit install --silent --variant=standard --tools=claude
```

---

### Configuration Questions

#### Q: Where is the installation configuration saved?

**A**: Configuration is saved in:
- Installation manifest: `~/.claude/manifest.json` (per tool)
- Global config: `~/.agentic-kit-config.json`

#### Q: Can I use a configuration file?

**A**: Yes! Create `install-config.json`:
```json
{
  "variant": "standard",
  "tools": {
    "claude": {"enabled": true}
  }
}
```

Then run:
```bash
agentic-kit install --config=install-config.json
```

#### Q: How do I customize which skills are installed?

**A**: Edit the `variants.json` file in the package directory. See [Variant Configuration docs](./VARIANT_CONFIGURATION.md) for details.

---

### Advanced Questions

#### Q: Can I create custom variants?

**A**: Yes! Edit `variants.json` in the package. See the [Variant Configuration documentation](./VARIANT_CONFIGURATION.md).

#### Q: How do I migrate from an old installation?

**A**: Simply run the installer again. If an existing installation is detected, you'll be prompted to upgrade, replace, or install alongside it.

#### Q: Can I install development/beta versions?

**A**: Yes:
```bash
npm install -g @amrhas82/agentic-kit@beta
agentic-kit install
```

#### Q: How do I contribute new agents or skills?

**A**: See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

---

## Additional Resources

- **Package Baseline**: [PACKAGE_BASELINE.md](./PACKAGE_BASELINE.md) - Complete package structure reference
- **Variant Configuration**: [VARIANT_CONFIGURATION.md](./VARIANT_CONFIGURATION.md) - Variant system details
- **Validation Report**: [PACKAGE_VALIDATION_REPORT.md](./PACKAGE_VALIDATION_REPORT.md) - Quality assurance report
- **API Reference**: [API_REFERENCE.md](./API_REFERENCE.md) - Developer API documentation
- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md) - Contributing and development
- **Main README**: [README.md](../README.md) - Project overview

---

## Support

Need help? Here's how to get support:

1. **Documentation**: Check this guide and related docs
2. **Issues**: https://github.com/amrhas82/agentic-kit/issues
3. **Discussions**: https://github.com/amrhas82/agentic-kit/discussions
4. **Email**: support@agentic-kit.dev (if available)

---

**Last Updated**: 2025-11-04
**Installer Version**: 1.2.0
**Maintainer**: @amrhas82
