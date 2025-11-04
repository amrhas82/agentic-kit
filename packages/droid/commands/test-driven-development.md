---
description: Write test first, watch it fail, write minimal code to pass - ensures tests actually verify behavior
argument-hint: <feature-or-behavior-to-test>
---

**Core principle:** If you didn't watch the test fail, you don't know if it tests the right thing.

## When to Use

**Always:**
- New features
- Bug fixes
- Refactoring
- Behavior changes

**Exceptions:**
- Throwaway prototypes
- Generated code
- Configuration files

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over.

**No exceptions:**
- Don't keep it as "reference"
- Don't "adapt" it while writing tests
- Delete means delete

## Red-Green-Refactor Cycle

### 1. RED - Write Failing Test

Write one minimal test showing what should happen:

```typescript
// ✅ GOOD: Clear name, tests real behavior
test('retries failed operations 3 times', async () => {
  let attempts = 0;
  const operation = () => {
    attempts++;
    if (attempts < 3) throw new Error('fail');
    return 'success';
  };

  const result = await retryOperation(operation);

  expect(result).toBe('success');
  expect(attempts).toBe(3);
});

// ❌ BAD: Vague name, tests mock not code
test('retry works', async () => {
  const mock = jest.fn()
    .mockRejectedValueOnce(new Error())
    .mockRejectedValueOnce(new Error())
    .mockResolvedValueOnce('success');
  await retryOperation(mock);
  expect(mock).toHaveBeenCalledTimes(3);
});
```

**Requirements:**
- One behavior per test
- Clear name describing behavior
- Real code (no mocks unless unavoidable)

### 2. Verify RED - Watch It Fail

**MANDATORY. Never skip.**

```bash
npm test path/to/test.test.ts
```

Confirm:
- Test fails (not errors)
- Failure message is expected
- Fails because feature missing (not typos)

**Test passes?** You're testing existing behavior. Fix test.

**Test errors?** Fix error, re-run until it fails correctly.

### 3. GREEN - Minimal Code

Write simplest code to pass the test:

```typescript
// ✅ GOOD: Just enough to pass
async function retryOperation<T>(fn: () => Promise<T>): Promise<T> {
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === 2) throw e;
    }
  }
  throw new Error('unreachable');
}

// ❌ BAD: Over-engineered
async function retryOperation<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    backoff?: 'linear' | 'exponential';
    onRetry?: (attempt: number) => void;
  }
): Promise<T> {
  // YAGNI - not needed for this test
}
```

Don't add features, refactor other code, or "improve" beyond the test.

### 4. Verify GREEN - Watch It Pass

**MANDATORY.**

```bash
npm test path/to/test.test.ts
```

Confirm:
- Test passes
- Other tests still pass
- Output pristine (no errors, warnings)

**Test fails?** Fix code, not test.

**Other tests fail?** Fix now.

### 5. REFACTOR - Clean Up

After green only:
- Remove duplication
- Improve names
- Extract helpers
- Maintain clear intent

Keep tests green. Don't add behavior.

### 6. Repeat

Next failing test for next feature.

## Good vs Bad Tests

| Aspect | Good Tests | Bad Tests |
|--------|------------|-----------|
| **Focus** | Behavior | Implementation |
| **Names** | Describe what happens | Describe what it does |
| **Structure** | Arrange-Act-Assert | Random order |
| **Isolation** | Independent, no shared state | Shared fixtures |
| **Speed** | Fast (<100ms) | Slow, flaky |

## Test Structure

```typescript
// Arrange - Set up test data
const input = { id: '123', name: 'Test' };

// Act - Execute the behavior
const result = await processUser(input);

// Assert - Verify the outcome
expect(result.id).toBe('123');
expect(result.processed).toBe(true);
expect(result.timestamp).toBeInstanceOf(Date);
```

## Common Patterns

### Testing Error Cases
```typescript
test('throws error for invalid input', async () => {
  const invalidInput = null;
  
  await expect(processUser(invalidInput))
    .rejects
    .toThrow('Invalid user data');
});
```

### Testing Async Operations
```typescript
test('saves user asynchronously', async () => {
  const user = { name: 'John' };
  
  const result = await saveUser(user);
  
  expect(result.id).toBeDefined();
  expect(database.save).toHaveBeenCalledWith(user);
});
```

### Testing Edge Cases
```typescript
test('handles empty array', () => {
  const result = processItems([]);
  
  expect(result).toEqual([]);
});

test('handles single item', () => {
  const result = processItems(['item']);
  
  expect(result).toHaveEqual(['processed-item']);
});
```

## Usage Examples

**Start new feature:**
`/test-driven-development "user authentication"`

**Fix existing bug:**
`/test-driven-development "database connection error handling"`

**Refactor code:**
`/test-driven-development "legacy auth module"`

**Behavior change:**
`/test-driven-development "password reset flow"`

Remember: TDD is a discipline. Every shortcut undermines the process.
