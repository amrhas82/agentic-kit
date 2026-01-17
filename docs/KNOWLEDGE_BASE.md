# Agentic Kit - Knowledge Base

> **Complete reference documentation for the Agentic Kit plugin system**

Last Updated: November 2025 | Version: 1.1.0

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Agents Reference](#agents-reference)
4. [Skills Reference](#skills-reference)
5. [Variants Comparison](#variants-comparison)
6. [Installation & Configuration](#installation--configuration)
7. [Advanced Usage](#advanced-usage)
8. [Development Guide](#development-guide)
9. [Troubleshooting](#troubleshooting)
10. [FAQ](#faq)

---

## Overview

### What is Agentic Kit?

Agentic Kit is a comprehensive plugin for Claude Code that provides:

- **13 Specialized AI Agents** for different development roles
- **14 Powerful Skills** for document generation, design, and automation
- **3 Variants** (Lite, Standard, Pro) for different use cases
- **Persistent Session State** - Skills and agents load automatically
- **Auto-Discovery** - Agents register and become available instantly

### Core Concepts

**Agents** are specialized AI assistants with specific roles and expertise:
- Invoked using `@AgentName: [your request]`
- Each agent has defined capabilities and workflows
- Agents can collaborate and hand off tasks

**Skills** are executable capabilities that agents can use:
- Document generation (PDF, DOCX, XLSX, PPTX)
- Design and branding tools
- Development utilities
- Testing frameworks

**Variants** control which agents and skills are available:
- **Lite**: Minimal footprint (3 agents, 0 skills)
- **Standard**: Balanced (13 agents, 8 skills) - Recommended
- **Pro**: Full feature set (13 agents, 14 skills)

---

## Architecture

### System Design

```
Agentic Kit
├── .claude-plugin/
│   ├── plugin.json              # Main manifest
│   ├── plugin-lite.json         # Lite variant manifest
│   ├── plugin-standard.json     # Standard variant manifest
│   ├── plugin-pro.json          # Pro variant manifest
│   └── marketplace.json         # Marketplace catalog
├── agents/                      # 13 agent definitions
├── skills/                      # 14 skill implementations
├── hooks/
│   ├── register-agents.js       # Plugin-load hook
│   └── session-start.js         # Session-start hook (NEW!)
└── resources/                   # Templates, data, workflows
```

### Plugin Lifecycle

1. **Installation**: User installs via Claude Code or npm
2. **Plugin Load**: `register-agents.js` runs, registers all agents
3. **Session Start**: `session-start.js` runs every time Claude Code starts
   - Loads variant-specific skills
   - Initializes agents
   - Displays startup banner
4. **Runtime**: Agents and skills available for use
5. **Session End**: State persists for next session

### Session-Start Hook (New in v1.0.0)

Inspired by [obra/superpowers](https://github.com/obra/superpowers), we now auto-load skills on every session start:

**Benefits:**
- ✅ Skills always available (no manual activation)
- ✅ Consistent experience across sessions
- ✅ Variant-specific features load automatically
- ✅ Startup feedback shows what's loaded

**How it works:**
```javascript
// hooks/session-start.js
- Loads all skills defined in active variant manifest
- Registers agents for auto-invocation
- Displays banner showing agent/skill counts
- Returns session context
```

---

## Agents Reference

### Core Orchestration Agents

#### 1. Master
**File:** `agents/master.md`
**ID:** `master`
**Variants:** All

**Purpose:** Central coordination and workflow orchestration

**Capabilities:**
- Route requests to appropriate specialized agents
- Coordinate multi-agent workflows
- Provide high-level guidance and help
- Manage complex multi-step tasks

**Example Usage:**
```
@Master: help
@Master: Create a product requirements document for a mobile app
@Master: Show me available agents
```

#### 2. Orchestrator
**File:** `agents/orchestrator.md`
**ID:** `orchestrator`
**Variants:** All

**Purpose:** Workflow management and multi-agent task coordination

**Capabilities:**
- Design multi-agent workflows
- Sequence complex operations
- Handle dependencies between tasks
- Monitor workflow progress

**Example Usage:**
```
@Orchestrator: Plan a workflow for building a new feature
@Orchestrator: Coordinate backend and frontend development
```

#### 3. Scrum Master
**File:** `agents/story-writer.md`
**ID:** `story-writer`
**Variants:** All

**Purpose:** Agile project management and team coordination

**Capabilities:**
- Create and manage user stories
- Plan sprints and iterations
- Facilitate retrospectives
- Track progress and blockers

**Example Usage:**
```
@ScrumMaster: Create user stories for the authentication feature
@ScrumMaster: Plan our next sprint
```

### Product & Requirements Agents

#### 4. Product Manager
**File:** `agents/feature-planner.md`
**ID:** `feature-planner`
**Variants:** Standard, Pro

**Purpose:** Product strategy, vision, and roadmap planning

**Capabilities:**
- Create Product Requirements Documents (PRDs)
- Define product vision and strategy
- Prioritize features and epics
- Conduct market analysis

**Example Usage:**
```
@ProductManager: Create a PRD for a task management app
@ProductManager: Help me prioritize our backlog
```

#### 5. Product Owner
**File:** `agents/backlog-manager.md`
**ID:** `backlog-manager`
**Variants:** Standard, Pro

**Purpose:** Backlog management and requirement refinement

**Capabilities:**
- Refine user stories
- Define acceptance criteria
- Manage product backlog
- Validate story completeness

**Example Usage:**
```
@ProductOwner: Refine this user story with acceptance criteria
@ProductOwner: Review our backlog for completeness
```

#### 6. Business Analyst
**File:** `agents/market-researcher.md`
**ID:** `market-researcher`
**Variants:** Standard, Pro

**Purpose:** Business requirements analysis and strategic insights

**Capabilities:**
- Analyze business requirements
- Conduct competitive research
- Document business processes
- Facilitate stakeholder interviews

**Example Usage:**
```
@BusinessAnalyst: Analyze the market for expense tracking apps
@BusinessAnalyst: Document our customer onboarding process
```

### Development Agents

#### 7. Full-Stack Developer
**File:** `agents/code-developer.md`
**ID:** `code-developer`
**Variants:** Standard, Pro

**Purpose:** Full-stack implementation and code development

**Capabilities:**
- Implement features (frontend + backend)
- Write tests and debug code
- Refactor and optimize
- Follow development best practices

**Example Usage:**
```
@FullStackDev: Implement the login API endpoint
@FullStackDev: Write tests for the authentication flow
```

#### 8. Holistic Architect
**File:** `agents/system-architect.md`
**ID:** `system-architect`
**Variants:** Standard, Pro

**Purpose:** System architecture and technical design

**Capabilities:**
- Design system architecture
- Plan microservices
- Document technical decisions
- Evaluate technology stacks

**Example Usage:**
```
@HolisticArchitect: Design a scalable architecture for our platform
@HolisticArchitect: Recommend a tech stack for our API
```

#### 9. UX Expert
**File:** `agents/ui-designer.md`
**ID:** `ui-designer`
**Variants:** Standard, Pro

**Purpose:** User experience and interface design

**Capabilities:**
- Create wireframes and prototypes
- Design user flows
- Conduct usability analysis
- Define interaction patterns

**Example Usage:**
```
@UXExpert: Create wireframes for the dashboard
@UXExpert: Design the user onboarding flow
```

#### 10. QA Test Architect
**File:** `agents/quality-assurance.md`
**ID:** `quality-assurance`
**Variants:** Standard, Pro

**Purpose:** Quality assurance and testing strategy

**Capabilities:**
- Design test strategies
- Define test cases
- Review code quality
- Assess production readiness

**Example Usage:**
```
@QATestArchitect: Create a test plan for the payment feature
@QATestArchitect: Review this code for quality issues
```

### Specialized Workflow Agents

#### 11. Create PRD
**File:** `agents/1-create-prd.md`
**ID:** `1-create-prd`
**Variants:** Standard, Pro

**Purpose:** Generate Product Requirements Documents

**Capabilities:**
- Structured PRD creation
- Requirements discovery
- Feature documentation
- Stakeholder alignment

**Example Usage:**
```
@CreatePRD: Generate a PRD for a mobile expense tracker
```

#### 12. Generate Tasks
**File:** `agents/2-generate-tasks.md`
**ID:** `2-generate-tasks`
**Variants:** Standard, Pro

**Purpose:** Break down features into implementation tasks

**Capabilities:**
- Convert PRDs to task lists
- Decompose epics into stories
- Estimate effort
- Sequence dependencies

**Example Usage:**
```
@GenerateTasks: Create tasks from this PRD
@GenerateTasks: Break down the authentication epic
```

#### 13. Process Task List
**File:** `agents/3-process-task-list.md`
**ID:** `3-process-task-list`
**Variants:** Standard, Pro

**Purpose:** Execute and track task lists systematically

**Capabilities:**
- Sequential task execution
- Progress tracking
- Commit management
- Test-first workflow

**Example Usage:**
```
@ProcessTaskList: Execute this task list
@ProcessTaskList: Continue from where we left off
```

---

## Skills Reference

### Document Generation Skills (Standard & Pro)

#### PDF
**Path:** `skills/pdf/`
**Variants:** Standard, Pro

**Capabilities:**
- Generate PDF documents
- Manipulate existing PDFs
- Extract text and data
- Merge and split PDFs

#### DOCX
**Path:** `skills/docx/`
**Variants:** Standard, Pro

**Capabilities:**
- Create Word documents
- Apply formatting and styles
- Insert tables and images
- Generate templates

#### XLSX
**Path:** `skills/xlsx/`
**Variants:** Standard, Pro

**Capabilities:**
- Create spreadsheets
- Analyze data
- Generate charts
- Apply formulas

#### PPTX
**Path:** `skills/pptx/`
**Variants:** Standard, Pro

**Capabilities:**
- Create presentations
- Design slides
- Insert media
- Apply themes

### Design & Branding Skills (Standard & Pro)

#### Canvas Design
**Path:** `skills/canvas-design/`
**Variants:** Standard, Pro

**Capabilities:**
- Create visual designs
- Generate artwork
- Apply typography
- Export in multiple formats

#### Theme Factory
**Path:** `skills/theme-factory/`
**Variants:** Standard, Pro

**Capabilities:**
- Create design themes
- Apply styling systems
- Generate color palettes
- Define component styles

#### Brand Guidelines
**Path:** `skills/brand-guidelines/`
**Variants:** Standard, Pro

**Capabilities:**
- Define brand identity
- Apply brand compliance
- Create style guides
- Maintain consistency

#### Internal Communications
**Path:** `skills/internal-comms/`
**Variants:** Standard, Pro

**Capabilities:**
- Create internal documents
- Generate communication templates
- Format company materials
- Apply company branding

### Advanced Skills (Pro Only)

#### Algorithmic Art
**Path:** `skills/algorithmic-art/`
**Variants:** Pro

**Capabilities:**
- Generate generative art
- Create algorithmic designs
- Produce procedural graphics
- Export artwork

#### Artifacts Builder
**Path:** `skills/artifacts-builder/`
**Variants:** Pro

**Capabilities:**
- Build complex HTML artifacts
- Create interactive components
- Generate ShadCN components
- Bundle for deployment

#### MCP Builder
**Path:** `skills/mcp-builder/`
**Variants:** Pro

**Capabilities:**
- Create Model Context Protocol servers
- Define MCP tools and resources
- Build custom integrations
- Package MCP servers

#### Skill Creator
**Path:** `skills/skill-creator/`
**Variants:** Pro

**Capabilities:**
- Create custom skills
- Define skill interfaces
- Document skill usage
- Package for distribution

#### WebApp Testing
**Path:** `skills/webapp-testing/`
**Variants:** Pro

**Capabilities:**
- Test web applications
- Run automated tests
- Validate functionality
- Generate test reports

#### Slack GIF Creator
**Path:** `skills/slack-gif-creator/`
**Variants:** Pro

**Capabilities:**
- Create animated GIFs
- Optimize for Slack
- Apply branding
- Export in optimal format

---

## Variants Comparison

### Feature Matrix

| Feature | Lite | Standard | Pro |
|---------|------|----------|-----|
| **Agents** | 3 | 13 | 13 |
| **Skills** | 0 | 8 | 14 |
| **Document Generation** | ❌ | ✅ | ✅ |
| **Design Tools** | ❌ | ✅ | ✅ |
| **Advanced Skills** | ❌ | ❌ | ✅ |
| **Product Management** | ❌ | ✅ | ✅ |
| **Development Tools** | ❌ | ✅ | ✅ |
| **Size (unpacked)** | ~2 MB | ~7 MB | ~9.5 MB |
| **Installation Time** | <1 min | <3 min | <5 min |

### Which Variant Should You Choose?

**Choose Lite if:**
- You only need basic agent orchestration
- Working in resource-constrained environments
- Building CI/CD pipelines
- Want minimal dependencies

**Choose Standard if:** ⭐ (Recommended)
- General-purpose development
- Need document generation (PDF, DOCX, etc.)
- Product management workflows
- Content creation

**Choose Pro if:**
- Advanced design work
- Building custom skills/tools
- Web app testing
- Maximum capabilities needed

---

## Installation & Configuration

*See [README.md](README.md) for quick installation*

### Advanced Installation

#### Custom Marketplace

Create your own marketplace catalog:

```json
// .claude-plugin/marketplace.json
{
  "name": "My Custom Marketplace",
  "plugins": [
    {
      "name": "agentic-kit-standard",
      "source": "github:amrhas82/agentic-kit"
    }
  ]
}
```

#### Development Setup

Clone and link for development:

```bash
git clone https://github.com/amrhas82/agentic-kit.git
cd agentic-kit
npm link
```

#### Configuration

Variants are configured in manifest files:
- `.claude-plugin/plugin-lite.json`
- `.claude-plugin/plugin-standard.json`
- `.claude-plugin/plugin-pro.json`

---

## Advanced Usage

### Multi-Agent Workflows

Chain agents for complex tasks:

```
# Step 1: Create requirements
@ProductManager: Create a PRD for user authentication

# Step 2: Generate tasks
@GenerateTasks: Break down this PRD into implementation tasks

# Step 3: Execute
@FullStackDev: Implement the first task

# Step 4: Test
@QATestArchitect: Create tests for this implementation
```

### Customization

#### Adding a Custom Agent

1. Create `agents/my-agent.md`
2. Add to variant manifest:
```json
{
  "id": "my-agent",
  "name": "My Agent",
  "description": "Custom agent description",
  "path": "agents/my-agent.md"
}
```
3. Restart session

#### Adding a Custom Skill

1. Create `skills/my-skill/SKILL.md`
2. Implement skill logic
3. Add to variant manifest
4. Restart session

---

## Troubleshooting

### Common Issues

#### Skills Not Loading

**Problem:** Skills don't activate on session start

**Solution:**
- Check `hooks/session-start.js` is in manifest
- Verify skill paths in variant manifest
- Restart Claude Code session
- Check console for errors

#### Agent Not Found

**Problem:** `@AgentName:` doesn't work

**Solution:**
- Verify agent is in your variant (check manifest)
- Check agent file exists in `agents/` directory
- Ensure `register-agents.js` hook ran
- Try reloading plugin

#### Variant Confusion

**Problem:** Wrong skills/agents available

**Solution:**
- Check which variant you installed
- Reinstall with correct variant
- Verify manifest file being used

### Debug Mode

Enable verbose logging:
```bash
# In session-start.js, set:
DEBUG=true
```

---

## FAQ

**Q: Can I use multiple variants simultaneously?**
A: No, only one variant is active per installation. Reinstall to switch variants.

**Q: Do skills persist across sessions?**
A: Yes! The `session-start` hook loads skills automatically.

**Q: Can I create custom agents?**
A: Yes! Add markdown files to `agents/` and update the manifest.

**Q: How do I update to the latest version?**
A: `npm update @amrhas82/agentic-kit` or reinstall via Claude Code.

**Q: Is there a Pro trial?**
A: All variants are free and open-source. Install Pro to try it.

**Q: Can agents collaborate?**
A: Yes! Agents can hand off tasks and work together.

**Q: What's the difference between skills and agents?**
A: Agents are AI assistants with roles. Skills are executable tools agents can use.

---

## Resources

- **GitHub:** https://github.com/amrhas82/agentic-kit
- **npm:** https://www.npmjs.com/package/@amrhas82/agentic-kit
- **Issues:** https://github.com/amrhas82/agentic-kit/issues
- **Detailed Docs:**
  - [AGENTS.md](AGENTS.md) - Complete agent directory
  - [SKILLS.md](SKILLS.md) - Complete skill reference
  - [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
  - [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
  - [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) - Detailed troubleshooting
  - [PUBLISHING.md](PUBLISHING.md) - Publishing guide

---

**Last Updated:** November 2025
**Version:** 1.1.0
**Maintainer:** amrhas82
