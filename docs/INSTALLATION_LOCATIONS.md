# Installation Locations

This document explains **where** Agentic Kit files get installed depending on the installation method.

---

## Installation Methods & Locations

### 1. Claude Code Plugin (Recommended)

**Command:**
```bash
/plugin add github:amrhas82/agentic-kit
```

**Install Location:**
```
~/.config/claude-code/plugins/github-amrhas82-agentic-kit/
```

**What's Installed:**
- All plugin files (agents, skills, manifests, hooks)
- Files remain until you uninstall with `/plugin remove`

**How it Works:**
- Claude Code clones the GitHub repository
- Files are placed in Claude's plugin directory
- Agents and skills become available in Claude Code immediately
- Persists across Claude Code sessions

**Verify Installation:**
```bash
ls ~/.config/claude-code/plugins/ | grep agentic-kit
```

---

### 2. npx (Temporary Execution)

**Command:**
```bash
npx @amrhas82/agentic-kit
npx agkit --variant=lite
```

**Install Location:**
```
~/.npm/_npx/[hash]/@amrhas82/agentic-kit/
```

**What's Installed:**
- Package downloaded to npx cache directory
- **TEMPORARY** - cleared when cache is cleaned
- Does NOT install permanently

**How it Works:**
- Downloads package from npm registry
- Caches in npx directory
- Runs the CLI script (cli.js)
- Shows installation instructions
- Files are NOT available after process exits

**This is NOT a permanent installation method!**

npx is designed for:
- Trying the package without installing
- One-time runs
- Testing different variants

**To actually use Agentic Kit, use Claude Code plugin installation instead.**

---

### 3. npm install (Local Project)

**Command:**
```bash
npm install @amrhas82/agentic-kit
```

**Install Location:**
```
./node_modules/@amrhas82/agentic-kit/
```

**What's Installed:**
- All package files in your project's node_modules
- Available as a dependency
- Persists as long as node_modules exists

**How it Works:**
- Downloads package from npm registry
- Installs to local node_modules directory
- Makes files available for require/import
- Typical for Node.js projects

**When to Use:**
- Building a Node.js app that uses Agentic Kit
- Want to version control dependencies (package.json)
- Need local access to files

**Note:** This doesn't make agents available in Claude Code automatically. You still need to use Claude Code plugin installation for that.

---

### 4. npm install -g (Global)

**Command:**
```bash
npm install -g @amrhas82/agentic-kit
```

**Install Location:**
```
# Linux/macOS
/usr/local/lib/node_modules/@amrhas82/agentic-kit/

# Or with nvm
~/.nvm/versions/node/vX.X.X/lib/node_modules/@amrhas82/agentic-kit/

# Windows
%AppData%\npm\node_modules\@amrhas82\agentic-kit\
```

**What's Installed:**
- Package files in global node_modules
- CLI binaries in PATH
- Available system-wide

**How it Works:**
- Downloads package from npm registry
- Installs globally
- Adds `agentic-kit` and `agkit` commands to PATH

**When to Use:**
- Want CLI commands available globally
- Building tools that use Agentic Kit

---

## Comparison Table

| Method | Location | Permanent? | Claude Code? | Use Case |
|--------|----------|------------|--------------|----------|
| **Claude Code Plugin** | `~/.config/claude-code/plugins/` | ✅ Yes | ✅ Yes | **Recommended - Use Agentic Kit in Claude** |
| **npx** | `~/.npm/_npx/[hash]/` | ❌ No (temporary) | ❌ No | Testing, one-time runs |
| **npm install** | `./node_modules/` | ✅ Yes | ❌ No | Node.js project dependency |
| **npm install -g** | `/usr/local/lib/node_modules/` | ✅ Yes | ❌ No | Global CLI access |

---

## How Files Are Structured

When installed, you get:

```
agentic-kit/
├── .claude-plugin/           # Plugin manifests
│   ├── plugin.json           # Main manifest
│   ├── plugin-lite.json      # Lite variant
│   ├── plugin-standard.json  # Standard variant
│   └── plugin-pro.json       # Pro variant
├── agents/                   # All 13 agent definitions
├── skills/                   # All 14 skill definitions
├── hooks/                    # Plugin hooks
│   ├── register-agents.js    # Agent registration
│   └── session-start.js      # Session persistence
├── resources/                # Templates, workflows, data
├── cli.js                    # CLI wrapper
├── index.js                  # Entry point
├── package.json              # npm package info
└── README.md                 # Documentation
```

---

## Finding Your Installation

### Claude Code Plugin
```bash
# Linux/macOS
ls ~/.config/claude-code/plugins/

# macOS alternative
ls ~/Library/Application Support/Claude/plugins/

# Check inside Claude Code
# Type: /plugin list
```

### npx Cache
```bash
# List npx cache
ls ~/.npm/_npx/

# Clear npx cache
rm -rf ~/.npm/_npx
```

### npm Local
```bash
# Check local installation
ls node_modules/@amrhas82/agentic-kit/

# Or use npm
npm list @amrhas82/agentic-kit
```

### npm Global
```bash
# Find global installation
npm list -g @amrhas82/agentic-kit

# Or check directory
npm root -g
```

---

## Uninstalling

### Claude Code Plugin
```bash
/plugin remove github-amrhas82-agentic-kit
```

### npm Local
```bash
npm uninstall @amrhas82/agentic-kit
```

### npm Global
```bash
npm uninstall -g @amrhas82/agentic-kit
```

### npx Cache
```bash
# npx cache is automatically cleaned periodically
# Or force clean:
rm -rf ~/.npm/_npx
```

---

## Package Publishing Locations

When you publish:

### npm.js Registry
```
https://www.npmjs.com/package/@amrhas82/agentic-kit
```

Users download from:
```
https://registry.npmjs.org/@amrhas82/agentic-kit/-/agentic-kit-1.1.0.tgz
```

### GitHub Packages
```
https://github.com/amrhas82/agentic-kit/packages
```

Users download from:
```
https://npm.pkg.github.com/@amrhas82/agentic-kit
```

### GitHub Repository
```
https://github.com/amrhas82/agentic-kit
```

Claude Code clones from:
```
git clone https://github.com/amrhas82/agentic-kit.git
```

---

## Summary

**For most users:**
- **Use Claude Code plugin installation** → Installs to Claude's plugin directory
- This is the recommended method for using Agentic Kit

**For developers:**
- **npm install** (local) → For Node.js projects
- **npm install -g** (global) → For CLI access

**For testing:**
- **npx** → Temporary, doesn't actually install

---

**Where do agents/skills become available?**

Only **Claude Code plugin installation** makes agents and skills available in Claude Code. Other methods just download files but don't integrate with Claude Code.
