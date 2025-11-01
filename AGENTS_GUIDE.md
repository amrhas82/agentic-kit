# Agent Directory

Complete directory of all 13 agents in the Agentic Toolkit. Each agent specializes in specific domains and can be invoked individually or work together as a team.

## Quick Reference

| Agent | Role | Best For | Availability |
|-------|------|----------|--------------|
| **Master** | Universal Executor | Any task, resources | All |
| **Orchestrator** | Workflow Coordinator | Multi-agent tasks | All |
| **Product Manager** | Strategy & PRDs | Product requirements | Standard/Pro |
| **Product Owner** | Backlog & Stories | Sprint planning | Standard/Pro |
| **Business Analyst** | Requirements Analysis | Business needs | Standard/Pro |
| **Full-Stack Developer** | Implementation | Writing code | Standard/Pro |
| **Holistic Architect** | System Design | Architecture | Standard/Pro |
| **UX Expert** | User Experience | Design & UX | Standard/Pro |
| **QA Test Architect** | Quality Assurance | Testing strategy | Standard/Pro |
| **Scrum Master** | Project Management | Team coordination | Standard/Pro |
| **Create PRD** | Documentation | PRD generation | Standard/Pro |
| **Generate Tasks** | Task Decomposition | Breaking down features | Standard/Pro |
| **Process Task List** | Task Tracking | Implementation tracking | Standard/Pro |

## Agent Descriptions

### Master

**Purpose:** Universal executor for any task, command-driven interface to all agentic resources

**When to Use:**
- You need to execute a task without adopting a specialized persona
- You want to run checklists or templates
- You need to manage agentic resources (tasks, workflows, templates)
- You have one-off tasks across multiple domains
- You need direct command execution

**What It Does:**
- Executes tasks, checklists, templates, and workflows directly
- Loads resources on-demand from specified paths
- Provides command-driven interface with * prefix
- Maintains expert knowledge of all agentic capabilities
- Handles rapid execution across multiple domains

**Prerequisites:**
- No special setup required
- Task lists should reference valid resource paths

**Example Usage:**

```
@Master: Execute the architect-checklist.md from ~/.claude/checklists

@Master: *help

@Master: Create a document from the prd-tmpl.yaml template

@Master: What resources are available in the toolkit?
```

**Available Commands:**
- `*help` - Show all available commands
- `*create-doc {template}` - Execute document creation
- `*execute-checklist {checklist}` - Run a checklist
- `*task {task}` - Execute a specific task
- `*knowledge-base` - Toggle knowledge base mode
- `*yolo` - Toggle rapid execution mode
- `*exit` - Exit agent

**Key Features:**
- No persona transformation
- Direct resource execution
- Numbered list presentations
- Rapid mode available
- Comprehensive command interface

---

### Orchestrator

**Purpose:** Workflow management and task coordination, master coordinator for complex multi-agent tasks

**When to Use:**
- You're unsure which agent to use
- You need to coordinate multiple agents
- You want workflow guidance and agent recommendations
- You need to manage complex multi-agent sequences
- You want help navigating the agentic framework

**What It Does:**
- Assesses your needs and recommends the right agent
- Guides context switching between specialized agents
- Manages multi-agent workflow sequences
- Tracks state and guides to logical next steps
- Provides capability overviews
- Transforms into specialized agents on demand

**Prerequisites:**
- Basic understanding of your project needs
- Clarity on what problem you're solving

**Example Usage:**

```
@Orchestrator: I need to build a new feature. What's the process?

@Orchestrator: Which agent should I use for creating an API design?

@Orchestrator: I've created a PRD, what should I do next?

@Orchestrator: *agent product-owner (transform into Product Owner)
```

**Available Commands:**
- `*help` - Show command guide
- `*chat-mode` - Conversational mode
- `*agent {name}` - Transform into specific agent
- `*workflow-guidance` - Get workflow help
- `*plan` - Create implementation plan
- `*yolo` - Toggle rapid mode
- `*exit` - Exit agent

**Key Features:**
- Intelligent agent recommendations
- Workflow guidance
- Agent transformation
- State tracking
- Multi-agent coordination

---

### Product Manager

**Purpose:** Product strategy, PRDs, roadmaps, feature prioritization, and stakeholder communication

**When to Use:**
- Creating a Product Requirements Document
- Developing product strategy and vision
- Planning product roadmaps
- Prioritizing features
- Facilitating stakeholder communication
- Breaking down products into epics/user stories
- Conducting product research

**What It Does:**
- Creates structured, comprehensive PRDs
- Develops product strategies
- Plans roadmaps and prioritizes features
- Creates epics and user stories
- Conducts market and competitive research
- Analyzes success metrics
- Identifies risks and dependencies

**Prerequisites:**
- Clear understanding of problem you're solving
- Target user profile (helpful but not required)
- Success criteria (if available)

**Example Usage:**

```
@Product Manager: Create a PRD for a mobile app that helps freelancers track time and billing

@Product Manager: I have this feature idea, can you turn it into an epic?

@Product Manager: Analyze the market for project management tools and create a competitive positioning strategy

@Product Manager: *create-prd (command-driven PRD creation)

@Product Manager: What features should we prioritize?
```

**Available Commands:**
- `*create-prd` - Create new PRD
- `*create-brownfield-prd` - PRD for existing systems
- `*create-epic` - Create feature epic
- `*create-story` - Create user story
- `*correct-course` - Realign strategy
- `*shard-prd` - Break down PRD
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Comprehensive PRD generation
- Strategic thinking
- User-centric approach
- Market research capability
- Iterative refinement
- Brownfield system support

---

### Product Owner

**Purpose:** Requirements management, backlog prioritization, user story refinement, sprint planning, and acceptance criteria

**When to Use:**
- Refining user stories with acceptance criteria
- Planning sprints
- Prioritizing backlog
- Validating user story consistency
- Creating sprint plans
- Analyzing story dependencies
- Coaching team through planning

**What It Does:**
- Manages product backlog
- Refines and validates user stories
- Defines and clarifies acceptance criteria
- Plans sprints and prioritization
- Analyzes story dependencies
- Validates artifact consistency
- Coaches agile process improvements

**Prerequisites:**
- User stories or feature list
- Backlog items (if prioritizing)
- Team velocity (helpful for planning)

**Example Usage:**

```
@Product Owner: Refine this user story with clear acceptance criteria

@Product Owner: Help me plan the next 2-week sprint

@Product Owner: Analyze dependencies in our backlog

@Product Owner: Create a prioritized backlog from our feature list

@Product Owner: Is this story ready for development?
```

**Available Commands:**
- `*refine-story` - Refine user story
- `*plan-sprint` - Create sprint plan
- `*validate-story` - Validate story quality
- `*analyze-dependencies` - Show story dependencies
- `*prioritize-backlog` - Prioritize items
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Story refinement
- Sprint planning
- Dependency analysis
- Backlog management
- Acceptance criteria clarity
- Team facilitation

---

### Business Analyst

**Purpose:** Strategic business analysis, market research, competitive intelligence, requirements analysis, and project discovery

**When to Use:**
- You need business requirements analysis
- Conducting market research
- Competitive intelligence gathering
- Brainstorming business solutions
- Project discovery and scoping
- Documenting existing systems
- Analyzing business processes

**What It Does:**
- Analyzes business needs and transforms them into actionable insights
- Conducts market research and competitive analysis
- Identifies business problems and opportunities
- Creates functional specifications
- Documents business processes
- Facilitates brainstorming
- Scopes projects and identifies requirements

**Prerequisites:**
- Description of business problem or need
- Context about your domain or market
- Stakeholder information (if available)

**Example Usage:**

```
@Business Analyst: Analyze the market for HR software and identify opportunities

@Business Analyst: We're struggling with customer onboarding. What are the root causes?

@Business Analyst: Help us document our current sales process

@Business Analyst: Brainstorm solutions to reduce customer churn

@Business Analyst: Conduct competitive analysis of project management tools
```

**Available Commands:**
- `*analyze-market` - Analyze market opportunities
- `*research-competitors` - Competitor analysis
- `*document-process` - Document business process
- `*identify-problems` - Find root causes
- `*facilitate-brainstorm` - Brainstorm session
- `*scope-project` - Scope discovery
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Business analysis
- Market research
- Competitive intelligence
- Problem identification
- Requirements documentation
- Brainstorming facilitation
- Process documentation

---

### Full-Stack Developer

**Purpose:** Implementation, code writing, debugging, refactoring, testing, and best practices application

**When to Use:**
- Implementing features from stories
- Writing production-quality code
- Debugging issues
- Refactoring code
- Writing tests
- Applying development best practices
- Handling frontend, backend, and database

**What It Does:**
- Implements features from story specifications
- Writes clean, maintainable, production-quality code
- Debugs issues and identifies root causes
- Refactors code for quality and performance
- Writes comprehensive tests
- Applies development best practices
- Handles full-stack implementation (frontend, backend, database)

**Prerequisites:**
- Clear story or feature specification
- Understanding of tech stack
- Existing codebase (for ongoing work)

**Example Usage:**

```
@Full-Stack Developer: Implement the user authentication story

@Full-Stack Developer: Debug this error in the payment processing

@Full-Stack Developer: Refactor the user service for better performance

@Full-Stack Developer: Write comprehensive tests for this module

@Full-Stack Developer: Create API endpoints for the expense tracking feature
```

**Available Commands:**
- `*implement-story` - Implement story
- `*debug-issue` - Debug problem
- `*write-tests` - Write test suite
- `*refactor-code` - Refactor for quality
- `*review-code` - Code review feedback
- `*optimize-performance` - Performance tuning
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Full-stack implementation
- Code quality focus
- Test-driven approach
- Debugging capability
- Refactoring expertise
- Best practices application
- Performance optimization

---

### Holistic Architect

**Purpose:** System design, architecture documentation, technology selection, API design, and infrastructure planning

**When to Use:**
- Designing system architecture
- Selecting technology stack
- Designing APIs and data models
- Planning for scalability
- Infrastructure planning
- Creating architecture documentation
- Evaluating technology options

**What It Does:**
- Creates comprehensive system architecture
- Designs APIs and data models
- Selects appropriate technology stack
- Plans for scalability and performance
- Documents architecture decisions
- Creates architecture diagrams
- Evaluates technology options
- Plans infrastructure and deployment

**Prerequisites:**
- Understanding of requirements or PRD
- Business constraints (scale, performance, budget)
- Current technology landscape (if existing system)

**Example Usage:**

```
@Holistic Architect: Design the system architecture for a real-time messaging app

@Holistic Architect: Create an API specification for our expense tracking app

@Holistic Architect: What technology stack should we use for a SaaS product?

@Holistic Architect: Design the database schema for this system

@Holistic Architect: How should we structure microservices for scalability?
```

**Available Commands:**
- `*design-architecture` - System architecture design
- `*design-api` - API specification
- `*select-technology` - Tech stack selection
- `*design-database` - Database schema
- `*plan-infrastructure` - Infrastructure planning
- `*create-diagrams` - Create architecture diagrams
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- System architecture design
- API design and specification
- Technology evaluation
- Database design
- Scalability planning
- Infrastructure planning
- Architecture documentation
- Diagram creation

---

### UX Expert

**Purpose:** User experience design, wireframes, prototypes, interaction patterns, accessibility, and user research

**When to Use:**
- Creating user wireframes and mockups
- Designing user flows and interactions
- Planning user experience improvements
- Ensuring accessibility and usability
- Analyzing user research data
- Creating design specifications
- Optimizing UI/UX

**What It Does:**
- Creates wireframes and user interface designs
- Designs user flows and interaction patterns
- Creates design specifications
- Analyzes user research and feedback
- Ensures accessibility and usability
- Recommends UI/UX improvements
- Creates prototypes and interactive specs

**Prerequisites:**
- User stories or feature requirements
- Understanding of target users
- Business constraints (if applicable)

**Example Usage:**

```
@UX Expert: Create wireframes for the user onboarding flow

@UX Expert: Design the expense tracking mobile app interface

@UX Expert: Improve the user experience for our checkout process

@UX Expert: Create interaction patterns and design system

@UX Expert: Ensure our app is accessible to users with disabilities

@UX Expert: Create a design specification for this feature
```

**Available Commands:**
- `*create-wireframes` - Wireframe creation
- `*design-userflow` - User flow design
- `*create-specs` - Design specifications
- `*improve-ux` - UX improvement recommendations
- `*check-accessibility` - Accessibility review
- `*analyze-research` - User research analysis
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Wireframe and mockup creation
- User flow design
- Interaction design
- Accessibility focus
- User research integration
- Design specification
- Usability optimization

---

### QA Test Architect

**Purpose:** Quality assurance, test architecture, test strategy design, requirements traceability, and production readiness

**When to Use:**
- Creating comprehensive test strategies
- Designing test cases
- Planning automation
- Reviewing quality and test completeness
- Validating production readiness
- Creating traceability matrices
- Risk assessment for features

**What It Does:**
- Creates comprehensive test strategies
- Designs test cases and test plans
- Plans test automation
- Validates requirements traceability
- Assesses production readiness
- Reviews test coverage
- Identifies quality risks
- Creates quality gate decisions (PASS/CONCERNS/FAIL)

**Prerequisites:**
- Feature specification or user story
- Acceptance criteria
- Technical details (if available)

**Example Usage:**

```
@QA Test Architect: Create a comprehensive test plan for this feature

@QA Test Architect: Design test cases for the payment processing module

@QA Test Architect: What automation strategy should we use?

@QA Test Architect: Is this ready for production? Quality review needed

@QA Test Architect: Create a traceability matrix for requirements
```

**Available Commands:**
- `*create-test-plan` - Test plan creation
- `*design-test-cases` - Test case design
- `*plan-automation` - Automation strategy
- `*review-coverage` - Test coverage review
- `*assess-readiness` - Production readiness
- `*quality-gate` - Quality gate decision
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Test strategy design
- Test case creation
- Test automation planning
- Traceability analysis
- Production readiness assessment
- Quality gate decisions
- Risk assessment
- Coverage analysis

---

### Scrum Master

**Purpose:** Project management, sprint planning, team coordination, velocity tracking, and agile process guidance

**When to Use:**
- Planning sprints
- Estimating effort
- Tracking team velocity
- Facilitating standups
- Managing dependencies
- Removing blockers
- Improving agile processes

**What It Does:**
- Creates sprint plans and backlog refinement
- Facilitates sprint ceremonies
- Tracks velocity and burndown
- Identifies and manages dependencies
- Removes blockers
- Coaches agile practices
- Improves team processes

**Prerequisites:**
- Backlog items or user stories
- Team size and skills
- Sprint duration

**Example Usage:**

```
@Scrum Master: Create a sprint plan for the next 2 weeks

@Scrum Master: Estimate effort for these user stories

@Scrum Master: We have a blocker, help us figure out next steps

@Scrum Master: Track our velocity and identify trends

@Scrum Master: Facilitate a retrospective
```

**Available Commands:**
- `*plan-sprint` - Sprint planning
- `*estimate-effort` - Estimate tasks
- `*track-velocity` - Velocity tracking
- `*manage-blocker` - Handle blockers
- `*analyze-dependencies` - Dependency analysis
- `*facilitate-standup` - Standup facilitation
- `*retrospective` - Retrospective facilitation
- `*help` - Show all commands
- `*exit` - Exit agent

**Key Features:**
- Sprint planning
- Effort estimation
- Velocity tracking
- Blocker management
- Dependency analysis
- Agile process improvement
- Team facilitation
- Burndown tracking

---

### Create PRD

**Purpose:** Specialized agent for structured Product Requirements Document creation

**When to Use:**
- You need a PRD created through structured discovery
- User provides a feature idea needing formalization
- You need structured documentation before implementation
- You want guided PRD creation process

**What It Does:**
- Guides structured discovery of requirements
- Creates comprehensive PRDs
- Follows industry best practices
- Includes success metrics
- Documents technical constraints
- Creates clear specifications

**Prerequisites:**
- Feature idea or problem statement
- Target user description (helpful)
- Success criteria (if available)

**Example Usage:**

```
@Create PRD: Help me document this feature idea as a PRD

@Create PRD: I want to build a time tracking app, create a PRD
```

**Key Features:**
- Structured discovery
- PRD generation
- Best practices application
- Complete documentation
- Success metrics inclusion
- Constraint documentation

---

### Generate Tasks

**Purpose:** Specialized agent for decomposing PRDs into actionable development tasks

**When to Use:**
- You have a PRD needing task decomposition
- You want to break features into implementation tasks
- You need effort estimation for a feature
- You want actionable tasks from a specification

**What It Does:**
- Converts PRDs into development task lists
- Breaks down features into actionable tasks
- Estimates effort for tasks
- Assigns priorities
- Identifies dependencies
- Creates task sequencing

**Prerequisites:**
- PRD or feature specification
- Technical understanding of team
- Implementation approach (helpful)

**Example Usage:**

```
@Generate Tasks: Convert this PRD into development tasks

@Generate Tasks: Break down this feature into actionable tasks

@Generate Tasks: What needs to be built from this specification?
```

**Key Features:**
- Task decomposition
- Effort estimation
- Prioritization
- Dependency identification
- Task sequencing
- Implementation breakdown

---

### Process Task List

**Purpose:** Specialized agent for managing implementation progress using task lists with test-first workflow and git integration

**When to Use:**
- You're implementing a PRD systematically
- You need to track implementation progress
- You want to continue work on existing task list
- You need proper test/commit workflow

**What It Does:**
- Manages markdown task lists
- Implements strict sequential execution
- Enforces test-first workflow
- Manages git commits
- Tracks completion progress
- Ensures code quality

**Prerequisites:**
- Task list or PRD
- Development environment
- Clear requirements

**Example Usage:**

```
@Process Task List: Help me implement this task list

@Process Task List: Continue implementation on [existing task list]

@Process Task List: I've completed this subtask, what's next?
```

**Key Features:**
- Sequential task execution
- Test-first workflow
- Git integration
- Progress tracking
- Quality assurance
- Commit management

---

## Agent Groupings by Domain

### Strategy & Planning Agents
- **Product Manager** - Strategy and PRD creation
- **Business Analyst** - Business requirements and market analysis
- **Orchestrator** - Workflow coordination and planning

### Implementation Agents
- **Full-Stack Developer** - Code writing and implementation
- **Holistic Architect** - System and API design
- **UX Expert** - User interface and experience design

### Management & Organization Agents
- **Product Owner** - Backlog and sprint management
- **Scrum Master** - Project coordination
- **Orchestrator** - Multi-agent coordination

### Quality & Documentation Agents
- **QA Test Architect** - Testing and quality assurance
- **Create PRD** - PRD generation
- **Generate Tasks** - Task decomposition
- **Process Task List** - Progress tracking

### Universal Agents
- **Master** - Any task execution
- **Orchestrator** - Workflow guidance

## Agent Invocation Patterns

### Typical Product Development Flow

1. **Business Analyst** - Understand the market and business need
2. **Product Manager** - Create comprehensive PRD
3. **Product Owner** - Break into user stories
4. **Orchestrator** - Coordinate next steps
5. **Holistic Architect** - Design system
6. **UX Expert** - Design user interface
7. **Full-Stack Developer** - Implement feature
8. **QA Test Architect** - Plan testing
9. **Process Task List** - Track progress
10. **Scrum Master** - Manage execution

### Quick Task Pattern

1. **Master** - Direct task execution
2. **Orchestrator** - Guidance if unsure

### Parallel Work Pattern

- **Product Owner** - Refine backlog in parallel
- **UX Expert** - Design interfaces in parallel
- **Holistic Architect** - Design systems in parallel
- **Full-Stack Developer** - Implement in parallel

## Auto-Invocation Rules

Agents appear automatically with @ mention:

```
@Agent Name: Your request here
```

**Example:**
```
@Product Manager: Create a PRD for a task management app

@Full-Stack Developer: Implement the user authentication feature

@QA Test Architect: Create a test plan for this feature
```

## Tips for Working with Agents

### Be Specific
Provide context and clear requirements. Agents respond better to specific requests than vague ones.

### Ask for Clarification
Agents will ask clarifying questions. This is good - they're gathering information to give better results.

### Iterate
You don't need perfect input the first time. Refine and iterate with agents.

### Chain Agents
Use Orchestrator to guide multi-agent sequences for complex projects.

### Leverage Specialization
Each agent has specific expertise. Use the right agent for each task.

## Getting Help with Agents

- See [README.md](README.md) for agent overview
- See [QUICK-START.md](QUICK-START.md) for beginner guide
- See [SKILLS.md](SKILLS.md) for skill integration
- See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues

---

**Version:** 1.0.0
**Last Updated:** Nov 2024
**Status:** Complete

Start with [QUICK-START.md](QUICK-START.md) to try your first agent.
