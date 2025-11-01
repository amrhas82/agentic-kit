# Internal Reference Update Audit Checklist

**Purpose:** Track all internal path and filename references that need to be updated during consolidation.

**Status:** Pre-implementation audit guide

---

## Quick Summary

After consolidating files from 8 directories to 4 (resources/), the following changes must happen:

| Item | Before | After | Example |
|------|--------|-------|---------|
| **Agent refs to templates** | `../templates/prd-tmpl.yaml` | `../resources/templates.yaml#prd-template` | Search/replace in all 13 agents |
| **Agent refs to workflows** | `../workflows/greenfield.yaml` | `../resources/workflows.yaml#greenfield` | Search/replace in all 13 agents |
| **Agent refs to checklists** | `../checklists/qa-checklist.md` | `../resources/checklists.md#qa-checklist` | Search/replace in all 13 agents |
| **Agent refs to data** | `../data/techniques.md` | `../resources/data.md#techniques` | Search/replace in all 13 agents |
| **Task ref to task** | `../tasks/create-story.md` | `#create-story` (same file) | Within resources/task-briefs.md |
| **Resource internal refs** | `../templates/file.yaml` | `#anchor-name` or `templates.yaml#anchor` | Within resources/*.yaml/*.md |
| **Skill refs to templates** | Varies | `../resources/templates.yaml#anchor` | Check each SKILL.md |

**Total Updates Expected: 145-280 instances**

---

## Pre-Phase 1: Remove All Agentic Kit References

**MUST RUN FIRST** before proceeding with consolidation.

```bash
# Find all Agentic Kit files and references
find . -iname "*agentic-kit*"
grep -ri "agentic-kit" agents/ skills/ resources/ tasks/ templates/ workflows/ checklists/ data/ 2>/dev/null

# Expected result after cleanup: 0 matches
```

**What to remove:**
- [ ] Delete any files with "agentic-kit" in filename
- [ ] Remove Agentic Kit mentions from agent descriptions and documentation
- [ ] Remove Agentic Kit imports/references in code
- [ ] Remove Agentic Kit examples or templates
- [ ] Clean up any Agentic Kit configuration

**Status after cleanup:** `grep -ri "agentic-kit" .` returns no results

Estimated effort: 1-2 hours

---

## Phase 1: Audit Current State

Run these searches to find ALL current path references:

```bash
# Find all references to old directories
grep -r "../templates/" /path/to/agentic-kit/
grep -r "../workflows/" /path/to/agentic-kit/
grep -r "../checklists/" /path/to/agentic-kit/
grep -r "../data/" /path/to/agentic-kit/
grep -r "../tasks/" /path/to/agentic-kit/
```

**Expected Output Format:**
```
agents/product-manager.md: See ../templates/prd-tmpl.yaml for PRD format
agents/product-manager.md: See ../workflows/discovery.yaml for workflow example
... [hundreds more]
```

---

## Phase 2: Update by File Group

### Group A: Agents (13 files)

Files to update:
```
agents/1-create-prd.md
agents/2-generate-tasks.md
agents/3-process-task-list.md
agents/ux-expert.md
agents/scrum-master.md
agents/qa-test-architect.md
agents/product-owner.md
agents/product-manager.md
agents/full-stack-dev.md
agents/orchestrator.md
agents/master.md
agents/holistic-architect.md
agents/business-analyst.md
```

**For each agent file:**

**Step 1: Find all references**
```bash
grep -n "../templates/\|../workflows/\|../checklists/\|../data/\|../tasks/" agents/AGENT-NAME.md
```

**Step 2: Replace references**

Find-Replace patterns (use your IDE's multi-file find-replace):

| Pattern | Replacement | Note |
|---------|-------------|------|
| `../templates/prd-tmpl.yaml` | `../resources/templates.yaml#prd-template` | Verify anchor name matches |
| `../templates/story-tmpl.yaml` | `../resources/templates.yaml#story-template` | Verify anchor name matches |
| `../workflows/greenfield-fullstack.yaml` | `../resources/workflows.yaml#greenfield-fullstack` | Keep hyphens |
| `../checklists/requirements-checklist.md` | `../resources/checklists.md#requirements-checklist` | Anchor from header |
| `../data/brainstorming-techniques.md` | `../resources/data.md#brainstorming-techniques` | Anchor from section |

**Step 3: Validate**
- Run grep again - should find 0 matches for old patterns
- Verify new anchor links look correct
- Commit changes for this agent
- Move to next agent

**Estimated effort per agent:** 5-15 minutes = 65-195 minutes total for 13 agents

---

### Group B: Task Briefs (22 sections in resources/task-briefs.md)

File: `resources/task-briefs.md`

**Current state:** Individual task files with internal references
**New state:** Consolidated into single file with anchor-based cross-references

**Step 1: Before consolidation, identify all task-to-task references**

Run search in original tasks/ directory:
```bash
grep -r "../tasks/" tasks/
```

**Step 2: Create anchor names from task filenames**

Mapping example:
```
Original file: tasks/create-next-story.md
New anchor: #create-next-story
Reference format: See [Create Next Story](#create-next-story)
```

**Step 3: During consolidation, update all task-to-task references**

When merging 22 task files into task-briefs.md:
- Old: `See ../tasks/validate-next-story.md`
- New: `See [Validate Next Story](#validate-next-story)`

**Step 4: Check for external references within tasks**

Search within each task for:
- `../templates/` → update to `../resources/templates.yaml#anchor`
- `../workflows/` → update to `../resources/workflows.yaml#anchor`
- `../checklists/` → update to `../resources/checklists.md#anchor`
- `../data/` → update to `../resources/data.md#anchor`

**Estimated effort:** 1-2 hours for all 22 task briefs

---

### Group C: Resource Files (5 consolidated files)

#### C1: resources/templates.yaml

**Step 1: Identify internal template-to-template references**
```bash
grep -n "See\|reference\|example" templates.yaml | head -20
```

**Step 2: Update template references**
- Old: Template file references → New: YAML section anchors
- Example: `workflows:` might reference a template
- Update to: `See templates.yaml#template-anchor-name`

**Step 3: Check for workflow/checklist/data references**
- Update all to point to resources/ directory with anchors

**Estimated effort:** 30-45 minutes

#### C2: resources/workflows.yaml

**Step 1: Find references to templates/tasks/checklists**
```bash
grep -n "template\|task\|checklist" workflows.yaml | head -20
```

**Step 2: Update all references**
- Old: File paths → New: Anchor paths
- Examples: workflow may show task references, template examples

**Estimated effort:** 30-45 minutes

#### C3: resources/checklists.md

**Step 1: Find references in checklist items**
```bash
grep -n "../" checklists.md
```

**Step 2: Update references**
- Checklists often reference templates or data sections
- Update all to anchor format

**Estimated effort:** 30-45 minutes

#### C4: resources/data.md

**Step 1: Check for internal data references**
- Some data files may reference other data or templates

**Step 2: Update as needed**
- Usually self-contained, but verify

**Estimated effort:** 15-30 minutes

#### C5: resources/agent-teams.yaml

**Status:** Likely self-contained, minimal updates needed

**Estimated effort:** 5-10 minutes

**Total for Group C:** 2-3 hours

---

### Group D: Skills (16 directories with SKILL.md files)

Files to check:
```
skills/pdf/SKILL.md
skills/xlsx/SKILL.md
skills/docx/SKILL.md
skills/pptx/SKILL.md
skills/canvas-design/SKILL.md
skills/theme-factory/SKILL.md
skills/brand-guidelines/SKILL.md
skills/internal-comms/SKILL.md
skills/webapp-testing/SKILL.md
skills/mcp-builder/SKILL.md
skills/skill-creator/SKILL.md
skills/algorithmic-art/SKILL.md
skills/artifacts-builder/SKILL.md
skills/slack-gif-creator/SKILL.md
skills/[skill-15]/SKILL.md
skills/[skill-16]/SKILL.md
```

**For each skill:**

**Step 1: Check for project references**
```bash
grep -n "../templates/\|../workflows/\|../checklists/\|../data/" skills/SKILL-NAME/SKILL.md
```

**Step 2: Update if found**
- Most skills are self-contained (no references)
- Some may reference templates or workflows from the project
- Update to: `../resources/FILE.yaml#anchor`

**Step 3: Validate**
- Most will have 0 references (no changes needed)
- Some may have 1-3 references each
- Commit changes

**Estimated effort per skill:** 2-5 minutes each = 32-80 minutes total

---

## Phase 3: Validation

### Validation Step 1: Grep for Old Patterns

```bash
# Should find 0 matches
grep -r "../templates/" agents/ resources/ skills/
grep -r "../workflows/" agents/ resources/ skills/
grep -r "../checklists/" agents/ resources/ skills/
grep -r "../data/" agents/ resources/ skills/
grep -r "../tasks/" agents/ resources/ # (except task-briefs.md internal refs)
```

Expected result: No matches

### Validation Step 2: Check Anchor Names

Create a test file `VALIDATE-PATHS.md`:

```markdown
# Path Validation Test

## Testing Agent References

See [../resources/templates.yaml#prd-template](../resources/templates.yaml#prd-template) - Should work
See [../resources/workflows.yaml#greenfield-fullstack](../resources/workflows.yaml#greenfield-fullstack) - Should work
See [../resources/checklists.md#requirements-checklist](../resources/checklists.md#requirements-checklist) - Should work
See [../resources/data.md#brainstorming-techniques](../resources/data.md#brainstorming-techniques) - Should work

## Testing Task Cross-References

See [#create-next-story](#create-next-story) - Should work within task-briefs.md
See [#validate-next-story](#validate-next-story) - Should work within task-briefs.md
```

Manually click each link in VSCode or Markdown preview to verify they work.

### Validation Step 3: Automated Script

Create `validate-paths.js` (Node.js):

```javascript
const fs = require('fs');
const path = require('path');

const patterns = [
  /\.\.\/(templates|workflows|checklists|data|tasks)\/[\w-]+\.(yaml|md)/g
];

function validatePaths(dir) {
  const files = fs.readdirSync(dir, { recursive: true });
  let oldPatternCount = 0;

  files.forEach(file => {
    if (!file.endsWith('.md') && !file.endsWith('.yaml')) return;

    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    const matches = content.match(...patterns);

    if (matches) {
      console.log(`❌ ${file}: Found ${matches.length} old-format references`);
      matches.forEach(m => console.log(`   - ${m}`));
      oldPatternCount += matches.length;
    }
  });

  if (oldPatternCount === 0) {
    console.log('✅ All paths validated successfully!');
  } else {
    console.log(`❌ ${oldPatternCount} old-format references still exist`);
    process.exit(1);
  }
}

validatePaths('./agents');
validatePaths('./resources');
validatePaths('./skills');
```

Run: `node validate-paths.js`

Expected output: `✅ All paths validated successfully!`

---

## Phase 4: Consolidation Mapping Document

Create `CONSOLIDATION-MAPPING.md` documenting:

### Template File Mapping

```markdown
## Templates

| Original File | New Section | Anchor Name | Updated References |
|---------------|-------------|-------------|-------------------|
| prd-tmpl.yaml | PRD Template | #prd-template | agents/product-manager.md |
| story-tmpl.yaml | Story Template | #story-template | agents/scrum-master.md |
| ... | ... | ... | ... |
```

### Workflow File Mapping

```markdown
## Workflows

| Original File | New Section | Anchor Name | Updated References |
|---------------|-------------|-------------|-------------------|
| greenfield-fullstack.yaml | Greenfield Fullstack | #greenfield-fullstack | agents/product-manager.md |
| ... | ... | ... | ... |
```

### Task Brief Mapping

```markdown
## Task Briefs

| Original File | New Section | Anchor Name | Updated References |
|---------------|-------------|-------------|-------------------|
| create-next-story.md | Create Next Story | #create-next-story | Other tasks, agents |
| ... | ... | ... | ... |
```

---

## Summary Checklist

- [ ] **Pre-Phase: Agentic Kit Cleanup** - All Agentic Kit references removed
- [ ] **Phase 1: Audit** - Identified all 145-280 references
- [ ] **Phase 2A: Update Agents** - Updated all 13 agent files
- [ ] **Phase 2B: Update Task Briefs** - Consolidated and updated 22 tasks
- [ ] **Phase 2C: Update Resources** - Updated 5 consolidated files
- [ ] **Phase 2D: Update Skills** - Checked/updated 16 skill files
- [ ] **Phase 3: Validation** - All grep checks passed
- [ ] **Phase 3: Automated Script** - validate-paths.js passes
- [ ] **Phase 4: Documentation** - Created CONSOLIDATION-MAPPING.md

---

## Timeline Estimate

| Phase | Effort | Status |
|-------|--------|--------|
| **Pre-Phase: Agentic Kit Cleanup** | **1-2 hours** | **Not started** |
| Phase 1: Audit | 1 hour | Not started |
| Phase 2A: Agents (13 files) | 2-3 hours | Not started |
| Phase 2B: Task Briefs (22 tasks) | 1-2 hours | Not started |
| Phase 2C: Resources (5 files) | 2-3 hours | Not started |
| Phase 2D: Skills (16 files) | 1 hour | Not started |
| Phase 3: Validation | 1-2 hours | Not started |
| Phase 4: Documentation | 30 minutes | Not started |
| **TOTAL** | **9-14 hours** | Not started |

This is the critical path for reference updates (Phase 0 Agentic Kit cleanup + Phases 1-4 path updates).
Total implementation time including all 8 phases: 19-28 hours.

