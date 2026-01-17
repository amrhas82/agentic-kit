# Agentic Kit

> **AI-powered development toolkit with 13 specialized agents and 22 skills for end-to-end software development**

[![npm version](https://img.shields.io/npm/v/@amrhas82/agentic-kit)](https://www.npmjs.com/package/@amrhas82/agentic-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Supported Tools:**
[![Claude](https://img.shields.io/badge/Claude-Supported-blue?logo=anthropic)](https://claude.ai)
[![Opencode](https://img.shields.io/badge/Opencode-Supported-green)](https://github.com/amrhas82/opencode)
[![Ampcode](https://img.shields.io/badge/Ampcode-Supported-orange)](https://github.com/amrhas82/ampcode)
[![Droid](https://img.shields.io/badge/Droid-Supported-red)](https://github.com/amrhas82/droid)

A comprehensive toolkit featuring specialized AI agents and powerful skills for product management, agile development, content creation, and design. **Now with an interactive multi-tool installer** supporting Claude, Opencode, Ampcode, and Droid.

---

## 🚀 Quick Start

### Interactive Installer (Recommended)

Install Agentic Kit with the interactive multi-tool installer:

```bash
# Install globally
npm install -g @amrhas82/agentic-kit

# Run interactive installer
agentic-kit install
```

The installer guides you through:
1. **Select Variant** - Lite, Standard, or Pro
2. **Select Tools** - Claude, Opencode, Ampcode, Droid (or all)
3. **Configure Paths** - Use defaults or customize
4. **Install** - Watch real-time progress

**Silent Installation (CI/CD):**
```bash
agentic-kit install --silent --variant=standard --tools=claude
```

📖 **[Full Installation Guide →](docs/INSTALLER_GUIDE.md)**
🎬 **[Visual Demo (ASCII) →](docs/INSTALLATION_DEMO.md)** - See the installer in action!

### Variants

 | Variant | Agents | Skills | Size | Best For |                                                            
 |---------|--------|--------|------|----------|                                                            
 | **Lite** | 4 (1-create-prd, 2-generate-tasks, 3-process-task-list, master) | 8 (docx, pdf, code-review, brainstorming, root-cause-tracing, mcp-builder, systematic-debugging, skill-creator) | 510 KB | Minimal setup, CI/CD,testing                                                                                     
 | **Standard** ⭐ | 9 (Lite + orchestrator, quality-assurance, code-developer, market-researcher, ui-designer ) | 12 (Lite + webapp-testing, xlsx, verification-before-completion) | 8.4 MB | Most users, document processing|
 | **Pro** | 13 (Standard + feature-planner, backlog-manager, story-writer, system-architect) | 22 (Standard + pptx, theme-factory, brand-guidelines, internal-comms, canvas-design, artifacts-builder, algorithmic-art, test-driven-development, testing-anti-patterns, condition-based-waiting, slack-gif-creator) | 9 MB | Advanced users, full features|                                                                    

### Supported Tools

- **Claude** - Conversational AI, markdown-first workflows
- **Opencode** - CLI-optimized code generation
- **Ampcode** - Amplified development, maximum velocity
- **Droid** - Android-first mobile development

### Start Using

```bash
# Get help
@master: help

# Create a Product Requirements Document
@feature-planner: Create a PRD for a task management app

# Generate development tasks
@generate-tasks: Break down this feature into tasks

# Process task list
@process-task-list: Execute this task list
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[INSTALLER_GUIDE.md](docs/INSTALLER_GUIDE.md)** | 📦 Complete installation guide with troubleshooting |
| **[INSTALLATION_DEMO.md](docs/INSTALLATION_DEMO.md)** | 🎬 Visual demo with ASCII art showing installer in action |
| **[KNOWLEDGE_BASE.md](docs/KNOWLEDGE_BASE.md)** | Complete reference: all agents, skills, architecture |
| **[QUICK-START.md](QUICK-START.md)** | 15-minute onboarding guide |
| **[VARIANTS.md](VARIANTS.md)** | Compare variants and choose the right one |
| **[VARIANT_CONFIGURATION.md](docs/VARIANT_CONFIGURATION.md)** | Variant system details and customization |
| **[PACKAGE_VALIDATION_REPORT.md](docs/PACKAGE_VALIDATION_REPORT.md)** | Package validation and quality report |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues and solutions |
| **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** | Contribution guidelines |
| **[PUBLISHING.md](docs/PUBLISHING.md)** | Publishing guide for maintainers |

---

## ⚙️ Installation Options

### Option 1: Interactive Installer ⭐ (Recommended)

**Multi-Tool Support:** Install for Claude, Opencode, Ampcode, or Droid

```bash
# Install package globally
npm install -g @amrhas82/agentic-kit

# Run interactive installer
agentic-kit install
```

**Features:**
- 🎯 Choose variant (Lite/Standard/Pro)
- 🛠️ Select tools (Claude, Opencode, Ampcode, Droid, or all)
- 📁 Configure installation paths
- 📊 Real-time progress tracking
- ✅ Automatic verification
- 🔄 Rollback on failure

**Advanced Options:**
```bash
# Silent installation for CI/CD
agentic-kit install --silent --variant=standard --tools=claude

# Install multiple tools
agentic-kit install --variant=pro --tools=claude,opencode

# Custom path
agentic-kit install --tools=claude --path claude=/custom/path

# Uninstall
agentic-kit install --uninstall --tools=claude
```

📖 **[See Full Installation Guide](docs/INSTALLER_GUIDE.md)** for detailed instructions, troubleshooting, and FAQ

### Option 2: Claude Code via GitHub

Install directly from GitHub (no marketplace approval needed):

```bash
/plugin add github:amrhas82/agentic-kit
```

**Advantages:** Instant access, always latest version, no waiting

### Option 3: npx (Run Temporarily)

Run the CLI without installing (doesn't install to your system):

```bash
# Standard variant
npx @amrhas82/agentic-kit

# Other variants
npx agkit --variant=lite
npx agkit --variant=pro
```

**Note:** `npx` downloads and runs the package temporarily. Nothing is installed permanently.

### Option 4: Marketplace

```bash
/plugin marketplace add github:amrhas82/agentic-kit
```

---

## 🤖 What's Included

### Agents (13 Total)

**Core Orchestration:**
- Master - Central coordination
- Orchestrator - Workflow management
- Story Writer - Agile project management

**Product & Requirements:**
- Feature Planner - Strategy and vision
- Backlog Manager - Backlog management
- Market Researcher - Requirements analysis

**Development:**
- Code Developer - Implementation
- System Architect - System design
- UI Designer - Interface design
- Quality Assurance - Quality assurance

**Specialized Workflows:**
- Create PRD - Generate product requirements
- Generate Tasks - Break down features
- Process Task List - Execute task lists

[See full agent details →](docs/KNOWLEDGE_BASE.md#agents)

### Skills (22 Total)

**Document Processing (Standard & Pro):**
- PDF, DOCX, XLSX, PPTX

**Design & Branding (Standard & Pro):**
- Canvas Design, Theme Factory, Brand Guidelines, Internal Communications

**Advanced (Pro Only - 14 additional skills):**
- Video Production, Audio Transcription, Data Visualization
- Web Scraping, API Integration, Database Query
- Machine Learning, Blockchain Tools, IoT Integration
- Security Audit, Performance Profiling, DevOps Automation
- Cloud Deployment, Code Migration

[See full skill details →](docs/KNOWLEDGE_BASE.md#skills)

---

## 🔧 Key Features

- **✅ Interactive Multi-Tool Installer** - Install for Claude, Opencode, Ampcode, or Droid
- **✅ Variant System** - Choose Lite, Standard, or Pro based on your needs
- **✅ Persistent Skills** - Auto-load on session start
- **✅ Multi-Tool Support** - Same content, optimized for each tool
- **✅ Auto-Discovery** - Agents register automatically
- **✅ Rich Documentation** - Comprehensive guides and examples
- **✅ Production-Ready** - Battle-tested workflows with full validation

---

## 💡 Example Workflows

**Create a Product:**
```
@feature-planner: Create a PRD for a mobile expense tracker
@generate-tasks: Generate implementation tasks from the PRD
@code-developer: Implement the first task
```

**Generate Documents:**
```
@master: Create a PDF report of our Q4 metrics
@master: Generate a branded PowerPoint for the board meeting
```

**Design & Branding:**
```
@ui-designer: Create wireframes for the login flow
@master: Apply our brand guidelines to this design
```

---

## 📦 npm Scripts

Agentic Kit includes several npm scripts for common operations:

### Installation Scripts

```bash
# Run interactive installer
npm run install-interactive

# Uninstall a tool
npm run uninstall-tool
```

### Testing Scripts

```bash
# Run all tests
npm test

# Run installer tests only
npm run test-installer
```

### Validation Scripts

```bash
# Validate package structure
npm run validate

# Validate all tool packages
npm run validate-packages
```

### Publishing Scripts

```bash
# Publish to npm
npm run publish:npm

# Publish to GitHub packages
npm run publish:github

# Publish to both registries
npm run publish:both
```

**CLI Commands** (after global install):

```bash
# Install agents and skills
agentic-kit install

# Install with options
agentic-kit install --variant=standard --tools=claude

# Uninstall
agentic-kit install --uninstall --tools=claude

# Help
agentic-kit install --help
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

**Quick contribution:**
1. Fork the repo
2. Create a feature branch
3. Add your agent or skill
4. Submit a pull request

---

## 📊 Stats

- **13** Specialized Agents
- **22** Powerful Skills
- **3** Variants (Lite/Standard/Pro)
- **4** Supported Tools (Claude, Opencode, Ampcode, Droid)
- **MIT** License
- **Production-Ready** with full validation

---

## 🔗 Links

- **npm:** https://www.npmjs.com/package/@amrhas82/agentic-kit
- **GitHub:** https://github.com/amrhas82/agentic-kit
- **Issues:** https://github.com/amrhas82/agentic-kit/issues
- **Knowledge Base:** [KNOWLEDGE_BASE.md](docs/KNOWLEDGE_BASE.md)

---

## 📄 License

MIT © 2025 amrhas82

---

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or [open an issue](https://github.com/amrhas82/agentic-kit/issues)
