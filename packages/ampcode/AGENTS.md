# Global Amp Agents

This file defines specialized agent personas available globally across all Amp workspaces, and provides guidance and memory for your coding CLI.

# AmpCode subagents and Tasks (Amp)

Ampcode reads AGENTS.md during initialization and uses it as part of its system prompt for the session. 

## How To Use with Amp

Activate agents by mentioning their ID in your prompts:
- `"As full-stack-dev, implement the login feature"`
- `"invoke subagent qa-test-architect"`
- Copy/paste `ampcode` subfolders in this project to ~/.config/amp and Opencode will read and access agents from ~/.config/opencode/agent and tasks from ~~/.config/amp/resources/tasks-brief.md,

Note
- Orchestrators/master run as mode: primary; other agents as mode: subagents.
- All agents have enbaled tools: write, edit, bash.

## Agents Directory

| Title | ID | When To Use |
|---|---|---|
| 1-Create PRD | 1-create-prd | Define scope with a Product Requirement Document (PRD) |
| 2-Generate Tasks | 2-generate-tasks | Break down PRD into granular, actionable task list |
| 3-Process Task List | 3-process-task-list | Guide AI to tackle tasks iteratively with review |
| UX Expert | ux-expert | UI/UX design, wireframes, prototypes, front-end specs |
| Scrum Master | scrum-master | Story creation, epic management, agile process guidance |
| Test Architect & Quality Advisor | qa-test-architect | Test architecture review, quality gates, code improvement |
| Product Owner | product-owner | Backlog management, story refinement, acceptance criteria |
| Product Manager | product-manager | PRDs, product strategy, feature prioritization, roadmaps |
| Full Stack Developer | full-stack-dev | Code implementation, debugging, refactoring |
| Master Orchestrator | orchestrator | Workflow coordination, multi-agent tasks, role switching |
| Master Task Executor | master | Comprehensive expertise across all domains |
| Architect | holistic-architect | System design, architecture docs, API design |
| Business Analyst | business-analyst | Market research, competitive analysis, project briefs |

## Agent Details

### 1-Create PRD (id: 1-create-prd)
Source: [agents/1-create-prd.md](agents/1-create-prd.md)

- When to use: Define scope by creating Product Requirement Documents
- How to activate: "create prd, ..." or "As 1-create-prd, ..."

### 2-Generate Tasks (id: 2-generate-tasks)
Source: [agents/2-generate-tasks.md](agents/2-generate-tasks.md)

- When to use: Break down PRD into granular, actionable task list
- How to activate: "generate tasks, ..." or "As 2-generate-tasks, ..."

### 3-Process Task List (id: 3-process-task-list)
Source: [agents/3-process-task-list.md](agents/3-process-task-list.md)

- When to use: Guide AI through iterative task implementation with review
- How to activate: "process task list, ..." or "As 3-process-task-list, ..."

### UX Expert (id: ux-expert)
Source: [agents/ux-expert.md](agents/ux-expert.md)

- When to use: UI/UX design, wireframes, prototypes, user experience
- How to activate: "As ux-expert, ..."

### Scrum Master (id: scrum-master)
Source: [agents/scrum-master.md](agents/scrum-master.md)

- When to use: Story creation, epic management, agile guidance
- How to activate: "As scrum-master, ..."

### Test Architect & Quality Advisor (id: qa-test-architect)
Source: [agents/qa-test-architect.md](agents/qa-test-architect.md)

- When to use: Test architecture, quality gates, requirements traceability
- How to activate: "As qa-test-architect, ..." or "As qa, ..."

### Product Owner (id: product-owner)
Source: [agents/product-owner.md](agents/product-owner.md)

- When to use: Backlog management, sprint planning, prioritization
- How to activate: "As product-owner, ..."

### Product Manager (id: product-manager)
Source: [agents/product-manager.md](agents/product-manager.md)

- When to use: PRDs, product strategy, roadmap planning
- How to activate: "As product-manager, ..."

### Full Stack Developer (id: full-stack-dev)
Source: [agents/full-stack-dev.md](agents/full-stack-dev.md)

- When to use: Code implementation, debugging, refactoring
- How to activate: "As full-stack-dev, ..."
- Commands: *develop-story, *help, *explain, *review-qa-test-architect, *run-tests

### Master Orchestrator (id: orchestrator)
Source: [agents/orchestrator.md](agents/orchestrator.md)

- When to use: Workflow coordination, when unsure which specialist to use
- How to activate: "As orchestrator, ..."

### Master Task Executor (id: master)
Source: [agents/master.md](agents/master.md)

- When to use: One-off tasks, comprehensive expertise across domains
- How to activate: "As master, ..."

### Architect (id: holistic-architect)
Source: [agents/holistic-architect.md](agents/holistic-architect.md)

- When to use: System design, technology selection, API design
- How to activate: "As architect, ..." or "As holistic-architect, ..."

### Business Analyst (id: business-analyst)
Source: [agents/business-analyst.md](agents/business-analyst.md)

- When to use: Market research, competitive analysis, project discovery
- How to activate: "As analyst, ..." or "As business-analyst, ..."
