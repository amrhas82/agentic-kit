# Complete Implementation Guide: Building Your Lean Agentic-Kit Plugin

## Overview

This is your complete roadmap for building a production-ready Claude Code plugin from your existing subagents collection. Everything is organized, nothing is lost, and the result is simpler and more powerful than what you have now.

---

## Quick Reference: The Four Key Documents

1. **CLAUDE_CODE_PLUGIN_STRATEGY.md** - Complete plugin architecture and technical setup
2. **LEAN_AGENT_ARCHITECTURE.md** - Why lean model is superior, implementation phases
3. **LEAN vs Agentic Kit Comparison.md** - Detailed side-by-side comparison
4. **LEAN_WHAT_WE_KEEP_WHAT_WE_REMOVE.md** - Content inventory (this one)

**You are here:** Complete Implementation Guide (roadmap + checklist)

---

## Phase 0: Understanding What You Have

### Current Assets (Your Subagents Collection)

From `ai/subagents/claude/`:

| Component | Count | Lines | Status |
|-----------|-------|-------|--------|
| Agents | 13 | ~1000 | ✅ PERFECT |
| Tasks | 22 | ~2000 | 🔄 CONVERT to 9 skills |
| Checklists | 6 | ~1680 | ✅ KEEP |
| Data/KB | 6 | ~1630 | ✅ KEEP |
| Templates | 13 | ~500 | ✅ KEEP |
| Workflows | 6 | ~200 | ✅ KEEP |
| Agent Teams | 4 | ~100 | ✅ KEEP |
| Utils | 2 | ~100 | ✅ KEEP |
| **TOTAL** | **77 files** | **~7500 lines** | **100% preserved** |

### What Will Change

```
BEFORE (Current):
- Scattered across directories
- Manual invocation only
- Multiple config files
- Agentic Kit complexity

AFTER (Plugin):
- 3 main directories (agents/, skills/, plus data/checklists/templates)
- Auto + manual invocation
- Single plugin.json
- Lean, clean structure
```

---

## Phase 1: Setup Plugin Foundation (2-3 hours)

### Step 1.1: Create Directory Structure

```bash
# Create plugin root directories
mkdir -p agentic-kit/.claude-plugin
mkdir -p agentic-kit/agents
mkdir -p agentic-kit/skills
mkdir -p agentic-kit/checklists
mkdir -p agentic-kit/data
mkdir -p agentic-kit/templates
mkdir -p agentic-kit/agent-teams
mkdir -p agentic-kit/hooks
mkdir -p agentic-kit/utils
```

### Step 1.2: Create plugin.json

**File:** `agentic-kit/.claude-plugin/plugin.json`

```json
{
  "name": "agentic-kit",
  "version": "1.0.0",
  "description": "Production-ready AI agents with auto-invocation and reusable skills. 13 specialized agents + 9 core skills + comprehensive templates and workflows.",
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
    "workflow",
    "development"
  ],
  "agents": "./agents",
  "skills": "./skills",
  "hooks": "./hooks/hooks.json"
}
```

### Step 1.3: Create hooks.json

**File:** `agentic-kit/hooks/hooks.json`

```json
{
  "onPluginLoad": {
    "description": "Register all agents on plugin initialization",
    "handler": "./register-agents.js",
    "events": ["plugin:load"]
  }
}
```

### Step 1.4: Create register-agents.js

**File:** `agentic-kit/hooks/register-agents.js`

```javascript
const fs = require('fs');
const path = require('path');

/**
 * Parse agent markdown frontmatter
 */
function parseAgentMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const nameMatch = frontmatter.match(/^name:\s*(.+)$/m);
  const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

  return {
    id: path.basename(filePath, '.md'),
    name: nameMatch ? nameMatch[1] : path.basename(filePath, '.md'),
    description: descMatch ? descMatch[1] : '',
    path: path.relative(process.env.CLAUDE_PLUGIN_ROOT, filePath)
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
      .filter(f => f.endsWith('.md'))
      .sort();

    const agents = agentFiles
      .map(file => parseAgentMetadata(path.join(agentsDir, file)))
      .filter(a => a !== null);

    context.agentRegistry = agents;

    console.log(`✓ Registered ${agents.length} agents`);
    agents.forEach(agent => {
      console.log(`  • ${agent.name}`);
    });
  } catch (error) {
    console.error('Error registering agents:', error);
  }
}

module.exports = { onPluginLoad };
```

**Effort:** 30 minutes

---

## Phase 2: Copy Agent Files (30 minutes)

### Step 2.1: Copy Agents

```bash
# Copy all 13 agent files
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/agents/*.md \
      agentic-kit/agents/
```

### Step 2.2: Update Agent Descriptions

For each agent file, update the description frontmatter to include "Use PROACTIVELY":

**Example: agents/full-stack-dev.md**

```markdown
---
name: full-stack-dev
description: Expert Senior Software Engineer. Implements stories, writes code, debugs issues, refactors code. **Use PROACTIVELY** for feature implementation, bug fixes, code writing, testing, and story-based development workflows.
model: inherit
color: purple
---
```

**Agents to update (all 13):**
1. 1-create-prd.md - "Use PROACTIVELY for PRD creation"
2. 2-generate-tasks.md - "Use PROACTIVELY for task generation"
3. 3-process-task-list.md - "Use PROACTIVELY for task implementation"
4. full-stack-dev.md - "Use PROACTIVELY for feature implementation"
5. holistic-architect.md - "Use PROACTIVELY for system architecture"
6. orchestrator.md - "Use PROACTIVELY for workflow coordination"
7. qa-test-architect.md - "Use PROACTIVELY for quality assurance"
8. product-manager.md - "Use PROACTIVELY for product definition"
9. product-owner.md - "Use PROACTIVELY for backlog management"
10. scrum-master.md - "Use PROACTIVELY for agile processes"
11. ux-expert.md - "Use PROACTIVELY for UI/UX design"
12. business-analyst.md - "Use PROACTIVELY for business analysis"
13. master.md - "Use directly for one-off tasks"

**Effort:** 30 minutes

---

## Phase 3: Copy Supporting Files (1 hour)

### Step 3.1: Copy Checklists

```bash
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/checklists/* \
      agentic-kit/checklists/
```

### Step 3.2: Copy Data Files

```bash
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/data/* \
      agentic-kit/data/
```

### Step 3.3: Copy Templates

```bash
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/templates/* \
      agentic-kit/templates/
```

### Step 3.4: Copy Agent Teams

```bash
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/agent-teams/* \
      agentic-kit/agent-teams/
```

### Step 3.5: Copy Utils (Optional)

```bash
cp -r ~/PycharmProjects/agentic-toolkit/ai/subagents/claude/utils/* \
      agentic-kit/utils/
```

**Effort:** 1 hour

---

## Phase 4: Create Skills from Tasks (4-6 hours)

### Step 4.1: Task-to-Skill Conversion Map

Create skills by consolidating related tasks:

```
skills/story-workflow.md
├── validate-next-story
├── review-story
├── create-next-story
├── create-brownfield-story
├── brownfield-create-epic
├── correct-course
└── trace-requirements

skills/quality-assurance.md
├── apply-qa-fixes
├── qa-gate

skills/testing-automation.md
└── test-design
   (+ framework from data/)

skills/code-implementation.md
├── generate-ai-frontend-prompt
└── general coding practices

skills/documentation.md
├── create-doc
├── shard-doc
├── index-docs
└── document-project

skills/debugging.md
└── root cause analysis, log analysis

skills/brainstorming.md
├── facilitate-brainstorming-session
├── execute-checklist
└── kb-mode-interaction

skills/requirements-elicitation.md
├── advanced-elicitation
├── nfr-assess
├── risk-profile
└── create-deep-research-prompt

skills/architecture-design.md
└── system design, tech selection
```

### Step 4.2: Create First Skill: story-workflow.md

**File:** `agentic-kit/skills/story-workflow.md`

```markdown
---
name: story-workflow
description: Complete story lifecycle management including validation, review, creation, epic design, and requirement tracing. **Use PROACTIVELY** when working with user stories, requirements validation, and story generation workflows.
---

# Story Workflow Skill

## Overview

This skill covers the complete lifecycle of user stories and requirements, from validation through creation to epic design.

## When to Use

- Validating story readiness
- Reviewing story quality
- Creating new stories
- Designing epics
- Mapping requirements to stories
- Realigning story scope and approach

## Core Workflows

### 1. Story Validation (validate-next-story)

Validate that a story is ready for implementation:

1. **Check Prerequisites**
   - Story has clear acceptance criteria
   - Dependencies identified
   - Acceptance criteria are testable
   - Story is appropriately sized

2. **Review Quality**
   - Clear user perspective
   - Business value defined
   - Constraints documented
   - Risks identified

3. **Validate Completeness**
   - Definition of Done checklist passed
   - No ambiguities remain
   - Team has questions answered

### 2. Story Review (review-story)

Comprehensive story review following checklist:

- [ ] Story title is clear
- [ ] User perspective is clear
- [ ] Acceptance criteria are specific
- [ ] Dependencies identified
- [ ] Estimate feasible
- [ ] Risk assessment complete

### 3. Story Creation (create-next-story)

Generate next story from epic or backlog:

1. Analyze context and goals
2. Draft story following template
3. Define acceptance criteria
4. Identify dependencies
5. Estimate complexity
6. Add to backlog

### 4. Epic Creation (brownfield-create-epic)

Design epic for complex features:

1. Define epic scope and goals
2. Identify story breakdown
3. Plan dependencies
4. Create stories from breakdown
5. Prioritize stories

### 5. Requirement Tracing (trace-requirements)

Map requirements to test scenarios:

1. Extract requirements
2. Design test scenarios
3. Create test cases
4. Link to stories
5. Validate coverage

## How Agents Use This

- **3-process-task-list**: Uses for story execution
- **orchestrator**: Uses for workflow coordination
- **product-manager**: Uses for story creation

## Related Skills

- requirements-elicitation (for gathering)
- code-implementation (for implementation)
- testing-automation (for test design)
```

(Continue for remaining 8 skills...)

### Step 4.3: Create Remaining Skills

Follow same pattern for:
- code-implementation.md
- testing-automation.md
- quality-assurance.md
- documentation.md
- debugging.md
- brainstorming.md
- requirements-elicitation.md
- architecture-design.md

**Effort:** 4-6 hours

---

## Phase 5: Create README.md (1-2 hours)

**File:** `agentic-kit/README.md`

```markdown
# Agentic-Kit Plugin

Production-ready AI agents and skills for Claude Code.

## Quick Start

### Installation

```bash
/plugin marketplace add yourusername/agentic-toolkit
```

### Usage

#### Auto-Invocation (Recommended for Beginners)

```
User: "Create a PRD for user authentication"
→ Claude auto-invokes 1-create-prd

User: "Implement this feature"
→ Claude auto-invokes full-stack-dev

User: "Review this code for quality"
→ Claude auto-invokes qa-test-architect
```

#### Manual Invocation (For Power Users)

```
As @full-stack-dev, implement story-001
As orchestrator, coordinate this complex feature
```

## Agents (13 Total)

### Workflow Agents
- **1-create-prd** - Create Product Requirements Documents
- **2-generate-tasks** - Break down PRDs into tasks
- **3-process-task-list** - Implement tasks iteratively

### Specialist Agents
- **full-stack-dev** - Feature implementation
- **holistic-architect** - System architecture design
- **orchestrator** - Coordinate multiple agents
- **qa-test-architect** - Quality assurance
- **product-manager** - Product definition
- **product-owner** - Backlog management
- **scrum-master** - Agile processes
- **ux-expert** - UI/UX design
- **business-analyst** - Business discovery
- **master** - One-off task execution

## Skills (9 Total)

- **story-workflow** - Story validation, creation, review
- **code-implementation** - Coding standards, patterns
- **testing-automation** - TDD, test design, coverage
- **quality-assurance** - QA process, feedback application
- **documentation** - Doc creation, splitting, indexing
- **debugging** - Root cause analysis, troubleshooting
- **brainstorming** - Ideation, facilitation
- **requirements-elicitation** - Gathering, analysis, research
- **architecture-design** - System design, tech selection

## Complete Feature Set

- ✅ 13 specialized agents
- ✅ 9 reusable skills
- ✅ 6 checklists for quality assurance
- ✅ 6 data files (knowledge bases, frameworks)
- ✅ 13 output templates
- ✅ 6 workflow examples
- ✅ 4 pre-configured agent teams
- ✅ Auto-invocation support
- ✅ Manual invocation support
- ✅ Full coordination capabilities

## Examples

### Build Complete Feature (3-Phase)

```
1. Create PRD: "As 1-create-prd, create a PRD for..."
2. Generate Tasks: "As 2-generate-tasks, break down this PRD..."
3. Implement: "As 3-process-task-list, implement these tasks..."
```

### Architecture-First Approach

```
1. Design: "As architect, design the system architecture..."
2. Implement: "As developer, implement based on the design..."
3. Review: "As qa-engineer, validate quality..."
```

### Coordinated Execution

```
1. Coordinate: "As orchestrator, build this complete feature with:
   - Architecture design
   - Backend implementation
   - Frontend implementation
   - Quality assurance"
```

## File Structure

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json
├── agents/          (13 agent definitions)
├── skills/          (9 skill definitions)
├── checklists/      (6 quality checklists)
├── data/            (knowledge bases, frameworks)
├── templates/       (output templates)
├── agent-teams/     (pre-configured teams)
└── hooks/           (auto-discovery)
```

## Customization

### Adding New Agents

1. Create new file in `agents/`
2. Add frontmatter with name and description
3. Include "Use PROACTIVELY" in description for auto-invocation
4. Plugin auto-discovers on next load

### Adding New Skills

1. Create new file in `skills/`
2. Add frontmatter with description
3. Include "Use PROACTIVELY" in description
4. Reference in agent descriptions

## Support

- [GitHub Issues](https://github.com/yourusername/agentic-toolkit/issues)
- [Documentation](./CLAUDE_CODE_PLUGIN_STRATEGY.md)
- [Plugin Strategy](./LEAN_AGENT_ARCHITECTURE.md)

## License

MIT
```

**Effort:** 1-2 hours

---

## Phase 6: Testing (2-3 hours)

### Step 6.1: Local Testing

```bash
# In your local Claude Code installation
/plugin marketplace add file:///path/to/agentic-kit

# Verify agents appear
/agents

# Test agent invocation
As full-stack-dev, what are your capabilities?

# Test auto-invocation
Implement a new feature for user authentication
```

### Step 6.2: Verify All Components

```
✅ Agents load correctly (all 13)
✅ Skills are discoverable
✅ Checklists accessible
✅ Templates available
✅ Auto-invocation works
✅ Manual invocation works
✅ Hooks execute on load
```

### Step 6.3: Test Agent Teams

```
As orchestrator, use team-fullstack to implement this feature

Team members:
- full-stack-dev
- qa-test-architect
- holistic-architect
```

**Effort:** 2-3 hours

---

## Phase 7: Documentation Updates (1 hour)

### Create These Additional Docs

1. **AGENT_REFERENCE.md** - One-page per agent
2. **SKILL_REFERENCE.md** - One-page per skill
3. **GETTING_STARTED.md** - New user guide
4. **EXAMPLES.md** - Detailed usage examples

---

## Phase 8: Publishing (1 hour)

### Step 8.1: Push to GitHub

```bash
cd agentic-kit
git init
git add .
git commit -m "Initial agentic-kit plugin"
git remote add origin https://github.com/yourusername/agentic-toolkit
git push -u origin main
```

### Step 8.2: Create Marketplace Entry

Users install with:
```bash
/plugin marketplace add yourusername/agentic-toolkit
```

---

## Complete Timeline

| Phase | Task | Time | Running Total |
|-------|------|------|---|
| 1 | Setup foundation | 2-3h | 2-3h |
| 2 | Copy agents | 0.5h | 2.5-3.5h |
| 3 | Copy supporting files | 1h | 3.5-4.5h |
| 4 | Create skills | 4-6h | 7.5-10.5h |
| 5 | Create README | 1-2h | 8.5-12.5h |
| 6 | Testing | 2-3h | 10.5-15.5h |
| 7 | Documentation | 1h | 11.5-16.5h |
| 8 | Publishing | 1h | 12.5-17.5h |
| **TOTAL** | | | **12-18 hours** |

**Realistic estimate:** 2-3 weeks part-time, or 2-3 days full-time

---

## Verification Checklist

Before publishing, verify:

### File Structure
- [ ] `.claude-plugin/plugin.json` exists
- [ ] `agents/` has 13 files
- [ ] `skills/` has 9 files
- [ ] `checklists/` has 6 files
- [ ] `data/` has 6 files
- [ ] `templates/` has 13 files
- [ ] `agent-teams/` has 4 files
- [ ] `hooks/` has hooks.json and register-agents.js

### Agent Configuration
- [ ] All 13 agents have frontmatter
- [ ] All descriptions updated with "Use PROACTIVELY"
- [ ] Names match agent IDs
- [ ] Agents load on plugin install

### Skills Configuration
- [ ] All 9 skills have frontmatter
- [ ] All descriptions include context
- [ ] Skills are discoverable
- [ ] Content from all 22 tasks preserved

### Supporting Files
- [ ] All checklists copied
- [ ] All data files copied
- [ ] All templates copied
- [ ] All agent teams copied

### Documentation
- [ ] README.md complete
- [ ] Quick-start guide clear
- [ ] Examples provided
- [ ] Installation instructions accurate

### Testing
- [ ] Plugin installs successfully
- [ ] All agents appear in /agents
- [ ] Auto-invocation works
- [ ] Manual invocation works
- [ ] Skills are discoverable
- [ ] All features functional

---

## Success Criteria

You'll know you're successful when:

1. ✅ Plugin installs in one command
2. ✅ All 13 agents are available
3. ✅ All 9 skills are auto-discovered
4. ✅ Auto-invocation works for all agents
5. ✅ Manual invocation still works
6. ✅ Checklists are accessible
7. ✅ Templates are available
8. ✅ Users don't need to read 35+ directories of docs
9. ✅ Setup time is < 5 minutes
10. ✅ Learning time is < 15 minutes

---

## Key Reminders

### What You're Keeping
- ✅ All 13 agent definitions (1000 lines)
- ✅ All 22 task contents (2000 lines, reorganized as skills)
- ✅ All 6 checklists (1680 lines)
- ✅ All 6 data files (1630 lines)
- ✅ All 13 templates
- ✅ All 6 workflows
- ✅ All 4 agent teams
- ✅ All utilities

### What You're Removing
- ❌ Complex Agentic Kit scaffolding
- ❌ Multiple config files (consolidate to plugin.json)
- ❌ Auto-generated manifests (create from structure)
- ❌ Unnecessary folder nesting

### What You're Gaining
- ✅ Auto-invocation support
- ✅ Simpler structure (3 dirs vs 35+)
- ✅ Single plugin.json config
- ✅ Better discoverability
- ✅ Production-ready plugin
- ✅ Easy distribution

---

## Next Steps

1. **Review** all four strategy documents
2. **Understand** the content inventory (nothing is lost)
3. **Create** directory structure (Phase 1)
4. **Execute** implementation phases in order
5. **Test** thoroughly before publishing
6. **Celebrate** - you built an amazing plugin!

---

## Questions to Ask Yourself

**Before starting:**
- Have you read all strategy documents? ✅
- Do you understand what's being kept? ✅
- Are you comfortable with the timeline? ✅
- Do you have 12-18 hours available? ✅

**During implementation:**
- Is each phase clear and achievable? ✅
- Are you following the checklist? ✅
- Have you tested before moving forward? ✅

**After completion:**
- Does the plugin install cleanly? ✅
- Are all agents discoverable? ✅
- Do auto and manual invocation work? ✅
- Is documentation clear? ✅

---

## Contact & Support

- **Questions about architecture?** See CLAUDE_CODE_PLUGIN_STRATEGY.md
- **Questions about lean model?** See LEAN_AGENT_ARCHITECTURE.md
- **Questions about what's preserved?** See LEAN_WHAT_WE_KEEP_WHAT_WE_REMOVE.md
- **Questions about comparison?** See LEAN vs Agentic Kit Comparison.md

---

**You're ready. Let's build something amazing.** 🚀

This is the most comprehensive, well-organized, auto-invokable agent collection for Claude Code. Your users will love it.
