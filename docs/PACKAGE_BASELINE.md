# Package Baseline: Claude Code

**Purpose:** This document serves as the baseline reference for the Claude Code package structure, used as a template for creating Opencode, Ampcode, and Droid packages.

**Package Location:** `/packages/claude/`

**Last Updated:** 2025-11-04

---

## Table of Contents

1. [Package Overview](#package-overview)
2. [Agents (13 Total)](#agents-13-total)
3. [Skills (22 Total)](#skills-22-total)
4. [Resources (6 Files)](#resources-6-files)
5. [Hooks (2 Files)](#hooks-2-files)
6. [Agent Prompt Structures](#agent-prompt-structures)
7. [Skill Implementation Patterns](#skill-implementation-patterns)
8. [Resource Formats](#resource-formats)
9. [Hook Integration Points](#hook-integration-points)
10. [Claude-Specific Optimizations](#claude-specific-optimizations)

---

## Package Overview

The Claude package is optimized for **conversational AI-driven code generation** with comprehensive workflow management, document processing, and creative capabilities.

### Variant Configuration

Defined in `packages/claude/variants.json`:

| Variant | Agents | Skills | Use Case |
|---------|--------|--------|----------|
| **Lite** | 3 (master, orchestrator, scrum-master) | 0 | Minimal footprint, basic workflow |
| **Standard** | 13 (all) | 8 (core document/design) | Professional development |
| **Pro** | 13 (all) | 22 (all) | Full-featured, power users |

---

## Agents (13 Total)

All agents follow the Claude Code conversational AI pattern with markdown formatting and command-based interactions.

### Core Workflow Agents (Lite Variant)

1. **master.md**
   - **Description:** Universal task executor for comprehensive task execution across all domains
   - **Purpose:** Primary interface for agentic framework, executes tasks/checklists/templates/workflows
   - **Pattern:** Command-based with `*` prefix (e.g., `*help`, `*task`)
   - **Key Features:** Runtime resource loading, direct execution without persona transformation

2. **orchestrator.md**
   - **Description:** Multi-agent workflow coordinator and delegation specialist
   - **Purpose:** Manages complex multi-step projects requiring multiple specialized agents
   - **Pattern:** Delegation and coordination across agent teams
   - **Key Features:** Team composition, workflow orchestration, progress tracking

3. **scrum-master.md**
   - **Description:** Agile workflow facilitator and sprint management expert
   - **Purpose:** Manages sprints, daily standups, retrospectives, and agile ceremonies
   - **Pattern:** Agile methodology implementation
   - **Key Features:** Sprint planning, backlog management, velocity tracking

### Specialized Domain Agents (Standard/Pro Variants)

4. **1-create-prd.md**
   - **Description:** Product Requirements Document creation specialist
   - **Purpose:** Creates comprehensive PRDs from user requirements
   - **Pattern:** Structured document generation
   - **Key Features:** Requirement analysis, PRD template application

5. **2-generate-tasks.md**
   - **Description:** Task breakdown and decomposition expert
   - **Purpose:** Converts PRDs into actionable task lists
   - **Pattern:** Hierarchical task decomposition
   - **Key Features:** Task estimation, dependency identification

6. **3-process-task-list.md**
   - **Description:** Task list execution manager with sequential workflow
   - **Purpose:** Manages implementation progress using markdown task lists
   - **Pattern:** Sequential execution, test-first workflow, commit management
   - **Key Features:** One-task-at-a-time execution, test suite validation, git integration

7. **business-analyst.md**
   - **Description:** Business requirements analysis and documentation specialist
   - **Purpose:** Analyzes business needs, creates specifications
   - **Pattern:** Requirements gathering and documentation
   - **Key Features:** Stakeholder analysis, requirement prioritization

8. **full-stack-dev.md**
   - **Description:** Full-stack development expert (frontend + backend + database)
   - **Purpose:** Implements complete features across entire stack
   - **Pattern:** Multi-layer development
   - **Key Features:** API development, UI implementation, database design

9. **holistic-architect.md**
   - **Description:** System architecture and design specialist
   - **Purpose:** Creates architectural decisions, system design documents
   - **Pattern:** Architecture-first approach
   - **Key Features:** Design patterns, scalability planning, technology selection

10. **product-manager.md**
    - **Description:** Product strategy and roadmap management expert
    - **Purpose:** Defines product vision, prioritizes features
    - **Pattern:** Product-led thinking
    - **Key Features:** Roadmap planning, feature prioritization, market analysis

11. **product-owner.md**
    - **Description:** Agile product ownership and backlog management
    - **Purpose:** Manages product backlog, defines user stories
    - **Pattern:** Agile product ownership
    - **Key Features:** User story creation, acceptance criteria, backlog refinement

12. **qa-test-architect.md**
    - **Description:** Test strategy and quality assurance specialist
    - **Purpose:** Designs test plans, ensures quality standards
    - **Pattern:** Test-first approach
    - **Key Features:** Test coverage analysis, CI/CD integration, quality metrics

13. **ux-expert.md**
    - **Description:** User experience and interface design specialist
    - **Purpose:** Creates UX designs, wireframes, user flows
    - **Pattern:** User-centered design
    - **Key Features:** Wireframing, usability testing, design systems

---

## Skills (22 Total)

Skills are directory-based with `SKILL.md` as entry point plus supporting scripts/templates.

### Core Skills (Standard Variant - 8 Total)

#### Document Processing Skills

1. **pdf/**
   - **Description:** Comprehensive PDF manipulation toolkit
   - **Core Capabilities:** Extract text/tables, create PDFs, merge/split, handle forms
   - **Technologies:** pypdf (Python), pdf-lib (JavaScript)
   - **Files:** SKILL.md, reference.md, forms.md, scripts/*.py
   - **Use Case:** PDF form filling, document generation, batch processing

2. **docx/**
   - **Description:** Word document creation and manipulation
   - **Core Capabilities:** Create .docx files, modify templates, extract content
   - **Technologies:** python-docx, Open XML SDK
   - **Files:** SKILL.md, docx-js.md, ooxml.md, scripts/*.py, schemas/
   - **Use Case:** Report generation, template-based documents, content extraction

3. **xlsx/**
   - **Description:** Excel spreadsheet operations
   - **Core Capabilities:** Create spreadsheets, formulas, charts, data processing
   - **Technologies:** openpyxl (Python)
   - **Files:** SKILL.md, recalc.py
   - **Use Case:** Data analysis, financial reports, automated spreadsheets

4. **pptx/**
   - **Description:** PowerPoint presentation creation
   - **Core Capabilities:** Create slides, add content, themes, export
   - **Technologies:** python-pptx, Open XML
   - **Files:** SKILL.md, html2pptx.md, ooxml.md, scripts/*.py
   - **Use Case:** Automated presentations, reporting dashboards, slide generation

#### Design & Branding Skills

5. **canvas-design/**
   - **Description:** Design canvas for graphics, diagrams, visual content
   - **Core Capabilities:** Create graphics, diagrams, infographics
   - **Technologies:** Canvas API, custom fonts
   - **Files:** SKILL.md, canvas-fonts/ (50+ fonts)
   - **Use Case:** Marketing graphics, diagrams, social media content

6. **theme-factory/**
   - **Description:** Design theme creation and management
   - **Core Capabilities:** Generate color schemes, typography, brand themes
   - **Technologies:** Custom theme templates
   - **Files:** SKILL.md, themes/*.md, theme-showcase.pdf
   - **Use Case:** Brand identity, design systems, consistent styling

7. **brand-guidelines/**
   - **Description:** Brand guideline document generation
   - **Core Capabilities:** Create brand style guides, logo usage, color palettes
   - **Technologies:** Template-based generation
   - **Files:** SKILL.md
   - **Use Case:** Brand documentation, design handoffs, style guides

#### Communication Skill

8. **internal-comms/**
   - **Description:** Internal communication content creation
   - **Core Capabilities:** Newsletters, announcements, FAQs, updates
   - **Technologies:** Markdown templates
   - **Files:** SKILL.md, examples/*.md
   - **Use Case:** Company communications, team updates, documentation

### Additional Skills (Pro Variant Only - 14 Total)

#### Creative Skills

9. **algorithmic-art/**
   - **Description:** Generative art and algorithmic design
   - **Files:** SKILL.md, LICENSE.txt, templates/*.js, templates/viewer.html

10. **slack-gif-creator/**
    - **Description:** Animated GIF creation for Slack/messaging
    - **Files:** SKILL.md, core/*.py, templates/*.py, requirements.txt

#### Development Skills

11. **artifacts-builder/**
    - **Description:** Web artifact creation (React, Tailwind, shadcn)
    - **Files:** SKILL.md, scripts/*.sh, scripts/shadcn-components.tar.gz

12. **code-review/**
    - **Description:** Automated code review and analysis
    - **Files:** SKILL.md, code-reviewer.md

13. **mcp-builder/**
    - **Description:** Model Context Protocol (MCP) server builder
    - **Files:** SKILL.md, reference/*.md, scripts/*.py

14. **skill-creator/**
    - **Description:** Create new skills for Claude Code
    - **Files:** SKILL.md, scripts/*.py

#### Testing & Debugging Skills

15. **condition-based-waiting/**
    - **Description:** Wait for specific conditions in automated tests
    - **Files:** SKILL.md, example.ts

16. **root-cause-tracing/**
    - **Description:** Trace root cause of bugs and issues
    - **Files:** SKILL.md, find-polluter.sh

17. **systematic-debugging/**
    - **Description:** Structured debugging methodology
    - **Files:** SKILL.md, test-*.md

18. **test-driven-development/**
    - **Description:** TDD methodology and implementation
    - **Files:** SKILL.md

19. **testing-anti-patterns/**
    - **Description:** Identify and fix testing anti-patterns
    - **Files:** SKILL.md

20. **webapp-testing/**
    - **Description:** Web application testing with Playwright
    - **Files:** SKILL.md, scripts/*.py, examples/*.py

#### Workflow Skills

21. **brainstorming/**
    - **Description:** Facilitated brainstorming sessions
    - **Files:** SKILL.md

22. **verification-before-completion/**
    - **Description:** Pre-completion verification checklist
    - **Files:** SKILL.md

---

## Resources (6 Files)

Resources are shared data files referenced by agents.

### 1. agent-teams.yaml
- **Format:** YAML
- **Purpose:** Define agent team compositions for workflows
- **Structure:**
  ```yaml
  teams:
    team-name:
      bundle:
        name: Team Display Name
        icon: "🚀"
        description: Team purpose
      agents:
        - agent-name
        - "*"  # wildcard for all agents
      workflows:
        - workflow-file.yaml
  ```
- **Use Case:** Pre-configured teams (team-all, team-fullstack, team-ide-minimal)

### 2. checklists.md
- **Format:** Markdown with numbered lists
- **Purpose:** Reusable checklists for common tasks
- **Structure:** Markdown headings with task lists
- **Use Case:** Pre-flight checks, code review, deployment, testing

### 3. data.md
- **Format:** Markdown with structured sections
- **Purpose:** Knowledge base and reference data
- **Structure:** Hierarchical sections with data tables
- **Use Case:** FAQ, documentation, reference information

### 4. task-briefs.md
- **Format:** Markdown with task definitions
- **Purpose:** Pre-defined task templates
- **Structure:** Task name, description, steps
- **Use Case:** Common tasks (create-doc, shard-doc, document-project)

### 5. templates.yaml
- **Format:** YAML
- **Purpose:** Document templates (PRDs, reports, designs)
- **Structure:**
  ```yaml
  template-name:
    name: Display Name
    category: Category Name
    description: Template description
    sections:
      - name: Section Name
        content: Template content
  ```
- **Use Case:** Standardized documents, reports, specifications

### 6. workflows.yaml
- **Format:** YAML
- **Purpose:** Multi-step workflow definitions
- **Structure:**
  ```yaml
  workflow-name:
    name: Workflow Display Name
    description: Workflow purpose
    steps:
      - agent: agent-name
        task: Task description
  ```
- **Use Case:** Brownfield/greenfield projects, full-stack/service/UI development

---

## Hooks (2 Files)

Hooks are JavaScript files that execute at specific lifecycle events.

### 1. register-agents.js
- **Purpose:** Register agents with Claude Code system
- **Trigger:** At startup
- **Functionality:** Loads agent metadata, validates configurations
- **Integration Point:** Claude Code agent registry

### 2. session-start.js
- **Purpose:** Initialize session with custom configuration
- **Trigger:** At session start
- **Functionality:** Sets up environment, loads preferences, displays welcome
- **Integration Point:** Claude Code session lifecycle

---

## Agent Prompt Structures

All Claude agents follow this structure:

```markdown
---
name: agent-name
description: Brief description for agent selection
model: inherit
color: red
---

[Introduction paragraph with agent identity]

# Core Operating Principles

[Numbered list of key principles]

# Commands

- **\*command-name** - Command description
- **\*another-command** - Another command

# Workflows / Processes

[Detailed workflow descriptions]

# Important Notes

[Critical considerations]
```

### Key Conventions:

1. **YAML Front Matter:** Required metadata (name, description, model, color)
2. **Commands:** Prefix with `*` for agent-specific commands
3. **Markdown Formatting:** Extensive use of headings, lists, code blocks
4. **Conversational Tone:** Written for natural conversation with Claude
5. **Resource References:** Relative paths to resources (`../resources/`)
6. **Numbered Lists:** Preference for numbered lists over bullets

---

## Skill Implementation Patterns

Skills follow a standard directory structure:

```
skill-name/
├── SKILL.md          # Entry point, usage guide (required)
├── LICENSE.txt       # License information (if proprietary)
├── reference.md      # Detailed API/library documentation (optional)
├── requirements.txt  # Python dependencies (if applicable)
├── scripts/          # Implementation scripts (Python, JavaScript, Bash)
│   ├── __init__.py
│   └── *.py
├── templates/        # Code templates, HTML viewers
└── examples/         # Usage examples
```

### SKILL.md Format:

```markdown
---
name: skill-name
description: Brief description of skill capabilities
license: Proprietary/MIT/etc.
---

# Skill Name

## Overview

[What the skill does]

## Quick Start

[Simple example]

## Core Features

[Detailed feature descriptions with code examples]

## Advanced Usage

[Complex scenarios]
```

### Patterns:

1. **Python-First:** Most skills use Python for implementation
2. **Self-Contained:** All dependencies in requirements.txt
3. **Documented Examples:** Examples directory with real usage
4. **Markdown Documentation:** Extensive markdown guides
5. **Script Organization:** Logical grouping in scripts/ directory

---

## Resource Formats

### YAML Resources (agent-teams.yaml, templates.yaml, workflows.yaml)

- **Indentation:** 2 spaces
- **Structure:** Nested dictionaries and lists
- **Keys:** lowercase-with-hyphens
- **Values:** Strings, lists, nested objects

### Markdown Resources (checklists.md, data.md, task-briefs.md)

- **Headings:** ATX style (`#`, `##`, `###`)
- **Lists:** Numbered for steps, bullets for items
- **Code Blocks:** Triple backticks with language identifier
- **Structure:** Hierarchical with clear section boundaries

---

## Hook Integration Points

Hooks integrate with Claude Code lifecycle:

### Register Agents Hook
- **Event:** Application startup
- **Purpose:** Register custom agents with system
- **Interface:** Exports `registerAgents()` function
- **Returns:** Agent metadata array

### Session Start Hook
- **Event:** New conversation session
- **Purpose:** Session initialization and customization
- **Interface:** Exports `onSessionStart()` function
- **Returns:** Session configuration object

---

## Claude-Specific Optimizations

The Claude package is optimized for **conversational AI interactions**:

### 1. Conversational Patterns
- Natural language prompts and responses
- Command-based interactions (` *command` syntax)
- Extensive use of markdown for readability
- Friendly, professional tone

### 2. Markdown-First Approach
- All documentation in markdown
- Agents defined in `.md` files
- Extensive formatting (headings, lists, code blocks)
- Easy human editing and versioning

### 3. Resource-Driven Architecture
- Agents reference shared resources at runtime
- Templates, checklists, tasks as YAML/markdown
- No hardcoded content in agents
- Easy customization and updates

### 4. Multi-Agent Collaboration
- Orchestrator for complex workflows
- Agent teams for specialized projects
- Clear delegation patterns
- Progress tracking and handoffs

### 5. Developer-Friendly
- Extensive code examples
- Multiple programming languages supported
- Clear documentation with examples
- Testing and debugging skills included

---

## Usage Guidelines

When creating packages for other tools (Opencode, Ampcode, Droid):

1. **Keep Agent Structure:** Maintain YAML front matter and command patterns
2. **Adapt Content:** Modify agent prompts for tool-specific workflows
3. **Preserve Core Skills:** Include the 8 core skills in Standard variant
4. **Tool-Specific Skills:** Add/remove skills based on tool focus
5. **Update Descriptions:** Reflect tool-specific use cases
6. **Maintain Variants:** Keep Lite/Standard/Pro structure
7. **Test Integration:** Verify agent and skill functionality
8. **Document Changes:** Update descriptions and metadata

---

## Summary

**Total Components:**
- 13 Agents (3 Lite, 13 Standard/Pro)
- 22 Skills (0 Lite, 8 Standard, 22 Pro)
- 6 Resources (all variants)
- 2 Hooks (all variants)

**Key Characteristics:**
- Conversational AI optimized
- Markdown-first documentation
- Resource-driven architecture
- Multi-agent collaboration
- Comprehensive document processing
- Developer-focused skills

This baseline serves as the foundation for creating consistent, high-quality packages across all agentic-kit tools.
