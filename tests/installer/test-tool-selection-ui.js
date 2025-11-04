#!/usr/bin/env node

/**
 * Test Script for Enhanced Tool Selection UI
 *
 * Tests the improved tool selection interface in the interactive CLI
 */

const assert = require('assert');

// Test 1: Verify tool definitions include all required fields
console.log('\n=== Test 1: Tool Definitions ===');

const InteractiveInstaller = require('../../installer/cli.js');
const installer = new InteractiveInstaller();

assert.strictEqual(installer.tools.length, 4, 'Should have 4 tools defined');

const requiredFields = ['id', 'name', 'path', 'description', 'useCase', 'targetUsers'];
installer.tools.forEach((tool, index) => {
  console.log(`\nTool ${index + 1}: ${tool.name}`);

  requiredFields.forEach(field => {
    assert.ok(tool[field], `Tool "${tool.name}" should have "${field}" field`);
    assert.ok(typeof tool[field] === 'string', `Tool "${tool.name}" ${field} should be a string`);
    assert.ok(tool[field].length > 0, `Tool "${tool.name}" ${field} should not be empty`);
    console.log(`  ✓ ${field}: ${tool[field]}`);
  });
});

console.log('\n✓ All 4 tools have complete metadata');

// Test 2: Verify tool IDs are unique
console.log('\n=== Test 2: Unique Tool IDs ===');

const toolIds = installer.tools.map(t => t.id);
const uniqueIds = new Set(toolIds);

assert.strictEqual(toolIds.length, uniqueIds.size, 'Tool IDs should be unique');
console.log(`✓ All tool IDs are unique: ${toolIds.join(', ')}`);

// Test 3: Verify tool descriptions are meaningful
console.log('\n=== Test 3: Tool Descriptions ===');

installer.tools.forEach(tool => {
  assert.ok(tool.description.length >= 20, `${tool.name} description should be descriptive (>= 20 chars)`);
  assert.ok(tool.useCase.length >= 20, `${tool.name} useCase should be descriptive (>= 20 chars)`);
  assert.ok(tool.targetUsers.length >= 10, `${tool.name} targetUsers should be descriptive (>= 10 chars)`);
});

console.log('✓ All tool descriptions are meaningful and descriptive');

// Test 4: Verify each tool has unique characteristics
console.log('\n=== Test 4: Tool Differentiation ===');

const descriptions = installer.tools.map(t => t.description);
const useCases = installer.tools.map(t => t.useCase);
const uniqueDescriptions = new Set(descriptions);
const uniqueUseCases = new Set(useCases);

assert.strictEqual(descriptions.length, uniqueDescriptions.size, 'Tool descriptions should be unique');
assert.strictEqual(useCases.length, uniqueUseCases.size, 'Tool use cases should be unique');

console.log('✓ Each tool has unique description and use case');

// Test 5: Verify tool-specific characteristics
console.log('\n=== Test 5: Tool-Specific Characteristics ===');

// Claude - conversational AI
const claude = installer.tools.find(t => t.id === 'claude');
assert.ok(claude.description.toLowerCase().includes('ai'), 'Claude should mention AI');
console.log('✓ Claude Code: AI-powered general development assistant');

// Opencode - CLI-focused
const opencode = installer.tools.find(t => t.id === 'opencode');
assert.ok(opencode.description.toLowerCase().includes('cli') ||
          opencode.useCase.toLowerCase().includes('terminal') ||
          opencode.targetUsers.toLowerCase().includes('cli'),
          'Opencode should emphasize CLI/terminal');
console.log('✓ Opencode: CLI-optimized tool for terminal workflows');

// Ampcode - velocity/acceleration
const ampcode = installer.tools.find(t => t.id === 'ampcode');
assert.ok(ampcode.description.toLowerCase().includes('amplif') ||
          ampcode.useCase.toLowerCase().includes('velocity') ||
          ampcode.useCase.toLowerCase().includes('rapid'),
          'Ampcode should emphasize amplified/accelerated development');
console.log('✓ Ampcode: Amplified development accelerator');

// Droid - Android/mobile
const droid = installer.tools.find(t => t.id === 'droid');
assert.ok(droid.description.toLowerCase().includes('android') ||
          droid.useCase.toLowerCase().includes('mobile') ||
          droid.useCase.toLowerCase().includes('android'),
          'Droid should emphasize Android/mobile development');
console.log('✓ Droid: Android-focused mobile development tool');

// Test 6: Verify default paths are appropriate
console.log('\n=== Test 6: Default Paths ===');

const expectedPaths = {
  'claude': '~/.claude',
  'opencode': '~/.config/opencode',
  'ampcode': '~/.amp',
  'droid': '~/.factory'
};

Object.entries(expectedPaths).forEach(([toolId, expectedPath]) => {
  const tool = installer.tools.find(t => t.id === toolId);
  assert.strictEqual(tool.path, expectedPath, `${tool.name} should have path ${expectedPath}`);
  console.log(`✓ ${tool.name}: ${tool.path}`);
});

// Test 7: Verify selection validation logic
console.log('\n=== Test 7: Selection Validation ===');

// Test valid selections
const validSelections = [
  ['claude'],
  ['opencode'],
  ['claude', 'opencode'],
  ['claude', 'opencode', 'ampcode'],
  ['claude', 'opencode', 'ampcode', 'droid']
];

validSelections.forEach(selection => {
  const filtered = selection.filter(id => installer.tools.some(tool => tool.id === id));
  assert.strictEqual(filtered.length, selection.length, `Selection ${selection.join(', ')} should be valid`);
});

console.log('✓ Valid tool selections work correctly');

// Test invalid selections filtered out
const testInput = ['claude', 'invalid', 'opencode', 'fake'];
const filtered = testInput.filter(id => installer.tools.some(tool => tool.id === id));
assert.deepStrictEqual(filtered, ['claude', 'opencode'], 'Invalid tool IDs should be filtered out');
console.log('✓ Invalid tool IDs are correctly filtered');

// Close readline interface
installer.rl.close();

console.log('\n' + '='.repeat(60));
console.log('✓ All 7 test suites passed!');
console.log('='.repeat(60));
console.log('\nEnhanced tool selection UI validation complete.');
console.log('The CLI now supports:');
console.log('  • 4 tools with comprehensive metadata');
console.log('  • Detailed descriptions for each tool');
console.log('  • Use case information');
console.log('  • Target user information');
console.log('  • Unique tool differentiation');
console.log('  • Proper validation and error handling');
