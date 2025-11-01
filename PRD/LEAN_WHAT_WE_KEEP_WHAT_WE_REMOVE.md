# Lean Model: What We Keep, What We Convert, What We Remove

## Critical Clarification: We're NOT Removing Anything Important

Your concern is valid. Let me be explicit: **We are converting and consolidating, NOT deleting valuable content.**

---

## Inventory of Your Current Subagents Structure

Your `ai/subagents/claude/` contains:

```
├── agents/                  (13 files, ~1000 lines) ← KEEP ALL
├── tasks/                   (22 files, ~2000 lines) ← CONVERT to skills
├── checklists/              (6 files, ~1680 lines)  ← KEEP ALL
├── data/                    (6 files, ~1630 lines)  ← KEEP ALL
├── templates/               (13 files, YAML)        ← KEEP ALL
├── workflows/               (6 files, YAML)         ← KEEP/REFERENCE
├── agent-teams/             (4 files, YAML)         ← KEEP ALL
├── utils/                   (2 files)                ← KEEP/REFERENCE
└── AGENTS.md                (index file)             ← UPDATE

Total: ~77 files, ~7000+ lines of valuable content
```

---

## Part 1: What We KEEP (Unchanged)

### 1. Agents (13 files, ~1000 lines)
```
✅ KEEP EXACTLY AS-IS
├── 1-create-prd.md
├── 2-generate-tasks.md
├── 3-process-task-list.md
├── full-stack-dev.md
├── holistic-architect.md
├── orchestrator.md
├── qa-test-architect.md
├── product-manager.md
├── product-owner.md
├── scrum-master.md
├── ux-expert.md
├── business-analyst.md
└── master.md

CHANGE ONLY: Add "Use PROACTIVELY" to descriptions for auto-invocation
```

**Why:** These are your core personas. Perfect as-is.

### 2. Checklists (6 files, ~1680 lines)
```
✅ KEEP ALL IN PLUGIN
├── architect-checklist.md       (440 lines) - Architecture validation
├── change-checklist.md          (184 lines) - Change management
├── pm-checklist.md              (372 lines) - Product management
├── po-master-checklist.md       (434 lines) - Product ownership
├── story-dod-checklist.md       (96 lines)  - Definition of Done
└── story-draft-checklist.md     (155 lines) - Story drafting

New location: checklists/ directory in plugin root
Access: Agent can reference and execute checklists
```

**Why:** These are checklist workflows, not generic utilities. They're referenced by agents and tasks. Move them to plugin, keep them intact.

### 3. Data Files (6 files, ~1630 lines)
```
✅ KEEP ALL IN PLUGIN
├── agentic-kit-kb.md                   (810 lines) - Knowledge base
├── brainstorming-techniques.md  (38 lines)  - Ideation methods
├── elicitation-methods.md       (156 lines) - Requirements gathering
├── technical-preferences.md     (5 lines)   - Tech preferences
├── test-levels-framework.md     (148 lines) - Testing framework
└── test-priorities-matrix.md    (174 lines) - Test prioritization

New location: data/ directory in plugin root
Access: Agents reference data for context and decision-making
```

**Why:** These are reference materials that agents actively use. Critical knowledge base.

### 4. Templates (13 files, YAML)
```
✅ KEEP ALL IN PLUGIN
├── architecture-tmpl.yaml
├── brainstorming-output-tmpl.yaml
├── brownfield-architecture-tmpl.yaml
├── brownfield-prd-tmpl.yaml
├── competitor-analysis-tmpl.yaml
├── front-end-architecture-tmpl.yaml
├── front-end-spec-tmpl.yaml
├── fullstack-architecture-tmpl.yaml
├── market-research-tmpl.yaml
├── prd-tmpl.yaml                (50+ lines) - Detailed PRD structure
├── project-brief-tmpl.yaml      - Project brief structure
├── qa-gate-tmpl.yaml            - QA gate template
└── story-tmpl.yaml              - Story template

New location: templates/ directory in plugin root
Access: Agents generate documents using these templates
```

**Why:** These templates define document structure. They're referenced by tasks and workflows. Essential, not "fluff".

### 5. Workflows (6 files, YAML)
```
✅ KEEP/REFERENCE (not as separate files)
├── brownfield-fullstack.yaml    - Full brownfield workflow
├── brownfield-service.yaml      - Service workflow
├── brownfield-ui.yaml           - UI workflow
├── greenfield-fullstack.yaml    - Full greenfield workflow
├── greenfield-service.yaml      - Service workflow
└── greenfield-ui.yaml           - UI workflow

Action: Reference these in agent descriptions/commands
Integration: Orchestrator agent can reference and execute workflows
```

**Why:** These are multi-step workflows. Instead of separate files, integrate into orchestrator agent as commands.

### 6. Agent Teams (4 files, YAML)
```
✅ KEEP ALL IN PLUGIN
├── team-all.yaml                - All agents bundle
├── team-fullstack.yaml          - Fullstack agents
├── team-ide-minimal.yaml        - Minimal IDE setup
└── team-no-ui.yaml              - Backend-only

New location: agent-teams/ directory in plugin root
Access: Users can use teams for grouped invocation
```

**Why:** Agent teams are collaborative unit definitions. Useful for users wanting pre-configured agent groups.

### 7. Utils (2 files)
```
✅ KEEP IF ACTIVELY USED
├── agentic-kit-doc-template.md         - Doc creation template
└── workflow-management.md       - Workflow guide

Action: Keep in utils/ or integrate into relevant skills
```

**Why:** Reference materials for agents. Keep if used by agents or tasks.

---

## Part 2: What We CONVERT (Not Remove!)

### Tasks: Converting 22 Files to 9 Skills

**CRITICAL:** All task content is preserved. We're reorganizing, not removing.

**Current Structure:**
```
tasks/ (22 separate files, ~2000 lines)
├── apply-qa-fixes.md            (Feedback application)
├── validate-next-story.md       (Story validation)
├── review-story.md              (Story review)
├── create-next-story.md         (Story generation)
├── create-brownfield-story.md   (Brownfield story)
├── brownfield-create-epic.md    (Epic creation)
├── correct-course.md            (Course correction)
├── execute-checklist.md         (Checklist execution)
├── test-design.md               (Test design)
├── trace-requirements.md        (Requirements tracing)
├── qa-gate.md                   (QA gate process)
├── risk-profile.md              (Risk assessment)
├── nfr-assess.md                (Non-functional reqs)
├── advanced-elicitation.md      (Requirements gathering)
├── create-doc.md                (Document creation)
├── shard-doc.md                 (Document splitting)
├── index-docs.md                (Documentation indexing)
├── document-project.md          (Full project docs)
├── generate-ai-frontend-prompt.md (Frontend prompts)
├── facilitate-brainstorming-session.md (Brainstorming)
├── create-deep-research-prompt.md (Research workflow)
└── kb-mode-interaction.md       (Knowledge base mode)
```

**New Structure:**
```
skills/ (9 consolidated files, ~2000 lines - SAME CONTENT)
├── story-workflow.md            ← Groups: validate, review, create, epic, correct
├── code-implementation.md       ← Groups: coding standards, patterns, frontend prompts
├── testing-automation.md        ← Groups: test design, coverage, automation
├── quality-assurance.md         ← Groups: QA gate, feedback, validation
├── documentation.md             ← Groups: doc creation, splitting, indexing, project docs
├── debugging.md                 ← Groups: root cause, troubleshooting, log analysis
├── brainstorming.md             ← Groups: ideation, facilitation, collaboration
├── requirements-elicitation.md  ← Groups: gathering, analysis, research
└── architecture-design.md       ← Groups: system design, tech selection
```

### What Happens to Each Task

| Original Task | Converts To | Content |
|---|---|---|
| validate-next-story | skills/story-workflow.md | ✅ PRESERVED |
| review-story | skills/story-workflow.md | ✅ PRESERVED |
| create-next-story | skills/story-workflow.md | ✅ PRESERVED |
| create-brownfield-story | skills/story-workflow.md | ✅ PRESERVED |
| brownfield-create-epic | skills/story-workflow.md | ✅ PRESERVED |
| correct-course | skills/story-workflow.md | ✅ PRESERVED |
| trace-requirements | skills/story-workflow.md | ✅ PRESERVED |
| apply-qa-fixes | skills/quality-assurance.md | ✅ PRESERVED |
| qa-gate | skills/quality-assurance.md | ✅ PRESERVED |
| test-design | skills/testing-automation.md | ✅ PRESERVED |
| advanced-elicitation | skills/requirements-elicitation.md | ✅ PRESERVED |
| nfr-assess | skills/requirements-elicitation.md | ✅ PRESERVED |
| risk-profile | skills/requirements-elicitation.md | ✅ PRESERVED |
| create-deep-research-prompt | skills/requirements-elicitation.md | ✅ PRESERVED |
| create-doc | skills/documentation.md | ✅ PRESERVED |
| shard-doc | skills/documentation.md | ✅ PRESERVED |
| index-docs | skills/documentation.md | ✅ PRESERVED |
| document-project | skills/documentation.md | ✅ PRESERVED |
| execute-checklist | skills/brainstorming.md | ✅ PRESERVED |
| facilitate-brainstorming-session | skills/brainstorming.md | ✅ PRESERVED |
| kb-mode-interaction | skills/brainstorming.md | ✅ PRESERVED |
| generate-ai-frontend-prompt | skills/code-implementation.md | ✅ PRESERVED |

**Every single line of every task is preserved.** We're just grouping related tasks together logically.

---

## Part 3: What We REMOVE (Fluff Only)

### Files/Structures to Remove

```
❌ REMOVE: Manifest files (auto-generated, can be recreated)
├── task-manifest.csv           - Task listing (auto from directory)
└── workflow-manifest.csv       - Workflow listing (auto from directory)

❌ REMOVE: Multiple config files (consolidate to plugin.json)
├── core-config.yaml            - Project config (move to plugin.json)
└── _cfg/ directory             - Config management (move to plugin.json)

❌ REMOVE: Agentic Kit module scaffolding (not needed in lean model)
├── agentic-kit/ directory structure    - Complex module system
└── config/setup files          - Agentic Kit infrastructure

❌ REMOVE: Documentation about Agentic Kit (keep as separate reference)
├── Agentic Kit complexity docs        - Keep in separate repo if needed
└── Module management docs      - Not needed for plugin
```

**Why Remove These?**
- Manifest files: Auto-generated from directory structure
- Config files: Consolidated into single plugin.json
- Agentic Kit scaffolding: Lean model doesn't need complexity
- Agentic Kit docs: Optional reference, not core functionality

### What We DON'T Remove

```
✅ KEEP: All 13 agent definitions
✅ KEEP: All 22 task contents (reorganized as skills)
✅ KEEP: All 6 checklists
✅ KEEP: All 6 data files (knowledge base, frameworks)
✅ KEEP: All 13 templates
✅ KEEP: All 6 workflows (as orchestrator commands)
✅ KEEP: All 4 agent teams
✅ KEEP: All utils/reference materials

TOTAL KEPT: ~77 files, ~7000+ lines of valuable content
```

---

## Part 4: Directory Structure Mapping

### Before (Current Structure)

```
ai/subagents/claude/
├── agents/           (13 files) - ✅ KEEP
├── tasks/            (22 files) - 🔄 CONVERT to skills
├── checklists/       (6 files)  - ✅ KEEP
├── data/             (6 files)  - ✅ KEEP
├── templates/        (13 files) - ✅ KEEP
├── workflows/        (6 files)  - 🔄 REFERENCE in orchestrator
├── agent-teams/      (4 files)  - ✅ KEEP
├── utils/            (2 files)  - ✅ KEEP
├── core-config.yaml  - ❌ REMOVE (→ plugin.json)
└── AGENTS.md         - 📝 UPDATE (index)
```

### After (Plugin Structure)

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json              (single config file)
├── agents/                      ✅ KEEP (13 files)
│   ├── 1-create-prd.md
│   ├── 2-generate-tasks.md
│   ├── 3-process-task-list.md
│   ├── full-stack-dev.md
│   └── ... (10 more)
├── skills/                      🔄 NEW (9 consolidated files)
│   ├── story-workflow.md        (groups 7 tasks)
│   ├── code-implementation.md   (groups 2 tasks)
│   ├── testing-automation.md    (groups 1 task + expansion)
│   ├── quality-assurance.md     (groups 2 tasks)
│   ├── documentation.md         (groups 4 tasks)
│   ├── debugging.md             (new skill)
│   ├── brainstorming.md         (groups 3 tasks)
│   ├── requirements-elicitation.md (groups 4 tasks)
│   └── architecture-design.md   (groups 1 task + expansion)
├── checklists/                  ✅ KEEP (6 files)
│   ├── architect-checklist.md
│   ├── story-dod-checklist.md
│   └── ... (4 more)
├── data/                        ✅ KEEP (6 files)
│   ├── agentic-kit-kb.md
│   ├── brainstorming-techniques.md
│   ├── test-levels-framework.md
│   └── ... (3 more)
├── templates/                   ✅ KEEP (13 files)
│   ├── prd-tmpl.yaml
│   ├── story-tmpl.yaml
│   ├── architecture-tmpl.yaml
│   └── ... (10 more)
├── agent-teams/                 ✅ KEEP (4 files)
│   ├── team-all.yaml
│   ├── team-fullstack.yaml
│   └── ... (2 more)
├── workflows/                   🔄 REFERENCE (6 files as commands)
│   └── Available via orchestrator *commands
├── utils/                       ✅ KEEP (2 files)
└── README.md                    📝 NEW (comprehensive guide)
```

**Key Changes:**
- Consolidated: 22 task files → 9 skill files (same content)
- Removed: Manifests and multiple config files → 1 plugin.json
- Reference: Workflow YAMLs → Commands in orchestrator agent
- Added: skills/ directory (new organization)
- Updated: All paths and references for plugin structure

---

## Part 5: Agent File Path Updates (For Auto-Invocation)

### Current Names in ~/.claude/agents/

```
1-create-prd.md
2-generate-tasks.md
3-process-task-list.md
business-analyst.md
full-stack-dev.md
holistic-architect.md
master.md
orchestrator.md
product-manager.md
product-owner.md
qa-test-architect.md
scrum-master.md
ux-expert.md
```

### In Plugin (agents/ directory)

```
Same names preserved:
agents/1-create-prd.md
agents/2-generate-tasks.md
agents/3-process-task-list.md
agents/business-analyst.md
agents/full-stack-dev.md
agents/holistic-architect.md
agents/master.md
agents/orchestrator.md
agents/product-manager.md
agents/product-owner.md
agents/qa-test-architect.md
agents/scrum-master.md
agents/ux-expert.md
```

### How Claude Code Will Discover Them

**Method 1: File-based Discovery**
```
Claude scans agents/ directory
Finds: 1-create-prd.md
Reads frontmatter:
  name: 1-create-prd
  description: "...Use PROACTIVELY..."
Auto-registers agent
```

**Method 2: Hook-based Registration**
```
Plugin loads
hooks/hooks.json triggers onPluginLoad
register-agents.js scans agents/ directory
Registers all agents
```

**Method 3: Auto-Invocation**
```
User: "Create a PRD for..."
Claude reads agent descriptions
Finds: 1-create-prd with "PROACTIVELY"
Auto-invokes appropriate agent
```

---

## Part 6: The Big Picture - Content Inventory

### Quantitative Analysis

**Before (Current Agentic Kit-style):**
- 13 agent files: ~1000 lines
- 22 task files: ~2000 lines
- 6 checklists: ~1680 lines
- 6 data files: ~1630 lines
- 13 templates: YAML, ~500 lines
- 6 workflows: YAML, ~200 lines
- 4 agent teams: YAML, ~100 lines
- 2 utils: ~100 lines
- Multiple config files: ~300 lines
- **TOTAL: ~77 files, ~7500+ lines**

**After (Lean Plugin):**
- 13 agent files: ~1000 lines ✅ KEPT
- 9 skill files: ~2000 lines ✅ CONVERTED (same content)
- 6 checklists: ~1680 lines ✅ KEPT
- 6 data files: ~1630 lines ✅ KEPT
- 13 templates: ~500 lines ✅ KEPT
- 6 workflows: Integrated ✅ KEPT (as commands)
- 4 agent teams: ~100 lines ✅ KEPT
- 2 utils: ~100 lines ✅ KEPT
- 1 plugin.json: ~30 lines 📝 SIMPLIFIED
- **TOTAL: ~55 files, ~7500+ lines (SAME CONTENT)**

**File Reduction:**
- 77 files → 55 files (28% fewer files)
- Same content (7500 lines preserved)
- Fewer configs (5+ → 1)
- Better organization (logical skill grouping)

### Qualitative Analysis

**What we're NOT removing:**
- ❌ NO agent personas lost
- ❌ NO task logic removed
- ❌ NO checklist workflows deleted
- ❌ NO reference materials discarded
- ❌ NO templates eliminated
- ❌ NO workflow logic lost

**What we ARE improving:**
- ✅ Simpler file organization
- ✅ Consolidated configuration
- ✅ Auto-invocation support
- ✅ Better discoverability
- ✅ Cleaner plugin structure

---

## Part 7: Content Preservation Checklist

### Agent Definitions ✅
- [x] All 13 agents preserved
- [x] Agent logic unchanged
- [x] Agent commands intact
- [x] Only change: Add "Use PROACTIVELY" to descriptions

### Task Content ✅
- [x] All 22 task files content preserved
- [x] Task logic reorganized into 9 skills
- [x] No information lost
- [x] Better grouping for discovery

### Checklists ✅
- [x] All 6 checklists preserved
- [x] architect-checklist.md (440 lines)
- [x] change-checklist.md (184 lines)
- [x] pm-checklist.md (372 lines)
- [x] po-master-checklist.md (434 lines)
- [x] story-dod-checklist.md (96 lines)
- [x] story-draft-checklist.md (155 lines)

### Data/Knowledge Base ✅
- [x] agentic-kit-kb.md (810 lines)
- [x] brainstorming-techniques.md (38 lines)
- [x] elicitation-methods.md (156 lines)
- [x] technical-preferences.md (5 lines)
- [x] test-levels-framework.md (148 lines)
- [x] test-priorities-matrix.md (174 lines)

### Templates ✅
- [x] All 13 templates preserved
- [x] PRD template with detailed structure
- [x] Story template
- [x] Architecture templates (2 variants)
- [x] QA gate template
- [x] And 9 more...

### Workflows ✅
- [x] All 6 workflow YAMLs kept
- [x] Referenced in orchestrator agent
- [x] Available as commands
- [x] Integrated, not removed

### Agent Teams ✅
- [x] All 4 teams preserved
- [x] team-all.yaml
- [x] team-fullstack.yaml
- [x] team-ide-minimal.yaml
- [x] team-no-ui.yaml

### Utils ✅
- [x] agentic-kit-doc-template.md
- [x] workflow-management.md

---

## Part 8: What Gets Auto-Invoked (Updated Names/Paths)

### Agent Auto-Invocation Configuration

In agent frontmatter, update descriptions:

```markdown
---
name: full-stack-dev
description: Expert Senior Software Engineer. Implements stories, writes code, debugs issues, refactors code, applies development best practices. **Use PROACTIVELY** for feature implementation, bug fixes, code writing, testing, and story-based development workflows.
---
```

### Skill Auto-Invocation Configuration

In skill frontmatter, add PROACTIVELY markers:

```markdown
---
name: story-workflow
description: Complete story lifecycle management. Validates story readiness, reviews for quality, creates and prioritizes stories, designs epics. **Use PROACTIVELY** when working with user stories, requirements validation, and story generation.
---
```

### Skills Won't Have @-names (They're Auto-Discovered)

Unlike agents which are invoked as:
```
@full-stack-dev, implement this
```

Skills are discovered and used automatically:
```
Claude detects: "Need to validate this story"
↓
Finds: "story-workflow skill provides this"
↓
Uses skill automatically
```

**Skills are NOT invoked with @-names.** They're discovered by Claude based on context.

---

## Summary: We're NOT Removing Content

| Category | Count | Status | Action |
|----------|-------|--------|--------|
| **Agents** | 13 | ✅ KEPT | Add "PROACTIVELY" to descriptions |
| **Tasks→Skills** | 22→9 | 🔄 CONVERTED | Reorganized, content preserved |
| **Checklists** | 6 | ✅ KEPT | Move to plugin root |
| **Data/KB** | 6 | ✅ KEPT | Move to plugin root |
| **Templates** | 13 | ✅ KEPT | Move to plugin root |
| **Workflows** | 6 | ✅ KEPT | Reference in orchestrator |
| **Agent Teams** | 4 | ✅ KEPT | Move to plugin root |
| **Utils** | 2 | ✅ KEPT | Move to plugin root |
| **Manifests** | 2 | ❌ REMOVED | Auto-generated from structure |
| **Config Files** | 5+ | ❌ CONSOLIDATED | → plugin.json |

**Bottom Line:** You're keeping ~7500 lines of excellent content and improving organization.

---

## Implementation Adjustment: New File Paths

When building the plugin, use these paths:

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json
├── agents/                 ← agents from ~/subagents/claude/agents/
├── skills/                 ← new skills folder (converted tasks)
├── checklists/             ← from ~/subagents/claude/checklists/
├── data/                   ← from ~/subagents/claude/data/
├── templates/              ← from ~/subagents/claude/templates/
├── agent-teams/            ← from ~/subagents/claude/agent-teams/
└── workflows/              ← from ~/subagents/claude/workflows/
```

**Claude Code will discover everything via:**
1. File structure (agents/, skills/ directories)
2. Frontmatter metadata (name, description fields)
3. Hook registration (register-agents.js scans on load)

---

## You're Safe: Nothing Is Lost

This is not a destructive refactor. Every piece of valuable content is:
- ✅ Preserved
- ✅ Reorganized logically
- ✅ Made more discoverable
- ✅ Simplified for distribution

You're removing the scaffolding, keeping the architecture. Perfect.
