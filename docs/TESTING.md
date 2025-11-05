# Testing Documentation

Comprehensive testing guide for the Agentic Kit Interactive Multi-Tool Installer.

## Table of Contents

1. [Overview](#overview)
2. [Test Suites](#test-suites)
3. [Running Tests](#running-tests)
4. [Test Reports](#test-reports)
5. [CI/CD Integration](#cicd-integration)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The Agentic Kit installer includes a comprehensive test suite covering:
- ✅ Variant installation (Lite, Standard, Pro)
- ✅ Multi-tool installations (Claude, Opencode, Ampcode, Droid)
- ✅ Error handling and rollback
- ✅ Path validation and expansion
- ✅ Cross-platform compatibility (Linux tested, macOS/Windows documented)

**Total Test Coverage**: 348 tests with 99.1% pass rate

---

## Test Suites

### 1. Variant Testing (92 tests)

**File**: `tests/installer/variant-testing.test.js`

**Purpose**: Tests all variants (Lite, Standard, Pro) for all 4 tools (Claude, Opencode, Ampcode, Droid)

**Coverage**:
- Component count verification (agents, skills, resources, hooks)
- Manifest generation and validation
- File structure verification
- Cleanup and isolation

**Run individually**:
```bash
node tests/installer/variant-testing.test.js
```

**Expected Results**:
- LITE: 4 agents, 7 skills, 6 resources, 2 hooks
- STANDARD: 9 agents, 11 skills, 6 resources, 2 hooks
- PRO: 13 agents, 22 skills, 6 resources, 2 hooks

---

### 2. Multi-Tool Installation (78 tests)

**File**: `tests/installer/multi-tool-testing.test.js`

**Purpose**: Tests simultaneous installation of multiple tools

**Coverage**:
- 2-tool combinations (Claude + Opencode)
- 4-tool combinations (all tools simultaneously)
- Mixed variants (Claude Standard + Droid Pro)
- Tool isolation (no file conflicts)
- Correct paths for each tool
- Individual manifest per tool

**Run individually**:
```bash
node tests/installer/multi-tool-testing.test.js
```

**Test Scenarios**:
1. Claude + Opencode (Standard)
2. All 4 tools (Standard)
3. Claude Standard + Droid Pro (mixed)
4. All 4 tools (mixed variants)
5. All 4 tools (Lite)
6. All 4 tools (Pro)

---

### 3. Error Scenario Testing (36 tests)

**File**: `tests/installer/error-scenario-testing.test.js`

**Purpose**: Tests error handling, validation, and rollback

**Coverage**:
- Corrupted variants.json parsing
- Missing package files detection
- Permission denied handling
- Partial installation rollback
- Disk space validation
- Path security (traversal prevention)
- Interrupted installation recovery

**Run individually**:
```bash
node tests/installer/error-scenario-testing.test.js
```

**Known Limitations**:
- 1 expected failure: Permission denied test (running as root bypasses read-only)

---

### 4. Path Handling Testing (76 tests)

**File**: `tests/installer/path-handling-testing.test.js`

**Purpose**: Tests path validation, expansion, conversion, and edge cases

**Coverage**:
- Tilde expansion (`~` to home directory)
- Custom path validation
- Relative to absolute path conversion
- Paths with spaces
- Paths with special characters
- Existing installation overwrite with backup
- Permission validation

**Run individually**:
```bash
node tests/installer/path-handling-testing.test.js
```

**Features Tested**:
- `~/.agentic-kit` → `/home/user/.agentic-kit`
- `./local` → `/current/directory/local`
- Path traversal prevention (`../../../etc/passwd` rejected)
- Unicode support (émoji, 中文, العربية)
- Backup creation with timestamp
- Rollback capability

---

### 5. Cross-Platform Testing (66 tests)

**File**: `tests/installer/cross-platform-testing.test.js`

**Purpose**: Tests platform-specific behaviors and compatibility

**Coverage (Linux)**:
- Path handling (forward slashes, case-sensitive)
- File operations (symlinks, hard links, hidden files)
- Permissions (chmod, read/write checks)
- ANSI color codes (8 colors, 4 backgrounds, 4 styles)
- Progress bar rendering (block characters, spinner)
- Terminal compatibility (dimensions, cursor codes)

**Run individually**:
```bash
node tests/installer/cross-platform-testing.test.js
```

**Platforms**:
- ✅ **Linux**: Fully tested (66 tests, 97% pass rate)
- 📝 **macOS**: Requirements documented
- 📝 **Windows**: Requirements documented

**Known Limitations**:
- 2 expected failures: TERM not set, stdout not TTY (Docker/CI environment)

---

## Running Tests

### Run All Tests

Execute the unified test runner:

```bash
npm test
```

or

```bash
node tests/run-all-tests.js
```

**Output**:
- Console output with color-coded results
- JSON report: `test-report.json`
- Markdown report: `TEST_REPORT.md`

**Expected Duration**: ~6-7 seconds

**Expected Results**:
```
Total Tests:   348
Passed:        345 (99.1%)
Failed:        3 (expected failures in Docker/CI)
```

### Run Individual Test Suite

```bash
# Variant testing
node tests/installer/variant-testing.test.js

# Multi-tool testing
node tests/installer/multi-tool-testing.test.js

# Error scenario testing
node tests/installer/error-scenario-testing.test.js

# Path handling testing
node tests/installer/path-handling-testing.test.js

# Cross-platform testing
node tests/installer/cross-platform-testing.test.js
```

### Run Specific Tests

Each test file can be run independently. They are self-contained with their own result tracking.

---

## Test Reports

### JSON Report (`test-report.json`)

Machine-readable format for CI/CD integration:

```json
{
  "timestamp": "2025-11-05T09:39:11.895Z",
  "summary": {
    "totalTests": 348,
    "totalPassed": 345,
    "totalFailed": 3,
    "passRate": "99.1",
    "duration": 6381
  },
  "suites": [...]
}
```

**Use Cases**:
- CI/CD parsing
- Automated reporting
- Trend analysis
- Quality gates

### Markdown Report (`TEST_REPORT.md`)

Human-readable format with tables and formatting:

- Summary table
- Per-suite breakdown
- Pass/fail indicators
- Duration metrics
- Final status

**Use Cases**:
- Pull request comments
- Documentation
- Team sharing
- Status updates

### Console Output

Real-time colored output with:
- Suite-by-suite progress
- Individual test results
- Summary statistics
- Visual indicators (✓, ✗, ⚠️)

---

## CI/CD Integration

### GitHub Actions

**Example `.github/workflows/test.yml`**:

```yaml
name: Test Installer

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: test-report
          path: |
            test-report.json
            TEST_REPORT.md
```

### Exit Codes

The test runner exits with appropriate codes for CI/CD:
- `0`: All tests passed
- `1`: One or more tests failed

### Quality Gates

Recommended quality gates:
- **Minimum Pass Rate**: 95%
- **Maximum Duration**: 30 seconds
- **Critical Failures**: 0 (non-Docker environment)

---

## Troubleshooting

### Common Issues

#### 1. Permission Denied Tests Fail

**Symptom**: Permission denied test shows unexpected pass/fail

**Cause**: Running as root user (Docker, CI)

**Solution**: Expected behavior. Root can bypass read-only permissions.

**Impact**: None - installer works correctly

---

#### 2. TERM Environment Variable Not Set

**Symptom**: Terminal compatibility tests fail

**Cause**: Docker/CI environment without TTY

**Solution**: Expected behavior in non-interactive environments

**Impact**: None - installer detects and adapts

---

#### 3. Tests Run Slowly

**Symptom**: Tests take longer than expected

**Possible Causes**:
- Slow file system
- Resource constraints
- Network issues (shouldn't happen - all local)

**Solution**:
- Check system resources
- Run individual suites to isolate
- Verify no background processes

**Expected Duration**: 6-7 seconds for all tests

---

#### 4. Temp Directory Cleanup Failures

**Symptom**: Temp directories not cleaned up

**Possible Causes**:
- Permission issues
- Open file handles
- Interrupted tests

**Solution**:
```bash
# Manual cleanup
rm -rf /tmp/agentic-kit-test-*
rm -rf /tmp/variant-test-*
rm -rf /tmp/multi-tool-test-*
rm -rf /tmp/error-test-*
rm -rf /tmp/path-test-*
rm -rf /tmp/cross-platform-*
```

---

#### 5. File Count Mismatches

**Symptom**: Variant tests fail with incorrect counts

**Cause**: Variant configuration changed

**Solution**:
1. Check `packages/*/variants.json`
2. Update expected counts in test files
3. Verify package structure matches configuration

**Expected Counts**:
- LITE: 4 agents, 7 skills
- STANDARD: 9 agents, 11 skills
- PRO: 13 agents, 22 skills

---

## Test Fixtures

### Location

`tests/fixtures/`

### Contents

- **variants/**: Sample variants.json files (lite, standard, pro, corrupted, minimal)
- **packages/**: Mock package structures with complete file hierarchies
- **manifests/**: Template manifest files
- **helpers/**: Test utility functions (18 helpers)

### Using Fixtures

```javascript
const { createTempDir, removeDirRecursive, loadJsonFixture } =
  require('./fixtures/helpers/test-helpers');

// Create temp directory
const testDir = createTempDir('my-test-');

// Load fixture
const variants = loadJsonFixture('variants/variants-standard.json');

// Cleanup
removeDirRecursive(testDir);
```

See `tests/fixtures/README.md` for complete documentation.

---

## Writing New Tests

### Template

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createTempDir, removeDirRecursive } =
  require('../fixtures/helpers/test-helpers');

// Test results tracker
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function logTest(testName, passed, message = '') {
  const status = passed ? '✓' : '✗';
  const color = passed ? '\x1b[32m' : '\x1b[31m';
  console.log(`${color}${status}\x1b[0m ${testName}${message ? ': ' + message : ''}`);

  results.tests.push({ name: testName, passed, message });
  if (passed) {
    results.passed++;
  } else {
    results.failed++;
  }
}

function testMyFeature() {
  const testDir = createTempDir('my-test-');

  try {
    // Test code here
    logTest('My test', true, 'Success message');

    removeDirRecursive(testDir);
  } catch (error) {
    logTest('My test', false, error.message);
    if (fs.existsSync(testDir)) removeDirRecursive(testDir);
  }
}

function runAllTests() {
  console.log('Running My Test Suite...\n');

  testMyFeature();

  // Print summary
  const total = results.passed + results.failed;
  console.log(`\nTotal: ${total} | Passed: ${results.passed} | Failed: ${results.failed}`);

  process.exit(results.failed > 0 ? 1 : 0);
}

if (require.main === module) {
  runAllTests();
}

module.exports = { testMyFeature, runAllTests };
```

### Best Practices

1. **Use Temp Directories**: Always create unique temp dirs for test isolation
2. **Always Cleanup**: Use try/catch to ensure cleanup runs
3. **Clear Test Names**: Make test names descriptive and specific
4. **Exit Codes**: Exit with 1 on failure, 0 on success
5. **Color Coding**: Use ANSI colors for better readability
6. **Fixtures**: Reuse fixtures instead of creating test data
7. **Isolation**: Don't depend on other tests or external state
8. **Documentation**: Document expected behavior and limitations

---

## Performance Benchmarks

Based on actual test runs:

| Test Suite | Tests | Duration | Avg per Test |
|------------|-------|----------|--------------|
| Variant Testing | 92 | 2.3s | 25ms |
| Multi-Tool Installation | 78 | 3.8s | 48ms |
| Error Scenario Testing | 36 | 0.2s | 6ms |
| Path Handling Testing | 76 | 0.1s | 1ms |
| Cross-Platform Testing | 66 | 0.1s | 2ms |
| **Total** | **348** | **6.4s** | **18ms** |

**Target**: All tests should complete in < 10 seconds

---

## Continuous Improvement

### Adding New Tests

When adding new features:

1. **Write tests first** (TDD approach)
2. **Add to appropriate test suite** or create new one
3. **Update expected counts** in unified test runner
4. **Document in this file**
5. **Run all tests** to ensure no regression
6. **Update reports** and documentation

### Reviewing Test Coverage

Periodically review:
- [ ] Are all features tested?
- [ ] Are error paths covered?
- [ ] Are edge cases handled?
- [ ] Are platform differences documented?
- [ ] Are tests fast enough?
- [ ] Are tests reliable (no flakiness)?

---

## Support

For questions or issues:

1. Check this documentation
2. Review test output and reports
3. Check fixture documentation (`tests/fixtures/README.md`)
4. Review individual test files for examples
5. Open an issue on GitHub

---

**Last Updated**: 2025-11-05
**Test Suite Version**: 1.2.0
**Coverage**: 348 tests, 99.1% pass rate
