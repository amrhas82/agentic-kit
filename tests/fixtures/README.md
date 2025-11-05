# Test Fixtures

This directory contains test fixtures for the Agentic Kit installer test suite.

## Directory Structure

```
tests/fixtures/
├── variants/           # Sample variants.json files
├── packages/           # Mock package structures
├── manifests/          # Mock manifest templates
├── helpers/            # Test helper utilities
└── README.md           # This file
```

## Fixtures Overview

### 1. Variants (`variants/`)

Sample `variants.json` files for testing different scenarios:

#### `variants-lite.json`
- **Purpose**: Test Lite variant installation
- **Contents**: 3 agents, 0 skills, 6 resources, 2 hooks
- **Use Case**: Minimal installation testing

#### `variants-standard.json`
- **Purpose**: Test Standard variant installation
- **Contents**: 13 agents, 8 skills, 6 resources, 2 hooks
- **Use Case**: Standard installation testing, most common variant

#### `variants-pro.json`
- **Purpose**: Test Pro variant installation
- **Contents**: 13 agents, 22 skills, 6 resources, 2 hooks
- **Use Case**: Full installation testing with all features

#### `variants-corrupted.json`
- **Purpose**: Test error handling for malformed JSON
- **Contents**: Intentionally malformed JSON (missing closing brackets)
- **Use Case**: Error scenario testing, validation testing

#### `variants-minimal.json`
- **Purpose**: Minimal valid variants.json for basic tests
- **Contents**: Single Lite variant with 1 agent, 0 skills, 1 resource, 1 hook
- **Use Case**: Quick tests, edge case testing

### 2. Packages (`packages/`)

Mock package structures that simulate real agentic-kit packages:

#### `mock-package/`
A complete test package with all required components:

```
mock-package/
├── agents/
│   └── test-agent.md
├── skills/
│   └── test-skill/
│       └── skill.md
├── resources/
│   └── test-resource.txt
├── hooks/
│   └── test-hook.js
└── variants.json
```

**Purpose**:
- Test installation engine file copying
- Test directory structure creation
- Test multi-variant installations

**Components**:
- **agents/**: Contains `test-agent.md` - sample agent file
- **skills/**: Contains `test-skill/` directory with `skill.md`
- **resources/**: Contains `test-resource.txt` - sample resource file
- **hooks/**: Contains `test-hook.js` - sample hook with shebang
- **variants.json**: Defines Lite, Standard, and Pro variants

### 3. Manifests (`manifests/`)

Mock manifest files that represent installed packages:

#### `manifest-lite.json`
- **Tool**: claude
- **Variant**: lite
- **Components**: 3 agents, 0 skills, 6 resources, 2 hooks
- **Use Case**: Verify Lite installation produces correct manifest

#### `manifest-standard.json`
- **Tool**: claude
- **Variant**: standard
- **Components**: 13 agents, 8 skills, 6 resources, 2 hooks
- **Use Case**: Verify Standard installation produces correct manifest

#### `manifest-pro.json`
- **Tool**: claude
- **Variant**: pro
- **Components**: 13 agents, 22 skills, 6 resources, 2 hooks
- **Use Case**: Verify Pro installation produces correct manifest

### 4. Helpers (`helpers/`)

Test utility functions for setting up and cleaning up test environments:

#### `test-helpers.js`

**Exported Functions**:

##### Directory Management
- `createTempDir(prefix)` - Create temporary test directory
- `copyDirRecursive(src, dest)` - Copy directory recursively
- `removeDirRecursive(dirPath)` - Remove directory and all contents

##### Test Environment Setup
- `createTestPackage(baseDir, options)` - Create mock package structure
  - Options: `agents`, `skills`, `resources`, `hooks` arrays
  - Returns: Object with paths to created directories

- `createTestEnvironment()` - Create complete test environment
  - Creates temp directory with tool subdirectories
  - Returns: `{ tempDir, toolsDir, toolPaths, cleanup }`

##### File Operations
- `createVariantsFile(filePath, variantsData)` - Write variants.json
- `createManifestFile(filePath, manifestData)` - Write manifest.json

##### Verification
- `verifyDirectoryStructure(baseDir, expected)` - Verify installation
  - Returns: `{ success: boolean, errors: string[] }`

- `countFiles(dirPath)` - Count files recursively
- `getDirectorySize(dirPath)` - Get total size in bytes

##### Fixture Loading
- `loadFixture(fixtureName)` - Load fixture file as string
- `loadJsonFixture(fixtureName)` - Load and parse JSON fixture

##### Assertions
- `assertEqual(actual, expected, message)` - Deep equality check
- `sleep(ms)` - Wait for specified duration

## Usage Examples

### Example 1: Basic Test Setup

```javascript
const { createTempDir, createTestPackage, removeDirRecursive } = require('./helpers/test-helpers');

// Create temporary test directory
const testDir = createTempDir('my-test-');

// Create mock package
createTestPackage(testDir, {
  agents: ['agent1.md', 'agent2.md'],
  skills: ['skill1', 'skill2'],
  resources: ['resource1.txt'],
  hooks: ['hook1.js']
});

// Run tests...

// Cleanup
removeDirRecursive(testDir);
```

### Example 2: Load and Use Variants

```javascript
const { loadJsonFixture } = require('./helpers/test-helpers');

// Load a variants.json fixture
const variants = loadJsonFixture('variants/variants-standard.json');

// Use in tests
const standardVariant = variants.variants.standard;
console.log(`Standard variant has ${standardVariant.agents.length} agents`);
```

### Example 3: Verify Installation

```javascript
const { verifyDirectoryStructure } = require('./helpers/test-helpers');

// Verify installation matches expected structure
const result = verifyDirectoryStructure('/path/to/installation', {
  agents: ['agent1.md', 'agent2.md'],
  skills: ['skill1', 'skill2'],
  resources: ['resource1.txt'],
  hooks: ['hook1.js']
});

if (!result.success) {
  console.error('Installation verification failed:', result.errors);
}
```

### Example 4: Create Complete Test Environment

```javascript
const { createTestEnvironment } = require('./helpers/test-helpers');

// Create complete multi-tool test environment
const env = createTestEnvironment();

// env.tempDir - base temporary directory
// env.toolsDir - directory containing all tools
// env.toolPaths - { claude: '...', opencode: '...', ampcode: '...', droid: '...' }

// Run tests...

// Cleanup everything
env.cleanup();
```

### Example 5: Test Error Scenarios

```javascript
const { loadFixture } = require('./helpers/test-helpers');

// Load corrupted variants.json for error testing
try {
  const content = loadFixture('variants/variants-corrupted.json');
  JSON.parse(content); // This should throw
} catch (error) {
  // Verify error handling works correctly
  console.log('Correctly caught JSON parse error');
}
```

## Test Scenarios Supported

### Installation Testing
- ✅ Lite variant installation
- ✅ Standard variant installation
- ✅ Pro variant installation
- ✅ Multi-tool installation
- ✅ Custom path installation

### Error Scenario Testing
- ✅ Corrupted variants.json
- ✅ Missing package files
- ✅ Permission denied
- ✅ Insufficient disk space (via mocking)
- ✅ Interrupted installation

### Verification Testing
- ✅ File count verification
- ✅ Directory structure verification
- ✅ Manifest correctness
- ✅ Component count validation

### Performance Testing
- ✅ Installation time measurement
- ✅ Directory size calculation
- ✅ File operation profiling

## Adding New Fixtures

To add new test fixtures:

1. **Create the fixture file** in the appropriate subdirectory:
   - `variants/` for new variants.json samples
   - `packages/` for new mock package structures
   - `manifests/` for new manifest templates

2. **Document the fixture** by adding a section to this README:
   - Describe its purpose
   - List its contents
   - Explain use cases

3. **Update test helpers** if new utility functions are needed

4. **Add tests** that use the new fixture in `tests/installer/`

## Fixture Maintenance

### Guidelines
- Keep fixtures minimal but representative
- Use realistic file names and structures
- Document all intentional errors or edge cases
- Update fixtures when package structure changes

### When to Update
- ✅ New variant added to agentic-kit
- ✅ Component structure changes (agents, skills, etc.)
- ✅ Manifest format changes
- ✅ New error scenarios discovered
- ✅ New testing requirements identified

## Related Files

- `tests/installer/integration.test.js` - Uses these fixtures for integration tests
- `tests/installer/package-manager.test.js` - Uses variants fixtures
- `tests/installer/installation-engine.test.js` - Uses package fixtures
- `installer/package-manager.js` - Reads variants.json (production)
- `installer/verification-system.js` - Validates installations (production)

## Notes

- All fixtures use **relative paths** from the fixtures directory
- Helper functions handle **absolute path resolution** automatically
- Cleanup functions are **safe** - they won't delete outside temp directories
- All test helpers are **synchronous** for simplicity
- Mock packages mirror **real agentic-kit structure** exactly

---

**Last Updated**: 2025-11-05
**Version**: 1.2.0
**Maintainer**: Agentic Kit Test Suite
