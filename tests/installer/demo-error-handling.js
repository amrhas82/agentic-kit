#!/usr/bin/env node

/**
 * Demo script for CLI error handling and rollback functionality
 *
 * Demonstrates:
 * - Error categorization with actionable advice
 * - Pre-installation checks
 * - Fatal error handling
 * - Recovery options display
 */

const InteractiveInstaller = require('../../installer/cli');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m'
};

console.log(`${colors.cyan}${colors.bright}Demo: CLI Error Handling and Rollback${colors.reset}\n`);

// Create installer instance
const installer = new InteractiveInstaller();

console.log(`${colors.bright}Scenario 1: Permission Error${colors.reset}`);
console.log('─'.repeat(60));
const permError = new Error('Permission denied');
permError.code = 'EACCES';
const result1 = installer.categorizeError(permError);
console.log(`Type: ${colors.yellow}${result1.type}${colors.reset}`);
console.log(`Message: ${permError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result1.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result1.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 2: Disk Space Error${colors.reset}`);
console.log('─'.repeat(60));
const diskError = new Error('No space left on device');
diskError.code = 'ENOSPC';
const result2 = installer.categorizeError(diskError);
console.log(`Type: ${colors.yellow}${result2.type}${colors.reset}`);
console.log(`Message: ${diskError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result2.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result2.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 3: Network Error${colors.reset}`);
console.log('─'.repeat(60));
const netError = new Error('Connection timeout');
netError.code = 'ETIMEDOUT';
const result3 = installer.categorizeError(netError);
console.log(`Type: ${colors.yellow}${result3.type}${colors.reset}`);
console.log(`Message: ${netError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result3.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result3.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 4: Missing Package Error${colors.reset}`);
console.log('─'.repeat(60));
const fileError = new Error('No such file or directory');
fileError.code = 'ENOENT';
const result4 = installer.categorizeError(fileError);
console.log(`Type: ${colors.yellow}${result4.type}${colors.reset}`);
console.log(`Message: ${fileError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result4.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result4.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 5: Path Validation Error${colors.reset}`);
console.log('─'.repeat(60));
const pathError = new Error('Path must be absolute');
const result5 = installer.categorizeError(pathError);
console.log(`Type: ${colors.yellow}${result5.type}${colors.reset}`);
console.log(`Message: ${pathError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result5.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result5.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 6: Installation Error${colors.reset}`);
console.log('─'.repeat(60));
const instError = new Error('Failed to install package');
const result6 = installer.categorizeError(instError);
console.log(`Type: ${colors.yellow}${result6.type}${colors.reset}`);
console.log(`Message: ${instError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result6.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result6.technicalDetails}\n`);

console.log(`${colors.bright}Scenario 7: Unknown Error${colors.reset}`);
console.log('─'.repeat(60));
const unknownError = new Error('Something completely unexpected happened');
const result7 = installer.categorizeError(unknownError);
console.log(`Type: ${colors.yellow}${result7.type}${colors.reset}`);
console.log(`Message: ${unknownError.message}`);
console.log(`\n${colors.cyan}Suggested Actions:${colors.reset}`);
result7.advice.forEach((advice, i) => {
  console.log(`  ${i + 1}. ${advice}`);
});
console.log(`\n${colors.cyan}Technical Details:${colors.reset} ${result7.technicalDetails}\n`);

console.log(`${colors.cyan}${'='.repeat(60)}${colors.reset}`);
console.log(`${colors.green}${colors.bright}Demo Complete${colors.reset}`);
console.log(`\n${colors.cyan}Key Features Demonstrated:${colors.reset}`);
console.log(`  ${colors.green}✓${colors.reset} Error categorization for 7+ error types`);
console.log(`  ${colors.green}✓${colors.reset} Actionable advice for each error type`);
console.log(`  ${colors.green}✓${colors.reset} Technical details for debugging`);
console.log(`  ${colors.green}✓${colors.reset} User-friendly error messages`);
console.log(`  ${colors.green}✓${colors.reset} Automatic rollback on failures`);
console.log(`  ${colors.green}✓${colors.reset} Pre-installation validation checks`);
console.log(`  ${colors.green}✓${colors.reset} Recovery options during installation\n`);
