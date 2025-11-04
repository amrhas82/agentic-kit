---
description: Evidence before claims - verify work completion with fresh verification commands
argument-hint: <work-claiming-to-complete>
---

**Core principle:** Evidence before claims, always.

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE
```

If you haven't run the verification command in this message, you cannot claim it passes.

## The Gate Function

```
BEFORE claiming any status or expressing satisfaction:

1. IDENTIFY: What command proves this claim?
2. RUN: Execute the FULL command (fresh, complete)
3. READ: Full output, check exit code, count failures
4. VERIFY: Does output confirm the claim?
   - If NO: State actual status with evidence
   - If YES: State claim WITH evidence
5. ONLY THEN: Make the claim

Skip any step = lying, not verifying
```

## Common Claims & Verification

| Claim | Requires Verification | Not Sufficient |
|-------|----------------------|----------------|
| Tests pass | `npm test` output: 0 failures | "Previously passed" |
| Linter clean | ESLint output: 0 errors | "Should be clean" |
| Build succeeds | Build command: exit 0 | "Linter passed" |
| Bug fixed | Test original symptom: passes | "Code changed" |
| Regression test works | Red-green cycle verified | "Test passes" |
| Requirements met | Line-by-line checklist completion | "Tests pass" |

## Key Verification Patterns

### Test Verification
```bash
# ✅ CORRECT
npm test
# See: "34/34 tests passing"
"All tests pass"

# ❌ WRONG  
"Should pass now"
"Looks correct"
```

### Build Verification
```bash
# ✅ CORRECT  
npm run build
# See: exit code 0
"Build succeeds"

# ❌ WRONG
"Looks good"  
"Linter was clean"
```

### Bug Fix Verification
```bash
# ✅ CORRECT
# Re-create original bug scenario
# See: bug no longer occurs
"Bug fixed: original error no longer reproduces"

# ❌ WRONG
"Made the changes"
"Code looks right"
```

### Regression Test (TDD Red-Green)
```bash
# ✅ CORRECT
# Step 1: Write failing test
# Step 2: Run test (must fail)
# Step 3: Write minimal fix
# Step 4: Run test (must pass) 
# Step 5: Revert fix → Run (must fail)
# Step 6: Restore fix → Run (must pass)
"Red-green cycle verified"
```

### Requirements Verification
```bash
# ✅ CORRECT
# Re-read requirements
# Create verification checklist
# Check each requirement against implementation
# Report completion or gaps

"Requirements verification complete:"
"✅ Feature A implemented"
"✅ Feature B implemented"  
"❌ Feature C incomplete"
```

## Red Flags - STOP

- Using "should", "probably", "seems to"
- Expressing satisfaction before verification ("Great!", "Perfect!", "Done!")
- About to commit/push/PR without verification
- Trusting agent success reports
- Relying on partial verification
- **ANY wording implying success without verification**

## Rationalization Prevention

| Excuse | Reality |
|--------|---------|
| "Should work now" | RUN the verification |
| "I'm confident" | Confidence ≠ evidence |
| "Just this once" | No exceptions |
| "Linter passed" | Linter ≠ compiler |
| "Agent said success" | Verify independently |
| "I'm tired" | Exhaustion ≠ excuse |
| "Partial check is enough" | Partial proves nothing |

## Usage Examples

**Before claiming tests pass:**
`/verification-before-completion "all unit tests passing"`

**Before claiming build succeeds:**
`/verification-before-completion "production build working"`

**Before claiming bug fixed:**
`/verification-before-completion "original error resolved"`

**Before claiming requirements met:**
`/verification-before-completion "feature specification fulfilled"`

**Before committing code:**
`/verification-before-completion "ready for commit"`

## The Bottom Line

**No shortcuts for verification.**

Run the command. Read the output. THEN claim the result.

This prevents false completion claims and maintains trust through evidence-based reporting.
