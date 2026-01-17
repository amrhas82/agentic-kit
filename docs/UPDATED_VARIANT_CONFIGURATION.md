# Updated Variant Configuration

**Date**: 2025-11-05
**Applied to**: All 4 packages (Claude, Opencode, Ampcode, Droid)

## Summary

All packages now have **progressive variant configurations** with clear differentiation between Lite, Standard, and Pro.

## New Component Counts

| Variant  | Agents | Skills | Resources | Hooks | Total |
|----------|--------|--------|-----------|-------|-------|
| **LITE** | 4      | 7      | 6         | 2     | 19    |
| **STANDARD** | 9  | 11     | 6         | 2     | 28    |
| **PRO**  | 13     | 22     | 6         | 2     | 43    |

### Previous Configuration (for comparison)
| Variant  | Agents | Skills | Resources | Hooks | Total |
|----------|--------|--------|-----------|-------|-------|
| OLD LITE | 3      | 0      | 6         | 2     | 11    |
| OLD STANDARD | 13 | 8      | 6         | 2     | 29    |
| OLD PRO  | 13     | 22     | 6         | 2     | 43    |

**Key Changes**:
- LITE: Increased from 3 to 4 agents, added 7 skills (was 0)
- STANDARD: Decreased from 13 to 9 agents, increased from 8 to 11 skills
- PRO: Unchanged (all agents, all skills)

---

## LITE Variant (19 components)

### Agents (4)
1. `1-create-prd`
2. `2-generate-tasks`
3. `3-process-task-list`
4. `master`

### Skills (7)
1. `docx` - Document processing
2. `pdf` - PDF generation
3. `code-review` - Code review assistance
4. `brainstorming` - Idea generation
5. `root-cause-tracing` - Debugging assistance
6. `mcp-builder` - MCP server building
7. `systematic-debugging` - Systematic debugging approach

### Resources (6)
- `agent-teams.yaml`
- `checklists.md`
- `data.md`
- `task-briefs.md`
- `templates.yaml`
- `workflows.yaml`

### Hooks (2)
- `register-agents.js`
- `session-start.js`

### Use Case
Essential workflow management with core document processing and debugging skills. Perfect for users who need comprehensive PRD/task management plus basic document and debugging capabilities.

---

## STANDARD Variant (28 components)

### Agents (9)
1. `1-create-prd`
2. `2-generate-tasks`
3. `3-process-task-list`
4. `master`
5. `orchestrator`
6. `quality-assurance`
7. `code-developer`
8. `market-researcher`
9. `ui-designer`

### Skills (11)
1. `docx` - Document processing
2. `pdf` - PDF generation
3. `code-review` - Code review assistance
4. `brainstorming` - Idea generation
5. `root-cause-tracing` - Debugging assistance
6. `mcp-builder` - MCP server building
7. `webapp-testing` - Web application testing
8. `xlsx` - Spreadsheet processing
9. `systematic-debugging` - Systematic debugging approach
10. `verification-before-completion` - Pre-completion verification
11. `skill-creator` - Create custom skills

### Resources (6)
- `agent-teams.yaml`
- `checklists.md`
- `data.md`
- `task-briefs.md`
- `templates.yaml`
- `workflows.yaml`

### Hooks (2)
- `register-agents.js`
- `session-start.js`

### Use Case
Complete workflow and development team with enhanced testing and validation skills. Ideal for professional developers and teams who need full coordination, QA, and comprehensive skill coverage.

---

## PRO Variant (43 components)

### Agents (13) - ALL AGENTS
1. `1-create-prd`
2. `2-generate-tasks`
3. `3-process-task-list`
4. `market-researcher`
5. `code-developer`
6. `system-architect`
7. `master`
8. `orchestrator`
9. `feature-planner`
10. `backlog-manager`
11. `quality-assurance`
12. `story-writer`
13. `ui-designer`

### Skills (22) - ALL SKILLS
**Core Skills (from Lite):**
1. `docx`
2. `pdf`
3. `code-review`
4. `brainstorming`
5. `root-cause-tracing`
6. `mcp-builder`
7. `systematic-debugging`

**Additional Standard Skills:**
8. `webapp-testing`
9. `xlsx`
10. `verification-before-completion`
11. `skill-creator`

**Advanced Pro-Only Skills:**
12. `algorithmic-art` - Generate artistic algorithms
13. `artifacts-builder` - Build Claude artifacts
14. `brand-guidelines` - Brand guideline creation
15. `canvas-design` - Canvas design tools
16. `condition-based-waiting` - Conditional waiting patterns
17. `internal-comms` - Internal communications
18. `pptx` - PowerPoint generation
19. `slack-gif-creator` - Slack GIF creation
20. `test-driven-development` - TDD workflows
21. `testing-anti-patterns` - Testing anti-pattern detection
22. `theme-factory` - Theme generation

### Resources (6)
- `agent-teams.yaml`
- `checklists.md`
- `data.md`
- `task-briefs.md`
- `templates.yaml`
- `workflows.yaml`

### Hooks (2)
- `register-agents.js`
- `session-start.js`

### Use Case
Complete installation with all capabilities. For power users, enterprises, and teams requiring the full feature set including advanced creative, testing, and automation skills.

---

## Progressive Feature Matrix

| Feature Category | Lite | Standard | Pro |
|------------------|------|----------|-----|
| **Workflow Management** | ✅ PRD, Tasks, Processing | ✅ + Orchestration | ✅ + Full Team |
| **Document Processing** | ✅ Word, PDF | ✅ + Excel | ✅ + PowerPoint |
| **Code Quality** | ✅ Review, Debugging | ✅ + Testing, Verification | ✅ + TDD, Anti-patterns |
| **Development Tools** | ✅ MCP Builder | ✅ + Skill Creator | ✅ + Artifacts |
| **Creative Tools** | ❌ | ❌ | ✅ Art, Design, Themes |
| **Collaboration** | ❌ | ❌ | ✅ Slack, Comms |
| **Architecture** | ❌ | ❌ | ✅ Holistic Architect |
| **Product Management** | ❌ | ❌ | ✅ PM, PO, Scrum Master |

---

## Rationale

### Why These Changes?

**LITE Enhancement:**
- **Old**: Only 3 coordination agents, no skills → Too minimal
- **New**: 4 workflow agents + 7 essential skills → Useful for real work
- **Impact**: Users can now do meaningful development work with Lite

**STANDARD Refinement:**
- **Old**: All 13 agents (same as Pro) → No differentiation
- **New**: 9 agents focused on development team → Clear value proposition
- **Impact**: Better suited for professional teams without unnecessary complexity

**PRO Maintained:**
- **Unchanged**: Still includes everything
- **Differentiation**: Now clearly distinct from Standard (13 vs 9 agents, 22 vs 11 skills)

---

## Migration Notes

### For Existing Users

**If upgrading from old Lite to new Lite:**
- ✅ Gain: 1 additional agent (1-create-prd, 2-generate-tasks, 3-process-task-list)
- ✅ Gain: 7 new skills
- ⚠️ Change: Lost orchestrator and story-writer (moved to Standard)

**If upgrading from old Standard to new Standard:**
- ⚠️ Change: Reduced from 13 to 9 agents
- ✅ Gain: 3 additional skills (verification-before-completion, skill-creator, webapp-testing)
- Lost agents: feature-planner, backlog-manager, story-writer, system-architect (moved to Pro only)

**If using Pro:**
- ✅ No changes - still includes everything

---

## Testing Impact

### Test Updates Required

1. **variant-testing.test.js** - Update expected counts:
   ```javascript
   const EXPECTED_COUNTS = {
     lite: { agents: 4, skills: 7, resources: 6, hooks: 2 },
     standard: { agents: 9, skills: 11, resources: 6, hooks: 2 },
     pro: { agents: 13, skills: 22, resources: 6, hooks: 2 }
   };
   ```

2. **LITE_AGENTS** constant update:
   ```javascript
   const LITE_AGENTS = [
     '1-create-prd.md',
     '2-generate-tasks.md',
     '3-process-task-list.md',
     'master.md'
   ];
   ```

3. **STANDARD_SKILLS** constant update:
   ```javascript
   const STANDARD_SKILLS = [
     'docx', 'pdf', 'code-review', 'brainstorming',
     'root-cause-tracing', 'mcp-builder', 'webapp-testing',
     'xlsx', 'systematic-debugging', 'verification-before-completion',
     'skill-creator'
   ];
   ```

---

## Documentation Updates Required

1. **README.md** - Update variant descriptions and counts
2. **INSTALLER_GUIDE.md** - Update variant tables with new counts
3. **VARIANT_CONFIGURATION.md** - Update skill rationale
4. **INSTALLATION_DEMO.md** - Update ASCII art demos with new counts
5. **CHANGELOG.md** - Add entry for variant reconfiguration

---

**Applied**: 2025-11-05
**Status**: ✅ Complete - All 4 packages updated
**Next**: Re-run tests with updated expected counts

