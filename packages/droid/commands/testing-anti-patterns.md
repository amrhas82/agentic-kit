---
description: Avoid testing anti-patterns - never test mock behavior, add test-only methods, or mock without understanding
argument-hint: <test-anti-pattern-to-avoid>
---

**Core principle:** Test what the code does, not what the mocks do.

## The Iron Laws

```
1. NEVER test mock behavior
2. NEVER add test-only methods to production classes  
3. NEVER mock without understanding dependencies
```

## Anti-Pattern 1: Testing Mock Behavior

**❌ WRONG: Testing that the mock exists**
```typescript
test('renders sidebar', () => {
  render(<Page />);
  expect(screen.getByTestId('sidebar-mock')).toBeInTheDocument();
});
```

**Why this is wrong:**
- You're verifying the mock works, not that the component works
- Test passes when mock is present, fails when it's not
- Tells you nothing about real behavior

**✅ CORRECT: Test real component behavior**
```typescript
test('renders sidebar', () => {
  render(<Page />);  // Don't mock sidebar
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

// OR if sidebar must be mocked for isolation:
// Don't assert on the mock - test Page's behavior with sidebar present
```

### Gate Function
```
BEFORE asserting on any mock element:
  Ask: "Am I testing real component behavior or just mock existence?"

  IF testing mock existence:
    STOP - Delete the assertion or unmock the component

  Test real behavior instead
```

## Anti-Pattern 2: Test-Only Methods in Production

**❌ WRONG: Production class polluted with test-only code**
```typescript
class Session {
  async destroy() {  // Only used in tests
    await this._workspaceManager?.destroyWorkspace(this.id);
  }
}

// In tests
afterEach(() => session.destroy());
```

**Why this is wrong:**
- Production class polluted with test-only code
- Dangerous if accidentally called in production
- Violates YAGNI and separation of concerns
- Confuses object lifecycle with entity lifecycle

**✅ CORRECT: Test utilities handle test cleanup**
```typescript
// Session has no destroy() - it's stateless in production

// In test-utils/
export async function cleanupSession(session: Session) {
  const workspace = session.getWorkspaceInfo();
  if (workspace) {
    await workspaceManager.destroyWorkspace(workspace.id);
  }
}

// In tests
afterEach(() => cleanupSession(session));
```

### Gate Function
```
BEFORE adding any method to production class:
  Ask: "Is this only used by tests?"

  IF yes:
    STOP - Don't add it
    Put it in test utilities instead
```

## Anti-Pattern 3: Mocking Without Understanding

**❌ WRONG: Mock breaks test logic**
```typescript
test('detects duplicate server', () => {
  vi.mock('ToolCatalog', () => ({
    discoverAndCacheTools: vi.fn().mockResolvedValue(undefined)
  }));

  await addServer(config);
  await addServer(config);  // Should throw - but won't!
});
```

**Why this is wrong:**
- Mocked method had side effect test depended on (writing config)
- Over-mocking to "be safe" breaks actual behavior
- Test passes for wrong reason or fails mysteriously

**✅ CORRECT: Mock at correct level**
```typescript
test('detects duplicate server', () => {
  // Mock the slow part, preserve behavior test needs
  vi.mock('MCPServerManager'); // Just mock slow server startup

  await addServer(config);  // Config written
  await addServer(config);  // Duplicate detected ✓
});
```

### Gate Function
```
BEFORE mocking any method:
  STOP - Don't mock yet

  1. Ask: "What side effects does the real method have?"
  2. Ask: "Does this test depend on any of those side effects?"
  3. Ask: "Do I fully understand what this test needs?"

  IF depends on side effects:
    Mock at lower level (the actual slow/external operation)
    OR use test doubles that preserve necessary behavior
    NOT the high-level method the test depends on

  Red flags:
    - "I'll mock this to be safe"
    - "This might be slow, better mock it"
    - Mocking without understanding the dependency chain
```

## Anti-Pattern 4: Incomplete Mocks

**❌ WRONG: Partial mock structure**
```typescript
const mockResponse = {
  status: 'success',
  data: { userId: '123', name: 'Alice' }
  // Missing: metadata that downstream code uses
};

// Later: breaks when code accesses response.metadata.requestId
```

**Why this is wrong:**
- Partial mocks hide structural assumptions
- Downstream code may depend on fields you didn't include
- Tests pass but integration fails
- False confidence about real behavior

**✅ CORRECT: Mock complete data structures**
```typescript
// Mock the COMPLETE data structure as it exists in reality
const mockResponse = {
  status: 'success',
  data: { userId: '123', name: 'Alice' },
  metadata: { requestId: 'req-456', timestamp: '2024-01-01' },
  headers: { 'content-type': 'application/json' }
};
```

## Anti-Pattern 5: Over-Mocking

**❌ WRONG: Everything is mocked**
```typescript
test('saves user', () => {
  const mockUser = { id: '1', name: 'John' };
  const mockDb = { save: vi.fn().mockResolvedValue(mockUser) };
  
  vi.mocked(userService.save).mockResolvedValue(mockUser);
  vi.mocked(db.save).mockResolvedValue(mockUser);
  vi.mocked(cache.set).mockResolvedValue();
  
  const result = await saveUser(mockUser);
  expect(result).toBe(mockUser);
});
```

**Why this is wrong:**
- Testing mock behavior, not real behavior
- No integration verification
- Easy to pass incorrect implementation

**✅ CORRECT: Mock only what you must**
```typescript
test('saves user', async () => {
  const mockUser = { id: '1', name: 'John' };
  
  // Only mock the external dependency (database)
  vi.mocked(db.save).mockResolvedValue(mockUser);
  
  const result = await saveUser(mockUser);
  expect(result).toEqual(mockUser);
  // Real business logic tested, only DB isolated
});
```

## Prevention Guidelines

**When writing tests:**
- Test behavior, not implementation
- Mock at the right level
- Understand dependencies before mocking
- Use real implementations where possible

**When adding test utilities:**
- Keep test-only code in test utilities
- Don't pollute production classes
- Separate test concerns from production logic

**When mocking:**
- Understand what the mock does in reality
- Preserve necessary side effects
- Mock complete data structures
- Mock at the lowest level possible

## Usage Examples

**Before writing test:**
`/testing-anti-patterns "writing integration test for user service"`

**Before adding mock:**
`/testing-anti-patterns "mocking external API call"`

**Before adding test utility:**
`/testing-anti-patterns "creating test cleanup helper"`

**When refactoring tests:**
`/testing-anti-patterns "refactoring mock-heavy test suite"`

Remember: Following strict TDD prevents these anti-patterns naturally.
