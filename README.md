# Agentic Toolkit

A comprehensive, production-ready toolkit featuring 13 specialized agents and up to 14 powerful skills for end-to-end software development, product management, and design. Built for teams that need intelligent, collaborative AI agents working together seamlessly.

## Table of Contents

- [Quick Start (5 minutes)](#quick-start)
- [Installation](#installation)
- [Variants](#variants)
- [Agents Overview](#agents-overview)
- [Skills Overview](#skills-overview)
- [Architecture](#architecture)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Documentation Index](#documentation-index)

## Quick Start

### 1. Choose Your Variant

- **Lite**: 3 core agents for essential tasks (smallest footprint)
- **Standard**: All 13 agents + 8 core skills (recommended for most users)
- **Pro**: All 13 agents + all 14 skills (maximum capabilities)

### 2. Installation

**Via Claude Code:**
```
/plugin marketplace add agentic-kit
```

**Via npx:**
```bash
npx agentic-kit              # Standard variant (default)
npx agentic-kit --variant=lite
npx agentic-kit --variant=pro
```

### 3. Your First Task (15 minutes)

1. Open Claude and invoke an agent:
   ```
   @Product Manager: Create a PRD for a task management app
   ```

2. The agent executes with full context from the toolkit

3. Access your results and continue collaborating

See [QUICK-START.md](QUICK-START.md) for detailed walkthrough.

## Installation

### Prerequisites

- Claude account (Free, Claude+ or Pro required for full functionality)
- Internet connection

### Installation Methods

#### Claude Code (Recommended)

```
/plugin marketplace add agentic-kit
```

This installs the Standard variant by default. For other variants:
```
/plugin marketplace add agentic-kit-lite
/plugin marketplace add agentic-kit-pro
```

#### npx (Quick Try)

```bash
# Standard variant (recommended)
npx agentic-kit

# Lite variant
npx agentic-kit --variant=lite

# Pro variant
npx agentic-kit --variant=pro
```

#### Development Installation

```bash
# Clone repository
git clone https://github.com/anthropic/agentic-toolkit.git
cd agentic-kit

# Install dependencies
npm install

# Link locally
npm link
```

### Verification

After installation, verify agents are available:

```
@Master: *help
```

You should see a list of available commands. If agents don't appear, see [Troubleshooting](TROUBLESHOOTING.md).

## Variants

### Comparison Matrix

| Feature | Lite | Standard | Pro |
|---------|------|----------|-----|
| **Agents** | 3 | 13 | 13 |
| **Core Skills** | 1 | 8 | 8 |
| **Advanced Skills** | 0 | 0 | 8 |
| **Size** | ~2MB | ~8MB | ~16MB |
| **Best For** | Explorers | Teams | Power Users |
| **Price** | Free | $9/mo | $29/mo |

### Which Variant Should I Choose?

**Choose Lite if:**
- You're new to AI agents
- You want to explore basic capabilities
- You have minimal disk space
- You only need essential agents

**Choose Standard if:**
- You're building products or features
- Your team needs multiple agent types
- You want comprehensive skill coverage
- You want professional document creation

**Choose Pro if:**
- You need all 16 skills
- You want web app testing, MCP integration
- You need algorithmic art and advanced features
- You want maximum flexibility

See [VARIANTS.md](VARIANTS.md) for detailed comparison and upgrade paths.

## Agents Overview

The toolkit includes 13 specialized agents that work together:

### Core Agents (All Variants)

**Master** - Central orchestration and resource execution
- Universal executor for any task
- Direct access to all agentic resources
- Command-driven interface with *help, *task, *checklist commands

**Orchestrator** - Workflow management and task coordination
- Breaks down complex tasks into steps
- Coordinates between agents
- Tracks progress and dependencies

### Product & Business Agents (Standard/Pro)

**Product Manager** - Product strategy and vision
- Creates product roadmaps
- Defines success metrics
- Analyzes market and competitive landscape

**Product Owner** - Requirements and backlog management
- Writes user stories and acceptance criteria
- Prioritizes backlog
- Manages feature specifications

**Business Analyst** - Business requirements analysis
- Analyzes business needs
- Creates functional specifications
- Documents requirements

### Development Agents (Standard/Pro)

**Full-Stack Developer** - Implementation and coding
- Writes production-quality code
- Handles frontend, backend, database
- Writes tests and documentation

**Holistic Architect** - System design and architecture
- Creates system architecture diagrams
- Designs data models and APIs
- Plans scaling and performance

### Design & Quality Agents (Standard/Pro)

**UX Expert** - User experience and interface design
- Creates wireframes and mockups
- Designs user flows
- Ensures accessibility and usability

**QA Test Architect** - Quality assurance and testing
- Creates comprehensive test strategies
- Designs test cases
- Plans automation and continuous testing

### Workflow Agents (Standard/Pro)

**Scrum Master** - Project management and coordination
- Creates sprint plans
- Facilitates standups
- Tracks velocity and burndown

**Create PRD** - Product Requirements Documents
- Generates structured PRDs
- Follows industry best practices
- Includes success metrics

**Generate Tasks** - Task decomposition
- Breaks features into actionable tasks
- Estimates effort
- Assigns priorities

**Process Task List** - Task tracking
- Manages task lists
- Tracks progress
- Handles task completion

See [AGENTS.md](AGENTS.md) for detailed agent directory with use cases, prerequisites, and examples.

## Skills Overview

The toolkit includes powerful skills that extend agent capabilities:

### Document Processing (All Standard/Pro)

- **PDF** - Extract, merge, split, fill forms, OCR
- **DOCX** - Create, edit, format Word documents
- **XLSX** - Create, analyze, format spreadsheets
- **PPTX** - Create, edit presentations

### Design & Content (All Standard/Pro)

- **Canvas Design** - Create visual designs and artwork
- **Theme Factory** - Apply themes and styling
- **Brand Guidelines** - Apply brand consistency
- **Internal Communications** - Generate internal documents

### Advanced Skills (Pro Only)

- **MCP Builder** - Build Model Context Protocol servers
- **Skill Creator** - Create custom skills
- **Web App Testing** - Test web applications
- **Slack GIF Creator** - Generate animated GIFs
- **Algorithmic Art** - Generate algorithmic art
- **Artifacts Builder** - Build complex HTML artifacts

See [SKILLS.md](SKILLS.md) for complete skill directory, capabilities, use cases, and examples.

## Architecture

### Directory Structure

```
agentic-kit/
├── agents/                    (13 agent definitions)
│   ├── master.md
│   ├── orchestrator.md
│   ├── product-manager.md
│   ├── product-owner.md
│   ├── business-analyst.md
│   ├── full-stack-dev.md
│   ├── holistic-architect.md
│   ├── ux-expert.md
│   ├── qa-test-architect.md
│   ├── scrum-master.md
│   ├── 1-create-prd.md
│   ├── 2-generate-tasks.md
│   └── 3-process-task-list.md
│
├── skills/                    (16 skills, variant-dependent)
│   ├── pdf/
│   ├── docx/
│   ├── xlsx/
│   ├── pptx/
│   ├── canvas-design/
│   ├── theme-factory/
│   ├── brand-guidelines/
│   ├── internal-comms/
│   ├── mcp-builder/           (Pro only)
│   ├── skill-creator/         (Pro only)
│   ├── webapp-testing/        (Pro only)
│   ├── slack-gif-creator/     (Pro only)
│   ├── algorithmic-art/       (Pro only)
│   └── artifacts-builder/     (Pro only)
│
├── resources/                 (Consolidated content)
│   ├── templates/
│   ├── data/
│   ├── utils/
│   └── checklists/
│
├── hooks/                     (Auto-discovery)
│   └── register-agents.js
│
└── .claude-plugin/            (Plugin manifests)
    ├── plugin.json            (Overview)
    ├── plugin-lite.json
    ├── plugin-standard.json
    └── plugin-pro.json
```

### Ultra-Lean Architecture Benefits

- **Modular Design** - Each agent and skill is independent
- **Auto-Discovery** - Agents auto-register via hooks
- **No Runtime Dependencies** - Works without external services
- **Fast Loading** - Minimal startup overhead
- **Easy Extension** - Add custom agents and skills easily

### How Agents Are Registered

1. **Hook Trigger** - Plugin loads `hooks/register-agents.js`
2. **Directory Scan** - Hook scans `agents/` directory
3. **Metadata Extraction** - Parses agent markdown files
4. **Context Registration** - Registers in Claude's context
5. **Auto-Invocation** - Agents appear with @ mention

### How Skills Are Loaded

1. **Manifest Declaration** - Variant manifest lists skills
2. **Path Resolution** - Resolves skill directory paths
3. **Runtime Access** - Skills available to agents
4. **Dynamic Loading** - Load on demand when invoked

See [ARCHITECTURE.md](ARCHITECTURE.md) for technical deep dive.

## Troubleshooting

### Agents Not Appearing in Auto-Invocation

**Problem:** Can't find agents with @ mention

**Solutions:**
1. Verify installation: `@Master: *help`
2. Refresh Claude (F5)
3. Check variant manifest includes your agent
4. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Skills Not Loading

**Problem:** Skill commands don't work

**Solutions:**
1. Verify your variant includes the skill
2. Check skill path in manifest
3. Ensure skill files are present
4. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Reference or Path Issues

**Problem:** Agents reference missing files

**Solutions:**
1. Run validation script: `./validate-references.sh`
2. Reinstall toolkit
3. Report issue with output from validation

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for comprehensive troubleshooting guide.

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting:

- How to add custom agents
- How to add custom skills
- Code style and standards
- Testing requirements
- Submission process

### Quick Contribution Guide

**Add a New Agent:**
1. Create `agents/your-agent-name.md`
2. Follow standard agent format
3. Update variant manifests
4. Test with auto-invocation
5. Submit pull request

**Add a New Skill:**
1. Create `skills/your-skill-name/`
2. Add SKILL.md with documentation
3. Update variant manifests
4. Test integration
5. Submit pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Documentation Index

- **[QUICK-START.md](QUICK-START.md)** - 15-minute onboarding for non-technical users
- **[AGENTS.md](AGENTS.md)** - Complete agent directory with descriptions and use cases
- **[SKILLS.md](SKILLS.md)** - Complete skill directory with capabilities and examples
- **[VARIANTS.md](VARIANTS.md)** - Variant comparison and decision matrix
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical documentation and design
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Developer guide for contributions

## Support

### Getting Help

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
2. Review [QUICK-START.md](QUICK-START.md) for getting started
3. See [AGENTS.md](AGENTS.md) for agent-specific guidance
4. Visit Claude support: https://support.anthropic.com

### Reporting Issues

Include:
- Installation method and variant
- Steps to reproduce
- Error messages or logs
- Output from `./validate-references.sh`

## Version History

- **1.0.0** (Nov 2024) - Initial release
  - 13 agents
  - 16 skills
  - 3 variants (Lite, Standard, Pro)
  - Ultra-lean architecture
  - Comprehensive documentation

## License

Copyright 2024 Anthropic. See LICENSE file for details.

## Roadmap

Planned improvements:
- Additional specialized agents
- Custom skill marketplace
- Enhanced auto-discovery
- Performance optimizations
- Community contributions integration

---

**Version:** 1.0.0
**Last Updated:** Nov 2024
**Status:** Production Ready

Start with [QUICK-START.md](QUICK-START.md) if you're new, or jump to [AGENTS.md](AGENTS.md) to explore available agents.
