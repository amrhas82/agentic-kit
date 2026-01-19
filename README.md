# Agentic Kit

> **AI development toolkit with 14 specialized agents and 20 commands per tool**

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
# Each tool gets 14 agents + 20 commands
```

### Supported Tools

- **Claude Code** - 14 subagents + 11 skills + 9 commands
- **Opencode** - 14 agent references + 20 commands
- **Ampcode** - 14 agent references + 20 commands
- **Droid** - 14 agent references + 20 commands

**Key Difference:**
- **Claude Code**: Full subagent system with orchestrator + skills (auto-triggering)
- **Other tools**: Commands only + agent reference documentation

### Start Using

```bash
# Claude Code examples
@master help
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

### 14 Agents

**Workflow Agents (3):**
- **1-create-prd** - Product requirements documents
- **2-generate-tasks** - Break down features into tasks
- **3-process-task-list** - Execute task lists systematically

**Core Team (5):**
- **master** - General task executor with comprehensive expertise
- **orchestrator** - Workflow coordination and intent matching
- **code-developer** - Implementation, debugging, refactoring
- **quality-assurance** - Test architecture and quality gates
- **context-builder** - Project initialization and documentation

**Product & Planning (3):**
- **feature-planner** - Product strategy, PRDs, roadmaps
- **backlog-manager** - Backlog management and sprint planning
- **story-writer** - User stories and agile workflows
- **market-researcher** - Market research and competitive analysis

**Architecture & Design (2):**
- **system-architect** - System design and architecture
- **ui-designer** - UI/UX design and wireframes

### 20 Commands/Skills

**Auto-Triggering Skills (4)** - Claude Code only:
- **test-driven-development** - Write test first, watch fail, minimal passing code
- **testing-anti-patterns** - Prevent mocking anti-patterns
- **verification-before-completion** - Verify before claiming done
- **subagent-spawning** - TDD-aware templates for fresh subagents

**Manual Skills/Commands (16):**
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

## 🔧 Advanced Usage

### Silent Installation (CI/CD)
```bash
agentic-kit --tool claude --yes
```

### Multiple Tools
```bash
agentic-kit
# Enter: claude opencode
```

### Uninstall
```bash
agentic-kit --uninstall claude
```

---

## 📊 Stats

- **14** Specialized Agents
- **20** Workflow Commands & Skills
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
