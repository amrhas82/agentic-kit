<div align="center">

```
          █████╗  ██████╗ ███████╗███╗   ██╗████████╗██╗ ██████╗    ██╗  ██╗██╗████████╗
         ██╔══██╗██╔════╝ ██╔════╝████╗  ██║╚══██╔══╝██║██╔════╝    ██║ ██╔╝██║╚══██╔══╝
         ███████║██║  ███╗█████╗  ██╔██╗ ██║   ██║   ██║██║         █████╔╝ ██║   ██║
         ██╔══██║██║   ██║██╔══╝  ██║╚██╗██║   ██║   ██║██║         ██╔═██╗ ██║   ██║
         ██║  ██║╚██████╔╝███████╗██║ ╚████║   ██║   ██║╚██████╗    ██║  ██╗██║   ██║
         ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝ ╚═════╝    ╚═╝  ╚═╝╚═╝   ╚═╝
```

**AI development toolkit with 11 specialized agents and 21 commands per tool**

</div>

[![npm version](https://img.shields.io/npm/v/@amrhas82/agentic-kit)](https://www.npmjs.com/package/@amrhas82/agentic-kit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Supported Tools:**
[![Claude](https://img.shields.io/badge/Claude-Supported-blue?logo=anthropic)](https://claude.ai)
[![Opencode](https://img.shields.io/badge/Opencode-Supported-green)](https://github.com/amrhas82/opencode)
[![Ampcode](https://img.shields.io/badge/Ampcode-Supported-orange)](https://github.com/amrhas82/ampcode)
[![Droid](https://img.shields.io/badge/Droid-Supported-red)](https://github.com/amrhas82/droid)

Specialized AI agents and workflow commands for product management, agile development, and software engineering. Simple installer supports Claude, Opencode, Ampcode, and Droid.

---

## 🚀 Quick Start

```bash
# Install
npm install -g @amrhas82/agentic-kit

# Run installer
agentic-kit

# Choose tool(s): claude, opencode, ampcode, or droid
# Each tool gets 11 agents + 21 commands
```

### Supported Tools

- **Claude Code** - 11 subagents + 11 skills + 10 commands
- **Opencode** - 11 agent references + 21 commands
- **Ampcode** - 11 subagents + 11 skills + 10 commands
- **Droid** - 11 agent references + 21 commands

**Key Difference:**
- **Claude Code / Ampcode**: Full subagent system with orchestrator + skills (auto-triggering)
- **Opencode / Droid**: Commands only + agent reference documentation

### Start Using

```bash
# Claude Code examples
@orchestrator help
@1-create-prd Create a PRD for a task management app
/brainstorming Explore authentication approaches
/test-driven-development Implement user login

# Opencode/Ampcode/Droid examples
/1-create-prd Create a PRD for a task management app
/brainstorming Explore authentication approaches
/test-driven-development Implement user login
```

---

## 🤖 What's Included

### 11 Agents

**Workflow Agents (3):**
- **1-create-prd** - Define scope with structured Product Requirement Documents
- **2-generate-tasks** - Break PRDs into granular, actionable task lists
- **3-process-task-list** - Execute tasks iteratively with progress tracking and review checkpoints

**Specialist Agents (8):**
- **orchestrator** - Analyze intent, coordinate workflows, route to optimal agent sequences
- **code-developer** - Implementation, debugging, refactoring, code best practices
- **quality-assurance** - Test architecture, quality gates, requirements traceability, risk assessment
- **context-builder** - Initialize project context, discover documentation, create knowledge bases
- **feature-planner** - Epics, user stories, prioritization, backlog management, retrospectives
- **market-researcher** - Market analysis, competitive research, project discovery, brainstorming
- **system-architect** - System design, technology selection, API design, scalability planning
- **ui-designer** - UI/UX design, wireframes, prototypes, accessibility, design systems

### 21 Commands/Skills

**Auto-Triggering Skills (4)** - Claude Code only:
- **test-driven-development** - Write test first, watch fail, minimal passing code
- **testing-anti-patterns** - Prevent mocking anti-patterns
- **verification-before-completion** - Verify before claiming done
- **subagent-spawning** - TDD-aware templates for fresh subagents

**Manual Skills/Commands (17):**
- **brainstorming** - Structured brainstorming sessions
- **code-review** - Implementation review against requirements
- **condition-based-waiting** - Replace timeouts with condition polling
- **docs-builder** - Project documentation generation
- **root-cause-tracing** - Trace bugs backward through call stack
- **skill-creator** - Guide for creating new skills
- **systematic-debugging** - Four-phase debugging framework
- **debug** - Systematic issue investigation
- **explain** - Explain code for newcomers
- **git-commit** - Intelligent commit creation
- **optimize** - Performance analysis
- **refactor** - Safe refactoring with behavior preservation
- **review** - Comprehensive code review
- **security** - Vulnerability scanning
- **ship** - Pre-deployment checklist
- **stash** - Save session context for compaction recovery or handoffs
- **test-generate** - Generate test suites

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[INSTALLER_GUIDE.md](docs/INSTALLER_GUIDE.md)** | Complete installation guide with troubleshooting |
| **[KNOWLEDGE_BASE.md](docs/KNOWLEDGE_BASE.md)** | Complete reference: agents, commands, architecture |
| **[QUICK-START.md](QUICK-START.md)** | 15-minute onboarding guide |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** | Common issues and solutions |
| **[subagentic-manual.md](packages/subagentic-manual.md)** | Detailed agent/command reference |

---

## 💡 Example Workflows

**Feature Development:**
```
@orchestrator I need to add user authentication
# Orchestrator routes to:
# → market-researcher (research approaches)
# → 1-create-prd (requirements)
# → 2-generate-tasks (implementation tasks)
# → 3-process-task-list (execution)
```

**Code Quality:**
```
@quality-assurance Review this PR before merge
/code-review Check security and performance
/systematic-debugging Investigate this race condition
```

**Architecture & Design:**
```
@system-architect Design microservices architecture
@ui-designer Create wireframes for mobile checkout
```

---

## 📊 Stats

- **11** Specialized Agents
- **21** Workflow Commands & Skills
- **4** Supported Tools (Claude, Opencode, Ampcode, Droid)
- **MIT** License

---

## 🔗 Links

- **npm:** https://www.npmjs.com/package/@amrhas82/agentic-kit
- **GitHub:** https://github.com/amrhas82/agentic-kit
- **Issues:** https://github.com/amrhas82/agentic-kit/issues

---

## 📄 License

MIT © 2025 amrhas82

---

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or [open an issue](https://github.com/amrhas82/agentic-kit/issues)
