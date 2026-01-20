# Global Opencode CLI

Opencode is a lightweight CLI tool that provides workflow automation commands.

## Opencode Subagents (Reference)

These subagents are available when using Claude Code CLI. Opencode can reference them but doesn't implement them directly.

### Subagents (14 total)

| ID | Title | When To Use |
|---|---|---|
| 1-create-prd | 1-Create PRD | Define Scope - use to clearly outline what needs to be built with a Product Requirement Document (PRD) |
| 2-generate-tasks | 2-Generate Tasks | Detailed Planning - use to break down the PRD into a granular, actionable task list |
| 3-process-task-list | 3-Process Task List | Iterative Implementation - use to guide the AI to tackle one task at a time, allowing you to review and approve each change |
| backlog-manager | Product Owner | Use for backlog management, story refinement, acceptance criteria, sprint planning, and prioritization decisions |
| code-developer | Full Stack Developer | Use for code implementation, debugging, refactoring, and development best practices |
| context-builder | Context Initializer | Use to initialize Claude Code context for new/existing projects, discover and organize documentation, create CLAUDE.md and KNOWLEDGE_BASE.md for optimal token-efficient memory |
| feature-planner | Product Manager | Use for creating PRDs, product strategy, feature prioritization, roadmap planning, and stakeholder communication |
| market-researcher | Business Analyst | Use for market research, brainstorming, competitive analysis, creating project briefs, initial project discovery, and documenting existing projects (brownfield) |
| master | Master Task Executor | Use when you need comprehensive expertise across all domains, running 1 off tasks that do not require a persona, or just wanting to use the same agent for many things |
| orchestrator | Master Orchestrator | Use for workflow coordination, multi-agent tasks, role switching guidance, and when unsure which specialist to consult |
| quality-assurance | Test Architect & Quality Advisor | Use for comprehensive test architecture review, quality gate decisions, and code improvement. Provides thorough analysis including requirements traceability, risk assessment, and test strategy. Advisory only - teams choose their quality bar |
| story-writer | Scrum Master | Use for story creation, epic management, retrospectives in party-mode, and agile process guidance |
| system-architect | Architect | Use for system design, architecture documents, technology selection, API design, and infrastructure planning |
| ui-designer | UX Expert | Use for UI/UX design, wireframes, prototypes, front-end specifications, and user experience optimization |

## Opencode Commands (21 total)

| ID | Description | Usage | Auto |
|---|---|---|---|
| brainstorming | Refines rough ideas into fully-formed designs through collaborative questioning | /brainstorming <session-type> <topic> | false |
| code-review | Reviews implementation against plan or requirements before proceeding | /code-review <review-scope> <focus-areas> | false |
| condition-based-waiting | Replaces arbitrary timeouts with condition polling to wait for actual state changes | /condition-based-waiting <condition-type> <timeout-specs> | false |
| debug | Debug an issue systematically using structured investigation techniques | /debug <issue-description> | - |
| docs-builder | Create comprehensive project documentation with structured /docs hierarchy | /docs-builder | false |
| explain | Explain code for someone new to the codebase | /explain <code-section> | - |
| git-commit | Analyze changes and create intelligent git commits | /git-commit | - |
| optimize | Analyze and optimize performance issues | /optimize <target-area> | - |
| refactor | Refactor code while maintaining behavior and tests | /refactor <code-section> | - |
| review | Comprehensive code review including quality, tests, and architecture | /review | - |
| root-cause-tracing | Systematically traces bugs backward through call stack to identify source | /root-cause-tracing <issue-description> | false |
| security | Security vulnerability scan and analysis | /security | - |
| ship | Pre-deployment verification checklist | /ship | - |
| skill-creator | Guide for creating effective skills and extending Claude capabilities | /skill-creator <skill-type> <skill-description> | false |
| stash | Save session context for compaction recovery or handoffs | /stash ["optional-name"] | - |
| subagent-spawning | Provides TDD-aware templates for spawning fresh subagents | Used by 3-process-task-list and other agents | true |
| systematic-debugging | Four-phase debugging framework - investigate root cause before any fixes | /systematic-debugging <bug-or-error-description> | false |
| test-driven-development | Write test first, watch it fail, write minimal code to pass | /test-driven-development <feature-or-behavior-to-test> | true |
| test-generate | Generate comprehensive test suites for existing code | /test-generate <code-section> | - |
| testing-anti-patterns | Prevents testing mock behavior and production pollution with test-only methods | /testing-anti-patterns <testing-scenario> | true |
| verification-before-completion | Requires running verification commands before making any success claims | /verification-before-completion <work-to-verify> | true |

All resources are auto-discovered from frontmatter in their respective directories:
- **Agents**: `./agent/*.md`
- **Commands**: `./command/*.md`
