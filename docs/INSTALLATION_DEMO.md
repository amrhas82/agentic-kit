# Agentic Kit Installer Demo

**Visual walkthrough of the interactive multi-tool installer**

This document provides a detailed visual demonstration of the Agentic Kit interactive installer, showing all 4 steps of the installation process with realistic ASCII art mockups.

---

## Demo: Installing Claude with Standard Variant

### Step 1: Launch the Installer

```bash
$ agentic-kit install
```

**Output:**

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║        Agentic Kit Interactive Multi-Tool Installer      ║
║                        Version 1.2.0                     ║
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

---

### Step 2: Select Variant

```
═══════════════════════════════════════════════════════════
Step 1 of 4: Select Variant
═══════════════════════════════════════════════════════════

Available variants:

1. Lite     - Minimal setup with core agents only (~510 KB)
   • 3 agents, 0 skills
   • Best for: Quick experimentation, CI/CD, learning

2. Standard - Recommended setup with agents + core skills (~8.4 MB)
   • 13 agents, 8 skills
   • Best for: Most development workflows, document processing

3. Pro      - Complete setup with all agents and skills (~9 MB)
   • 13 agents, 22 skills
   • Best for: Advanced workflows, full feature access

Select variant (1-3, or 'q' to quit): 2

✓ Selected: Standard (13 agents, 8 skills, ~8.4 MB)
```

---

### Step 3: Select Tools

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
Or type 'all' to install all tools: 1

✓ Selected tools:
  • Claude
```

---

### Step 4: Configure Paths

```
═══════════════════════════════════════════════════════════
Step 3 of 4: Configure Paths
═══════════════════════════════════════════════════════════

Default installation paths:

  Claude: /home/user/.claude/

These paths will be automatically detected by each tool.

Do you want to customize any paths? (y/N): N

✓ Using default paths
```

---

### Step 5: Installation Summary

```
═══════════════════════════════════════════════════════════
Step 4 of 4: Installation Summary
═══════════════════════════════════════════════════════════

Ready to install:

  Variant: Standard (13 agents, 8 skills, 29 files, 8.39 MB)

  Tools:
    ✓ Claude     → /home/user/.claude/

  Total: 29 files, 8.39 MB

This will:
  • Copy 13 agent files
  • Copy 8 skill directories
  • Copy 6 resource files
  • Copy 2 hook files
  • Create manifest.json
  • Verify installation

Do you want to proceed with installation? (Y/n): Y
```

---

### Step 6: Installation Progress

```
Installing Claude (Standard variant)...

Copying agents...
Progress: ████████████████████ 100% (13/13 files)

  ✓ Copied 0-think-process.md
  ✓ Copied 1-fix-process-repl.md
  ✓ Copied 2-write-with-tools.md
  ✓ Copied 3-process-task-list.md
  ✓ Copied 4-generate-tests.md
  ✓ Copied 5-refactor.md
  ✓ Copied 6-autotest-edd.md
  ✓ Copied 7-Master-Orchestrator.md
  ✓ Copied 8-improve-system-prompt.md
  ✓ Copied 9-design-agent.md
  ✓ Copied 10-research-writer.md
  ✓ Copied 11-feature-planner.md
  ✓ Copied 12-story-writer.md

Copying skills...
Progress: ████████████████████ 100% (8/8 directories)

  ✓ Copied pdf/ (142 KB)
  ✓ Copied docx/ (218 KB)
  ✓ Copied xlsx/ (156 KB)
  ✓ Copied pptx/ (203 KB)
  ✓ Copied canvas-design/ (1.2 MB)
  ✓ Copied theme-factory/ (892 KB)
  ✓ Copied brand-guidelines/ (634 KB)
  ✓ Copied internal-comms/ (498 KB)

Copying resources...
Progress: ████████████████████ 100% (6/6 files)

  ✓ Copied agent-teams.yaml
  ✓ Copied checklists.md
  ✓ Copied data.md
  ✓ Copied task-briefs.md
  ✓ Copied templates.yaml
  ✓ Copied workflows.yaml

Copying hooks...
Progress: ████████████████████ 100% (2/2 files)

  ✓ Copied session-start.js
  ✓ Copied register-agents.js

Creating manifest...
  ✓ Created manifest.json

Overall Progress: ████████████████████ 100% (29/29 files, 8.39 MB)

Elapsed time: 12.3s
Transfer rate: 699 KB/s
```

---

### Step 7: Verification

```
Verifying installation...

Checking agents...
Progress: ████████████████████ 100% (13/13 agents)

  ✓ 0-think-process.md - OK (12.4 KB)
  ✓ 1-fix-process-repl.md - OK (10.8 KB)
  ✓ 2-write-with-tools.md - OK (14.2 KB)
  ✓ 3-process-task-list.md - OK (18.7 KB)
  ✓ 4-generate-tests.md - OK (15.3 KB)
  ✓ 5-refactor.md - OK (13.9 KB)
  ✓ 6-autotest-edd.md - OK (16.1 KB)
  ✓ 7-Master-Orchestrator.md - OK (19.4 KB)
  ✓ 8-improve-system-prompt.md - OK (11.6 KB)
  ✓ 9-design-agent.md - OK (17.2 KB)
  ✓ 10-research-writer.md - OK (14.5 KB)
  ✓ 11-feature-planner.md - OK (16.8 KB)
  ✓ 12-story-writer.md - OK (15.1 KB)

Checking skills...
Progress: ████████████████████ 100% (8/8 skills)

  ✓ pdf/ - OK (142 KB, 12 files)
  ✓ docx/ - OK (218 KB, 15 files)
  ✓ xlsx/ - OK (156 KB, 11 files)
  ✓ pptx/ - OK (203 KB, 14 files)
  ✓ canvas-design/ - OK (1.2 MB, 42 files)
  ✓ theme-factory/ - OK (892 KB, 34 files)
  ✓ brand-guidelines/ - OK (634 KB, 28 files)
  ✓ internal-comms/ - OK (498 KB, 22 files)

Checking resources...
Progress: ████████████████████ 100% (6/6 resources)

  ✓ agent-teams.yaml - OK (8.2 KB)
  ✓ checklists.md - OK (12.5 KB)
  ✓ data.md - OK (6.8 KB)
  ✓ task-briefs.md - OK (14.3 KB)
  ✓ templates.yaml - OK (9.7 KB)
  ✓ workflows.yaml - OK (11.4 KB)

Checking hooks...
Progress: ████████████████████ 100% (2/2 hooks)

  ✓ session-start.js - OK (4.2 KB)
  ✓ register-agents.js - OK (6.8 KB)

Checking manifest...
  ✓ manifest.json - Valid (1.8 KB)

Overall: ████████████████████ 100% (29/29 files verified)

All checks passed! ✓
```

---

### Step 8: Installation Complete

```
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║              Installation Complete! ✓                    ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

Installed:
  • Claude Standard → /home/user/.claude/

Summary:
  ✓ 13 agents installed
  ✓ 8 skills installed
  ✓ 6 resources installed
  ✓ 2 hooks installed
  ✓ Manifest created
  ✓ All files verified

Total: 29 files, 8.39 MB
Installation time: 14.7 seconds

Next steps:
  1. Restart your Claude Code session
  2. Skills will auto-load on session start
  3. Use @master: help to get started

Documentation:
  • Installation guide: /home/user/.claude/README.md
  • Troubleshooting: https://github.com/amrhas82/agentic-kit/docs/INSTALLER_GUIDE.md

Thank you for installing Agentic Kit!
```

---

## Demo: Silent Installation (CI/CD)

For automated environments, use silent mode:

```bash
$ agentic-kit install --silent --variant=standard --tools=claude
```

**Output:**

```
Agentic Kit Installer v1.2.0
Installing Claude (Standard variant)...
Progress: ████████████████████ 100% (29/29 files)
Verifying: ████████████████████ 100% (29/29 files)
✓ Installation complete: /home/user/.claude/
Total: 29 files, 8.39 MB, 12.3s
```

---

## Demo: Multi-Tool Installation

Installing multiple tools at once:

```bash
$ agentic-kit install --variant=standard --tools=claude,opencode
```

**Output:**

```
═══════════════════════════════════════════════════════════
Installation Summary
═══════════════════════════════════════════════════════════

Ready to install:

  Variant: Standard (13 agents, 8 skills, 29 files, 8.39 MB per tool)

  Tools:
    ✓ Claude     → /home/user/.claude/
    ✓ Opencode   → /home/user/.opencode/

  Total: 58 files, 16.78 MB

Do you want to proceed with installation? (Y/n): Y

Installing Claude (Standard variant)...
Progress: ████████████████████ 100% (29/29 files)

Installing Opencode (Standard variant)...
Progress: ████████████████████ 100% (29/29 files)

Overall Progress: ████████████████████ 100% (58/58 files)

Verification...
  ✓ Claude: 29 files verified
  ✓ Opencode: 29 files verified

╔══════════════════════════════════════════════════════════╗
║              Installation Complete! ✓                    ║
╚══════════════════════════════════════════════════════════╝

Installed:
  • Claude Standard → /home/user/.claude/
  • Opencode Standard → /home/user/.opencode/

Total: 58 files, 16.78 MB
Installation time: 24.6 seconds
```

---

## Demo: Custom Path Installation

Installing to a custom location:

```bash
$ agentic-kit install
```

**Step 3 - Custom Path:**

```
═══════════════════════════════════════════════════════════
Step 3 of 4: Configure Paths
═══════════════════════════════════════════════════════════

Default installation paths:

  Claude: /home/user/.claude/

Do you want to customize any paths? (y/N): y

Enter custom path for Claude (or press Enter for default):
> /opt/agentic-kit/claude

Validating path: /opt/agentic-kit/claude

  ✓ Path is absolute
  ✓ Parent directory exists
  ✓ Write permissions verified
  ✓ Sufficient disk space (50 MB available)
  ⚠ Directory does not exist (will be created)

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

Do you want to proceed with this custom path? (y/N): y

✓ Using custom path: /opt/agentic-kit/claude
```

---

## Demo: Uninstall

Removing an installed tool:

```bash
$ agentic-kit install --uninstall --tools=claude
```

**Output:**

```
Agentic Kit Uninstaller v1.2.0

Found installation:
  • Claude Standard at /home/user/.claude/
    - 13 agents
    - 8 skills
    - 6 resources
    - 2 hooks
    - Total: 29 files, 8.39 MB

⚠ WARNING: This will permanently delete all installed files.

Do you want to proceed with uninstallation? (y/N): y

Uninstalling Claude...

Removing files...
Progress: ████████████████████ 100% (29/29 files)

  ✓ Removed 13 agents
  ✓ Removed 8 skills
  ✓ Removed 6 resources
  ✓ Removed 2 hooks
  ✓ Removed manifest.json
  ✓ Removed installation directory

Uninstallation complete! ✓

Removed:
  • Claude Standard from /home/user/.claude/

Total: 29 files deleted, 8.39 MB freed
```

---

## Demo: Upgrade from Lite to Standard

Upgrading an existing installation:

```bash
$ agentic-kit install --variant=standard --tools=claude
```

**Output:**

```
Agentic Kit Installer v1.2.0

Existing installation detected:
  • Claude Lite at /home/user/.claude/
    - 3 agents
    - 0 skills
    - Installed: 2025-11-02

Upgrade to Claude Standard?
  From: Lite (3 agents, 0 skills, 11 files, 510 KB)
  To:   Standard (13 agents, 8 skills, 29 files, 8.39 MB)

This will add:
  + 10 agents
  + 8 skills (pdf, docx, xlsx, pptx, canvas-design, theme-factory,
               brand-guidelines, internal-comms)

Do you want to proceed with upgrade? (Y/n): Y

Upgrading Claude from Lite to Standard...

Installing additional agents...
Progress: ████████████████████ 100% (10/10 files)

Installing skills...
Progress: ████████████████████ 100% (8/8 directories)

Updating manifest...
  ✓ Updated manifest.json

Verification...
  ✓ 13 agents verified
  ✓ 8 skills verified
  ✓ All files accessible

╔══════════════════════════════════════════════════════════╗
║                Upgrade Complete! ✓                       ║
╚══════════════════════════════════════════════════════════╝

Upgraded:
  • Claude: Lite → Standard at /home/user/.claude/

Changes:
  • Agents: 3 → 13 (+10)
  • Skills: 0 → 8 (+8)
  • Total size: 510 KB → 8.39 MB

Installation time: 15.2 seconds
```

---

## Demo: Error Handling

### Insufficient Disk Space

```
Installing Claude (Standard variant)...

ERROR: Insufficient disk space
  Required: 50 MB
  Available: 30 MB
  Location: /home/user/.claude/

Installation aborted.

Suggestions:
  1. Free up disk space and try again
  2. Install to a different location with more space:
     agentic-kit install --path claude=/mnt/external/.claude
  3. Use Lite variant (only 510 KB):
     agentic-kit install --variant=lite

No files were created.
```

### Permission Denied

```
Installing Claude (Standard variant)...

ERROR: Permission denied
  Cannot write to: /opt/agentic-kit/claude/
  User: user
  Required: Write permissions

Installation aborted.

Suggestions:
  1. Run with appropriate permissions:
     sudo agentic-kit install --tools=claude --path claude=/opt/agentic-kit/claude
  2. Install to a writable location:
     agentic-kit install  (uses ~/.claude/ by default)

No files were created.
```

### Installation Interrupted

```
Installing Claude (Standard variant)...

Copying agents...
Progress: ████████░░░░░░░░░░░░ 45% (6/13 files)
^C

Installation interrupted by user.

Rollback in progress...
  ✓ Removed partial installation
  ✓ Cleaned up temporary files

Installation state saved to: /home/user/.agentic-kit-state.json

To resume installation later, run:
  agentic-kit install

No files were left behind.
```

---

## Features Demonstrated

✓ **Interactive 4-step process**
  - Variant selection
  - Tool selection
  - Path configuration
  - Installation summary

✓ **Real-time progress tracking**
  - ANSI progress bars
  - File-by-file feedback
  - Transfer statistics

✓ **Verification**
  - Post-installation checks
  - File integrity validation
  - Size verification

✓ **Multi-tool support**
  - Install multiple tools
  - Isolated installations
  - Consistent experience

✓ **Silent mode**
  - CI/CD friendly
  - Non-interactive
  - Scriptable

✓ **Error handling**
  - Clear error messages
  - Helpful suggestions
  - Automatic rollback

✓ **Upgrade/downgrade**
  - Between variants
  - Preserves existing files
  - Clear change summary

✓ **Uninstall**
  - Complete removal
  - Confirmation prompts
  - Clean cleanup

---

## Installation Time Benchmarks

| Variant | Files | Size | Time | Rate |
|---------|-------|------|------|------|
| Lite | 11 | 510 KB | ~10s | 51 KB/s |
| Standard | 29 | 8.4 MB | ~30s | 286 KB/s |
| Pro | 43 | 9 MB | ~60s | 153 KB/s |

**Note**: Times vary based on system performance and disk speed.

---

## Quick Reference

**Basic Installation:**
```bash
npm install -g @amrhas82/agentic-kit
agentic-kit install
```

**Silent Installation:**
```bash
agentic-kit install --silent --variant=standard --tools=claude
```

**Multi-Tool:**
```bash
agentic-kit install --variant=pro --tools=all
```

**Custom Path:**
```bash
agentic-kit install --tools=claude --path claude=/custom/path
```

**Uninstall:**
```bash
agentic-kit install --uninstall --tools=claude
```

**For more details, see [INSTALLER_GUIDE.md](./INSTALLER_GUIDE.md)**
