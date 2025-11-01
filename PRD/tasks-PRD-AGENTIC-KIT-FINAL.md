# Implementation Tasks: agentic-kit Plugin Transformation

**PRD:** PRD-AGENTIC-KIT-FINAL.md
**Project:** Transform agentic-kit into production-ready Claude Code marketplace plugin with 3 variants
**Target:** <15 minute onboarding, 100% content preservation, auto-invocation support
**Estimated Effort:** 19-28 hours (3-4 days intensive work)

---

## High-Level Parent Tasks

The implementation is organized into 8 sequential phases with critical dependencies. Phase 0 (Agentic Kit cleanup) must complete before any other work begins. Phase 5 (internal reference updates) is the longest and most critical phase.

- [ ] **0.0 Phase 0: Agentic Kit Cleanup & Legacy Reference Removal**
  - Remove all Agentic Kit references from codebase
  - Critical blocker for all downstream work
  - Effort: 1-2 hours

- [ ] **1.0 Phase 1: Foundation Setup & Directory Structure**
  - Create Ultra-Lean architecture (4 directories)
  - Setup variant-specific plugin manifests
  - Configure auto-discovery hooks
  - Effort: 2-3 hours

- [ ] **2.0 Phase 2: Agent Migration & Configuration**
  - Copy and validate all 13 agents
  - Add auto-invocation markers to agent descriptions
  - Verify agent discoverability
  - Effort: 1-2 hours

- [ ] **3.0 Phase 3: Skill Organization & Variant Setup**
  - Copy and organize all 16 skill directories
  - Validate SKILL.md files in each skill
  - Configure variant-specific skill inclusions
  - Effort: 1-1.5 hours

- [ ] **4.0 Phase 4: Content Consolidation**
  - Consolidate 22 task briefs into single resources file
  - Consolidate templates, workflows, checklists, data files
  - Create agent-teams.yaml with pre-configured groups
  - Effort: 2-2.5 hours

- [ ] **5.0 Phase 5: Internal Reference Updates (CRITICAL)**
  - Audit and document all internal path references (145-280 instances)
  - Update agent files with new consolidated paths (65-130 refs)
  - Update task briefs with anchor links (30-50 refs)
  - Update resource files with new references (40-80 refs)
  - Update skill SKILL.md files (10-20 refs)
  - Validate all paths and test representative links
  - Effort: 4-6 hours (MOST CRITICAL PHASE)

- [ ] **6.0 Phase 6: Documentation & User Guides**
  - Write unified README.md covering all variants
  - Create quick-start guide (15-minute onboarding)
  - Write agent directory with descriptions
  - Create variant comparison chart
  - Write installation guides
  - Create troubleshooting guide and glossary
  - Effort: 2-3 hours

- [ ] **7.0 Phase 7: Testing, Validation & QA**
  - Test auto-discovery of all agents
  - Test variant-specific skill availability
  - Test task brief references and functionality
  - Test template/workflow/checklist loading
  - Test auto-invocation with representative tasks
  - Test variant switching and builds
  - Execute comprehensive acceptance criteria checklist
  - Effort: 2-3 hours

- [ ] **8.0 Phase 8: Marketplace & npm Publishing**
  - Create 3 marketplace variant listings with metadata
  - Publish npm packages for all variants
  - Setup CI/CD for automatic builds
  - Community announcement and engagement
  - Effort: 1-2 hours

---

## Phase Dependencies & Critical Path

```
Phase 0 (Agentic Kit Cleanup)
      ↓
Phase 1 (Foundation) → Phase 2 (Agents) → Phase 5 (References)
                    ↓
                Phase 3 (Skills) → Phase 5
                    ↓
                Phase 4 (Consolidation) → Phase 5
                                    ↓
                                Phase 6 (Docs)
                                    ↓
                                Phase 7 (Testing)
                                    ↓
                                Phase 8 (Publishing)
```

**Critical Path:** Phases 0 → 1 → 4 → 5 → 7
**Longest Phase:** Phase 5 (Internal References) - 4-6 hours, cannot be parallelized

---

## Key Acceptance Criteria (Pre-Launch Checklist)

### Architecture (11 criteria)
- [ ] Ultra-Lean directory structure created (agents/, skills/, resources/, hooks/)
- [ ] All 13 agents copied and updated with auto-invocation markers
- [ ] All 16 skills copied and organized (variant-specific visibility)
- [ ] 22 task briefs consolidated into resources/task-briefs.md
- [ ] Templates, workflows, checklists, data consolidated into resources/
- [ ] Agent-teams.yaml created with pre-configured groups (4 teams)
- [ ] All 145-280 internal path references updated correctly
- [ ] Plugin.json manifests created for all 3 variants
- [ ] hooks/register-agents.js implemented and tested
- [ ] **ALL Agentic Kit references removed** (0 matches on grep)
- [ ] 100% content preservation verified (no files lost)

### Testing & Validation (12 criteria)
- [ ] All agents auto-discovered and manually invokable
- [ ] All skills accessible in variant-specific configuration
- [ ] Task briefs correctly referenced from all agents
- [ ] Templates, workflows, checklists load without errors
- [ ] Auto-invocation works for representative tasks
- [ ] Variant switching doesn't break functionality
- [ ] Marketplace listing approved for all 3 variants
- [ ] npm packages published and installable
- [ ] **ALL 145-280 internal paths audited and working**
- [ ] **No broken anchor links in consolidated files**
- [ ] **All agent→task→template→workflow references functional**
- [ ] **Automated path validation script passes**

### Documentation (8 criteria)
- [ ] README.md unified guide covering all variants
- [ ] Quick-start guide achieves <15 minute onboarding
- [ ] Agent directory with clear descriptions and use cases
- [ ] Installation guide for marketplace and npm
- [ ] Variant comparison chart showing features
- [ ] Glossary with key terms (agent, skill, task brief, auto-invocation)
- [ ] Troubleshooting guide addressing common issues
- [ ] Contribution guidelines for future extensions

### User Experience (4 criteria)
- [ ] <15 minute onboarding from install to first productive use
- [ ] Clear guidance on variant selection with comparison
- [ ] Obvious upgrade path from Lite → Standard → Pro
- [ ] Post-install quick-win guide provided

---

## Relevant Files (Project Structure)

### Source Directories (Current)
- `/home/hamr/Documents/PycharmProjects/agentic-toolkit/ai/agentic-kit/subagents/agents/` - 13 agent files
- `/home/hamr/Documents/PycharmProjects/agentic-toolkit/ai/agentic-kit/subagents/` - Task briefs, templates, workflows, checklists, data
- `/home/hamr/Documents/PycharmProjects/agentic-toolkit/ai/agentic-kit/skills/` - 16 skill directories

### Target Distribution (New Plugin)
- `/agentic-kit/agents/` - 13 agent .md files
- `/agentic-kit/skills/` - 16 skill subdirectories
- `/agentic-kit/resources/` - Consolidated task-briefs.md, templates.yaml, workflows.yaml, checklists.md, data.md, agent-teams.yaml
- `/agentic-kit/hooks/` - Auto-discovery registration code
- `/agentic-kit/.claude-plugin/` - Variant-specific plugin.json manifests
- `/agentic-kit/README.md` - Unified documentation

### Files to Create/Modify

**Core Plugin Files:**
- `agents/1-create-prd.md` through `agents/business-analyst.md` (13 files, updated with paths)
- `skills/pdf/SKILL.md` through `skills/xlsx/SKILL.md` (16 directories preserved)
- `resources/task-briefs.md` (consolidated from 22 files)
- `resources/templates.yaml` (consolidated from 13 files)
- `resources/workflows.yaml` (consolidated from 6 files)
- `resources/checklists.md` (consolidated from 6 files)
- `resources/data.md` (consolidated from 6 files)
- `resources/agent-teams.yaml` (new, pre-configured teams)
- `hooks/register-agents.js` (auto-discovery mechanism)
- `.claude-plugin/plugin-lite.json` (Lite variant manifest)
- `.claude-plugin/plugin-standard.json` (Standard variant manifest)
- `.claude-plugin/plugin-pro.json` (Pro variant manifest)

**Documentation Files:**
- `README.md` (unified guide, 40-50 KB)
- `QUICK-START.md` (15-minute onboarding)
- `AGENT-DIRECTORY.md` (agent descriptions and use cases)
- `INSTALLATION.md` (marketplace + npm instructions)
- `VARIANT-COMPARISON.md` (Lite vs Standard vs Pro)
- `TROUBLESHOOTING.md` (common issues and solutions)
- `CONTRIBUTING.md` (contribution guidelines)
- `GLOSSARY.md` (key terms and definitions)

**Validation & Testing Files:**
- `scripts/validate-paths.js` (automated path validation)
- `scripts/audit-agentic-kit-references.sh` (Agentic Kit reference audit)
- `VALIDATION-REPORT.md` (test results and sign-off)

---

### Notes

**Critical Implementation Points:**

1. **Agentic Kit Cleanup (Phase 0):** Must run FIRST. Search entire codebase for "agentic-kit" references and remove completely. This is a blocker for everything else.

2. **Internal References (Phase 5):** This is the longest and most complex phase. All 145-280 path references must be updated or the plugin breaks. Key patterns to update:
   - `../templates/*.yaml` → `../resources/templates.yaml#anchor-name`
   - `../tasks/*.md` → `#task-anchor` (within consolidated file)
   - `../workflows/*.yaml` → `../resources/workflows.yaml#anchor-name`
   - `../checklists/*.md` → `../resources/checklists.md#anchor-name`
   - `../data/*.md` → `../resources/data.md#anchor-name`

3. **Anchor Naming Convention:** Critical for reference updates. Must maintain consistency:
   - `prd-tmpl.yaml` → `#prd-template` (underscore to hyphen)
   - `create-next-story.md` → `#create-next-story` (keep hyphens)
   - Ensure YAML keys and Markdown headers use consistent naming

4. **Variant Isolation:** Plugin.json manifests control which files are included in each variant:
   - Lite: Only 3 agents (1-create-prd, 2-generate-tasks, 3-process-task-list), no skills, no resources
   - Standard: All 13 agents, 8 core skills, all resources
   - Pro: All 13 agents, all 16 skills, all resources + dev resources

5. **Content Preservation:** Every file from the original 8 directories must be preserved. No content is deleted, only consolidated. Verify with before/after file counts.

6. **Auto-Invocation Setup:** Hooks must register agents on plugin load. Agent descriptions must include "Use PROACTIVELY" markers so Claude understands when to auto-invoke.

7. **Testing Strategy:** Each phase has specific acceptance criteria. Phase 5 (references) requires automated path validation script to prevent broken links from reaching production.

---

## Next Steps

**Ready for Phase 1 implementation once:**
1. Phase 0 (Agentic Kit cleanup) is complete and verified
2. All team members understand the critical path and dependencies
3. Phase 5 (Internal References) timeline is acknowledged as the longest phase

Estimated total effort: 19-28 hours over 3-4 days of intensive work.

---

**Status:** Phase 0 (Agentic Kit Cleanup) awaiting initiation
**Generated:** 2025-11-01
**PRD Reference:** PRD-AGENTIC-KIT-FINAL.md (v2.0)
