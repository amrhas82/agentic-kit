# Subagentic Manual

Production-ready AI agent framework providing specialized subagents, workflow commands, and development skills for **Claude Code**, **OpenCode**, **Ampcode**, and **Droid**. Deploy expert AI personas instantly with zero configuration.

---

## Why Subagentic?

**The Challenge**: Generic AI assistants lack specialized expertise and systematic workflows, leading to inconsistent results and context overload.

**The Solution**: Subagentic provides:
- **Role-Specialized Agents** - Expert personas (architect, QA, product manager) with domain-specific knowledge
- **Systematic Workflows** - Proven development patterns (PRD → Tasks → Implementation)
- **Orchestrator-First Routing** - Automatic workflow matching based on user intent
- **Frontmatter-Based Discovery** - All resources self-describe via YAML frontmatter
- **Platform Agnostic** - Works across Claude Code, OpenCode, Ampcode, and Droid

**The Result**: Predictable, high-quality outputs from specialized agents following best practices, without manually switching contexts or crafting complex prompts.

---

## 🚀 Quick Start

Clone the toolkit:
```bash
git clone https://github.com/amrhas82/agentic-toolkit
cd agentic-toolkit/ai/subagentic
```

Install for your platform:

| Platform | Installation | What's Included |
|----------|--------------|-----------------|
| **Claude Code** | `cp -r claude/* ~/.claude/` | 14 subagents + 11 skills + 10 commands |
| **Droid** | `cp -r droid/* ~/.factory/` | 21 commands (subagent references) |
| **Ampcode** | `cp -r ampcode/* ~/.config/amp/` | 21 commands (subagent references) |
| **OpenCode** | `cp -r opencode/* ~/.config/opencode/` | 21 commands (subagent references) |

**Key Difference**:
- **Claude Code** implements full subagent system with orchestrator
- **Droid/Ampcode/OpenCode** provide commands only + reference documentation for Claude's subagents

---

## 📦 What's Included

### Claude Code (Full System)

**14 Subagents** - Expert personas with specialized knowledge
- 3 Workflow Agents (PRD, Tasks, Implementation)
- 11 Specialist Agents (UX, QA, Architecture, Product, Development, etc.)

**11 Skills** - Auto-triggering workflow components
- test-driven-development, testing-anti-patterns, verification-before-completion (auto-trigger)
- brainstorming, code-review, systematic-debugging, docs-builder, etc.

**10 Commands** - Simple workflow helpers
- debug, explain, git-commit, optimize, refactor, review, security, ship, stash, test-generate

**Orchestration System**
- Automatic intent matching to 9 workflow patterns
- Conditional decision points with user approval gates
- Selective context injection

### Droid/Ampcode/OpenCode (Commands Only)

**21 Commands** - All workflow capabilities in command form
- Combines Claude's skills + commands into unified command set
- Same functionality, different invocation model (no auto-triggering)
- Includes reference documentation for Claude's subagents

**No Orchestrator** - Direct command invocation only

---

## 🤖 Subagents (Claude Code Only)

### Workflow Agents (3)

| Agent | Purpose |
|-------|---------|
| **1-create-prd** | Define scope with structured Product Requirement Documents |
| **2-generate-tasks** | Break PRDs into granular, actionable task lists |
| **3-process-task-list** | Execute tasks iteratively with progress tracking and review checkpoints |

**Pattern**: PRD → Tasks → Iterative Implementation → Review → Complete

### Specialist Agents (11)

| Agent | Purpose |
|-------|---------|
| **orchestrator** | Analyze intent, coordinate workflows, route to optimal agent sequences |
| **master** | General-purpose executor with comprehensive expertise across domains |
| **ui-designer** | UI/UX design, wireframes, prototypes, accessibility, design systems |
| **code-developer** | Implementation, debugging, refactoring, code best practices |
| **quality-assurance** | Test architecture, quality gates, requirements traceability, risk assessment |
| **system-architect** | System design, technology selection, API design, scalability planning |
| **feature-planner** | Product strategy, PRDs, feature prioritization, roadmap planning |
| **backlog-manager** | Backlog refinement, story writing, acceptance criteria, sprint planning |
| **story-writer** | User stories, epic management, agile ceremonies, retrospectives |
| **market-researcher** | Market analysis, competitive research, project discovery, stakeholder mapping |
| **context-builder** | Initialize project context, discover documentation, create knowledge bases |

---

## 🛠 Commands Reference

### Claude Code: 21 Total (11 Skills + 10 Commands)

**Auto-Triggering Skills (4)**
- `test-driven-development` - Write test first, watch fail, minimal passing code
- `testing-anti-patterns` - Prevent mocking anti-patterns and test pollution
- `verification-before-completion` - Run verification before claiming done
- `subagent-spawning` - TDD-aware templates for fresh subagents

**Manual Skills (7)**
- `brainstorming` - Refine rough ideas through collaborative questioning
- `code-review` - Review implementation against requirements
- `condition-based-waiting` - Replace timeouts with condition polling
- `docs-builder` - Create structured /docs hierarchy
- `root-cause-tracing` - Trace bugs backward through call stack
- `skill-creator` - Guide for creating new skills
- `systematic-debugging` - Four-phase debugging framework

**Simple Commands (10)**
- `debug` - Systematic investigation techniques
- `explain` - Explain code for newcomers
- `git-commit` - Intelligent commit creation
- `optimize` - Performance analysis
- `refactor` - Maintain behavior while improving code
- `review` - Comprehensive code review
- `security` - Vulnerability scanning
- `ship` - Pre-deployment checklist
- `stash` - Save session context for compaction recovery or handoffs
- `test-generate` - Test suite generation

### Droid/Ampcode/OpenCode: 21 Commands

Same functionality as Claude's skills+commands, but:
- All invoked as commands (no auto-triggering)
- Unified command set
- No orchestrator integration

**Command Categories**:
- **Development & Testing (10)**: test-driven-development, testing-anti-patterns, test-generate, code-review, systematic-debugging, root-cause-tracing, debug, condition-based-waiting, verification-before-completion, subagent-spawning
- **Code Operations (6)**: refactor, optimize, explain, review, security, ship
- **Session & Planning (5)**: brainstorming, skill-creator, docs-builder, git-commit, stash

---

## 🎯 Usage Patterns

### Claude Code: Orchestrator-First (Recommended)

The orchestrator analyzes your request and routes to optimal workflows automatically.

**How it works**:
1. Make natural requests: "Add login feature", "Review this PR", "Plan next sprint"
2. Orchestrator matches intent to workflow patterns
3. Conditional gates ask for approval before each phase
4. Specialists execute with domain expertise

**Example Flow - Feature Development**:
```
User: "Add authentication feature"
  ↓
Orchestrator: "Research competitive approaches first?" [Yes/No]
  ↓ Yes
Market Researcher: [Gathers auth patterns, OAuth vs JWT tradeoffs]
  ↓
Orchestrator: "Create formal PRD?" [Yes/No]
  ↓ Yes
1-Create-PRD: [Structured requirements document]
  ↓
Orchestrator: "Generate implementation tasks?" [Yes/No]
  ↓ Yes
2-Generate-Tasks: [20 granular tasks with acceptance criteria]
  ↓
Orchestrator: "Start systematic implementation?" [Yes/No]
  ↓ Yes
3-Process-Task-List: [Iterative implementation with review gates]
```

**Bypass Options**:
- Direct agent: `@quality-assurance review this code`
- Role syntax: `As system-architect, design the API layer`
- Skills: `/test-driven-development login-feature`

### 9 Pre-Defined Workflow Patterns (Claude Only)

Available in `claude/CLAUDE.md`:

1. **Feature Discovery Flow** - Research → PRD → Tasks → Implementation
2. **Product Definition Flow** - Strategy → Stories → Technical Assessment
3. **Story Implementation Flow** - Validate → Implement → QA Gate
4. **Architecture Decision Flow** - Constraints → Analysis → Alignment
5. **UI Development Flow** - Design → PRD (optional) → Implement → Validate
6. **Bug Triage Flow** - Investigate → Severity Assessment → Fix/Backlog
7. **Brownfield Discovery Flow** - Context Building → Documentation → Assessment
8. **Quality Validation Flow** - Review → Pass/Concerns/Fail → Remediation
9. **Sprint Planning Flow** - Prioritize → Stories → Criteria → Tasks

Each pattern includes conditional decision points requiring user approval.

### Droid/Ampcode/OpenCode: Direct Command Invocation

No orchestrator - invoke commands directly:
- `/debug <issue>`
- `/refactor <code-section>`
- `/test-driven-development <feature>`

Subagent workflows require manual coordination.

---

## 📊 Value Proposition

### For Individual Developers
- **Instant Expertise** - Access 14 specialist agents without hiring
- **Consistent Quality** - Best practices built into every agent
- **Faster Iteration** - Systematic workflows reduce trial-and-error
- **Learning Tool** - Observe expert patterns and decision-making

### For Teams
- **Standardized Processes** - Shared agent definitions ensure consistency
- **Onboarding Acceleration** - New members learn patterns through agent interactions
- **Documentation Culture** - context-builder and docs-builder promote knowledge capture
- **Cross-Functional Collaboration** - Product, design, and engineering agents work together

### For Technical Leaders
- **Scalable Expertise** - Multiply senior-level guidance across projects
- **Quality Gates** - Built-in review and validation checkpoints
- **Architectural Consistency** - system-architect ensures coherent design decisions
- **Reduced Context Switching** - Specialists handle domain-specific work

---

## 🔧 Platform Architecture

### Claude Code
```
~/.claude/
├── CLAUDE.md           # Registry + orchestrator workflows
├── agents/             # 14 subagent implementations (*.md)
├── skills/             # 11 skills (subdirectories with SKILL.md)
└── commands/           # 10 commands (*.md)
```

**Features**:
- Full subagent system with orchestrator
- Auto-triggering skills
- Workflow pattern matching
- Progressive agent loading

### Droid
```
~/.factory/
├── AGENTS.md           # Reference doc (subagents + commands)
└── commands/           # 21 commands (*.md)
```

**Features**:
- Commands only (no subagent implementations)
- Reference table for Claude's subagents
- Direct command invocation

### Ampcode
```
~/.config/amp/
├── AGENT.md            # Reference doc (subagents + commands)
└── commands/           # 21 commands (*.md)
```

**Features**:
- Commands only (no subagent implementations)
- Reference table for Claude's subagents
- Direct command invocation

### OpenCode
```
~/.config/opencode/
├── AGENTS.md           # Reference doc (subagents + commands)
└── command/            # 21 commands (*.md)
```

**Features**:
- Commands only (no subagent implementations)
- Reference table for Claude's subagents
- Direct command invocation

---

## 📋 Frontmatter Architecture

All resources are self-describing via YAML frontmatter for auto-discovery:

**Subagents** (`agents/*.md`):
```yaml
---
id: code-developer
title: Full Stack Developer
description: Implement code, debug, refactor
when_to_use: Use for code implementation, debugging, refactoring, and development best practices
model: inherit
color: purple
---
```

**Skills** (`skills/*/SKILL.md`):
```yaml
---
id: test-driven-development
name: test-driven-development
description: Write test first, watch it fail, write minimal code to pass
usage: /test-driven-development <feature-or-behavior-to-test>
auto_trigger: true
---
```

**Commands** (`commands/*.md`):
```yaml
---
id: debug
name: debug
description: Debug an issue systematically using structured investigation techniques
usage: /debug <issue-description>
argument-hint: [description of the problem]
---
```

This enables:
- Dynamic registry building by CLIs
- Single source of truth (no manual registries)
- Consistent metadata across platforms
- Easy extensibility

---

## 🤝 Contributing

Contributions welcome for:
- New specialist agents for additional domains
- Additional workflow patterns
- Platform-specific optimizations
- Documentation improvements

See repository for contribution guidelines.

---

**License**: [Specify license]
**Repository**: https://github.com/amrhas82/agentic-toolkit
**Issues**: https://github.com/amrhas82/agentic-toolkit/issues
