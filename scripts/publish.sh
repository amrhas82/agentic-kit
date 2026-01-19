#!/bin/bash
# Publish Agentic Kit to both npm.js and GitHub Packages

set -e  # Exit on error

echo "=========================================="
echo "Publishing Agentic Kit"
echo "=========================================="
echo ""

# Check for NPM_TOKEN (required for npm.js publishing with 2FA)
NPM_PUBLISH_READY=false
if [ -z "$NPM_TOKEN" ]; then
    if command -v pass &> /dev/null && pass show amr/npmjs_token &> /dev/null; then
        echo "🔑 Retrieving npm token from pass..."
        export NPM_TOKEN=$(pass show amr/npmjs_token | head -n1)
        echo "✓ npm token retrieved from pass (amr/npmjs_token)"
        NPM_PUBLISH_READY=true
    else
        echo "⚠️  NPM_TOKEN not set and not found in pass (amr/npmjs_token)"
        echo "   npm.js publishing requires a granular access token with 2FA bypass"
        echo "   Create one at: https://www.npmjs.com/settings/amrhas82/tokens"
        echo "   Then: pass insert amr/npmjs_token"
    fi
else
    echo "✓ NPM_TOKEN is set"
    NPM_PUBLISH_READY=true
fi

# Set npm auth token if available
if [ "$NPM_PUBLISH_READY" = true ]; then
    npm config set //registry.npmjs.org/:_authToken=$NPM_TOKEN
fi

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
    echo "✓ Validation passed"
else
    echo "✗ Validation failed"
    exit 1
fi

# Get current version
PACKAGE_VERSION=$(node -p "require('./package.json').version")
echo ""
echo "Preparing to publish version: $PACKAGE_VERSION"

echo ""
echo "Step 2: Checking npm.js registry..."
if npm view @amrhas82/agentic-kit@$PACKAGE_VERSION version &>/dev/null; then
    NPM_STATUS="already_published"
    echo "ℹ Version $PACKAGE_VERSION already exists on npm.js"
else
    echo "Publishing to npm.js..."
    if npm run publish:npm; then
        NPM_STATUS="success"
        echo "✓ Published to npm.js"
    else
        NPM_STATUS="failed"
        echo "✗ Failed to publish to npm.js"
    fi
fi

GITHUB_STATUS="skipped"
if [ "$GITHUB_ONLY" = true ]; then
    echo ""
    echo "Step 3: Checking GitHub Packages registry..."
    # Try to check if version exists on GitHub Packages
    if npm view @amrhas82/agentic-kit@$PACKAGE_VERSION version --registry=https://npm.pkg.github.com &>/dev/null; then
        GITHUB_STATUS="already_published"
        echo "ℹ Version $PACKAGE_VERSION already exists on GitHub Packages"
    else
        echo "Publishing to GitHub Packages..."
        if npm run publish:github; then
            GITHUB_STATUS="success"
            echo "✓ Published to GitHub Packages"
        else
            GITHUB_STATUS="failed"
            echo "✗ Failed to publish to GitHub Packages"
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
echo "Version: $PACKAGE_VERSION"
echo ""

# npm.js status
if [ "$NPM_STATUS" = "success" ]; then
    echo "✓ npm.js: PUBLISHED"
    echo "  → https://www.npmjs.com/package/@amrhas82/agentic-kit"
elif [ "$NPM_STATUS" = "already_published" ]; then
    echo "○ npm.js: ALREADY EXISTS (v$PACKAGE_VERSION)"
    echo "  → https://www.npmjs.com/package/@amrhas82/agentic-kit"
    echo "  → Bump version in package.json to publish a new version"
else
    echo "✗ npm.js: FAILED"
fi

# GitHub status
if [ "$GITHUB_STATUS" = "success" ]; then
    echo "✓ GitHub Packages: PUBLISHED"
    echo "  → https://github.com/amrhas82/agentic-kit/packages"
elif [ "$GITHUB_STATUS" = "already_published" ]; then
    echo "○ GitHub Packages: ALREADY EXISTS (v$PACKAGE_VERSION)"
    echo "  → https://github.com/amrhas82/agentic-kit/packages"
    echo "  → Bump version in package.json to publish a new version"
elif [ "$GITHUB_STATUS" = "skipped" ]; then
    echo "○ GitHub Packages: SKIPPED (no token)"
    echo ""
    echo "To publish to GitHub Packages:"
    echo "  1. Ensure token in pass: pass show amr/github_token"
    echo "  2. Run: ./publish.sh"
else
    echo "✗ GitHub Packages: FAILED"
fi

echo ""
echo "=========================================="

# Exit with error only if publishing actually failed (not if already published)
if [ "$NPM_STATUS" = "failed" ]; then
    echo "✗ Publishing FAILED"
    exit 1
elif [ "$GITHUB_ONLY" = true ] && [ "$GITHUB_STATUS" = "failed" ]; then
    echo "⚠ npm.js OK, but GitHub Packages FAILED"
    exit 1
elif [ "$NPM_STATUS" = "already_published" ] && [ "$GITHUB_STATUS" = "already_published" ]; then
    echo "ℹ Version $PACKAGE_VERSION already published to all registries"
    echo "  To publish a new version:"
    echo "  1. Update version: npm version patch (or minor/major)"
    echo "  2. Run: ./publish.sh"
elif [ "$NPM_STATUS" = "already_published" ]; then
    echo "ℹ Version $PACKAGE_VERSION already published to npm.js"
    echo "  To publish a new version:"
    echo "  1. Update version: npm version patch (or minor/major)"
    echo "  2. Run: ./publish.sh"
else
    echo "✓ Publishing COMPLETED"
fi

echo ""
