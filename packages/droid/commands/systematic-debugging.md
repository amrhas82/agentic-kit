---
description: Systematic four-phase debugging framework - investigate root cause before any fixes
argument-hint: <bug-or-error-description>
---

**Core principle:** ALWAYS find root cause before attempting fixes. Symptom fixes are failure.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

## When to Use

**Use for ANY technical issue:**
- Test failures
- Bugs in production
- Unexpected behavior
- Performance problems
- Build failures
- Integration issues

**Use ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

## The Four Phases

Complete each phase before proceeding to the next.

### Phase 1: Root Cause Investigation

**BEFORE attempting ANY fix:**

1. **Read Error Messages Carefully**
   - Don't skip past errors or warnings
   - They often contain the exact solution
   - Read stack traces completely
   - Note line numbers, file paths, error codes

2. **Reproduce Consistently**
   - Can you trigger it reliably?
   - What are the exact steps?
   - Does it happen every time?
   - If not reproducible → gather more data, don't guess

3. **Check Recent Changes**
   - What changed that could cause this?
   - Git diff, recent commits
   - New dependencies, config changes
   - Environmental differences

4. **Gather Evidence in Multi-Component Systems**

For systems with multiple components (CI → build → signing, API → service → database):

**Add diagnostic instrumentation at EACH component boundary:**
```bash
# Layer 1: Input validation
echo "=== Input data received: ==="
echo "IDENTITY: ${IDENTITY:+SET}${IDENTITY:-UNSET}"

# Layer 2: Processing
echo "=== Env vars in process: ==="
env | grep IDENTITY || echo "IDENTITY not found"

# Layer 3: Output
echo "=== Processing result: ==="
echo "Keychain state: $(security list-keychains)"
```

**Run once to gather evidence showing WHERE it breaks, THEN analyze evidence to identify failing component**

### Phase 2: Pattern Analysis

**After gathering evidence:**

1. **Look for Patterns**
   - Does it fail the same way every time?
   - Are there common conditions?
   - Does it work in some environments but not others?
   - Is there timing involved?

2. **Map the Failure Chain**
   - What happens just before failure?
   - What data/state exists at each step?
   - Where does the expected flow break?

3. **Identify Contradictions**
   - What should happen vs. what actually happens?
   - Where do assumptions break down?
   - What evidence contradicts initial hypotheses?

### Phase 3: Hypothesis Testing

**Form and test hypotheses:**

1. **Formulate Specific Hypotheses**
   - Not "it's probably a timing issue"
   - But "the callback fires before the database connection is established"

2. **Design Tests to Prove/Disprove**
   - Add logging to verify assumptions
   - Create minimal test cases
   - Isolate variables

3. **Test Each Hypothesis**
   - One variable at a time
   - Document results clearly
   - Eliminate possibilities systematically

**Example:**
```typescript
// Hypothesis: Race condition between async operations
// Test: Add console.log timestamps to verify order
console.log('1. Starting operation A');
operationA().then(() => {
  console.log('2. Operation A completed');
  operationB();
});

console.log('3. Operation B started');
operationB().then(() => {
  console.log('4. Operation B completed');
});
```

### Phase 4: Implementation

**Only after completing phases 1-3:**

1. **Design Fix Based on Root Cause**
   - Address the actual problem, not symptoms
   - Consider side effects and interactions
   - Plan for failure cases

2. **Implement Minimal Fix**
   - Change only what's necessary
   - Don't over-engineer
   - Test thoroughly

3. **Verify Fix Works**
   - Reproduce original failure
   - Confirm fix resolves it
   - Test edge cases

## Common Debugging Mistakes

**❌ Skipping Phase 1:**
- "Let me try this quick fix"
- Result: Hidden bugs, regression issues

**❌ Guessing at root cause:**
- "It's probably a timing issue"
- Result: Wrong fixes, wasted time

**❌ Fixing symptoms:**
- "If I just add a delay here..."
- Result: Fragile solutions, new bugs

**✅ Following systematic approach:**
- Evidence gathering first
- Hypothesis testing
- Minimal fix based on understanding

## Debugging Tools

**Essential Commands:**
```bash
# Git investigation
git log --oneline -10
git diff HEAD~1..HEAD
git blame <file>

# Environment debugging
env | sort
echo $PATH
which <command>

# Process debugging
ps aux | grep <process>
lsof -p <pid>
strace -p <pid>  # Linux
dtruss -p <pid>  # macOS

# Network debugging
curl -v <url>
netstat -an | grep <port>
ss -tulpn | grep <port>

# Log analysis
tail -f <logfile>
grep -n "ERROR" <logfile>
awk '/ERROR/ {print NR, $0}' <logfile>
```

## Usage Examples

**Complex production bug:**
`/systematic-debugging "API returns 500 errors intermittently"`

**Failing test suite:**
`/systematic-debugging "integration tests timing out in CI"`

**Build failures:**
`/systematic-debugging "npm install fails with dependency conflicts"`

**Performance issue:**
`/systematic-debugging "database queries taking 30+ seconds"`

Remember: The time spent on systematic debugging saves 10x the time in rework and maintenance.
