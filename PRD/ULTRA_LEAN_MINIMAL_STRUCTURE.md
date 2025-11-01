# ULTRA LEAN: Minimal Directory Structure

## The Problem with My Previous "Lean" Model

I gave you:
```
agentic-kit/
├── agents/ (13 files)
├── skills/ (9 files)
├── checklists/ (6 files)
├── data/ (6 files)
├── templates/ (13 files)
├── agent-teams/ (1 file after consolidation)
├── hooks/
└── workflows/ (6 files)

8 DIRECTORIES (still complex!)
```

You're right - **that's still 8 directories.** Agentic Kit had 35+, but lean should be 2-3, not 8.

---

## What TRUE LEAN Looks Like

### Ultra-Lean Structure (Option A: Minimal Dirs)

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json
├── agents/                    ← 13 agent files
│   ├── 1-create-prd.md
│   ├── 2-generate-tasks.md
│   └── ... (13 files)
├── skills/                    ← 9 skill files
│   ├── story-workflow.md
│   └── ... (9 files)
├── resources/                 ← CONSOLIDATE ALL OTHER FILES
│   ├── templates.yaml        (templates 13 files → 1)
│   ├── workflows.yaml        (workflows 6 files → 1)
│   ├── checklists.md         (checklists 6 files → 1)
│   ├── data.md               (data 6 files → 1)
│   └── agent-teams.yaml      (agent teams)
├── hooks/
│   ├── hooks.json
│   └── register-agents.js
└── README.md

ONLY 4 DIRECTORIES (vs 8)
```

**File count:** 55 → 35 files
**Directories:** 8 → 4
**Complexity:** MUCH REDUCED

---

### Ultra-Lean Structure (Option B: Flat Root)

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json
├── agents/                    ← 13 agent files
├── skills/                    ← 9 skill files
├── templates.yaml            ← All templates (13 files consolidated)
├── workflows.yaml            ← All workflows (6 files consolidated)
├── checklists.md             ← All checklists (6 files consolidated)
├── data.md                   ← All data (6 files consolidated)
├── agent-teams.yaml          ← Agent teams
├── hooks.json
├── register-agents.js
└── README.md

ONLY 2 DIRECTORIES (agents, skills)
REST ARE ROOT-LEVEL FILES
```

**File count:** 55 → 26 files
**Directories:** 8 → 2
**Complexity:** MINIMAL

---

## Comparison: All Three Models

| Metric | Agentic Kit | Current "Lean" | Ultra-Lean A | Ultra-Lean B |
|--------|------|---|---|---|
| **Directories** | 35+ | 8 | 4 | 2 |
| **Total Files** | 77 | 55 | 35 | 26 |
| **Separate files** | Many | Many | Few | Minimal |
| **Consolidated files** | 0 | 0 | 5 | 7 |
| **Root-level files** | 0 | 0 | 0 | 7 |
| **Complexity** | 😞 Overwhelming | 😐 Still complex | 😊 Good | 😄 Minimal |
| **Discoverability** | Bad | OK | Good | Excellent |
| **Editability** | Complex | OK | Good | Excellent |

---

## Ultra-Lean B Breakdown (Most Minimal)

### What Gets Consolidated

```
templates/ (13 files) → templates.yaml
├── prd-tmpl.yaml (203 lines) ─┐
├── story-tmpl.yaml (138 lines) ┤
├── architecture-tmpl.yaml (651) ├─→ templates.yaml (4,184 lines)
├── ... (10 more files) ┤
└── qa-gate-tmpl.yaml (103) ─┘

workflows/ (6 files) → workflows.yaml
├── greenfield-fullstack.yaml (241) ┐
├── greenfield-service.yaml (207) ├─→ workflows.yaml (1,367 lines)
├── brownfield-fullstack.yaml (298) ┤
└── ... (3 more) ┘

checklists/ (6 files) → checklists.md
├── architect-checklist.md (440) ┐
├── story-dod-checklist.md (96) ├─→ checklists.md (1,680 lines)
└── ... (4 more) ┘

data/ (6 files) → data.md
├── agentic-kit-kb.md (810) ┐
├── brainstorming-techniques.md (38) ├─→ data.md (1,630 lines)
└── ... (4 more) ┘
```

### File Structure

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json                 (30 lines)
├── agents/                         (13 files, ~1,000 lines)
│   ├── 1-create-prd.md
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
├── skills/                         (9 files, ~2,000 lines)
│   ├── story-workflow.md
│   ├── code-implementation.md
│   ├── testing-automation.md
│   ├── quality-assurance.md
│   ├── documentation.md
│   ├── debugging.md
│   ├── brainstorming.md
│   ├── requirements-elicitation.md
│   └── architecture-design.md
├── templates.yaml                  (4,184 lines, consolidated)
├── workflows.yaml                  (1,367 lines, consolidated)
├── checklists.md                   (1,680 lines, consolidated)
├── data.md                         (1,630 lines, consolidated)
├── agent-teams.yaml                (30 lines, consolidated)
├── hooks.json                      (20 lines)
├── register-agents.js              (50 lines)
└── README.md                       (300 lines)

TOTAL: 2 directories, 26 files
```

---

## Why Ultra-Lean B Works

### Pros

1. **Minimal directories** (only agents/ and skills/)
2. **Everything else at root** (easy to see in one glance)
3. **Clear separation:** Code (agents/skills) vs Data (everything else)
4. **Discoverability:** No searching through nested dirs
5. **Plugin compliance:** agents/ and skills/ are standard
6. **File count:** Down to 26 files
7. **One `ls` shows everything** you need

### Handling Large Files

Yes, `templates.yaml` is 4,184 lines. Here's how to manage it:

**Option 1: Section Headers (Easy to Find)**
```yaml
# ============================================================
# PRD TEMPLATE (prd-tmpl)
# ============================================================

templates:
  prd-tmpl:
    id: prd-template-v2
    name: Product Requirements Document
    # ... 203 lines ...

# ============================================================
# STORY TEMPLATE (story-tmpl)
# ============================================================

  story-tmpl:
    id: story-template-v1
    # ... 138 lines ...

# ============================================================
# ARCHITECTURE TEMPLATES
# ============================================================

  architecture-tmpl:
    # ... 651 lines ...

  fullstack-architecture-tmpl:
    # ... 824 lines ...

  # ... more with clear section breaks ...
```

**Option 2: VSCode Quick Navigation**
Users can:
- `Ctrl+G` go to line (they know templates are at lines 1-203)
- `Ctrl+F` search (templates:)
- Use breadcrumb navigation at top

**Option 3: References in Files**
```markdown
# In agents/product-manager.md

## Templates Used
- prd-tmpl: See templates.yaml#prd-tmpl
- competitor-analysis-tmpl: See templates.yaml#competitor-analysis-tmpl
```

---

## Path References in Ultra-Lean B

### From Agents/Skills
```markdown
# agents/orchestrator.md

## Workflows
See ../workflows.yaml#greenfield-fullstack

## Templates
See ../templates.yaml#prd-tmpl

## Checklists
See ../checklists.md#story-dod-checklist

## Data
See ../data.md#elicitation-methods

## Agent Teams
See ../agent-teams.yaml#fullstack
```

**These are simple, unambiguous references.**

---

## Consolidation Details

### templates.yaml Structure

```yaml
# templates.yaml (4,184 lines, organized with anchors)

templates:

  # ============ DOCUMENT TEMPLATES ============

  prd-tmpl:
    id: prd-template-v2
    name: Product Requirements Document
    version: 2.0
    # ... 203 lines of PRD template structure ...

  project-brief-tmpl:
    # ... 200+ lines ...

  brownfield-prd-tmpl:
    # ... 280+ lines ...

  competitor-analysis-tmpl:
    # ... 300+ lines ...

  market-research-tmpl:
    # ... 250+ lines ...

  # ============ ARCHITECTURE TEMPLATES ============

  architecture-tmpl:
    # ... 651 lines ...

  fullstack-architecture-tmpl:
    # ... 824 lines ...

  brownfield-architecture-tmpl:
    # ... 477 lines ...

  front-end-architecture-tmpl:
    # ... 219 lines ...

  # ============ SPECIFICATION TEMPLATES ============

  front-end-spec-tmpl:
    # ... 350 lines ...

  story-tmpl:
    # ... 138 lines ...

  qa-gate-tmpl:
    # ... 103 lines ...

  brainstorming-output-tmpl:
    # ... 156 lines ...
```

### workflows.yaml Structure

```yaml
# workflows.yaml (1,367 lines, organized by type)

workflows:

  # ============ GREENFIELD WORKFLOWS ============
  greenfield-fullstack:
    id: greenfield-fullstack
    name: Greenfield Full-Stack Development
    # ... 241 lines ...

  greenfield-service:
    # ... 207 lines ...

  greenfield-ui:
    # ... 236 lines ...

  # ============ BROWNFIELD WORKFLOWS ============
  brownfield-fullstack:
    # ... 298 lines ...

  brownfield-service:
    # ... 187 lines ...

  brownfield-ui:
    # ... 198 lines ...
```

### checklists.md Structure

```markdown
# checklists.md (1,680 lines, organized by section)

## Architect Checklist
<!-- 440 lines of architecture checklist -->

## Story Definition of Done (DOD) Checklist
<!-- 96 lines of story DOD -->

## Story Draft Checklist
<!-- 155 lines of story draft guidance -->

## Product Manager Checklist
<!-- 372 lines of PM checklist -->

## Product Owner Checklist
<!-- 434 lines of PO checklist -->

## Change Checklist
<!-- 184 lines of change management -->
```

### data.md Structure

```markdown
# data.md (1,630 lines, organized by category)

## Agentic Kit Knowledge Base
<!-- 810 lines of KB content -->

## Brainstorming Techniques
<!-- 38 lines of ideation methods -->

## Requirements Elicitation Methods
<!-- 156 lines of elicitation techniques -->

## Technical Preferences
<!-- 5 lines of tech guidance -->

## Test Levels Framework
<!-- 148 lines of testing levels -->

## Test Priorities Matrix
<!-- 174 lines of priority guidance -->
```

---

## Pros and Cons of Ultra-Lean B

### Pros ✅

1. **Minimal dirs** (only 2: agents/, skills/)
2. **Simple to understand** (everything visible in one ls)
3. **Easy to navigate** (no deep nesting)
4. **Professional** (clean, organized)
5. **Plugin-compliant** (agents/ and skills/ are standard)
6. **Easy to reference** (simple relative paths)
7. **File count reduced** (77 → 26 files)
8. **All content preserved** (same 7,500 lines)

### Cons ⚠️

1. **Large YAML files** (templates.yaml is 4,184 lines)
2. **Large markdown files** (data.md is 1,630 lines)
3. **Harder to edit single item** (must search within large file)
4. **Merge conflicts possible** (if multiple people editing)
5. **Takes time to find things** (must search or use anchors)

### Which Cons Matter?

**For a Plugin?**
- ✅ Users won't edit these files
- ✅ Single file changes rare
- ✅ Merge conflicts = no problem (single author initially)
- ⚠️ Finding things takes 30 seconds (acceptable)

**Verdict:** Cons are minimal for a plugin users only INSTALL.

---

## The Best of Both Worlds

### Hybrid Approach (Ultra-Lean A)

```
agentic-kit/
├── agents/          (13 agent files)
├── skills/          (9 skill files)
├── resources/       ← Single directory for "reference data"
│   ├── templates.yaml
│   ├── workflows.yaml
│   ├── checklists.md
│   ├── data.md
│   └── agent-teams.yaml
├── hooks/
└── README.md

4 DIRECTORIES ONLY
```

**Pros:**
- Still minimal (4 dirs instead of 8)
- Organized (resources/ groups all reference data)
- File separation (templates separate from workflows)
- Still manageable file sizes
- Better editability than Ultra-Lean B

**Cons:**
- One extra directory (resources/)
- Still some large files

**Verdict:** ✅ GOOD COMPROMISE

---

## My Recommendation: Which Ultra-Lean?

### For Maximum Simplicity: Ultra-Lean B
```
2 directories only: agents/, skills/
Everything else at root: templates.yaml, workflows.yaml, etc.
```

**Best for:** Absolute minimal complexity

### For Best Usability: Ultra-Lean A (Hybrid)
```
4 directories: agents/, skills/, resources/, hooks/
resources/ contains: templates.yaml, workflows.yaml, checklists.md, data.md
```

**Best for:** Easy to find things + minimal dirs

### For Discoverability: Current "Lean" Model
```
8 directories: agents/, skills/, checklists/, data/, templates/, workflows/, agent-teams/, hooks/
All files separate
```

**Best for:** Finding specific things easily

---

## Comparison: Ultra-Lean vs Current "Lean"

| Metric | Current Lean | Ultra-Lean A | Ultra-Lean B |
|--------|---|---|---|
| **Directories** | 8 | 4 | 2 |
| **Files** | 55 | 35 | 26 |
| **Largest single file** | 500 lines (template) | 4,184 lines (templates.yaml) | 4,184 lines (templates.yaml) |
| **Easy to find things** | ✅ Excellent | ✅ Good | ⚠️ OK (need search) |
| **Easy to edit things** | ✅ Easy | ✅ Easy | ⚠️ Hard (large files) |
| **Plugin compliance** | ✅ Perfect | ✅ Perfect | ✅ Perfect |
| **User experience** | ✅ Excellent | ✅ Good | ⚠️ OK |
| **Maintenance** | ✅ Easy | ✅ Good | ⚠️ Harder |
| **Visual simplicity** | 😐 OK | 😊 Good | 😄 Excellent |

---

## Honest Recommendation

### If "Less Complexity" is Your #1 Priority: Ultra-Lean B

```
agentic-kit/ (ls shows everything)
├── agents/ (folder, 13 files)
├── skills/ (folder, 9 files)
├── templates.yaml (consolidated 13 → 1)
├── workflows.yaml (consolidated 6 → 1)
├── checklists.md (consolidated 6 → 1)
├── data.md (consolidated 6 → 1)
├── agent-teams.yaml
├── hooks.json
├── register-agents.js
└── README.md

2 directories. 26 files. Clean. Simple.
```

**Complexity:** 2/10 (minimal)
**Discoverability:** 6/10 (need to search large files)
**Usability:** 7/10 (works, but large files)

### If "Best of Both" is Your Priority: Ultra-Lean A (Hybrid)

```
agentic-kit/
├── agents/ (13 files)
├── skills/ (9 files)
├── resources/
│   ├── templates.yaml
│   ├── workflows.yaml
│   ├── checklists.md
│   ├── data.md
│   └── agent-teams.yaml
├── hooks/
└── README.md

4 directories. 35 files. Clean. Organized.
```

**Complexity:** 4/10 (very low)
**Discoverability:** 8/10 (easy to find things)
**Usability:** 8/10 (good balance)

### If "Perfect Balance" is Your Priority: Current "Lean"

```
agentic-kit/
├── agents/ (13 files)
├── skills/ (9 files)
├── checklists/ (6 files)
├── data/ (6 files)
├── templates/ (13 files)
├── workflows/ (6 files)
├── agent-teams.yaml
├── hooks/
└── README.md

8 directories. 55 files. Organized. Findable.
```

**Complexity:** 5/10 (low)
**Discoverability:** 9/10 (excellent)
**Usability:** 9/10 (perfect)

---

## My Honest Vote

**Question:** "How do I get rid of all folders? I want less dirs for sure, it's complex."

**My answer:** Use **Ultra-Lean A (Hybrid)**

**Why:**
- ✅ Reduces directories (8 → 4)
- ✅ Reduces files (77 → 35, 55% reduction)
- ✅ Still maintains good discoverability
- ✅ File sizes stay manageable
- ✅ Resources/ groups related data logically
- ✅ Agents/ and skills/ stay separate (plugin standard)
- ✅ Easy to navigate
- ✅ Easy to maintain
- ✅ Best of both worlds

**vs Ultra-Lean B:**
- Pro: Only 2 directories (simpler)
- Con: 4,184-line template file (nightmare to maintain)
- Con: Large files hard to search and edit
- Verdict: Too aggressive, loses usability

---

## Implementation: Ultra-Lean A

```
Phase 1: Consolidate templates (13 → 1)
├── Copy all template YAML sections into resources/templates.yaml
├── Organize with section headers
└── Add table of contents at top

Phase 2: Consolidate workflows (6 → 1)
├── Copy all workflow YAML sections into resources/workflows.yaml
├── Organize by type (greenfield vs brownfield)
└── Add table of contents at top

Phase 3: Consolidate checklists (6 → 1)
├── Convert markdown to single resources/checklists.md
├── Use ## headers for each checklist
└── Add navigation at top

Phase 4: Consolidate data (6 → 1)
├── Convert markdown to single resources/data.md
├── Use ## headers for each data section
└── Add navigation at top

Phase 5: Clean up
├── Delete old directories
├── Update plugin.json
├── Update path references
└── Test everything
```

---

## Path Updates Needed (Ultra-Lean A)

In agent and skill files:

```markdown
# Before
See templates/prd-tmpl.yaml
See workflows/greenfield-fullstack.yaml

# After
See ../resources/templates.yaml#prd-tmpl
See ../resources/workflows.yaml#greenfield-fullstack
```

**Amount of changes:** ~100-200 path references
**Effort:** 2-3 hours (global find-replace)
**Worth it?** Yes, reduces complexity from 8 dirs to 4

---

## Final Decision

### Ultra-Lean A Recommendation

**Use this structure:**

```
agentic-kit/
├── .claude-plugin/
│   └── plugin.json
├── agents/              (13 files, ~1,000 lines)
├── skills/              (9 files, ~2,000 lines)
├── resources/           (5 consolidated files)
│   ├── templates.yaml   (4,184 lines, was 13 files)
│   ├── workflows.yaml   (1,367 lines, was 6 files)
│   ├── checklists.md    (1,680 lines, was 6 files)
│   ├── data.md          (1,630 lines, was 6 files)
│   └── agent-teams.yaml (30 lines, was 4 files)
├── hooks/
│   ├── hooks.json
│   └── register-agents.js
└── README.md

ONLY 4 MAIN DIRECTORIES
55 files → 35 files
Much simpler than 8 directories
```

**This is:** ✅ Truly lean, ✅ Minimal complexity, ✅ Still usable, ✅ Professional

---

## Summary

You were right: my previous "lean" model still had 8 directories.

**True lean is Ultra-Lean A: 4 directories only**

- agents/ (13 separate files - good for plugin convention)
- skills/ (9 separate files - good for discoverability)
- resources/ (5 consolidated files - all reference data grouped)
- hooks/ (registration code)

This gives you:
- ✅ Real simplicity (4 dirs instead of 8)
- ✅ Real reduction (35 files instead of 55)
- ✅ Good balance (still findable, still usable)
- ✅ Professional structure
- ✅ Ready to ship

**Implement Ultra-Lean A.** It's the sweet spot.
