#!/bin/bash
# Publish Agentic Kit to both npm.js and GitHub Packages

set -e  # Exit on error

echo "=========================================="
echo "Publishing Agentic Kit"
echo "=========================================="
echo ""

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GITHUB_TOKEN is not set"
    echo ""

    # Check if pass is available and has the token
    if command -v pass &> /dev/null; then
        echo "🔑 Attempting to retrieve token from pass..."
        if pass show amr/github_token &> /dev/null; then
            # Get token from password field (first line)
            export GITHUB_TOKEN=$(pass show amr/github_token | head -n1)
            echo "✓ Token retrieved from pass (amr/github_token)"
            GITHUB_ONLY=true
        else
            echo "⚠️  Token not found in pass at amr/github_token"
            echo ""
            read -p "Continue with npm.js only? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                echo "Aborted."
                exit 1
            fi
            GITHUB_ONLY=false
        fi
    else
        echo "    Publishing to GitHub Packages will fail"
        echo "    Options:"
        echo "      1. Set manually: export GITHUB_TOKEN=ghp_your_token_here"
        echo "      2. Use pass: export GITHUB_TOKEN=\$(pass show amr/github_token)"
        echo ""
        read -p "Continue with npm.js only? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Aborted."
            exit 1
        fi
        GITHUB_ONLY=false
    fi
else
    echo "✓ GITHUB_TOKEN is set"
    GITHUB_ONLY=true
fi

echo ""
echo "Step 1: Validating package..."
if npm run validate; then
    VALIDATION_SUCCESS=true
    echo "✓ Validation passed"
else
    echo "✗ Validation failed"
    exit 1
fi

echo ""
echo "Step 2: Publishing to npm.js..."
if npm run publish:npm 2>&1 | tee /tmp/npm-publish.log; then
    NPM_SUCCESS=true
else
    # Check if error is "already published" (which is actually success)
    if grep -q "You cannot publish over the previously published versions" /tmp/npm-publish.log; then
        NPM_SUCCESS=true
        echo "ℹ Package already published to npm (this is OK)"
    else
        NPM_SUCCESS=false
    fi
fi

GITHUB_SUCCESS=false
if [ "$GITHUB_ONLY" = true ]; then
    echo ""
    echo "Step 3: Publishing to GitHub Packages..."
    if npm run publish:github 2>&1 | tee /tmp/github-publish.log; then
        GITHUB_SUCCESS=true
    else
        # Check if error is "already published"
        if grep -q "You cannot publish over the previously published versions" /tmp/github-publish.log; then
            GITHUB_SUCCESS=true
            echo "ℹ Package already published to GitHub (this is OK)"
        else
            GITHUB_SUCCESS=false
        fi
    fi
fi

# Final Summary
echo ""
echo "=========================================="
echo "PUBLISHING SUMMARY"
echo "=========================================="
echo ""
echo "Package: @amrhas82/agentic-kit"
echo "Version: $(node -p "require('./package.json').version")"
echo ""

if [ "$NPM_SUCCESS" = true ]; then
    echo "✓ npm.js: SUCCESS"
    echo "  → https://www.npmjs.com/package/@amrhas82/agentic-kit"
else
    echo "✗ npm.js: FAILED"
fi

if [ "$GITHUB_ONLY" = true ]; then
    if [ "$GITHUB_SUCCESS" = true ]; then
        echo "✓ GitHub Packages: SUCCESS"
        echo "  → https://github.com/amrhas82/agentic-kit/packages"
    else
        echo "✗ GitHub Packages: FAILED"
    fi
else
    echo "○ GitHub Packages: SKIPPED (no token)"
    echo ""
    echo "To publish to GitHub Packages later:"
    echo "  1. Set GITHUB_TOKEN: export GITHUB_TOKEN=ghp_your_token_here"
    echo "  2. Run: npm run publish:github"
fi

echo ""
echo "=========================================="

# Exit with error if any required publish failed
if [ "$NPM_SUCCESS" != true ]; then
    echo "✗ Publishing FAILED"
    exit 1
elif [ "$GITHUB_ONLY" = true ] && [ "$GITHUB_SUCCESS" != true ]; then
    echo "⚠ npm.js succeeded, but GitHub Packages failed"
    exit 1
else
    echo "✓ Publishing COMPLETED"
fi

echo ""
