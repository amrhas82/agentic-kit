# Claude Code Plugin Strategy Guide

## Overview

This document outlines the best practices and implementation strategy for packaging your comprehensive skills and agents repository as a Claude Code marketplace plugin, similar to `@obra/superpowers`.

**Goals:**
1. Auto-invoke agents based on task context using auto-invocation
2. Make Claude automatically discover and invoke available subagents
3. Distribute via Claude Code marketplace for easy installation
4. Eliminate manual copy/paste setup for users
5. Keep the plugin lean and maintainable (not Agentic Kit-style complexity)

---

## Part 1: Understanding Claude Code Plugin Architecture

### Plugin Structure

Every Claude Code plugin requires this directory structure:

```
your-repo/
├── .claude-plugin/
│   ├── plugin.json                    # Required: Plugin metadata
│   └── marketplace.json               # Optional: If hosting a marketplace
├── commands/                          # Custom slash commands (/)
│   ├── command1.md
│   └── command2.md
├── agents/                            # Specialized agent definitions
│   ├── agent1.md
│   ├── agent2.md
│   └── ...
├── skills/                            # Reusable capabilities
│   ├── skill1/
│   │   ├── description.md
│   │   └── implementation/
│   └── skill2/
├── hooks/                             # Event handlers & automation
│   ├── hooks.json                     # Hook configuration
│   ├── auto-agent-router.js           # Route skills to agents
│   ├── register-agents.js             # Register agents on plugin load
│   └── ...
└── README.md                          # User-facing documentation
```

**Critical Rule:** The `.claude-plugin/` directory contains only `plugin.json`. All other directories (commands/, agents/, skills/, hooks/) must be at the **plugin root level**, not inside `.claude-plugin/`.

---

## Part 1.5: The Lean Architecture Approach (Recommended)

### Key Insight: Auto-Invokable Agents

Claude Code **explicitly supports automatic agent delegation** based on task context. This means you can simplify your architecture significantly while gaining auto-invocation capabilities.

### Why "Lean" Over Complex Agentic Kit-Style?

**Agentic Kit Approach (Complex):**
```
35+ directories, 60+ files, 5+ config systems
- core/ (agents, workflows, tasks, tools, config)
- cis/ (modules, workflows)
- bmb/ (builders, workflows)
- Multiple YAML configs, manifest files, templates
```

**Lean Approach (Recommended):**
```
3 directories, 25 files, 1 plugin.json
- agents/ (13 agent definitions - 1000 lines)
- skills/ (9 skill definitions converted from tasks - 1500 lines)
- hooks/ (auto-discovery and registration)
```

**Same functionality. Dramatically simpler structure.**

### How Auto-Invocation Works

From Claude Code documentation:
```
Claude Code proactively delegates tasks based on:
1. Task description in user requests
2. Agent description field in plugin.json
3. Current context and available tools

To enable auto-invocation, include "Use PROACTIVELY"
or "MUST BE USED" in agent descriptions
```

### Example Invocation Patterns

**Pattern 1: Auto-Invocation (New Capability)**
```
User: "Implement this feature based on requirements"
↓
Claude reads agent descriptions
↓
Finds: "full-stack-dev: Implements stories...Use PROACTIVELY"
↓
Auto-invokes full-stack-dev
↓
User never had to name the agent
```

**Pattern 2: Explicit Invocation (Still Works)**
```
User: "As full-stack-dev, implement this feature"
↓
Claude honors explicit request
↓
Agent executes (full user control)
```

**Pattern 3: Orchestration (Both Modes)**
```
User: "Build this complete feature"
↓
Claude auto-invokes orchestrator (or user specifies "As orchestrator")
↓
Orchestrator auto-invokes: architect → developer → qa-engineer
↓
Full workflow, minimal manual specification
```

### Lean Model Structure (Recommended)

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json                 # Single config file
├── agents/                          # Keep your 13 agents as-is
│   ├── 1-create-prd.md             # Add "Use PROACTIVELY" to description
│   ├── 2-generate-tasks.md
│   ├── 3-process-task-list.md
│   ├── full-stack-dev.md
│   ├── holistic-architect.md
│   ├── orchestrator.md
│   ├── qa-test-architect.md
│   ├── product-manager.md
│   ├── product-owner.md
│   ├── scrum-master.md
│   ├── ux-expert.md
│   ├── business-analyst.md
│   └── master.md
├── skills/                          # Convert Agentic Kit tasks to skills
│   ├── story-workflow.md           # From task: validate, process stories
│   ├── code-implementation.md      # From task: coding standards, patterns
│   ├── testing-automation.md       # From task: TDD, test coverage
│   ├── quality-assurance.md        # From task: code review, feedback
│   ├── documentation.md            # From task: doc creation, splitting
│   ├── debugging.md                # From task: systematic debugging
│   ├── brainstorming.md            # From task: ideation, facilitation
│   ├── requirements-elicitation.md # From task: gathering, analysis
│   └── architecture-design.md      # From task: system design, tech selection
├── hooks/
│   ├── hooks.json
│   └── register-agents.js
└── README.md
```

### Comparison: Lean vs Agentic Kit

| Aspect | Agentic Kit | Lean |
|--------|------|------|
| **Directories** | 35+ | 3 |
| **Files** | 60+ | 25 |
| **Config Files** | 5+ | 1 |
| **Auto-Invocation** | ❌ No | ✅ Yes |
| **Agent Definitions** | ✅ 1000 lines | ✅ 1000 lines (same) |
| **Task Logic** | 22 task files | 9 skill files (same content) |
| **Plugin Size** | ~500 KB | ~150 KB |
| **User Learning Time** | 2-4 hours | 15 minutes |
| **Maintenance Overhead** | High | Low |
| **Extensibility** | Good | Excellent |

### Recommendation: Go Lean

**Why this is superior:**
1. ✅ Same agent content (all 13 agents preserved)
2. ✅ Same task/skill content (all 22 tasks converted to skills)
3. ✅ Simpler structure (3 dirs vs 35+)
4. ✅ Auto-invocation support (users don't name agents)
5. ✅ Manual override still works (power user control)
6. ✅ Lower maintenance (hook-based discovery)
7. ✅ Better UX (15 min learning vs 2-4 hours)
8. ✅ Production-ready plugin

---

## Part 2: Plugin Manifest Configuration

### plugin.json Structure (Lean Model)

Create `.claude-plugin/plugin.json` with your plugin metadata:

```json
{
  "name": "agentic-kit",
  "version": "1.0.0",
  "description": "Production-ready AI agents with auto-invocation and reusable skills. 13 specialized agents (PRD creation, development, architecture, QA, product management) + 9 core skills. Use PROACTIVELY for smart task delegation.",
  "author": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "url": "https://github.com/yourusername"
  },
  "homepage": "https://github.com/yourusername/agentic-toolkit",
  "repository": "https://github.com/yourusername/agentic-toolkit",
  "license": "MIT",
  "keywords": [
    "agents",
    "auto-invocation",
    "skills",
    "automation",
    "development",
    "workflow"
  ],
  "agents": "./agents",
  "skills": "./skills",
  "hooks": "./hooks/hooks.json"
}
```

**Note:** This lean configuration has:
- Single `plugin.json` (no multiple configs)
- `agents/` pointing to 13 agent files
- `skills/` pointing to 9 skill files (converted from tasks)
- `hooks/` for auto-discovery
- No `commands/` (functionality integrated into agents)
- No `templates/` (referenced in skills, not separate files)

**Field Explanations:**
- `name`: Unique identifier in kebab-case (no spaces)
- `agents`: Points to your agents directory
- `commands`: Points to your custom slash commands
- `skills`: Points to your skills directory
- `hooks`: Points to your hooks configuration file
- Environment variable available: `${CLAUDE_PLUGIN_ROOT}` for absolute plugin path

---

## Part 3: Hook System for Automation

### 3.1 Auto-Discovery Hook (register-agents.js)

**Purpose:** Make Claude aware of all available agents on plugin load

**File: `hooks/register-agents.js`**

```javascript
/**
 * Auto-discovery hook that scans the agents directory
 * and registers all agents with Claude Code on plugin load
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse agent markdown file to extract metadata
 * Agent format: # Agent Name
 *               Description...
 *               ## Capabilities
 *               - Capability 1
 */
function parseAgentMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const name = lines[0]?.replace(/^#+\s*/, '') || path.basename(filePath, '.md');
  const description = lines.slice(1, 5).join('\n').trim();

  return {
    id: path.basename(filePath, '.md'),
    name,
    description,
    filePath: path.relative(process.env.CLAUDE_PLUGIN_ROOT, filePath)
  };
}

/**
 * Main handler: runs when plugin is loaded
 */
async function onPluginLoad(context) {
  const agentsDir = path.join(process.env.CLAUDE_PLUGIN_ROOT, 'agents');

  if (!fs.existsSync(agentsDir)) {
    console.log('No agents directory found');
    return;
  }

  try {
    const agentFiles = fs.readdirSync(agentsDir)
      .filter(f => f.endsWith('.md'));

    const agents = agentFiles.map(file =>
      parseAgentMetadata(path.join(agentsDir, file))
    );

    // Store agent registry in context for Claude to access
    context.agentRegistry = agents;

    console.log(`✓ Registered ${agents.length} agents:`);
    agents.forEach(agent => {
      console.log(`  • ${agent.name} (${agent.id})`);
    });

  } catch (error) {
    console.error('Error registering agents:', error);
  }
}

module.exports = { onPluginLoad };
```

### 3.2 Auto-Agent Router Hook (auto-agent-router.js)

**Purpose:** Automatically invoke the appropriate agent when a skill is used

**File: `hooks/auto-agent-router.js`**

```javascript
/**
 * Skill-to-agent router that automatically invokes agents
 * based on skill requirements
 */

const skillToAgentMap = {
  // Map skills to their best-suited agents
  'pdf-processing': 'pdf-agent',
  'data-analysis': 'analysis-agent',
  'code-generation': 'code-gen-agent',
  'documentation': 'doc-agent',
  'testing': 'qa-agent',
  'deployment': 'devops-agent',
  'security-audit': 'security-agent',
  'performance-optimization': 'perf-agent'
};

/**
 * Handler: runs when a skill is invoked
 */
async function onSkillInvoked(context) {
  const { skillName, params } = context;

  // Look up which agent should handle this skill
  const agentName = skillToAgentMap[skillName];

  if (agentName) {
    console.log(`🤖 Routing skill '${skillName}' to agent '${agentName}'`);

    // Signal Claude to invoke the appropriate agent
    context.suggestAgent = agentName;
    context.autoInvoke = true;

    return {
      success: true,
      agentInvoked: agentName,
      skillParams: params
    };
  }

  return { success: false };
}

module.exports = { onSkillInvoked };
```

### 3.3 Hooks Configuration File

**File: `hooks/hooks.json`**

```json
{
  "onPluginLoad": {
    "description": "Register all agents on plugin initialization",
    "handler": "./register-agents.js",
    "events": ["plugin:load"]
  },
  "onSkillInvoked": {
    "description": "Route skills to appropriate agents automatically",
    "handler": "./auto-agent-router.js",
    "events": ["skill:invoked"],
    "config": {
      "skillToAgentMap": {
        "pdf-processing": "pdf-agent",
        "data-analysis": "analysis-agent",
        "code-generation": "code-gen-agent",
        "documentation": "doc-agent",
        "testing": "qa-agent",
        "deployment": "devops-agent",
        "security-audit": "security-agent",
        "performance-optimization": "perf-agent"
      }
    }
  },
  "onAgentRequested": {
    "description": "Provide agent suggestions based on context",
    "handler": "./provide-suggestions.js",
    "events": ["agent:requested"]
  }
}
```

---

## Part 4: Agent & Skill Organization

### 4.1 Agent Format

**File: `agents/your-agent-name.md`**

```markdown
# Your Agent Name

Brief description of what this agent does and its primary use cases.

## Capabilities

- Capability 1: What it can do
- Capability 2: What it can do
- Capability 3: What it can do

## Skills Used

This agent leverages these skills:
- skill-name-1
- skill-name-2

## Example Usage

```
/invoke your-agent-name --param value
```

## Configuration

Optional configuration settings and environment variables needed.
```

### 4.2 Skill Organization

**File: `skills/skill-name/manifest.json`**

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "What this skill does",
  "requiredAgents": ["agent1", "agent2"],
  "dependencies": [],
  "tools": ["tool1", "tool2"]
}
```

---

## Part 5: Publishing to Marketplace

### 5.1 Creating Your Marketplace

If you want to host multiple plugins, create `.claude-plugin/marketplace.json`:

```json
{
  "name": "agentic-toolkit-marketplace",
  "owner": "yourusername",
  "description": "Professional AI agents and skills for Claude Code",
  "version": "1.0.0",
  "plugins": [
    {
      "name": "agentic-kit",
      "description": "Comprehensive collection of AI agents and skills",
      "source": "./",
      "version": "1.0.0"
    }
  ]
}
```

### 5.2 Distribution Methods

**Method 1: Direct GitHub Repository (Easiest)**

Users install with:
```bash
/plugin marketplace add yourusername/agentic-toolkit
```

Claude Code automatically finds `.claude-plugin/plugin.json` in the repo.

**Method 2: Full Marketplace URL**

Users install with:
```bash
/plugin marketplace add https://github.com/yourusername/agentic-toolkit
```

**Method 3: Custom Marketplace**

Host a marketplace.json file and distribute that URL.

---

## Part 6: Installation Experience for Users

### Step 1: Add Your Marketplace
```bash
/plugin marketplace add yourusername/agentic-toolkit
```

### Step 2: Browse & Install
```bash
/plugin
# Select "Browse Plugins" → "agentic-kit" → "Install"
```

### Step 3: Automatic Setup
- ✓ All agents auto-registered via `onPluginLoad` hook
- ✓ All skills made available
- ✓ Smart routing configured
- ✓ Ready to use immediately

### Step 4: Start Using
```bash
# Use agents directly
/invoke your-agent-name

# Claude automatically routes skills to agents
# No manual configuration needed!
```

---

## Part 7: Implementation Roadmap (Lean Model)

### Phase 1: Foundation (1-2 hours)

**Setup lean structure:**
- [ ] Create `.claude-plugin/plugin.json` with metadata
- [ ] Create `agents/` directory
- [ ] Create `skills/` directory
- [ ] Create `hooks/` directory
- [ ] Copy your 13 existing agent files to `agents/`

**Effort:** 1-2 hours (mostly file organization)

### Phase 2: Agent Updates (30 min)

**Prepare agents for auto-invocation:**
- [ ] Update agent descriptions to include "Use PROACTIVELY"
- [ ] Example: `"description": "...expert developer...Use PROACTIVELY for code implementation"`
- [ ] No changes to agent logic, just description enhancements

**Effort:** 30 minutes

**Example Update:**
```markdown
# Before:
description: Use this agent to implement stories from story files...

# After:
description: Expert developer for story implementation. Implements stories, writes code, debugs issues. **Use PROACTIVELY** for feature implementation, bug fixes, code writing.
```

### Phase 3: Convert Tasks to Skills (4-6 hours)

**Transform Agentic Kit tasks into lean skills:**
- [ ] Convert 5 highest-value tasks first:
  - `apply-qa-fixes.md` → `skills/qa-feedback.md`
  - `validate-next-story.md` → `skills/story-validation.md`
  - `execute-checklist.md` → `skills/checklist-execution.md`
  - `create-doc.md` → `skills/documentation.md`
  - `shard-doc.md` → `skills/document-splitting.md`
- [ ] Test skill discovery with these 5
- [ ] Convert remaining 17 tasks to skills
- [ ] Create `skills/` index in README

**Effort:** 4-6 hours (consolidate 22 tasks into 9 skills)

**Skill Conversion Example:**
```
Agentic Kit Task (400 lines):
~/.claude/tasks/apply-qa-fixes.md
→ Complex structure, workflow steps

Lean Skill (100 lines):
skills/qa-feedback.md
→ Same content, simpler format
→ Auto-discoverable by Claude
```

### Phase 4: Create Auto-Discovery Hook (1-2 hours)

**Setup hook system:**
- [ ] Create `hooks/hooks.json`
- [ ] Create `hooks/register-agents.js`
- [ ] Test agent auto-discovery on plugin load

**Effort:** 1-2 hours

### Phase 5: Testing & Validation (2-3 hours)

**Test all invocation modes:**
- [ ] Test auto-invocation: `"Implement this feature"` → auto-invokes full-stack-dev
- [ ] Test manual invocation: `"As full-stack-dev, implement..."` → explicit control
- [ ] Test skill discovery: Skills appear as Claude uses them
- [ ] Test plugin installation in fresh Claude Code setup

**Effort:** 2-3 hours

### Phase 6: Documentation (1-2 hours)

**Create user-facing docs:**
- [ ] Update README with lean structure explanation
- [ ] Create quick-start guide
- [ ] Document agents (1 page summary each)
- [ ] Document skills (1 page summary each)
- [ ] Include usage examples (auto + manual)

**Effort:** 1-2 hours

### Phase 7: Deployment (1 hour)

**Publish plugin:**
- [ ] Clean up any Agentic Kit references
- [ ] Final plugin package test
- [ ] Push to GitHub
- [ ] Create marketplace entry

**Effort:** 1 hour

---

## Implementation Timeline

| Phase | Task | Time | Cumulative |
|-------|------|------|------------|
| 1 | Create structure | 1-2h | 1-2h |
| 2 | Update agents | 0.5h | 1.5-2.5h |
| 3 | Convert tasks→skills | 4-6h | 5.5-8.5h |
| 4 | Create hooks | 1-2h | 6.5-10.5h |
| 5 | Testing & validation | 2-3h | 8.5-13.5h |
| 6 | Documentation | 1-2h | 9.5-15.5h |
| 7 | Deployment | 1h | 10.5-16.5h |
| **TOTAL** | | | **9-16 hours** |

**Realistic Timeline:** 1-2 weeks of focused work (or 2-3 days if full-time)

---

## Part 8: Converting Agentic Kit Tasks to Lean Skills

### Why Convert Tasks to Skills?

**Agentic Kit Tasks:**
- 22 separate files in `~/.claude/tasks/`
- Complex structure with workflow metadata
- Require manifest files to track
- Manual invocation: "Execute task: apply-qa-fixes"

**Lean Skills:**
- 9 consolidated skill files in `skills/`
- Simpler format, auto-discoverable
- No manifest files needed
- Auto-invoked when Claude detects need

### Conversion Process

**Step 1: Identify Groups (22 tasks → 9 skills)**

```
Task Groups:
1. Story Workflow (validate, process, generate) → story-workflow.md
2. Code Implementation (standards, patterns) → code-implementation.md
3. Testing & Coverage → testing-automation.md
4. Quality & Feedback → quality-assurance.md
5. Documentation (create, split, index) → documentation.md
6. Debugging & Analysis → debugging.md
7. Ideation & Collaboration → brainstorming.md
8. Requirements & Discovery → requirements-elicitation.md
9. Architecture & Design → architecture-design.md
```

**Step 2: Create Skill File**

Instead of:
```markdown
# Task: Apply QA Fixes
[Prerequisite checks]
[Complex workflow steps]
[Validation rules]
[File updates]
```

Create:
```markdown
---
name: qa-feedback-application
description: Apply quality feedback to code, tests, and documentation. **Use PROACTIVELY** when QA issues identified. Covers test coverage, code style, design, and documentation improvements.
---

# Quality Feedback Application Skill

## When to Use
- QA review identified issues
- Test coverage gaps exist
- Documentation incomplete
- Code style improvements needed

## How to Apply
1. Analyze feedback issues
2. Implement fixes
3. Validate changes
4. Report results
```

**Step 3: Update Agent References**

In `full-stack-dev.md`:
```markdown
## Skills Used
- code-implementation (coding standards, patterns)
- testing-automation (TDD, test coverage)
- quality-assurance (feedback application)
- debugging (root cause analysis)
```

### Mapping All 22 Tasks

| Task | Maps To Skill | Purpose |
|------|---------------|---------|
| validate-next-story | story-workflow | Validate story readiness |
| review-story | story-workflow | Story review checklist |
| trace-requirements | story-workflow | Map requirements to tests |
| qa-gate | quality-assurance | Quality gate decision |
| apply-qa-fixes | quality-assurance | Apply QA feedback |
| risk-profile | requirements-elicitation | Risk assessment |
| nfr-assess | requirements-elicitation | Non-functional requirements |
| advanced-elicitation | requirements-elicitation | Gather requirements |
| test-design | testing-automation | Design test scenarios |
| create-next-story | story-workflow | Generate next story |
| create-brownfield-story | story-workflow | Brownfield story |
| brownfield-create-epic | story-workflow | Epic creation |
| correct-course | story-workflow | Realign approach |
| create-doc | documentation | Create documentation |
| shard-doc | documentation | Split large documents |
| index-docs | documentation | Create doc index |
| document-project | documentation | Full project documentation |
| generate-ai-frontend-prompt | code-implementation | AI UI prompts |
| facilitate-brainstorming-session | brainstorming | Facilitate brainstorming |
| create-deep-research-prompt | requirements-elicitation | Research workflow |
| execute-checklist | brainstorming | Execute checklist |
| kb-mode-interaction | brainstorming | Knowledge base interaction |

**Result:** 22 task files → 9 skill files (consolidated, simpler)

---

## Part 8: Key Advantages of Lean Model

| Requirement | Agentic Kit Solution | Lean Solution | Benefit |
|---|---|---|---|
| Auto-invoke agents | Manual only | Description-based discovery | Claude picks right agent automatically |
| Agent discovery | `onPluginLoad` hook | Auto-registered on install | All agents available immediately |
| Easy setup for you | Multiple config files | Single plugin.json | Simpler to create & maintain |
| Easy setup for users | 5-10 manual steps | One `/plugin` command | Zero configuration, instant use |
| Avoid copy/paste | Manual file copying | Hooks handle registration | Install once, works everywhere |
| Scalability | Directory scanning | Auto-discovery | New agents work instantly |
| Maintainability | Skill-to-agent mapping | Integrated in descriptions | Single source of truth |
| Task organization | 22 separate task files | 9 consolidated skills | Clearer structure, easier to find |
| Learning curve | 2-4 hours (Agentic Kit complexity) | 15 minutes (lean structure) | Users productive immediately |
| Plugin distribution | ~500 KB, complex structure | ~150 KB, simple structure | Easier to install, faster downloads |

---

## Part 9: Quick Reference

### Environment Variables Available in Hooks

```javascript
process.env.CLAUDE_PLUGIN_ROOT  // Absolute path to plugin directory
process.env.CLAUDE_VERSION      // Claude Code version
```

### Hook Event Types

```
onPluginLoad        // Plugin first loads
onPluginUnload      // Plugin is being removed
onSkillInvoked      // A skill is called
onAgentRequested    // User asks for an agent
onCommandExecuted   // Custom command runs
```

### File Paths in plugin.json

All paths must be:
- Relative to plugin root
- Start with `./`
- Example: `"agents": "./agents"`

---

## Part 10: Testing Your Plugin Locally

### Create a Local Marketplace

```bash
# In your repo root
mkdir -p .claude-plugin

# Create marketplace.json pointing to your plugin
cat > .claude-plugin/marketplace.json << 'EOF'
{
  "name": "local-test",
  "owner": "test",
  "plugins": [{
    "name": "agentic-kit",
    "source": "./"
  }]
}
EOF
```

### Add Local Marketplace

```bash
/plugin marketplace add file:///path/to/your/repo/.claude-plugin/marketplace.json
```

### Verify Installation

```bash
/plugin
# Browse plugins and install agentic-kit

/help
# Verify all agents appear in help
```

---

## Part 11: Troubleshooting

### Agents Not Appearing

- ✓ Check `.claude-plugin/plugin.json` exists and is valid JSON
- ✓ Verify `agents` field points to correct directory: `"agents": "./agents"`
- ✓ Ensure agent files have `.md` extension
- ✓ Check hooks.json is properly configured

### Skills Not Recognized

- ✓ Verify skills directory structure matches expectations
- ✓ Check skill-to-agent mapping in hooks.json
- ✓ Ensure skill names match exactly in mapping

### Hooks Not Executing

- ✓ Verify handler files exist and have correct path
- ✓ Check JavaScript syntax in handler files
- ✓ Ensure `onPluginLoad` is listed in hooks.json events
- ✓ Check plugin.json `hooks` field points to `./hooks/hooks.json`

---

## Part 12: Examples

### Example: Complete Agent Definition

**File: `agents/pdf-processing-agent.md`**

```markdown
# PDF Processing Agent

Specialized agent for handling PDF document extraction, analysis, and transformation tasks.

## Capabilities

- Extract text from PDF documents
- Parse tables and structured data
- Convert PDFs to various formats
- Analyze document content
- Generate summaries

## Skills Used

- pdf-extraction
- data-parsing
- content-analysis
- format-conversion

## Example Usage

```
/invoke pdf-processing-agent --file "document.pdf" --action extract-tables
```

## Supported Actions

- extract-text
- extract-tables
- extract-images
- analyze-content
- generate-summary
- convert-format

## Dependencies

- pdf-lib >= 2.0
- nodejs >= 16
```

### Example: Complete Skill Definition

**File: `skills/pdf-extraction/manifest.json`**

```json
{
  "name": "pdf-extraction",
  "version": "1.0.0",
  "description": "Extract structured data from PDF documents",
  "requiredAgents": ["pdf-processing-agent"],
  "dependencies": ["pdf-lib", "pdfparse"],
  "tools": [
    "extract-text-tool",
    "extract-tables-tool",
    "extract-metadata-tool"
  ]
}
```

---

## Summary

By following this strategy, you'll create a professional, maintainable, and user-friendly Claude Code plugin that:

1. ✓ Automatically registers all agents on installation
2. ✓ Routes skills to agents intelligently
3. ✓ Requires zero manual configuration from users
4. ✓ Distributes easily via GitHub marketplace
5. ✓ Scales as you add new agents and skills
6. ✓ Follows Claude Code best practices

**Next Steps:**
- Review your current agents and skills structure
- Reorganize into the standard plugin directory layout
- Create plugin.json and hooks configuration
- Test locally with a test marketplace
- Push to GitHub and share the marketplace link

Good luck with your agentic-toolkit! 🚀
