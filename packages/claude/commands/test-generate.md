---
description: Generate comprehensive tests
argument-hint: [file-to-test]
---
Generate tests for $ARGUMENTS.

## Include
- Happy path (expected usage)
- Edge cases (empty, null, boundaries)
- Error scenarios (invalid input, failures)
- Integration points (mocks for external deps)

## Requirements
- Match existing test patterns in this project
- Use the testing framework already in use
- Clear test names: "should [expected] when [condition]"
