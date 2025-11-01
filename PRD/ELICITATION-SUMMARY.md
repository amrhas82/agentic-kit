# Elicitation Summary: agentic-kit Marketplace Plugin Transformation

**Date:** November 1, 2025
**Status:** Complete - Ready for Your Review and Approval

---

## What We Discussed & Decided

### 1. Distribution Strategy
- ✅ **Primary:** Claude Code Marketplace (one-click install for non-technical users)
- ✅ **Secondary:** npm packages (for developers)
- ✅ **Target Audience:** Non-technical domain experts (product managers, designers, business analysts)

### 2. Installation Variants (3 Packages)

**agentic-kit-lite**
- 3 core agents: 1-create-prd, 2-generate-tasks, 3-process-task-list
- 0 skills
- 0 task briefs
- Target: Beginners
- Size: ~500 KB

**agentic-kit (Standard)** ← Default recommendation
- All 13 agents
- 8 core skills: pdf, xlsx, docx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms
- All 22 task briefs
- Target: Most users
- Size: ~2.5 MB

**agentic-kit-pro**
- All 13 agents
- All 16 skills (adds: webapp-testing, mcp-builder, skill-creator, algorithmic-art, artifacts-builder, slack-gif-creator, + 2 others)
- All 22 task briefs
- Target: Power users, developers
- Size: ~3.5 MB

### 3. Architecture (Ultra-Lean A - 4 directories)
```
agentic-kit/
├── agents/           (13 agent files)
├── skills/           (16 skill directories)
├── resources/        (5 consolidated files)
├── hooks/            (auto-discovery mechanism)
└── README.md
```

**Resources consolidation:**
- 13 template files → `resources/templates.yaml`
- 6 workflow files → `resources/workflows.yaml`
- 6 checklist files → `resources/checklists.md`
- 6 data files → `resources/data.md`
- 4 agent-team files → `resources/agent-teams.yaml`
- 22 task files → `resources/task-briefs.md`

### 4. Content Preservation
✅ 100% of content preserved:
- 13 agents (~1,480 lines)
- 16 skills (~80 KB)
- 22 task briefs (~2,000 lines)
- All templates, workflows, checklists, data consolidated but intact

### 5. Critical Implementation Detail: Internal References (145-280 instances)

**This is the most important point you clarified:**

After consolidation, ALL internal references must be updated:

**Agents must update references to:**
- `../templates/file.yaml` → `../resources/templates.yaml#anchor-name`
- `../workflows/file.yaml` → `../resources/workflows.yaml#anchor-name`
- `../checklists/file.md` → `../resources/checklists.md#anchor-name`
- `../data/file.md` → `../resources/data.md#anchor-name`
- `../tasks/file.md` → Removed (tasks now consolidated)

**Task briefs must update references to:**
- `../tasks/other-task.md` → `#task-anchor` (same file, anchor links)
- `../templates/file.yaml` → `../resources/templates.yaml#anchor-name`
- External references similarly updated

**File names must be standardized to match anchor names:**
- Example: `prd-tmpl.yaml` → anchor `#prd-template`
- Consistent naming convention required (hyphens, not underscores)

**Expected updates:**
- Agents: 65-130 references
- Task briefs: 30-50 references
- Resource files: 40-80 references
- Skills: 10-20 references
- **Total: 145-280 individual path updates**

---

## Documents Created for Your Review

### 1. **PRD-AGENTIC-KIT-MARKETPLACE-VARIANTS.md** (Comprehensive)
- Full Product Requirements Document
- 3 installation variants defined
- Architecture specifications
- Content inventory with preservation proof
- 8-phase implementation timeline (18-26 hours)
- 30+ acceptance criteria
- Risk analyses and mitigations
- **Key Addition:** Section 7 (CRITICAL: Internal Reference Updates) with detailed breakdown

### 2. **REFERENCE-UPDATE-AUDIT-CHECKLIST.md** (Implementation Guide)
- Specific file-by-file guide for updating all 145-280 references
- Phase-by-phase breakdown:
  - Phase 1: Audit current state (1 hour)
  - Phase 2A: Update 13 agents (2-3 hours)
  - Phase 2B: Consolidate/update 22 task briefs (1-2 hours)
  - Phase 2C: Update 5 resource files (2-3 hours)
  - Phase 2D: Check 16 skill files (1 hour)
  - Phase 3: Validation & testing (1-2 hours)
  - Phase 4: Documentation (30 min)
- Exact search/replace patterns
- Validation scripts and procedures
- Timeline: 8-12 hours for reference updates alone

### 3. **ELICITATION-SUMMARY.md** (This Document)
- Summary of all decisions made
- What's included in each variant
- Critical implementation details
- Links to detailed documentation

---

## Key Insights from Elicitation

### You Clarified That...

1. **Path updates are not optional** - Every agent, task brief, and resource file needs internal reference updates after consolidation
2. **File naming matters** - Anchor names must match original file names consistently (hyphens, underscores, capitalization)
3. **Multiple variants are critical** - Different user groups need different packages (lite/standard/pro)
4. **Marketplace is primary** - Non-technical users are the target, not CLI developers
5. **All reference changes must happen together** - Can't partially consolidate; must be comprehensive

### Why This Matters

If we skip or partially do Phase 5 (Reference Updates):
- ❌ Agents can't find templates/workflows/checklists
- ❌ Task briefs can't reference other tasks or resources
- ❌ Links in documentation will be broken
- ❌ Users get errors when trying to use agents
- ❌ Plugin marked as broken/unusable

**This is why implementation takes 18-26 hours instead of 10-14 hours.**

---

## Ready for Implementation?

Before we proceed with Phase 1 (Foundation Setup), please review:

1. ✅ Are the 3 variants (lite/standard/pro) correct?
2. ✅ Is the 4-directory Ultra-Lean architecture what you want?
3. ✅ Do you agree that all 145-280 internal references must be updated?
4. ✅ Are the file naming conventions clear (hyphens, underscores, etc)?
5. ✅ Is the 18-26 hour timeline realistic for your team?

If all agreed, we can proceed with:
- Phase 1: Foundation Setup (directory structure, hooks, plugin.json)
- Phase 2: Copy files to new structure
- Phase 3-4: Resource consolidation
- Phase 5: Internal reference updates (the critical phase)
- Phase 6-8: Testing, documentation, distribution

---

## Questions for You

Before I proceed with implementation:

1. **Do you want me to start Phase 1 (Foundation Setup) right now?**
2. **Or would you prefer to review the PRD first with team/stakeholders?**
3. **Should we do a reference audit first (Phase 1 of reference updates) to get exact counts?**
4. **Any other clarifications needed before we commit to implementation?**

---

## Approval Sign-Off

This elicitation is complete when you confirm:

- [ ] Approve 3-variant strategy (lite/standard/pro)
- [ ] Approve Ultra-Lean 4-directory architecture
- [ ] Approve comprehensive reference update plan (145-280 instances)
- [ ] Approve 18-26 hour timeline
- [ ] Ready to proceed with Phase 1 implementation

Once approved, we move from elicitation → implementation.

