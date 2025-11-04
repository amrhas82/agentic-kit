---
description: Replace arbitrary timeouts with condition polling to eliminate flaky tests from timing guesses
argument-hint: <condition-to-wait-for>
---

**Core principle:** Wait for the actual condition you care about, not a guess about how long it takes.

## When to Use

**Use when:**
- Tests have arbitrary delays (`setTimeout`, `sleep`, `time.sleep()`)
- Tests are flaky (pass sometimes, fail under load)
- Tests timeout when run in parallel
- Waiting for async operations to complete

**Don't use when:**
- Testing actual timing behavior (debounce, throttle intervals)
- Always document WHY if using arbitrary timeout

## Quick Patterns

Replace timing guesses with condition polling:

```typescript
// ❌ BEFORE: Guessing at timing
await new Promise(r => setTimeout(r, 50));
const result = getResult();
expect(result).toBeDefined();

// ✅ AFTER: Waiting for condition  
await waitFor(() => getResult() !== undefined);
const result = getResult();
expect(result).toBeDefined();
```

**Common scenarios:**
- Wait for event: `waitFor(() => events.find(e => e.type === 'DONE'))`
- Wait for state: `waitFor(() => machine.state === 'ready')`
- Wait for count: `waitFor(() => items.length >= 5)`
- Wait for file: `waitFor(() => fs.existsSync(path))`
- Complex condition: `waitFor(() => obj.ready && obj.value > 10)`

## Implementation

```typescript
async function waitFor<T>(
  condition: () => T | undefined | null | false,
  description: string,
  timeoutMs = 5000
): Promise<T> {
  const startTime = Date.now();

  while (true) {
    const result = condition();
    if (result) return result;

    if (Date.now() - startTime > timeoutMs) {
      throw new Error(`Timeout waiting for ${description} after ${timeoutMs}ms`);
    }

    await new Promise(r => setTimeout(r, 10)); // Poll every 10ms
  }
}

// Domain-specific helpers
async function waitForEvent(eventManager: any, eventType: string) {
  return waitFor(() => 
    eventManager.events.find((e: any) => e.type === eventType),
    `event ${eventType}`
  );
}

async function waitForEventCount(eventManager: any, eventType: string, count: number) {
  return waitFor(() => 
    eventManager.events.filter((e: any) => e.type === eventType).length >= count,
    `${count} events of type ${eventType}`
  );
}

async function waitForEventMatch(eventManager: any, eventType: string, matcher: any) {
  return waitFor(() => 
    eventManager.events.find((e: any) => e.type === eventType && matcher(e)),
    `event ${eventType} matching criteria`
  );
}
```

## Common Mistakes to Avoid

**❌ Polling too fast:** `setTimeout(check, 1)` - wastes CPU
**✅ Fix:** Poll every 10ms

**❌ No timeout:** Loop forever if condition never met
**✅ Fix:** Always include timeout with clear error

**❌ Stale data:** Cache state before loop
**✅ Fix:** Call getter inside loop for fresh data

## When Arbitrary Timeout IS Correct

```typescript
// Tool ticks every 100ms - need 2 ticks to verify partial output
await waitForEvent(manager, 'TOOL_STARTED'); // First: wait for condition
await new Promise(r => setTimeout(r, 200));   // Then: wait for timed behavior
// 200ms = 2 ticks at 100ms intervals - documented and justified
```

**Requirements:**
1. First wait for triggering condition
2. Based on known timing (not guessing)
3. Comment explaining WHY

## Real-World Impact

**Benefits:**
- Fixed 15 flaky tests across multiple files
- Pass rate: 60% → 100%
- Execution time: 40% faster  
- No more race conditions

## Usage Examples

**Wait for async operation:**
`/condition-based-waiting "database connection established"`

**Wait for UI state:**
`/condition-based-waiting "login button enabled"`

**Wait for file changes:**
`/condition-based-waiting "build output file created"`

**Complex condition:**
`/condition-based-waiting "user authenticated AND profile loaded"`
