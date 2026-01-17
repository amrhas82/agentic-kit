# Global Amp Agents

This file defines specialized agent personas available globally across all Amp workspaces, and provides guidance and memory for your coding CLI.

# MANDATORY: Orchestrator-First Routing Pattern

**System Instruction for Ampcode**:
When processing ANY user request, invoke the `orchestrator` agent FIRST unless:
- User explicitly mentions a specific agent: `@agent-id` or `As agent-id, ...`
- User invokes a command: `/command-name`
- User gives a direct command: `npm test`, `git status`, file operations, etc.

**Why orchestrator first?**
- Analyzes user intent and matches to optimal workflow
- Asks clarifying questions for conditional workflow steps (e.g., "Research first?")
- Coordinates multi-agent sequences with minimal context passing
- Ensures systematic approach to complex tasks

**Orchestrator reads this registry** to match requests to specialists and invoke via Task tool with selective context injection.

# AmpCode subagents and Tasks (Amp)

Ampcode reads AGENT.md during initialization and uses it as part of its system prompt for the session. 

## How To Use with Amp

Activate agents by mentioning their ID in your prompts:
- `"@quality-assurance review this code"`
- Copy/paste `ampcode` subfolders in this project to ~/.config/amp and Ampcode will read and access agents from ~/.config/amp/agents and tasks from ~~/.config/amp/resources/tasks-brief.md,
- You can access agents using "@ui-designer", or you can reference a role naturally, e.g., "As ui-designer, implement ..." or use commands defined in your tasks.

Note
- Orchestrators/master run as mode: primary; other agents as mode: subagents.
- All agents have enbaled tools: write, edit, bash.

## Agents

### Directory

| Title | ID | When To Use |
|---|---|---|
| 1-Create PRD | 1-create-prd | Define scope with a Product Requirement Document (PRD) |
| 2-Generate Tasks | 2-generate-tasks | Break down PRD into granular, actionable task list |
| 3-Process Task List | 3-process-task-list | Guide AI to tackle tasks iteratively with review |
| UX Expert | ui-designer | UI/UX design, wireframes, prototypes, front-end specs |
| Scrum Master | story-writer | Story creation, epic management, agile process guidance |
| Test Architect & Quality Advisor | quality-assurance | Test architecture review, quality gates, code improvement |
| Product Owner | backlog-manager | Backlog management, story refinement, acceptance criteria |
| Product Manager | feature-planner | PRDs, product strategy, feature prioritization, roadmaps |
| Full Stack Developer | code-developer | Code implementation, debugging, refactoring |
| Master Orchestrator | orchestrator | Workflow coordination, multi-agent tasks, role switching |
| Master Task Executor | master | Comprehensive expertise across all domains |
| Architect | system-architect | System design, architecture docs, API design |
| Business Analyst | market-researcher | Market research, competitive analysis, project briefs |
| Context Initializer | context-builder | Use to initialize Ampcode context for new/existing projects, discover and organize documentation, create AGENT.md and KNOWLEDGE_BASE.md for optimal token-efficient memory |
| Documentation Architect | docs-builder | Create comprehensive project documentation with structured /docs hierarchy (00-context, 01-product, 02-features, 03-logs, 04-process) |

## Common Workflow Patterns

The orchestrator uses these patterns to match user intent to multi-agent workflows. Each step is **conditional** - orchestrator asks user approval before advancing.

### 1. Feature Discovery Flow (Most Common)
**User Intent**: "I need to add [feature]", "Build [new functionality]"
**Workflow**:
```
orchestrator analyzes → asks: "Research competitive approaches first?"
  ├─ Yes → market-researcher (research) → ask: "Create formal PRD?"
  │   ├─ Yes → 1-create-prd → ask: "Generate implementation tasks?"
  │   │   ├─ Yes → 2-generate-tasks → ask: "Start systematic implementation?"
  │   │   │   ├─ Yes → 3-process-task-list
  │   │   │   └─ No → Done (user has task list for review)
  │   │   └─ No → Done (user has PRD for review)
  │   └─ No → Done (user has research for review)
  └─ No → 1-create-prd → (same conditional tree from PRD onward)
```

### 2. Product Definition Flow
**User Intent**: "We're considering a new product/initiative", "Strategic product planning"
**Workflow**:
```
orchestrator → ask: "Follow product definition workflow?"
└─ Yes → feature-planner (strategy, vision) → ask: "Define user stories?"
    └─ Yes → backlog-manager (backlog, stories) → ask: "Technical feasibility assessment?"
        └─ Yes → system-architect (platform decisions, technical design)
```

### 3. Story Implementation Flow
**User Intent**: "Implement [existing story]", "Build [defined feature with acceptance criteria]"
**Workflow**:
```
orchestrator → ask: "Validate story readiness first?"
├─ Yes → backlog-manager (validate acceptance criteria) → code-developer → quality-assurance
└─ No → code-developer (implement) → quality-assurance (quality gate)
```

### 4. Architecture Decision Flow
**User Intent**: "Should we use [tech A] or [tech B]?", "How should we architect [system]?"
**Workflow**:
```
orchestrator → market-researcher (gather constraints, requirements)
            → system-architect (options analysis, tradeoffs)
            → ask: "Need product alignment?"
            └─ Yes → feature-planner (strategic alignment, decision rationale)
```

### 5. UI Development Flow
**User Intent**: "Build [UI component]", "Design and implement [interface]"
**Workflow**:
```
orchestrator → ui-designer (wireframes, design system)
            → ask: "Complex enough to need PRD?"
            ├─ Yes → 1-create-prd → code-developer → quality-assurance
            └─ No → code-developer (implement) → quality-assurance (validate)
```

### 6. Bug Triage Flow
**User Intent**: "Bug: [description]", "Fix [broken behavior]"
**Workflow**:
```
orchestrator → code-developer (investigate root cause)
            → ask: "Severity level?"
            ├─ Critical → code-developer (immediate fix) → quality-assurance (verify)
            └─ Non-critical → 1-create-prd (bug story) → backlog (for sprint planning)
```

### 7. Brownfield Discovery Flow
**User Intent**: "Help me understand this codebase", "Document existing system"
**Workflow**:
```
orchestrator → context-builder (build knowledge base, discover patterns)
            → market-researcher (document current state, stakeholders)
            → ask: "Assess technical debt and modernization opportunities?"
            └─ Yes → system-architect (technical assessment, recommendations)
```

### 8. Quality Validation Flow
**User Intent**: "Review this PR", "Check code quality before merge"
**Workflow**:
```
orchestrator → quality-assurance (comprehensive review)
            → [Decision gate]
            ├─ PASS → Done (ready to merge)
            ├─ CONCERNS → Present issues → user decides next step
            └─ FAIL → code-developer (apply fixes) → quality-assurance (re-validate)
```

### 9. Sprint Planning Flow
**User Intent**: "Plan next sprint", "Prepare sprint backlog"
**Workflow**:
```
orchestrator → feature-planner (prioritize features for sprint)
            → story-writer (break into user stories)
            → backlog-manager (add acceptance criteria)
            → 2-generate-tasks (create sprint backlog with tasks)
```

### Selective Context Injection

When orchestrator invokes specialists, it passes **minimal necessary context**:

**✓ Include**:
- Direct user requirements for the specific task
- Outputs from immediate workflow dependencies only
- Relevant domain-specific files/data

**✗ Exclude**:
- Full conversation history
- Unrelated workflow step outputs
- Tangential project context

**Example**: When invoking `quality-assurance`:
- ✓ Include: code diff, test requirements, acceptance criteria
- ✗ Exclude: PRD creation discussions, UI wireframes, database schema decisions

## Agent Details

### 1-Create PRD (id: 1-create-prd)
Source: [./agents/1-create-prd.md](./agents/1-create-prd.md)

- When to use: Define scope by creating Product Requirement Documents
- How to activate: "create prd, ..." or "As 1-create-prd, ..."

### 2-Generate Tasks (id: 2-generate-tasks)
Source: [./agents/2-generate-tasks.md](./agents/2-generate-tasks.md)

- When to use: Break down PRD into granular, actionable task list
- How to activate: "generate tasks, ..." or "As 2-generate-tasks, ..."

### 3-Process Task List (id: 3-process-task-list)
Source: [./agents/3-process-task-list.md](./agents/3-process-task-list.md)

- When to use: Guide AI through iterative task implementation with review
- How to activate: "process task list, ..." or "As 3-process-task-list, ..."

### UX Expert (id: ui-designer)
Source: [./agents/ui-designer.md](./agents/ui-designer.md)

- When to use: UI/UX design, wireframes, prototypes, user experience
- How to activate: "As ui-designer, ..."

### Scrum Master (id: story-writer)
Source: [./agents/story-writer.md](./agents/story-writer.md)

- When to use: Story creation, epic management, agile guidance
- How to activate: "As story-writer, ..."

### Test Architect & Quality Advisor (id: quality-assurance)
Source: [./agents/quality-assurance.md](./agents/quality-assurance.md)

- When to use: Test architecture, quality gates, requirements traceability
- How to activate: "As quality-assurance, ..." or "As qa, ..."

### Product Owner (id: backlog-manager)
Source: [./agents/backlog-manager.md](./agents/backlog-manager.md)

- When to use: Backlog management, sprint planning, prioritization
- How to activate: "As backlog-manager, ..."

### Product Manager (id: feature-planner)
Source: [./agents/feature-planner.md](./agents/feature-planner.md)

- When to use: PRDs, product strategy, roadmap planning
- How to activate: "As feature-planner, ..."

### Full Stack Developer (id: code-developer)
Source: [./agents/code-developer.md](./agents/code-developer.md)

- When to use: Code implementation, debugging, refactoring
- How to activate: "As code-developer, ..."
- Commands: *develop-story, *help, *explain, *review-quality-assurance, *run-tests

### Master Orchestrator (id: orchestrator)
Source: [./agents/orchestrator.md](./agents/orchestrator.md)

- When to use: Workflow coordination, when unsure which specialist to use
- How to activate: "As orchestrator, ..."

### Master Task Executor (id: master)
Source: [./agents/master.md](./agents/master.md)

- When to use: One-off tasks, comprehensive expertise across domains
- How to activate: "As master, ..."

### Architect (id: system-architect)
Source: [./agents/system-architect.md](./agents/system-architect.md)

- When to use: System design, technology selection, API design
- How to activate: "As architect, ..." or "As system-architect, ..."

### Context Initializer (id: context-builder)
Source: [./agents/context-builder.md](./agents/context-builder.md)

- When to use: Use to initialize Ampcode context for new/existing projects, discover and organize documentation, create AGENT.md and KNOWLEDGE_BASE.md for optimal token-efficient memory
- How to activate: Mention "@context-builder" or "As context-builder, ..." to get role-aligned behavior
- Full definition: open the source file above (content not embedded)

### Business Analyst (id: market-researcher)
Source: [./agents/market-researcher.md](./agents/market-researcher.md)

- When to use: Market research, competitive analysis, project discovery
- How to activate: "As analyst, ..." or "As market-researcher, ..."

### Documentation Architect (id: docs-builder)
Source: [./agents/docs-builder.md](./agents/docs-builder.md)

- When to use: Create comprehensive project documentation with structured /docs hierarchy (00-context, 01-product, 02-features, 03-logs, 04-process)
- How to activate: "As docs-builder, ..." to get role-aligned behavior

## Tasks

These are reusable task briefs; use the paths to open them as needed.

### Task: validate-next-story
Source: [./resources/task-briefs.md#validate-next-story](./resources/task-briefs.md#validate-next-story)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: trace-requirements
Source: [./resources/task-briefs.md#trace-requirements](./resources/task-briefs.md#trace-requirements)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: test-design
Source: [./resources/task-briefs.md#test-design](./resources/task-briefs.md#test-design)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: shard-doc
Source: [./resources/task-briefs.md#shard-doc](./resources/task-briefs.md#shard-doc)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: risk-profile
Source: [./resources/task-briefs.md#risk-profile](./resources/task-briefs.md#risk-profile)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: review-story
Source: [./resources/task-briefs.md#review-story](./resources/task-briefs.md#review-story)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: quality-assurance-gate
Source: [./resources/task-briefs.md#qa-gate](./resources/task-briefs.md#qa-gate)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: nfr-assess
Source: [./resources/task-briefs.md#nfr-assess](./resources/task-briefs.md#nfr-assess)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: index-docs
Source: [./resources/task-briefs.md#index-docs](./resources/task-briefs.md#index-docs)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: generate-ai-frontend-prompt
Source: [./resources/task-briefs.md#generate-ai-frontend-prompt](./resources/task-briefs.md#generate-ai-frontend-prompt)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: facilitate-brainstorming-session
Source: [./resources/task-briefs.md#facilitate-brainstorming-session](./resources/task-briefs.md#facilitate-brainstorming-session)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: execute-checklist
Source: [./resources/task-briefs.md#execute-checklist](./resources/task-briefs.md#execute-checklist)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: document-project
Source: [./resources/task-briefs.md#document-project](./resources/task-briefs.md#document-project)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: create-next-story
Source: [./resources/task-briefs.md#create-next-story](./resources/task-briefs.md#create-next-story)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: create-doc
Source: [./resources/task-briefs.md#create-doc](./resources/task-briefs.md#create-doc)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: create-deep-research-prompt
Source: [./resources/task-briefs.md#create-deep-research-prompt](./resources/task-briefs.md#create-deep-research-prompt)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: create-brownfield-story
Source: [./resources/task-briefs.md#create-brownfield-story](./resources/task-briefs.md#create-brownfield-story)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: correct-course
Source: [./resources/task-briefs.md#correct-course](./resources/task-briefs.md#correct-course)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: brownfield-create-story
Source: [./resources/task-briefs.md#brownfield-create-story](./resources/task-briefs.md#brownfield-create-story)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: brownfield-create-epic
Source: [./resources/task-briefs.md#brownfield-create-epic](./resources/task-briefs.md#brownfield-create-epic)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: apply-qa-fixes
Source: [./resources/task-briefs.md#apply-qa-fixes](./resources/task-briefs.md#apply-qa-fixes)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

### Task: advanced-elicitation
Source: [./resources/task-briefs.md#advanced-elicitation](./resources/task-briefs.md#advanced-elicitation)
- How to use: Reference the task in your prompt or execute via your configured commands.
- Full brief: open the source file above (content not embedded)

## Commands

These are slash commands available in the TUI. Use /command-name to execute.

### Command: xlsx
Source: [./commands/xlsx.md](./commands/xlsx.md)
- Description: Create, edit, and analyze spreadsheets with formulas, formatting, data analysis, and visualization
- Usage: `/xlsx <operation> <spreadsheet-file>`
- Full definition: open the source file above (content not embedded)

### Command: webapp-testing
Source: [./commands/webapp-testing.md](./commands/webapp-testing.md)
- Description: Test local web applications using Playwright - verify functionality, debug UI, capture screenshots
- Usage: `/webapp-testing <webapp-url-or-local-server>`
- Full definition: open the source file above (content not embedded)

### Command: systematic-debugging
Source: [./commands/systematic-debugging.md](./commands/systematic-debugging.md)
- Description: Systematic four-phase debugging framework - investigate root cause before any fixes
- Usage: `/systematic-debugging <bug-or-error-description>`
- Full definition: open the source file above (content not embedded)

### Command: slack-gif-creator
Source: [./commands/slack-gif-creator.md](./commands/slack-gif-creator.md)
- Description: Create animated GIFs optimized for Slack with size validation and composable animation primitives
- Usage: `/slack-gif-creator <gif-type> <animation-concept>`
- Full definition: open the source file above (content not embedded)

### Command: verification-before-completion
Source: [./commands/verification-before-completion.md](./commands/verification-before-completion.md)
- Description: Verify work meets requirements before marking complete - prevents incomplete deliverables
- Usage: `/verification-before-completion <work-to-verify>`
- Full definition: open the source file above (content not embedded)

### Command: skill-creator
Source: [./commands/skill-creator.md](./commands/command/skill-creator.md)
- Description: Create reusable skills with proper structure, validation, and documentation
- Usage: `/skill-creator <skill-type> <skill-description>`
- Full definition: open the source file above (content not embedded)

### Command: test-driven-development
Source: [./commands/test-driven-development.md](./commands/test-driven-development.md)
- Description: Write test first, watch it fail, write minimal code to pass - ensures tests actually verify behavior
- Usage: `/test-driven-development <feature-or-behavior-to-test>`
- Full definition: open the source file above (content not embedded)

### Command: testing-anti-patterns
Source: [./commands/testing-anti-patterns.md](./commands/testing-anti-patterns.md)
- Description: Identify and avoid common testing anti-patterns that create fragile, useless tests
- Usage: `/testing-anti-patterns <testing-scenario>`
- Full definition: open the source file above (content not embedded)

### Command: theme-factory
Source: [./commands/theme-factory.md](./commands/theme-factory.md)
- Description: Generate consistent themes with proper color systems, typography, and spacing
- Usage: `/theme-factory <theme-type> <design-requirements>`
- Full definition: open the source file above (content not embedded)

### Command: root-cause-tracing
Source: [./commands/root-cause-tracing.md](./commands/root-cause-tracing.md)
- Description: Trace issues to their root cause using systematic investigation techniques
- Usage: `/root-cause-tracing <issue-description>`
- Full definition: open the source file above (content not embedded)

### Command: internal-comms
Source: [./commands/internal-comms.md](./commands/internal-comms.md)
- Description: Structure internal communications for clarity, actionability, and team alignment
- Usage: `/internal-comms <communication-type> <audience>`
- Full definition: open the source file above (content not embedded)

### Command: pdf
Source: [./commands/pdf.md](./commands/pdf.md)
- Description: Create, edit, and analyze PDF documents with proper formatting and structure
- Usage: `/pdf <operation> <pdf-file>`
- Full definition: open the source file above (content not embedded)

### Command: mcp-builder
Source: [./commands/mcp-builder.md](./commands/mcp-builder.md)
- Description: Build Model Context Protocol servers with proper tool definitions and error handling
- Usage: `/mcp-builder <server-type> <specifications>`
- Full definition: open the source file above (content not embedded)

### Command: condition-based-waiting
Source: [./commands/condition-based-waiting.md](./commands/condition-based-waiting.md)
- Description: Implement robust waiting mechanisms based on conditions rather than fixed delays
- Usage: `/condition-based-waiting <condition-type> <timeout-specs>`
- Full definition: open the source file above (content not embedded)

### Command: pptx
Source: [./commands/pptx.md](./commands/pptx.md)
- Description: Create professional PowerPoint presentations with proper structure and design
- Usage: `/pptx <presentation-type> <content-outline>`
- Full definition: open the source file above (content not embedded)

### Command: docx
Source: [./commands/docx.md](./commands/docx.md)
- Description: Create and edit Word documents with proper formatting and structure
- Usage: `/docx <operation> <document-specs>`
- Full definition: open the source file above (content not embedded)

### Command: brand-guidelines
Source: [./commands/brand-guidelines.md](./commands/brand-guidelines.md)
- Description: Establish comprehensive brand guidelines with visual identity and usage rules
- Usage: `/brand-guidelines <brand-type> <requirements>`
- Full definition: open the source file above (content not embedded)

### Command: brainstorming
Source: [./commands/brainstorming.md](./commands/brainstorming.md)
- Description: Facilitate structured brainstorming sessions with proven techniques and frameworks
- Usage: `/brainstorming <session-type> <topic>`
- Full definition: open the source file above (content not embedded)

### Command: canvas-design
Source: [./commands/canvas-design.md](./commands/canvas-design.md)
- Description: Design visual canvases for business models, user journeys, and strategic planning
- Usage: `/canvas-design <canvas-type> <design-goals>`
- Full definition: open the source file above (content not embedded)

### Command: artifacts-builder
Source: [./commands/artifacts-builder.md](./commands/artifacts-builder.md)
- Description: Build structured artifacts with proper validation, formatting, and documentation
- Usage: `/artifacts-builder <artifact-type> <specifications>`
- Full definition: open the source file above (content not embedded)

### Command: algorithmic-art
Source: [./commands/algorithmic-art.md](./commands/algorithmic-art.md)
- Description: Generate algorithmic art with mathematical patterns and aesthetic principles
- Usage: `/algorithmic-art <art-type> <pattern-specs>`
- Full definition: open the source file above (content not embedded)

### Command: code-review
Source: [./commands/code-review.md](./commands/code-review.md)
- Description: Conduct thorough code reviews with focus on quality, security, and maintainability
- Usage: `/code-review <review-scope> <focus-areas>`
- Full definition: open the source file above (content not embedded)

