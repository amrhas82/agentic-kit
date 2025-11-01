# Skills vs Subagents Analysis: Which Approach is Best for Your Plugin?

## Executive Summary

**TL;DR**: Your **subagents approach is far superior** for your use case. Here's why:

| Aspect | Skills | Subagents |
|--------|--------|-----------|
| **Invocation** | Passive (Claude must discover) | Active (User explicitly calls) |
| **Persona Control** | Shared context | Complete isolation |
| **Complexity** | Lightweight utilities | Full agent implementation |
| **User Experience** | Transparent but limited | Direct and intentional |
| **Your Use Case** | ❌ Poor fit | ✅ Perfect fit |

---

## Part 1: Understanding the Fundamental Difference

### Skills (Superpowers Model)

**What are skills?**
- Reusable problem-solving techniques and methodologies
- Stateless utilities that Claude discovers and applies automatically
- Examples: "TDD skill", "Debugging skill", "Code review skill"
- Activated implicitly based on context

**How superpowers uses them:**
- Designed for "Claude discovers when to use them"
- Skills are **methods/techniques**, not specialized roles
- Four skill categories: Testing, Debugging, Collaboration, Meta
- Claude activates relevant skills based on task context

**Example from superpowers:**
```
User: "Help me test this async function"
↓
Claude auto-activates "TDD skill" because it detects testing context
↓
Claude applies TDD methodology without explicit user request
```

### Subagents (Your Model)

**What are subagents?**
- Specialized personas with specific expertise and operating principles
- Stateful agents that maintain context and handle multi-step workflows
- Examples: "Full-Stack Developer", "QA Test Architect", "Product Manager"
- Invoked explicitly by user

**How your model works:**
```
User: "As full-stack-dev, implement this feature"
↓
Claude adopts the developer persona with all specialized knowledge
↓
Executes story-based workflow with precise task handling
```

**Your 13 agents (Claude kit):**
- **Workflow Agents (3)**: 1-create-prd, 2-generate-tasks, 3-process-task-list
- **Specialist Agents (10)**: developer, architect, qa-engineer, product-manager, etc.
- **Tasks (22)**: Reusable task workflows

---

## Part 2: Why Subagents is Better for Your Toolkit

### 1. **Your Agents Require Explicit Personas**

**Your agents need invocation because they ARE personas:**

```markdown
# From your full-stack-dev.md:
"You are an Expert Senior Software Engineer & Implementation Specialist..."
```

The agent:
- Has specific operating principles
- Follows a precise workflow (develop-story)
- Maintains state across multiple tasks
- Updates story files with specific formats
- Needs to understand task context deeply

**This CANNOT work as implicit skills** because:
- Claude wouldn't know which persona to adopt
- The specific workflow (read task → implement → test → mark complete) would be missed
- Story file updates require the agent to understand its own constraints

### 2. **Your Use Case is Multi-Step Workflows**

**Skills are stateless:**
```javascript
// Skill: Extract a technique and apply it once
onSkillInvoked: {
  handler: "apply-tdd.js"  // Apply TDD and return
}
```

**Your agents are stateful:**
```markdown
# Full-Stack Dev Workflow:
1. Read story file
2. Check directory structure
3. Implement task
4. Write tests
5. Run validations
6. Update story file
7. Mark complete
8. Run checklist
9. Set status "Ready for Review"
10. HALT
```

A single invocation of `/invoke full-stack-dev` doesn't make sense because the agent needs to:
- Stay in conversation mode
- Make decisions after each step
- Update files based on intermediate results
- Ask clarifying questions

**This is why you have to explicitly use `@full-stack-dev` or `As full-stack-dev`** - Claude needs to know it should maintain this persona throughout the entire workflow.

### 3. **Your Agents are Decision-Making Units**

**Skills execute** → "Apply this technique"
**Your agents decide** → "Given these requirements, choose the best approach, execute it, validate, and report"

From your full-stack-dev.md:
```markdown
# Decision-Making Framework

1. **Always defer to story file** - It contains your requirements
2. **Test rigorously** - No shortcuts on validation
3. **Update precisely** - Only touch authorized story sections
4. **Halt when blocked** - Don't guess or assume
5. **Maintain context** - Keep File List and Change Log current
6. **Execute completely** - Finish all tasks before marking ready
```

These aren't techniques to apply once; they're principles that guide ongoing decision-making.

### 4. **Your Agents Have Specialized Operating Principles**

Compare these approaches:

**Superpowers "Collaboration skill"** (stateless):
```
"When pair programming, use these techniques..."
```

**Your "Orchestrator agent"** (stateful):
```markdown
name: orchestrator
description: Coordinate multi-agent workflows, manage complex tasks

# Core Principles:
1. **Runtime Resource Loading**
2. **Direct Execution**
3. **Command Processing**
4. **Numbered Lists**
...

# Resources:
- Checklists
- Tasks
- Templates
- Workflows
```

Your orchestrator agent needs to:
- Know about all available agents
- Understand when to spawn each one
- Coordinate their outputs
- Manage complex dependencies

This cannot be a "skill that Claude applies" - it must be a conscious agent that makes decisions.

---

## Part 3: Why Skills Don't Work for Your Toolkit

### Problem 1: Skills are Discoverable

**Superpowers design:**
```
Claude Code detects: "This looks like a testing task"
↓
Auto-activates testing skill
↓
Applies TDD methodology
```

**Your toolkit needs explicit invocation:**
```
User: "As full-stack-dev, implement this story"
↓
Claude MUST adopt the developer persona
↓
Not: "Oh, I should apply the developer skill"
```

If your agents were passive skills:
- User would never know which agent is being used
- Multiple agents might conflict in a single conversation
- Workflow-based agents (1-2-3 PRD → Tasks → Process) couldn't coordinate

### Problem 2: Skills are Lightweight

Skills in superpowers:
- Single-purpose techniques
- "Apply once" design
- Brief invocations

Your agents:
- 80+ lines of specialized instructions
- Complex workflows spanning multiple steps
- State management across file updates
- Resource dependencies (checklists, tasks, templates)

A 4KB agent definition isn't a "skill you apply once" - it's a specialized persona.

### Problem 3: Skills are Context-Agnostic

**Superpowers skill:**
```
User: "Help me debug this"
Claude: "I'll apply my systematic debugging skill..."
```

**Your agent:**
```
User: "As qa-test-architect, review this code"
Claude: "I'm adopting the QA Test Architect persona with:
- Quality-focused decision making
- Test coverage analysis
- Risk assessment principles
- Production readiness validation"
```

These are fundamentally different models.

---

## Part 4: Why You Have to Explicitly Use `@agent-name`

### The "Why" Behind the Requirement

**Question:** "Why do I have to tell Claude to use @full-stack-dev? Shouldn't it know?"

**Answer:** Because explicit invocation is the CORRECT design choice for your use case.

### The Three Ways to Invoke

#### 1. **Claude Code: `@agent-name` (Your Model)**
```
As @full-stack-dev, implement story-001
```
✅ **Correct for workflows**
- Explicit and clear
- User controls which persona is active
- Perfect for sequential workflows

#### 2. **OpenCode/Amp: Natural Language Invocation**
```
As full-stack-dev, implement story-001
```
✅ **Also correct** (just different syntax)
- Natural for conversation
- Still explicitly named
- Same principle: user chooses the agent

#### 3. **Auto-Activation (Skills Model)**
```
User: "Help me implement this story"
Claude: [Auto-activates full-stack-dev skill]
```
❌ **WRONG for your use case** because:
- Claude might activate the wrong agent
- User loses control of which persona is active
- Multiple agents could interfere
- Workflow coordination breaks down

### Why This is Actually a Feature, Not a Bug

**Your design is intentional and correct:**

1. **User agency** - You know which expert you need
2. **Clear context** - Claude knows exactly which persona to adopt
3. **Workflow continuity** - Agent stays in character throughout multi-step tasks
4. **No ambiguity** - "Should I use the developer or architect?" is answered by the user

This is BETTER than silent auto-activation.

---

## Part 5: Documentation Quality Comparison

### Your Subagents (Excellent)

**Strengths:**
- ✅ Frontmatter metadata (name, description, color, model)
- ✅ Clear persona definition
- ✅ Explicit operating principles
- ✅ Command interface with `*` prefix
- ✅ Resource dependencies listed
- ✅ Decision-making framework
- ✅ Workflow guidelines
- ✅ Comprehensive instructions

**Example (full-stack-dev.md):**
```markdown
---
name: full-stack-dev
description: Use this agent to implement stories...
model: inherit
color: purple
---

You are an Expert Senior Software Engineer...

# Critical Core Principles
1. Story Context Is Complete
2. Check Before Creating
3. Limited Story File Updates
...

# Commands
- **develop-story** - Execute story implementation workflow
...

# Workflow Discipline
**Before Starting**: Verify story file...
**During Implementation**: Focus one task...
**Quality Assurance**: Run tests...
**Communication**: Be concise but complete...
```

**Why this works:**
- Frontmatter makes agents discoverable
- Operating principles are explicit
- Commands are standardized
- Workflow is unambiguous
- Resource dependencies are clear

### Superpowers Skills (Different Style)

**Strengths:**
- ✅ Focused methodology documentation
- ✅ Technique-based (TDD, debugging patterns)
- ✅ Reusable across contexts
- ✅ Lightweight
- ✅ Implicit activation

**For Superpowers' use case**, skills are better because:
- They're methodologies, not personas
- Claude discovers them naturally
- They're context-agnostic utilities
- Simple activation model

**But for YOUR toolkit**, your approach is superior.

---

## Part 6: How to Improve Your Documentation

Your subagent documentation is already excellent. Here are minor enhancements:

### 1. **Add Agent Interaction Patterns**

Current:
```markdown
# Commands
- **help** - Show numbered list of commands
```

Better:
```markdown
# Commands & Interaction Patterns

## Command Interface
All commands require * prefix (e.g., *help):

- **help** - Show numbered list of commands
- **exit** - Exit with confirmation

## Interaction Patterns

### Single Command Mode (Stateless)
User: "As @developer, what's wrong with this code?"
Agent: Analyzes, reports issue, exits

### Workflow Mode (Stateful)
User: "As @developer, *develop-story"
Agent: Enters workflow, manages multi-step execution

### Decision Points
When ambiguity arises:
1. Present numbered options (1-4 max)
2. Wait for user selection
3. Continue execution
```

### 2. **Add Agent Relationship Map**

For orchestrator, add:
```markdown
# Agent Relationships

## Orchestrator Coordinates:
- **Initiates**: 1-create-prd for initial planning
- **Spawns**: 2-generate-tasks after PRD approval
- **Delegates**: 3-process-task-list for implementation
- **Requests Review**: qa-test-architect for quality validation
- **Escalates**: full-stack-dev for complex implementation
- **Consults**: holistic-architect for design decisions

## Sequential Workflow:
orchestrator → 1-create-prd
            → 2-generate-tasks
            → 3-process-task-list
            → qa-test-architect
            → orchestrator (final coordination)
```

### 3. **Add Expected Behavior Patterns**

```markdown
# Expected Behavior Patterns

## When User Provides Clear Story File
Agent: Reads story, understands requirements, asks no questions, proceeds

## When Story is Ambiguous
Agent: Lists numbered clarifications needed, waits for input

## When Tests Fail
Agent:
1. Analyzes failure
2. Explains what's wrong
3. Proposes fix
4. Implements fix
5. Re-runs tests
6. Continues (or halts if persistent)

## When Blocked
Agent: Reports specific blocker, numbered options, halts execution
```

### 4. **Add Persona Consistency Guidelines**

```markdown
# Maintaining Persona Consistency

## Do:
- ✅ Stay in character throughout workflow
- ✅ Make decisions consistent with role
- ✅ Reference your expertise specialization
- ✅ Apply role-specific knowledge
- ✅ Use command interface (@* prefix)

## Don't:
- ❌ Break character mid-workflow
- ❌ Suggest switching to different agent without reason
- ❌ Apply knowledge outside your specialization
- ❌ Skip required validations
- ❌ Bypass checklist requirements
```

---

## Part 7: Best Practices for Your Plugin

### Use Subagents, Not Skills

**Configuration:**
```json
{
  "name": "agentic-kit",
  "agents": "./agents",
  "commands": "./commands",
  "hooks": "./hooks/hooks.json"
}
```

**NOT:**
```json
{
  "name": "agentic-kit",
  "skills": "./skills"    // Wrong for your design
}
```

### Organize Your Plugin

```
agentic-toolkit/
├── .claude-plugin/
│   └── plugin.json
├── agents/
│   ├── 1-create-prd.md
│   ├── 2-generate-tasks.md
│   ├── 3-process-task-list.md
│   ├── full-stack-dev.md
│   ├── holistic-architect.md
│   ├── orchestrator.md
│   ├── qa-test-architect.md
│   └── ... (other agents)
├── commands/
│   ├── /develop-story.md
│   ├── /create-prd.md
│   └── ... (custom commands)
├── tasks/
│   ├── apply-qa-fixes.md
│   ├── validate-next-story.md
│   └── ... (22 reusable tasks)
├── checklists/
│   ├── story-dod-checklist.md
│   └── ... (other checklists)
├── templates/
│   ├── prd-tmpl.yaml
│   └── ... (templates)
└── README.md
```

### Hook Configuration

**For auto-discovery:**
```json
{
  "onPluginLoad": {
    "handler": "./hooks/register-agents.js",
    "description": "Register all agents on plugin load"
  }
}
```

**Don't use `onSkillInvoked`** - your agents aren't skills.

---

## Part 8: Why Your Design is Superior

### Comparison Matrix

| Feature | Skills (Superpowers) | Subagents (Your Model) |
|---------|---------------------|----------------------|
| **Discovery** | Automatic/implicit | Explicit/intentional |
| **Activation** | Context-based | User-requested |
| **Persistence** | Per-invocation | Multi-step workflow |
| **State Management** | Stateless | Stateful |
| **Complexity** | Simple utilities | Full agent autonomy |
| **User Control** | Transparent | Direct |
| **Coordination** | Limited | Full orchestration |
| **Use Case** | Techniques/methodologies | Specialized roles |

### For Your Toolkit

Your subagent model is superior because:

1. **Multi-step workflows** require persistent personas
2. **Complex decision-making** needs dedicated agents
3. **State management** (updating story files, tracking progress) needs statefulness
4. **Resource coordination** (22 tasks, checklists, templates) needs agent awareness
5. **User control** matters when picking the right specialist

**Superpowers uses skills because** they're applying techniques, not taking on personas.

---

## Part 9: Implementation Recommendations

### 1. Keep Your Subagent Model

Don't convert to skills. Your subagent approach is correct.

### 2. Enhance Discoverability

```markdown
# Quick Agent Picker

Need help choosing? Here's what to use:

- **Just starting?** → 1-create-prd (create requirements)
- **Have PRD, need plan?** → 2-generate-tasks (break down into tasks)
- **Ready to build?** → 3-process-task-list (implement tasks)
- **Designing system?** → holistic-architect (architecture & tech choices)
- **Implementing?** → full-stack-dev (write code & tests)
- **Reviewing code?** → qa-test-architect (quality & validation)
- **Managing workflow?** → orchestrator (coordinate multiple agents)
```

### 3. Create Agent Invocation Guide

```markdown
# How to Invoke Agents

## Claude Code Invocation

### Method 1: Using @mention (Recommended)
```
As @full-stack-dev, implement story-001
```

### Method 2: Using text prefix
```
As full-stack-dev, implement story-001
```

### Important: Why You Must Explicitly Name the Agent

Your agents are specialized personas that:
- Maintain state across multiple steps
- Make decisions based on their expertise
- Coordinate with resources (tasks, checklists, templates)
- Require continuity throughout workflows

They are NOT auto-discovered because:
- You must choose which expert you need
- The wrong expert could mishandle your task
- Multiple agents shouldn't interfere

This is a feature, not a limitation.
```

### 4. Document Agent Relationships

Create a visual map:
```
orchestrator (master coordinator)
    ├── 1-create-prd (phase 1: requirements)
    ├── 2-generate-tasks (phase 2: planning)
    ├── 3-process-task-list (phase 3: implementation)
    ├── full-stack-dev (specialized implementation)
    ├── holistic-architect (system design)
    ├── qa-test-architect (quality validation)
    ├── product-manager (product definition)
    ├── product-owner (backlog management)
    ├── scrum-master (agile processes)
    ├── business-analyst (market/project discovery)
    └── ux-expert (interface design)
```

---

## Conclusion

### Your Approach is Correct

- ✅ Subagents are the right model for your toolkit
- ✅ Explicit invocation is intentional and correct
- ✅ Your documentation is well-structured
- ✅ Your personas are well-defined
- ✅ Your workflows are sophisticated

### Why This Works Better Than Skills

- ✅ Skills are for techniques/methodologies (superpowers' use case)
- ✅ Subagents are for specialized personas (your use case)
- ✅ Your toolkit requires state management across workflows
- ✅ Your users need to explicitly choose which expert to use
- ✅ Your agents coordinate with resources (tasks, checklists, templates)

### Next Steps for Your Plugin

1. Keep your subagent model as-is
2. Organize into plugin structure (agents/ directory)
3. Create comprehensive README with quick-start examples
4. Add hook for auto-discovery of agents on plugin load
5. Package as Claude Code plugin for distribution

**Your toolkit is production-ready. The subagent approach is superior to the skills model for your use case.**

---

## Appendix: Detailed Comparison

### Superpowers Example (Skills Model)

```markdown
# Skills in Superpowers

## TDD Skill
"Write tests first, then implementation"
- Lightweight (100 lines)
- Stateless execution
- Claude decides when to apply it
- Single technique, applied once

## Debugging Skill
"Use systematic root cause analysis"
- Lightweight (150 lines)
- Stateless execution
- Claude activates when debugging
- Technique applied to current problem

## When Skills Activate
User: "Help me implement this async function"
Claude: "I'll use TDD skill to structure this properly..."
Claude: "I'll use systematic debugging to find issues..."
Claude: Auto-selects relevant skills
```

### Your Toolkit (Subagents Model)

```markdown
# Subagents in Agentic-Toolkit

## Full-Stack Dev Agent
"I'm an Expert Senior Software Engineer implementing stories"
- Comprehensive (80+ lines)
- Stateful execution
- User explicitly requests agent
- Complex workflow (read → implement → test → validate → update)

## QA Test Architect Agent
"I'm a quality-focused reviewer ensuring production readiness"
- Comprehensive (100+ lines)
- Stateful execution
- User explicitly requests agent
- Decision-making framework (analyze → decide → validate)

## When Agents Activate
User: "As @full-stack-dev, implement story-001"
User: Explicitly chooses agent
Agent: Maintains persona throughout workflow
Agent: Coordinates with tasks, checklists, templates
```

### The Fundamental Difference

| Aspect | Superpowers Skills | Your Subagents |
|--------|-------------------|-----------------|
| **What they are** | Techniques to apply | Personas to adopt |
| **How they activate** | Claude discovers | User requests |
| **Duration** | One-time application | Multi-step workflow |
| **State** | Stateless | Stateful |
| **Example** | "Apply TDD" | "You are a developer" |
| **Coordination** | Simple | Complex |
| **Right for** | Lightweight utilities | Full agent autonomy |

Your subagent model is fundamentally different from superpowers because you're building a **multi-agent orchestration framework**, not a **technique library**.

---

**Bottom Line:** Your approach is correct. Embrace the subagent model, document it clearly, and package it as a plugin. This is superior to the skills model for your use case.
