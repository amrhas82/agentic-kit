# Product Requirements Document
## agentic-kit: Claude Code Marketplace Plugin with Multi-Variant Strategy

**Document Version:** 2.0 (Elicitation-Driven)
**Date:** November 1, 2025
**Status:** Ready for Stakeholder Review
**Owner:** agentic-kit Project Team
**Distribution Strategy:** Claude Code Marketplace (Primary) + GitHub/npm (Secondary)

---

## Executive Summary

### What
Transform the existing agentic-kit subagents collection into a production-ready Claude Code marketplace plugin with three distinct installation variants, enabling maximum reach to non-technical domain experts (product managers, designers, business analysts) while supporting developers who prefer npm.

### Why
- **Current Pain:** 8 directories, 77 files, 2-4 hour learning curve before productivity
- **Target Audience:** Non-technical domain experts who need AI-assisted workflows but aren't comfortable with npm/CLI
- **Solution:** Single-click marketplace install with 3 variants (lite/standard/pro) for different needs
- **Outcome:** <15 minute time-to-productivity, auto-invocation, 100% content preservation (13 agents + 16 skills + 22 task briefs)

### Impact
- **Marketplace users:** Click install button, immediately access appropriate agents/skills
- **Team leads:** Pre-configured agent teams for common workflows (story creation, documentation, qa)
- **Developers:** Alternative npm packages for CI/CD integration
- **All users:** Auto-invocation means Claude delegates to appropriate agent based on task

---

## Problem Statement

### Current State
The agentic-kit project has valuable content scattered across 8 directories:
- 13 powerful agents (1-create-prd, 2-generate-tasks, 3-process-task-list, ux-expert, scrum-master, qa-test-architect, product-owner, product-manager, full-stack-dev, orchestrator, master, holistic-architect, business-analyst)
- 16 production-ready skills (pdf, xlsx, docx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms, webapp-testing, mcp-builder, skill-creator, algorithmic-art, artifacts-builder, slack-gif-creator, + 2 others)
- 22 reusable task workflow briefs (create-next-story, validate-next-story, trace-requirements, risk-profile, review-story, qa-gate, nfr-assess, index-docs, generate-ai-frontend-prompt, facilitate-brainstorming-session, execute-checklist, document-project, create-doc, create-deep-research-prompt, correct-course, brownfield-create-story, brownfield-create-epic, apply-qa-fixes, advanced-elicitation, shard-doc, + 2 others)

### User Friction Points
1. **Discovery friction:** Non-technical users don't know how to find/install agents
2. **Installation friction:** No single-click install option; requires manual setup
3. **Usage friction:** Users unsure which variant suits their needs (lite vs full)
4. **Learning friction:** Complex directory structure; unclear what's available
5. **Distribution friction:** No marketplace presence; relies on word-of-mouth

### Competitive Context
- **Superpowers:** Single GitHub plugin, one-click install on marketplace
- **Agentic Kit v4:** 35+ directories, deemed unmaintainable
- **Current agentic-kit:** 8 directories, still above optimal for marketplace
- **Claude Code plugin standard:** Clean, discoverable, <15 minute onboarding

### Strategic Goals
1. **Maximum marketplace reach** - Non-technical users (product, design, business)
2. **Multiple installation paths** - Marketplace (primary), npm variants (secondary)
3. **Content preservation** - 100% of agents, skills, task briefs retained
4. **Complexity reduction** - Ultra-Lean architecture (4 directories)
5. **Auto-invocation ready** - Claude automatically delegates to appropriate agent

---

## Goals & Objectives

### Primary Goals
1. **Launch marketplace plugin with 3 variants** - Lite, Standard, Pro packages available simultaneously
2. **Enable non-technical user adoption** - One-click install for product managers, designers, business analysts
3. **Preserve 100% of content** - All 13 agents, 16 skills, 22 task briefs included
4. **Reduce discovery friction** - Clear marketplace description, quick-start guide
5. **Implement auto-invocation** - Claude automatically uses appropriate agent based on task

### Secondary Goals
1. **Achieve <15 minute onboarding** - Users productive immediately after install
2. **Support developer variant distribution** - npm packages for CI/CD workflows
3. **Create pre-configured agent teams** - Grouped agents for common workflows
4. **Document task-to-skill conversion** - Clear mapping of 22 task briefs to skills
5. **Establish hook-based auto-discovery** - Automatic agent registration on plugin install

### Tertiary Goals
1. **Enable team standardization** - Teams adopt consistent agent usage patterns
2. **Support future extensibility** - Easy to add new agents/skills/tasks later
3. **Create community contribution path** - Clear guidelines for contributions

---

## User Personas

### Primary Persona: Non-Technical Domain Expert
- **Profile:** Product manager, designer, or business analyst; uses Claude Code for daily tasks
- **Pain Points:** Overwhelmed by technical setup; doesn't know npm; wants simple one-click install
- **Goals:** Access specialized agents without setup complexity; delegate tasks appropriately
- **Success Metric:** Productive within 15 minutes of clicking "install"
- **Installation Profile:** Marketplace Standard or Lite variant

### Secondary Persona: Team Lead / Power User
- **Profile:** Engineering manager or senior IC; wants to standardize agent usage across team
- **Pain Points:** Team members using different agents; inconsistent approaches; needs pre-configured teams
- **Goals:** Setup once, team uses consistently; establish agent-team best practices
- **Success Metric:** Entire team using same agents for same types of tasks within first week
- **Installation Profile:** Marketplace Standard or npm Standard variant

### Tertiary Persona: Developer / CLI User
- **Profile:** Engineer comfortable with npm, GitHub, CLI tools
- **Pain Points:** Wants to integrate agentic-kit into build pipelines; needs version pinning
- **Goals:** Install via npm, manage versions, integrate into CI/CD workflows
- **Success Metric:** npm install completes, agents available in 5 minutes
- **Installation Profile:** npm Standard or Pro variant

### Quaternary Persona: Advanced User / Contributor
- **Profile:** Power user wanting to extend agentic-kit with custom agents/skills
- **Pain Points:** Unclear contribution model; wants to customize without forking
- **Goals:** Add custom agents, contribute back to community, maintain upstream compatibility
- **Success Metric:** Can add custom agent following clear guidelines
- **Installation Profile:** npm Pro variant + GitHub source

---

## Installation Variants

### Variant 1: agentic-kit-lite (Marketplace & npm)
**Target:** New users, beginners, low-complexity workflows

**Includes:**
- **Agents (3):** 1-create-prd, 2-generate-tasks, 3-process-task-list
- **Skills:** 0 (none)
- **Task Briefs:** 0 (none)
- **Size:** ~500 KB
- **Setup Time:** <5 minutes
- **Use Case:** Users who want to start with core workflow (define scope → break into tasks → execute tasks)
- **User Profile:** Complete beginners, one specific workflow needed

**Installation:**
- Marketplace: Listed as "agentic-kit Lite" variant
- npm: `npm install agentic-kit-lite`

**Post-Install:** Can upgrade to Standard/Pro by installing additional skills

---

### Variant 2: agentic-kit (Standard) [DEFAULT]
**Target:** Most users, balanced feature set, broad appeal

**Includes:**
- **Agents (13):** All agents (1-create-prd, 2-generate-tasks, 3-process-task-list, ux-expert, scrum-master, qa-test-architect, product-owner, product-manager, full-stack-dev, orchestrator, master, holistic-architect, business-analyst)
- **Skills (8 core):** pdf, xlsx, docx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms
- **Task Briefs (22):** All task briefs organized in resources/task-briefs.md
- **Size:** ~2.5 MB
- **Setup Time:** <10 minutes
- **Use Case:** Most users; covers 80% of use cases
- **User Profile:** Product managers, designers, engineers, analysts (non-specialists)

**Installation:**
- Marketplace: Primary variant (click "Install")
- npm: `npm install agentic-kit` or `npm install @agentic-kit/standard`

**Includes:**
- Auto-discovery hook (agents auto-invoked)
- Pre-configured agent teams (Frontend Team, Backend Team, Architecture Team, Advanced Team)
- Quick-start guide
- All documentation

---

### Variant 3: agentic-kit-pro (Marketplace & npm)
**Target:** Power users, developers, teams needing comprehensive toolkit

**Includes:**
- **Agents (13):** All agents
- **Skills (16):** All skills (pdf, xlsx, docx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms, webapp-testing, mcp-builder, skill-creator, algorithmic-art, artifacts-builder, slack-gif-creator, + 2 others)
- **Task Briefs (22):** All task briefs
- **Developer Resources:** Contribution guidelines, custom agent template, skill creation guide
- **Size:** ~3.5 MB
- **Setup Time:** <15 minutes
- **Use Case:** Advanced workflows, custom extensions, team standardization
- **User Profile:** Developers, architects, power users, team leads

**Installation:**
- Marketplace: Listed as "agentic-kit Pro" variant
- npm: `npm install agentic-kit-pro`

**Additional Features:**
- Full documentation and examples
- Contribution guidelines
- Custom agent scaffold
- All developer tools (mcp-builder, skill-creator)

---

## Architecture

### Directory Structure (Ultra-Lean A)

```
agentic-kit/
├── agents/                     (13 files, ~1000 lines)
│   ├── 1-create-prd.md
│   ├── 2-generate-tasks.md
│   ├── 3-process-task-list.md
│   ├── ux-expert.md
│   ├── scrum-master.md
│   ├── qa-test-architect.md
│   ├── product-owner.md
│   ├── product-manager.md
│   ├── full-stack-dev.md
│   ├── orchestrator.md
│   ├── master.md
│   ├── holistic-architect.md
│   └── business-analyst.md
│
├── skills/                     (16 directories)
│   ├── pdf/                    (with SKILL.md)
│   ├── xlsx/
│   ├── docx/
│   ├── pptx/
│   ├── canvas-design/
│   ├── theme-factory/
│   ├── brand-guidelines/
│   ├── internal-comms/
│   ├── webapp-testing/
│   ├── mcp-builder/
│   ├── skill-creator/
│   ├── algorithmic-art/
│   ├── artifacts-builder/
│   ├── slack-gif-creator/
│   └── ... (2 others)
│
├── resources/                  (5 consolidated files)
│   ├── task-briefs.md         (22 task workflows, consolidated, ~2000 lines)
│   ├── templates.yaml         (13 templates, consolidated, ~4184 lines)
│   ├── workflows.yaml         (6 workflows, consolidated, ~1367 lines)
│   ├── checklists.md          (6 checklists, consolidated, ~1680 lines)
│   ├── data.md                (6 data files, consolidated, ~1630 lines)
│   └── agent-teams.yaml       (pre-configured teams)
│
├── hooks/                      (auto-discovery mechanism)
│   ├── hooks.json
│   └── register-agents.js
│
├── .claude-plugin/
│   └── plugin.json             (variant-specific manifests)
│
└── README.md                   (unified, covers all variants)
```

### Variant-Specific Content

**agentic-kit-lite:**
```
agents/
├── 1-create-prd.md
├── 2-generate-tasks.md
└── 3-process-task-list.md

(no skills/, no resources/)
```

**agentic-kit (Standard):**
```
agents/ (all 13)
skills/ (8 core: pdf, xlsx, docx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms)
resources/ (all 5 consolidated files)
hooks/ (auto-discovery)
```

**agentic-kit-pro:**
```
agents/ (all 13)
skills/ (all 16)
resources/ (all 5 consolidated files + developer resources)
hooks/ (auto-discovery)
```

---

## Content Inventory & Mapping

### Agents (13 - Included in all variants except Lite which has 3)

| Agent ID | File | Lines | Purpose | Lite | Std | Pro |
|----------|------|-------|---------|------|-----|-----|
| 1-create-prd | 1-create-prd.md | 80 | Create Product Requirements Document | ✅ | ✅ | ✅ |
| 2-generate-tasks | 2-generate-tasks.md | 95 | Break PRD into actionable task list | ✅ | ✅ | ✅ |
| 3-process-task-list | 3-process-task-list.md | 110 | Execute tasks sequentially with reviews | ✅ | ✅ | ✅ |
| ux-expert | ux-expert.md | 140 | UI/UX design, wireframes, prototypes | ❌ | ✅ | ✅ |
| scrum-master | scrum-master.md | 110 | Story creation, epics, retrospectives | ❌ | ✅ | ✅ |
| qa-test-architect | qa-test-architect.md | 160 | Test architecture, quality gates | ❌ | ✅ | ✅ |
| product-owner | product-owner.md | 155 | Backlog, story refinement, acceptance criteria | ❌ | ✅ | ✅ |
| product-manager | product-manager.md | 180 | PRDs, strategy, roadmap, prioritization | ❌ | ✅ | ✅ |
| full-stack-dev | full-stack-dev.md | 140 | Code implementation, debugging, testing | ❌ | ✅ | ✅ |
| orchestrator | orchestrator.md | 155 | Workflow coordination, multi-agent tasks | ❌ | ✅ | ✅ |
| master | master.md | 130 | General purpose executor | ❌ | ✅ | ✅ |
| holistic-architect | holistic-architect.md | 175 | System design, architecture, API design | ❌ | ✅ | ✅ |
| business-analyst | business-analyst.md | 140 | Market research, discovery, brownfield analysis | ❌ | ✅ | ✅ |

**Total Agent Content:** ~1,480 lines preserved in all variants

---

### Skills (16 - Lite: 0, Standard: 8, Pro: all 16)

**Core 8 Skills (in Standard & Pro):**

| Skill | SKILL.md | Purpose | Size | Std | Pro |
|-------|----------|---------|------|-----|-----|
| pdf | Yes | PDF extraction, creation, manipulation | 5 KB | ✅ | ✅ |
| xlsx | Yes | Spreadsheet creation, analysis, formulas | 6 KB | ✅ | ✅ |
| docx | Yes | Document creation, editing, tracked changes | 5 KB | ✅ | ✅ |
| pptx | Yes | Presentation creation, editing, layouts | 5 KB | ✅ | ✅ |
| canvas-design | Yes | Visual design, art creation | 8 KB | ✅ | ✅ |
| theme-factory | Yes | Theming system, design templates | 12 KB | ✅ | ✅ |
| brand-guidelines | Yes | Brand color application, style standards | 4 KB | ✅ | ✅ |
| internal-comms | Yes | Internal documentation, FAQs, newsletters | 8 KB | ✅ | ✅ |

**Additional 8 Skills (Pro only):**

| Skill | SKILL.md | Purpose | Size | Pro |
|-------|----------|---------|------|-----|
| webapp-testing | Yes | Web app testing, browser automation | 6 KB | ✅ |
| mcp-builder | Yes | MCP server creation guide | 7 KB | ✅ |
| skill-creator | Yes | Skill creation framework | 6 KB | ✅ |
| algorithmic-art | Yes | Generative art, p5.js | 8 KB | ✅ |
| artifacts-builder | Yes | Complex HTML artifacts, React, Tailwind | 8 KB | ✅ |
| slack-gif-creator | Yes | GIF creation for Slack | 4 KB | ✅ |
| (skill 15) | Yes | [Name] | 5 KB | ✅ |
| (skill 16) | Yes | [Name] | 5 KB | ✅ |

**Total Skills Content:** ~60-80 KB across all subdirectories

---

### Task Briefs (22 - Lite: 0, Standard & Pro: all 22)

**Consolidated into resources/task-briefs.md**

All 22 task briefs organized by category:

**Story/Requirements Tasks (6):**
- create-next-story
- brownfield-create-story
- brownfield-create-epic
- create-deep-research-prompt
- advanced-elicitation
- trace-requirements

**Documentation Tasks (4):**
- document-project
- create-doc
- index-docs
- shard-doc

**QA/Validation Tasks (5):**
- validate-next-story
- review-story
- qa-gate
- risk-profile
- nfr-assess

**Workflow/Execution Tasks (4):**
- facilitate-brainstorming-session
- execute-checklist
- correct-course
- apply-qa-fixes

**Frontend/UI Tasks (2):**
- generate-ai-frontend-prompt

**Other (1):**
- [Additional task]

**Total Task Briefs Content:** ~2,000 lines, organized with section headers for easy navigation

---

### Supporting Files (Consolidated into resources/)

| File | Original | Consolidated | Lines | Purpose |
|------|----------|---------------|-------|---------|
| templates | 13 files | templates.yaml | 4,184 | PRD, story, task, workflow templates |
| workflows | 6 files | workflows.yaml | 1,367 | Example workflows for different scenarios |
| checklists | 6 files | checklists.md | 1,680 | Phase checklists (requirements, design, qa, etc) |
| data | 6 files | data.md | 1,630 | Reference data (brainstorming methods, elicitation techniques) |
| agent-teams | 4 files | agent-teams.yaml | 40 | Pre-configured agent groupings |

**Total Supporting Content:** ~8,901 lines preserved and organized

---

## Total Content Preservation

| Category | Files | Lines | Preservation |
|----------|-------|-------|--------------|
| Agents | 13 | 1,480 | 100% |
| Skills | 16 dirs | ~80 KB | 100% |
| Task Briefs | 22 → 1 file | 2,000 | 100% ✅ |
| Templates | 13 → 1 file | 4,184 | 100% ✅ |
| Workflows | 6 → 1 file | 1,367 | 100% ✅ |
| Checklists | 6 → 1 file | 1,680 | 100% ✅ |
| Data | 6 → 1 file | 1,630 | 100% ✅ |
| Agent Teams | 4 → 1 file | 40 | 100% ✅ |

**Total: 7,500+ lines of content preserved across 3 variants**

---

## Installation & Distribution Strategy

### Primary: Claude Code Marketplace

**All three variants available:**
1. **agentic-kit Lite** - Minimal (3 agents, no skills)
2. **agentic-kit** (Standard) - Recommended (13 agents, 8 skills, all tasks)
3. **agentic-kit Pro** - Complete (13 agents, 16 skills, all tasks, dev tools)

**Marketplace Presence:**
- Single listing with variant selector
- Clear descriptions of each variant
- 1-click install per variant
- Ratings, reviews, download count visible
- Discovery keywords: agents, skills, workflow, automation, task management

**User Experience:**
- Click "Install" → Automatically downloads appropriate variant
- Post-install: Hook automatically discovers agents
- 15-minute quick-start guide (built into README)

### Secondary: npm/GitHub

**npm Packages:**
- `npm install agentic-kit-lite` (Lite variant)
- `npm install agentic-kit` or `npm install @agentic-kit/standard` (Standard variant)
- `npm install agentic-kit-pro` (Pro variant)

**GitHub Distribution:**
- Public repository with source code
- Installation script for developers
- Contribution guidelines for custom agents
- CI/CD integration examples

**User Experience:**
- Developers can clone, version-pin, integrate into build pipelines
- Secondary distribution channel (not primary)
- Targets developers, not non-technical users

---

## Auto-Invocation & Discovery

### Hook-Based Auto-Discovery

**On Plugin Install (runs once):**
```javascript
// hooks/register-agents.js
async function onPluginLoad(context) {
  // Scan agents/ directory
  // Extract metadata from agent YAML frontmatter
  // Register all agents in context.agentRegistry
  // Enable auto-invocation
}
```

### Auto-Invocation Rules

**All variants work the same:**
- Claude sees all installed agents in the registry
- Agent descriptions include "Use PROACTIVELY" markers
- Claude automatically delegates when task matches agent's purpose
- Users can still manually invoke via @agent-name if desired

**Example:**
```
User: "I need to create a comprehensive project plan"

Claude thinks: "This is a PRD task" → Auto-invokes 1-create-prd
Claude: "I'll use the PRD creation agent for this..."
```

---

## Success Metrics

### Installation & Reach
- **Target:** 1,000+ installs within 3 months
- **Measure:** Marketplace download count
- **Success Criteria:** >500 installs/month by month 3

### User Adoption
- **Target:** <15 minutes from install to first productive use
- **Measure:** User feedback, support tickets
- **Success Criteria:** 80% of users productive in <20 minutes

### Variant Distribution
- **Target:** Balanced adoption across all variants
- **Measure:** Marketplace analytics per variant
- **Success Criteria:** Lite 20%, Standard 60%, Pro 20%

### Content Preservation
- **Target:** 100% of agents, skills, task briefs available
- **Measure:** Feature audit vs. original content
- **Success Criteria:** No content lost, all functionality works

### Agent Auto-Invocation
- **Target:** 70% of users benefit from auto-invocation
- **Measure:** User feedback, agent invocation logs
- **Success Criteria:** Users report appropriate agent selection

### Team Adoption
- **Target:** 10+ teams using agentic-kit within 3 months
- **Measure:** Community reports, support feedback
- **Success Criteria:** Teams report consistent agent usage patterns

---

## Technical Considerations

### 1. **Variant Management**
- Single source repository with conditional builds
- Branch-based or tag-based variant creation
- All variants share agents/ and core files
- Variant differences controlled via plugin.json manifest

### 2. **Marketplace Metadata**
- Clear descriptions for each variant
- Plugin icons, screenshots, feature lists
- Category tags: agents, productivity, automation, workflow
- Version management and update strategy

### 3. **Hook Security & Performance**
- Lightweight discovery (no external API calls)
- Runs once on install, cached after
- No performance impact on Claude's operation
- Clear logging for debugging

### 4. **Path References**
- Internal references use relative paths: `../resources/task-briefs.md#create-next-story`
- No absolute paths or external dependencies
- Portable across different installation locations
- Works identically in all variants

### 5. **Scalability**
- Ultra-Lean architecture supports adding agents/skills
- Task briefs consolidated but well-organized with section headers
- Variant structure allows easy addition of new tasks
- Plugin.json manifest scales to hundreds of agents if needed

### 6. **Documentation & Onboarding**
- Single unified README covering all variants
- Quick-start guide (15 minutes)
- Agent directory with "when to use" guidance
- Video tutorials for non-technical users (future)
- Community examples and templates

### 7. **REQUIREMENT: Remove All Agentic Kit References**

Before consolidating and distributing, all Agentic Kit (Behavioral Model Architecture) references must be completely removed from the codebase.

**Why?**
- agentic-kit is a new, standalone plugin (not Agentic Kit v5)
- Agentic Kit references confuse users about the project's identity
- Marketplace listing should not reference legacy/predecessor systems
- Clean break from previous architecture

**What must be removed:**
- Any file with "agentic-kit" in the name or path → delete or rename
- Any mention of "Agentic Kit" in documentation, agent descriptions, comments
- Any imports or references to Agentic Kit utilities or scaffolding
- Any configuration that points to Agentic Kit systems
- Any examples or templates that reference Agentic Kit workflows

**Where to search:**
```bash
# Find all Agentic Kit references
grep -ri "agentic-kit" agents/ skills/ resources/ hooks/ README.md

# Find Agentic Kit files
find . -iname "*agentic-kit*"
```

**Expected result after cleanup:**
```bash
# Should find 0 matches
grep -ri "agentic-kit" .
```

**Acceptance Criteria:**
- [ ] Zero Agentic Kit references remain in any file
- [ ] Zero Agentic Kit-named files remain
- [ ] All documentation references ONLY agentic-kit
- [ ] grep -ri "agentic-kit" returns no matches

**Effort:** 1-2 hours (audit + cleanup)

---

### 8. **CRITICAL: Internal Reference Updates (145-280 instances)**

This is the most critical technical consideration and the main reason implementation takes 18-26 hours.

**Current State (Before):**
```markdown
# In agents/product-manager.md
See ../templates/prd-tmpl.yaml for PRD template structure
See ../workflows/greenfield-fullstack.yaml for example workflow
See ../checklists/requirements-checklist.md for requirements phase
```

**New State (After Consolidation):**
```markdown
# In agents/product-manager.md
See ../resources/templates.yaml#prd-template for PRD template structure
See ../resources/workflows.yaml#greenfield-fullstack for example workflow
See ../resources/checklists.md#requirements-checklist for requirements phase
```

**Files Requiring Path Updates:**

| File Type | Count | Ref Type | Current Pattern | New Pattern | Est. Refs |
|-----------|-------|----------|-----------------|-------------|-----------|
| Agents | 13 | Templates, Workflows, Checklists, Data | `../templates/file.yaml` | `../resources/templates.yaml#anchor` | 65-130 |
| Task Briefs | 22 | Templates, Workflows, Checklists, Cross-task | `../tasks/task.md` | `#task-anchor` (within file) | 30-50 |
| resources/templates.yaml | 1 | Internal template refs | Template file refs | Section anchors | 10-20 |
| resources/workflows.yaml | 1 | Template/task refs | File refs | Anchor refs | 10-20 |
| resources/checklists.md | 1 | Template/data refs | File refs | Anchor refs | 10-20 |
| resources/data.md | 1 | Internal section refs | File refs | Anchor refs | 10-20 |
| Skills SKILL.md files | 16 | Project templates/workflows | File refs | Anchor refs | 10-20 |

**Total Estimated Updates: 145-280 instances**

**Reference Update Strategy:**

1. **Phase 5a: Audit & Document** (1 hour)
   - Search for patterns: `../templates/`, `../workflows/`, `../checklists/`, `../data/`, `../tasks/`
   - Create mapping document of all references found
   - Categorize by file group (agents, tasks, resources, skills)

2. **Phase 5b: Update by Group** (2-3 hours)
   - Update agents/ (13 files) - one at a time with review
   - Update resources/ consolidated files (5 files)
   - Update task-briefs.md (22 sections)
   - Update skills/ (16 SKILL.md files)

3. **Phase 5c: Validation & Testing** (1-2 hours)
   - Create path validation script that:
     - Scans all files for old patterns (should find 0)
     - Scans for broken anchor links
     - Tests representative links manually
   - Run validation until all checks pass
   - Commit validated changes

**Failure Points to Watch:**
- ❌ Incomplete updates leave broken references → agents can't find resources
- ❌ Wrong anchor names → links silently fail (hard to debug)
- ❌ Inconsistent path formats → some work, some don't
- ❌ Case sensitivity in anchors → YAML/Markdown anchor mismatch
- ❌ Forgotten references in deep task briefs → users click non-working links
- ❌ Inconsistent file naming → anchor names don't match file names

**File Naming Standardization (Pre-Consolidation):**

Before consolidating, ensure consistent naming:

**Agent Files (agents/):**
- ✅ Naming must match agent IDs: `1-create-prd.md`, `ux-expert.md`, etc.
- Verify no spaces or inconsistent casing
- Verify frontmatter `name:` field matches filename

**Template Files (consolidating to templates.yaml):**
- Create consistent anchor names from original filenames
- Example: `prd-tmpl.yaml` → anchor `#prd-template` (underscore to hyphen)
- Example: `story-tmpl.yaml` → anchor `#story-template`
- Document mapping in consolidation notes

**Workflow Files (consolidating to workflows.yaml):**
- Original: `greenfield-fullstack.yaml` → anchor `#greenfield-fullstack`
- Keep hyphens consistent
- Example: `brownfield-service.yaml` → anchor `#brownfield-service`

**Checklist Files (consolidating to checklists.md):**
- Original: `requirements-checklist.md` → header `## Requirements Checklist` → anchor auto-generated or manual `{#requirements-checklist}`
- Keep naming consistent with file names

**Data Files (consolidating to data.md):**
- Original: `brainstorming-techniques.md` → section anchor `#brainstorming-techniques`
- Keep naming consistent

**Task Brief Files (consolidating to task-briefs.md):**
- Original: `create-next-story.md` → section `## Create Next Story` → anchor `{#create-next-story}`
- Keep hyphenated names with hyphens (not underscores)

**Mitigation Strategy:**
- Audit all filenames for consistency BEFORE consolidation
- Create mapping document: old filename → new anchor name
- Use IDE's multi-file find-replace with regex
- Validate each change immediately
- Create automated script to check for remaining old patterns
- Document anchor naming convention (must be consistent)
- Create test file that exercises all major path references
- Add validation step: grep for old filenames to ensure none remain in content

---

## Risks & Mitigation

### Risk 1: Marketplace Discoverability
**Risk:** Plugin gets lost among hundreds of other Claude Code plugins
**Impact:** Poor adoption, low install numbers
**Mitigation:**
- Optimize marketplace metadata (keywords, description, icon)
- Implement referral program (share link, get credit)
- Launch announcement in Claude Code community channels
- Active community engagement and support

### Risk 2: Variant Confusion
**Risk:** Users unsure which variant to install
**Impact:** Lite users frustrated with missing skills; Pro users overwhelmed
**Mitigation:**
- Clear marketplace descriptions with use case examples
- Smart defaults (Standard is recommended)
- Post-install upgrade path (easy to add more skills/agents)
- Variant comparison chart in README

### Risk 3: Auto-Invocation Failures
**Risk:** Claude invokes wrong agent or fails to auto-invoke
**Impact:** User confusion, manual workarounds
**Mitigation:**
- Comprehensive agent descriptions with "Use PROACTIVELY" patterns
- Clear documentation of auto-invocation rules
- Fallback to manual @agent-name invocation always available
- Community feedback loop for description improvements

### Risk 4: Path Reference Breakage
**Risk:** Consolidated files and relative paths cause 404 errors
**Impact:** Agents can't find task briefs, templates, workflows
**Mitigation:**
- Thorough testing of all path references
- Automated path validation script
- Clear migration guide for contributors
- Support for both old and new path patterns during transition

### Risk 5: Task-to-Skill Mapping Clarity
**Risk:** Users confused about task briefs vs. agents vs. skills
**Impact:** Misuse, support burden, UX friction
**Mitigation:**
- Clear definitions in glossary
- Visual diagram showing relationships
- Examples of when/how to use each
- Guided onboarding for first-time users

### Risk 6: Large Consolidated Files
**Risk:** resources/task-briefs.md and templates.yaml are large (4K+ lines)
**Impact:** Slow to edit, hard to navigate, merge conflicts
**Mitigation:**
- VSCode outline view for navigation (Ctrl+Shift+O)
- Section headers for organization
- Search functionality (Ctrl+F)
- Future: Split back into subdirectories if needed
- Development guidelines for contributing

---

## Acceptance Criteria

### Pre-Launch Checklist

**Architecture (11 criteria):**
- [ ] Ultra-Lean directory structure created (4 directories)
- [ ] All 13 agents copied and updated
- [ ] All 16 skills copied and organized
- [ ] 22 task briefs consolidated into resources/task-briefs.md
- [ ] Templates, workflows, checklists, data consolidated
- [ ] Agent-teams.yaml created with pre-configured groups
- [ ] All path references updated (145-280 instances)
- [ ] Plugin.json manifests created for all variants
- [ ] hooks/register-agents.js implemented
- [ ] **ALL Agentic Kit references removed from all files**
- [ ] No content loss: 100% of original files preserved

**Documentation (8 criteria):**
- [ ] README.md unified guide (covers all variants)
- [ ] Quick-start guide (<15 minutes)
- [ ] Agent directory with descriptions
- [ ] Installation guide (marketplace + npm)
- [ ] Variant comparison chart
- [ ] Glossary with key terms
- [ ] Troubleshooting guide
- [ ] Contribution guidelines

**Testing & Validation (12 criteria):**
- [ ] All agents auto-discovered and invokable
- [ ] All skills accessible in each variant
- [ ] Task briefs referenced correctly from agents
- [ ] Templates, workflows load without errors
- [ ] Auto-invocation works for representative tasks
- [ ] Variant switching doesn't break functionality
- [ ] Marketplace listing approved (all 3 variants)
- [ ] npm packages published and installable
- [ ] **ALL internal paths validated (145-280 instances audited)**
- [ ] **No broken anchor links in consolidated files**
- [ ] **All agent references to tasks/templates/workflows work**
- [ ] **Automated path validation script created and passes**

**User Experience (4 criteria):**
- [ ] <15 minute onboarding from install to first use
- [ ] Clear guidance on variant selection
- [ ] Obvious path for upgrading variants
- [ ] Post-install email/guide with quick wins

---

## Implementation Timeline

### Phase 0: Agentic Kit Cleanup (1-2 hours)
**Run BEFORE moving files to new structure**
- Audit: Search for all Agentic Kit references (`grep -ri "agentic-kit"`)
- Remove: Delete Agentic Kit-named files
- Clean: Remove Agentic Kit mentions from agent descriptions and documentation
- Validate: Verify no Agentic Kit references remain

### Phase 1: Foundation Setup (2-3 hours)
- Create directory structure (agents/, skills/, resources/, hooks/)
- Create plugin.json manifests for all variants
- Setup hooks/register-agents.js

### Phase 2: Agent Migration (1-2 hours)
- Copy 13 agent files
- Update agent descriptions with "Use PROACTIVELY" markers
- Verify all agents discoverable

### Phase 3: Skill Organization (1-1.5 hours)
- Copy 16 skill directories (preserve all internal structure)
- Verify SKILL.md files present and valid
- Document variant-specific inclusions

### Phase 4: Content Consolidation (2-2.5 hours)
- Consolidate 22 task briefs → resources/task-briefs.md
- Consolidate 13 templates → resources/templates.yaml
- Consolidate workflows, checklists, data
- Create agent-teams.yaml

### Phase 5: Internal Reference Updates (CRITICAL - 4-6 hours)
**THIS IS THE MOST CRITICAL PHASE - All paths must be updated or plugin breaks**

**Agents (13 files):**
- [ ] Search each agent file for references to: `../templates/`, `../workflows/`, `../checklists/`, `../data/`, `../tasks/`
- [ ] Update to: `../resources/templates.yaml#section-name`, `../resources/workflows.yaml#workflow-name`, etc.
- [ ] Example old: `See ../templates/prd-tmpl.yaml for PRD template`
- [ ] Example new: `See ../resources/templates.yaml#prd-template for PRD template`
- [ ] Estimated refs per agent: 5-10 references each = 65-130 updates

**22 Task Briefs (now in resources/task-briefs.md):**
- [ ] Each task brief may reference templates, workflows, checklists
- [ ] Update all internal cross-references within the consolidated file
- [ ] Use anchor links: `#section-name` for within-file references
- [ ] Estimated refs: 30-50 total

**Resources Files:**
- [ ] resources/templates.yaml: May reference other templates or external docs
- [ ] resources/workflows.yaml: May reference templates or task briefs
- [ ] resources/checklists.md: May reference templates or data files
- [ ] resources/data.md: May reference other data sections
- [ ] Estimated refs: 40-80 total

**Skills (16 directories):**
- [ ] Check each SKILL.md for references to project templates/workflows
- [ ] Update as needed (most skills are self-contained, but some may reference)
- [ ] Estimated refs: 10-20 total

**Total Path Updates Required: 145-280 instances**
- [ ] Create find-replace script or use IDE's multi-file find-replace
- [ ] Audit each change before committing
- [ ] Create git commits per file group (agents, tasks, resources)
- [ ] Validate no broken links remain

### Phase 6: Documentation (2-3 hours)
- Write unified README.md
- Create quick-start guide
- Write agent directory
- Create variant comparison chart
- Write installation guide

### Phase 7: Testing & Validation (2-3 hours)
- Test all agents auto-discover
- Test all skills accessible
- Test task brief references
- Test variant builds
- Marketplace submission prep

### Phase 8: Marketplace & npm Publishing (1-2 hours)
- Create marketplace listings (3 variants)
- Publish npm packages
- Setup automatic builds/releases
- Community announcement

**Total: 19-28 hours (estimated 3-4 days intensive work)**

**Critical Path Note:**
- Phase 0 (Agentic Kit Cleanup) must run first - removes legacy references
- Phase 5 (Internal Reference Updates) is the longest and most critical phase. Every agent, task brief, and resource file must have its internal paths validated. This cannot be rushed or skipped.

---

## Success Definition

**Plugin is "production ready" when:**

1. ✅ All 13 agents discoverable and auto-invocable
2. ✅ All 16 skills accessible (with variant-specific availability)
3. ✅ All 22 task briefs correctly referenced and usable
4. ✅ 3 distinct variants available on marketplace with clear differentiation
5. ✅ <15 minute onboarding for non-technical users
6. ✅ 100% of original content preserved (no data loss)
7. ✅ Auto-invocation working (Claude delegates appropriately)
8. ✅ npm packages published and installable
9. ✅ Comprehensive documentation (README, quick-start, guides)
10. ✅ Marketplace rating >4.5 stars within first month

---

## Glossary

**Agent:** An AI persona with specialized expertise (e.g., ux-expert, full-stack-dev). Agents are invokable by users or auto-invoked by Claude.

**Skill:** A reusable technique or tool Claude can apply (e.g., pdf manipulation, spreadsheet analysis). Skills enable specific capabilities.

**Task Brief:** A workflow guide for executing complex multi-step processes (e.g., create-next-story). Task briefs are referenced by agents.

**Auto-Invocation:** Claude automatically delegates to appropriate agent based on task description, without user explicitly saying @agent-name.

**Variant:** A distinct installation package (Lite, Standard, Pro) with different component combinations.

**Hook:** Event-based code that runs on plugin install/load to auto-discover agents and register them.

**Ultra-Lean Architecture:** Minimal directory structure (4 directories) with consolidated supporting files for maximum simplicity.

**Plugin Manifest:** plugin.json file declaring agents, skills, hooks, and metadata for Claude Code integration.

---

## Appendix A: Content Inventory Summary

**Source Content (Current):**
- 8 directories
- 77 files
- ~7,500 lines of valuable content

**Transformed (New Plugin):**
- 4 directories (Ultra-Lean A)
- 35 files (50% reduction)
- 100% of original content preserved
- 3 distinct variants for different use cases

**Distribution:**
- Marketplace: Primary channel for non-technical users
- npm: Secondary channel for developers
- GitHub: Source and contribution hub

---

## Appendix B: Variant Quick Reference

| Feature | Lite | Standard | Pro |
|---------|------|----------|-----|
| **Agents** | 3 | 13 | 13 |
| **Skills** | 0 | 8 | 16 |
| **Task Briefs** | 0 | 22 | 22 |
| **Size** | 500 KB | 2.5 MB | 3.5 MB |
| **Setup Time** | <5 min | <10 min | <15 min |
| **Target User** | Beginner | Most users | Power users |
| **Typical Use** | Learn workflow | Daily work | Advanced + dev |
| **Marketplace** | ✅ | ✅ (default) | ✅ |
| **npm** | ✅ | ✅ | ✅ |

---

**Document Status:** Ready for Stakeholder Review
**Next Step:** Stakeholder approval → Implementation Phase 1

