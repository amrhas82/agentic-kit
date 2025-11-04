---
description: Request structured code review to catch issues before they cascade
argument-hint: <branch-or-pr-name>
---

Dispatch structured code review to catch issues before they cascade.

**Core principle:** Review early, review often.

## When to Request Review

**Mandatory:**
- After each task in subagent-driven development
- After completing major feature
- Before merge to main

**Optional but valuable:**
- When stuck (fresh perspective)
- Before refactoring (baseline check)
- After fixing complex bug

## How to Request

**1. Get git SHAs:**
```bash
BASE_SHA=$(git rev-parse HEAD~1)  # or origin/main
HEAD_SHA=$(git rev-parse HEAD)
```

**2. Review scope:** $ARGUMENTS

**3. Key areas to focus on:**

**Summary & Purpose:**
- What changed and why it matters
- Is the implementation aligned with the requirements

**Correctness & Quality:**
- Logic errors and edge cases
- Test coverage and test quality
- Code readability and maintainability

**Risks & Concerns:**
- Security implications
- Performance bottlenecks
- Breaking changes or migration issues
- Dependency risks

**Architecture & Design:**
- Code organization and structure
- Separation of concerns
- Reusability and extensibility
- API design consistency

**Follow-up Actions:**
- Concrete TODOs with owners
- Priority levels (Critical/Important/Minor)
- Testing requirements

## Act on feedback:
- Fix Critical issues immediately
- Fix Important issues before proceeding
- Note Minor issues for later
- Push back if reviewer is wrong (with reasoning)

## Integration with Workflows

**Subagent-Driven Development:**
- Review after EACH task
- Catch issues before they compound
- Fix before moving to next task

**Executing Plans:**
- Review after each batch (3 tasks)
- Get feedback, apply, continue

**Ad-Hoc Development:**
- Review before merge
- Review when stuck

## Red Flags

**Never:**
- Skip review because "it's simple"
- Ignore Critical issues
- Proceed with unfixed Important issues
- Argue with valid technical feedback

**If reviewer wrong:**
- Push back with technical reasoning
- Show code/tests that prove it works
- Request clarification
