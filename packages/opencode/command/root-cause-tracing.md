---
description: Systematically trace bugs backward through call stack to find original trigger, never just fix symptoms
argument-hint: <error-or-bug-to-trace>
---

**Core principle:** Trace backward through the call chain until you find the original trigger, then fix at the source.

## When to Use

**Use when:**
- Error happens deep in execution (not at entry point)
- Stack trace shows long call chain
- Unclear where invalid data originated
- Need to find which test/code triggers the problem

**Don't fix symptoms:** Find the root cause that created the conditions for the bug.

## The Tracing Process

### 1. Observe the Symptom
```
Error: git init failed in /Users/jesse/project/packages/core
```

### 2. Find Immediate Cause
**What code directly causes this?**
```typescript
await execFileAsync('git', ['init'], { cwd: projectDir });
```

### 3. Ask: What Called This?
```typescript
WorktreeManager.createSessionWorktree(projectDir, sessionId)
  → called by Session.initializeWorkspace()
  → called by Session.create()
  → called by test at Project.create()
```

### 4. Keep Tracing Up
**What value was passed?**
- `projectDir = ''` (empty string!)
- Empty string as `cwd` resolves to `process.cwd()`
- That's the source code directory!

### 5. Find Original Trigger
**Where did empty string come from?**
```typescript
const context = setupCoreTest(); // Returns { tempDir: '' }
Project.create('name', context.tempDir); // Accessed before beforeEach!
```

## Adding Stack Traces

When manual tracing isn't enough, add instrumentation:

```typescript
// Before the problematic operation
async function gitInit(directory: string) {
  const stack = new Error().stack;
  console.error('DEBUG git init:', {
    directory,
    cwd: process.cwd(),
    nodeEnv: process.env.NODE_ENV,
    stack,
  });

  await execFileAsync('git', ['init'], { cwd: directory });
}
```

**Critical:** Use `console.error()` in tests (not logger - may not show)

**Run and capture:**
```bash
npm test 2>&1 | grep 'DEBUG git init'
```

## Finding Which Test Causes Pollution

If something appears during tests but you don't know which test:

**Use bisection approach:**
```bash
# Run tests one by one until you find the polluter
./find-polluter.sh '.git' 'src/**/*.test.ts'
```

**Manual approach:**
```bash
# Add logging to find the culprit
echo "DEBUG: About to run operation" >&2
npm test 2>&1 | grep -A5 -B5 "DEBUG:"
```

## Key Principles

### The Golden Rule
```
NEVER fix just where the error appears.
Trace back to find the original trigger.
```

### Layered Defense
```
1. Find immediate cause
2. Trace backward to source  
3. Fix at source
4. Add validation at each layer
5. Bug becomes impossible
```

## Real Example: Empty projectDir

**Symptom:** `.git` created in `packages/core/` (source code)

**Trace chain:**
1. `git init` runs in `process.cwd()` ← empty cwd parameter
2. WorktreeManager called with empty projectDir
3. Session.create() passed empty string
4. Test accessed `context.tempDir` before beforeEach
5. setupCoreTest() returns `{ tempDir: '' }` initially

**Root cause:** Top-level variable initialization accessing empty value

**Fix:** Made tempDir a getter that throws if accessed before beforeEach

**Defense-in-depth added:**
- Layer 1: Project.create() validates directory
- Layer 2: WorkspaceManager validates not empty
- Layer 3: NODE_ENV guard refuses git init outside tmpdir
- Layer 4: Stack trace logging before git init

## Stack Trace Tips

**In tests:** Use `console.error()` not logger - logger may be suppressed
**Before operation:** Log before the dangerous operation, not after it fails
**Include context:** Directory, cwd, environment variables, timestamps
**Capture stack:** `new Error().stack` shows complete call chain

## Common Tracing Patterns

### Long Call Chains
```typescript
// Entry point
await performOperation(input);

// Deep in stack
async function performOperation(input) {
  await validateInput(input);     // Layer 1
  await processData(input);       // Layer 2  
  await persistResults(input);    // Layer 3
  await notifyCompletion(input);  // Layer 4 - ERROR HERE
}

// Trace backward:
// notifyCompletion → persistResults → processData → validateInput → performOperation
// Find where invalid input originated
```

### Data Flow Issues
```typescript
// Error: null pointer in deep function
function deepFunction(obj) {
  obj.property.method(); // obj is null
}

// Trace:
// Where did obj come from?
// What called deepFunction?
// What should obj contain?
// Where was it created/modified?
```

### Test Pollution
```typescript
// Side effect in one test affects others
test('test A', () => {
  createFile('test.txt'); // Leaves file behind
});

test('test B', () => {
  readFile('test.txt'); // Fails because test A didn't clean up
});

// Use find-polluter.sh to identify test A
```

## Usage Examples

**Complex error:**
`/root-cause-tracing "database connection fails after API call"`

**Test pollution:**
`/root-cause-tracing "filesystem pollution during test suite"`

**Deep stack error:**
`/root-cause-tracing "TypeError in third-party library deep call chain"`

**Data corruption:**
`/root-cause-tracing "user data corrupted in final processing step"`

## Real-World Impact

**Benefits:**
- Fixed root cause through 5-level trace
- Fixed at source (getter validation)  
- Added 4 layers of defense
- 1847 tests passed, zero pollution
- Prevented future occurrences through validation

Remember: Symptoms are clues, not the problem. Always trace backward to find and fix the source.
