# Subagent Kits Manual

Complete guide to ready-to-use AI subagents for Claude Code, OpenCode, and Amp. Production-tested agent definitions adapted from Simple + BMAD methodologies, optimized for immediate deployment.

---

## 🚀 Quick Start

### For Claude Code:
```bash
git clone https://github.com/amrhas82/agentic-toolkit
cd agentic-toolkit
cp -rv ai/subagents/claude/* ~/.claude/
# Invoke: @agent-name or "As agent-name, ..." in Claude Code
```

### For OpenCode:
```bash
git clone https://github.com/amrhas82/agentic-toolkit
cd agentic-toolkit
cp -rv ai/subagents/opencode/* ~/.config/opencode/
# Invoke: @agent-name or "As agent-name, ..." in Claude Code
```

### For Amp:
```bash
git clone https://github.com/amrhas82/agentic-toolkit
cd agentic-toolkit
cp -rv ai/subagents/ampcode/* ~/.amp/
# Invoke: "As agent-name, ..." in natural language
```

### For Droid:
```bash
git clone https://github.com/amrhas82/agentic-toolkit
cd agentic-toolkit
cp -rv ai/subagents/ampcode/* ~/.amp/
# Invoke: "As agent-name, or invoke droid agent_name..." in natural language

#go to and edit ~/.factory/settings.json change below to true
  "enableCustomDroids": true,
```
---

## 📦 What's Included

Each subagent kit contains:
- **Workflow Agents** (3): Three-phase development workflow
- **Specialist Agents** (10-13): Role-based expert agents
- **Reusable Tasks** (22): Common development tasks *(Claude/OpenCode only)*
- **Ready to Use**: No configuration needed

### Kit Comparison

| Feature | claude | opencode | ampcode |
|---------|--------|----------|---------|
| **AI Tool** | Claude Code | OpenCode | Amp |
| **Workflow Agents** | 3 | 3 | 3 |
| **Specialist Agents** | 10 | 10 | 13 |
| **Total Agents** | 13 | 13 | 16 |
| **Reusable Tasks** | 22 | 22 | 0 |
| **Invocation** | @agent or natural | Natural language | Natural language |
| **Deploy Location** | `~/.claude/` | `~/.config/opencode/` | `~/.amp/` |
| **Source Path** | `ai/subagents/claude/` | `ai/subagents/opencode/` | `ai/subagents/ampcode/` |

---

## 🤖 Complete Agent Directory

### Three-Phase Workflow Agents
Available in: **Claude**, **OpenCode**, **Amp**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **PRD Creator** | `1-create-prd` | Create comprehensive Product Requirements Documents | Starting a new project or feature, defining scope and requirements |
| **Task Generator** | `2-generate-tasks` | Break down PRDs into actionable task lists | After PRD is complete, need implementation planning |
| **Task Processor** | `3-process-task-list` | Implement tasks iteratively with reviews | Ready to build, want AI to work step-by-step with approval |

**Workflow:**
```
Phase 1: As 1-create-prd, create a PRD for [feature]
  ↓
Phase 2: As 2-generate-tasks, break down this PRD
  ↓
Phase 3: As 3-process-task-list, implement tasks one by one
```

---

### Specialist Agents

#### Core Development Agents
Available in: **Claude**, **OpenCode**, **Amp**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **Orchestrator** | `orchestrator` | Coordinate multi-agent workflows, manage complex tasks | Complex features requiring multiple agents, unclear which specialist to use |
| **Developer** | `developer` / `full-stack-dev` | Code implementation, debugging, refactoring, testing | Feature implementation, bug fixes, writing tests |
| **Architect** | `architect` / `holistic-architect` | System design, technology selection, API design | Designing new systems, evaluating tech choices, architecture docs |

#### Quality & Product Agents
Available in: **Claude**, **OpenCode**, **Amp**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **QA Engineer** | `qa-engineer` / `qa-test-architect` | Quality reviews, test strategy, production readiness | Code quality review, test coverage analysis, release validation |
| **Product Manager** | `product-manager` | PRD creation, feature prioritization, roadmaps | Writing requirements, feature planning, stakeholder communication |
| **Product Owner** | `product-owner` | Backlog management, story refinement, sprint planning | Managing backlog, defining acceptance criteria *(Claude/OpenCode only)* |
| **Scrum Master** | `scrum-master` | Story creation, epic management, agile processes | Creating user stories, running retrospectives *(Claude/OpenCode only)* |

#### Design & User Experience
Available in: **Claude**, **OpenCode**, **Amp**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **UX Designer** | `ux-designer` / `ux-expert` | UI/UX design, wireframes, accessibility | Interface design, user flows, design systems |
| **Business Analyst** | `business-analyst` | Market research, competitive analysis, project discovery | Market research, project briefs, brownfield documentation *(Claude/OpenCode only)* |

#### Technical subagents
Available in: **Claude**, **OpenCode**, **Amp**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **DevOps Engineer** | `devops-engineer` | CI/CD, infrastructure, Docker/Kubernetes | Pipeline setup, infrastructure automation, deployments *(Amp only)* |
| **Security Expert** | `security-expert` | Security audits, threat modeling, auth/auth | Security reviews, vulnerability assessment, compliance *(Amp only)* |
| **Data Engineer** | `data-engineer` | Database design, ETL pipelines, analytics | Schema design, data pipelines, query optimization *(Amp only)* |
| **Technical Writer** | `technical-writer` | API docs, READMEs, tutorials, ADRs | Documentation creation, architecture docs, runbooks *(Amp only)* |
| **Debugger** | `debugger` | Systematic debugging, log analysis | Investigating bugs, performance issues, incident response *(Amp only)* |
| **Researcher** | `researcher` | Technology evaluation, best practices research | Evaluating technologies, learning codebases, market research *(Amp only)* |
| **Refactorer** | `refactorer` | Code quality improvement, design patterns | Refactoring code, reducing technical debt *(Amp only)* |

#### Utility Agents
Available in: **Claude**, **OpenCode**

| Agent | ID | Specialization | When To Use |
|-------|-----|----------------|-------------|
| **Master** | `master` | Comprehensive cross-domain expertise | One-off tasks, no specific persona needed |

---

## 📋 Reusable Tasks (Claude, OpenCode, Droid and Amp)

22 pre-built task workflows available in Claude and OpenCode kits:

### Validation & Quality
- `validate-next-story` - Validate user story before implementation
- `review-story` - Comprehensive story review
- `trace-requirements` - Map requirements to tests
- `qa-gate` - Quality gate decision process
- `apply-qa-fixes` - Apply QA feedback

### Planning & Analysis
- `risk-profile` - Risk assessment matrix
- `nfr-assess` - Non-functional requirements validation
- `advanced-elicitation` - Requirements elicitation
- `test-design` - Test scenario creation

### Development Workflows
- `create-next-story` - Generate next user story
- `create-brownfield-story` - Story for existing codebase
- `brownfield-create-epic` - Epic for existing systems
- `correct-course` - Realign strategy/approach

### Documentation
- `create-doc` - Create documentation
- `shard-doc` - Break down large documents
- `index-docs` - Create documentation index
- `document-project` - Comprehensive project documentation

### Specialized Tasks
- `generate-ai-frontend-prompt` - AI UI tool prompts (v0, Lovable)
- `facilitate-brainstorming-session` - Structured brainstorming
- `create-deep-research-prompt` - Deep research workflow
- `execute-checklist` - Execute any checklist

### Workflow Management
- `kb-mode-interaction` - Knowledge base interaction

---

## 🎯 Agent Availability Matrix

| Agent | Claude | OpenCode | Amp | Notes |
|-------|--------|----------|-----|-------|
| **Workflow Agents** | | | | |
| 1-create-prd | ✅ | ✅ | ✅ | Phase 1 |
| 2-generate-tasks | ✅ | ✅ | ✅ | Phase 2 |
| 3-process-task-list | ✅ | ✅ | ✅ | Phase 3 |
| **Core Development** | | | | |
| orchestrator | ✅ | ✅ | ✅ | Master coordinator |
| developer / full-stack-dev | ✅ | ✅ | ✅ | Implementation specialist |
| architect / holistic-architect | ✅ | ✅ | ✅ | System design |
| **Quality & Product** | | | | |
| qa-engineer / qa-test-architect | ✅ | ✅ | ✅ | Quality assurance |
| product-manager | ✅ | ✅ | ✅ | Requirements & strategy |
| product-owner | ✅ | ✅ | ❌ | Backlog management |
| scrum-master | ✅ | ✅ | ❌ | Agile processes |
| **Design & UX** | | | | |
| ux-designer / ux-expert | ✅ | ✅ | ✅ | UI/UX design |
| business-analyst | ✅ | ✅ | ❌ | Market research |
| **Technical subagents** | | | | |
| devops-engineer | ❌ | ❌ | ✅ | CI/CD & infrastructure |
| security-expert | ❌ | ❌ | ✅ | Security audits |
| data-engineer | ❌ | ❌ | ✅ | Database & pipelines |
| technical-writer | ❌ | ❌ | ✅ | Documentation |
| debugger | ❌ | ❌ | ✅ | Systematic debugging |
| researcher | ❌ | ❌ | ✅ | Tech evaluation |
| refactorer | ❌ | ❌ | ✅ | Code quality |
| **Utility** | | | | |
| master | ✅ | ✅ | ❌ | Cross-domain tasks |
| **Tasks** | 22 | 22 | 0 | Reusable workflows |

**Total Count:**
- **Claude**: 13 agents + 22 tasks
- **OpenCode**: 13 agents + 22 tasks
- **Amp**: 16 agents + 0 tasks

---

## 💡 Usage Examples

### Example 1: Build a New Feature (3-Phase Workflow)

```
# Claude Code / OpenCode / Amp
As 1-create-prd, create a PRD for user authentication with email/password and OAuth support

[Review PRD, make adjustments]

As 2-generate-tasks, break down this PRD into actionable tasks

[Review task list]

As 3-process-task-list, implement tasks one by one, pausing for my review after each
```

### Example 2: Use Specialist Agents

```
# Architecture Design
As architect, design a microservices architecture for this e-commerce platform

# Implementation
As developer, implement the user service based on the architecture

# Quality Review
As qa-engineer, review this implementation for production readiness

# Security Audit (Amp only)
As security-expert, audit this authentication system for vulnerabilities
```

### Example 3: Orchestrated Workflow

```
As orchestrator, implement complete user registration:
1. Have architect design the system
2. Spawn developer for backend API
3. Spawn developer for frontend UI
4. Have qa-engineer validate
5. Have security-expert audit (Amp)
6. Have devops-engineer create CI/CD (Amp)
```

### Example 4: Use Tasks (Claude/OpenCode Only)

```
# Execute a specific task
Execute task: create-next-story from this epic

# Run quality gate
Execute task: qa-gate for story-001

# Generate documentation
Execute task: document-project for current codebase
```

---

## 🔧 Customization

### Modifying Agents

Each agent is defined in a markdown file. You can customize:

**For Claude/OpenCode:**
```bash
# Edit agent definition
nano ~/.claude/agents/developer.md
# or
nano ~/.config/opencode/agents/developer.md
```

**For Amp:**
```bash
# Edit agent definition
nano ~/.amp/agents/developer.md
```

### Creating New Agents

Use the existing agents as templates:

1. Copy an existing agent file
2. Modify the persona, capabilities, and principles
3. Save with a new name
4. Invoke using the new agent ID

---

## 🎓 Best Practices

### When to Use Each Kit

**Use Claude Subagents if:**
- You use Claude Code as your primary AI tool
- You want the @agent-name invocation style
- You need the 22 reusable tasks

**Use OpenCode Subagents if:**
- You use OpenCode as your primary AI tool
- You prefer natural language invocation
- You need the 22 reusable tasks

**Use Amp Subagents if:**
- You use Amp as your primary AI tool
- You need the 6 additional technical subagents
- You don't need the pre-built tasks

### Workflow Tips

1. **Start with workflow agents** (1-2-3) for structured development
2. **Use subagents** for specific technical needs
3. **Leverage orchestrator** for complex multi-step tasks
4. **Mix and match** - switch agents as needed during development

### Common Patterns

**Feature Development:**
```
1-create-prd → 2-generate-tasks → 3-process-task-list → qa-engineer
```

**Architecture to Implementation:**
```
architect → developer → qa-engineer → devops-engineer (Amp)
```

**Research to Build:**
```
researcher (Amp) → architect → developer → technical-writer (Amp)
```

---

## 🆘 Troubleshooting

### Agents Not Found

**Problem**: AI tool doesn't recognize agents

**Solutions:**
- Verify files copied to correct location:
  - Claude: `~/.claude/`
  - OpenCode: `~/.config/opencode/`
  - Amp: `~/.amp/`
- Restart your AI tool
- Check file permissions: `chmod -R 644 ~/.claude/agents/*` (or equivalent)

### Agent Not Behaving as Expected

**Problem**: Agent responses don't match specialization

**Solutions:**
- Check agent file isn't corrupted: `cat ~/.claude/agents/developer.md`
- Re-copy from original based on your tool:
  - Claude: `cp -r ai/subagents/claude/* ~/.claude/`
  - OpenCode: `cp -r ai/subagents/opencode/* ~/.config/opencode/`
  - Amp: `cp -r ai/subagents/ampcode/* ~/.amp/`
- Ensure you're using correct invocation: `As developer, ...` or `@developer`

### Task Not Working (Claude/OpenCode)

**Problem**: Tasks not executing

**Solutions:**
- Verify tasks directory exists: `ls ~/.claude/tasks/`
- Check task reference in agent files
- Some tasks depend on other files (templates, checklists) - ensure full copy

---

## 📚 Related Resources

- **[Main Toolkit README](../README.md)** - Overview of entire toolkit
- **[Simple Workflow](simple/)** - Original 3-step methodology
- **[BMAD Method](bmad/)** - Enterprise framework
- **[Tools Guide](../tools/tools_guide.md)** - Development environment setup

---

## 🤝 Contributing

Found a bug or have an improvement?

1. **Report issues**: [GitHub Issues](https://github.com/amrhas82/agentic-toolkit/issues)
2. **Suggest improvements**: [GitHub Discussions](https://github.com/amrhas82/agentic-toolkit/discussions)
3. **Submit PRs**: Fork, improve, and submit pull requests

---

## 📄 License

Apache License 2.0 - See [LICENSE](../LICENSE)

---

**Built with ❤️ for the vibecoding community**

Ready-to-use, production-tested subagents adapted from proven methodologies.
