#!/bin/bash

# Phase 5c: Reference Validation Script
# This script validates that all old path references have been updated to new consolidated paths

WORKING_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
FAILED=0

echo "========================================"
echo "Reference Validation Script"
echo "========================================"
echo

# Check 1: No ../templates/ references
echo "[1/5] Checking for ../templates/ references..."
RESULT=$(grep -r "\.\./templates/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null | wc -l)
if [ "$RESULT" -eq 0 ]; then
  echo "  ✓ PASS: No ../templates/ references found"
else
  echo "  ✗ FAIL: Found $RESULT ../templates/ references"
  grep -r "\.\./templates/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null
  FAILED=1
fi
echo

# Check 2: No ../workflows/ references
echo "[2/5] Checking for ../workflows/ references..."
RESULT=$(grep -r "\.\.\/workflows/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null | wc -l)
if [ "$RESULT" -eq 0 ]; then
  echo "  ✓ PASS: No ../workflows/ references found"
else
  echo "  ✗ FAIL: Found $RESULT ../workflows/ references"
  grep -r "\.\.\/workflows/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null
  FAILED=1
fi
echo

# Check 3: No ../checklists/ references
echo "[3/5] Checking for ../checklists/ references..."
RESULT=$(grep -r "\.\.\/checklists/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null | wc -l)
if [ "$RESULT" -eq 0 ]; then
  echo "  ✓ PASS: No ../checklists/ references found"
else
  echo "  ✗ FAIL: Found $RESULT ../checklists/ references"
  grep -r "\.\.\/checklists/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null
  FAILED=1
fi
echo

# Check 4: No ../data/ references
echo "[4/5] Checking for ../data/ references..."
RESULT=$(grep -r "\.\./data/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null | wc -l)
if [ "$RESULT" -eq 0 ]; then
  echo "  ✓ PASS: No ../data/ references found"
else
  echo "  ✗ FAIL: Found $RESULT ../data/ references"
  grep -r "\.\./data/" "$WORKING_DIR/resources/" "$WORKING_DIR/agents/" "$WORKING_DIR/skills/" 2>/dev/null
  FAILED=1
fi
echo

# Check 5: Verify consolidated files exist
echo "[5/5] Checking for consolidated resource files..."
FILES_OK=1
for FILE in "templates.yaml" "workflows.yaml" "task-briefs.md" "checklists.md" "data.md"; do
  if [ -f "$WORKING_DIR/resources/$FILE" ]; then
    echo "  ✓ Found: resources/$FILE"
  else
    echo "  ✗ MISSING: resources/$FILE"
    FILES_OK=0
    FAILED=1
  fi
done
echo

# Final summary
echo "========================================"
if [ $FAILED -eq 0 ]; then
  echo "VALIDATION PASSED ✓"
  echo "All reference updates are complete and correct."
  exit 0
else
  echo "VALIDATION FAILED ✗"
  echo "Please review the failures above and fix them."
  exit 1
fi
