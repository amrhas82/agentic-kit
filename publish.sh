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
npm run validate

echo ""
echo "Step 2: Publishing to npm.js..."
npm run publish:npm

if [ "$GITHUB_ONLY" = true ]; then
    echo ""
    echo "Step 3: Publishing to GitHub Packages..."
    npm run publish:github

    echo ""
    echo "=========================================="
    echo "✓ Published to both registries!"
    echo "=========================================="
    echo ""
    echo "npm.js: https://www.npmjs.com/package/@amrhas82/agentic-kit"
    echo "GitHub: https://github.com/amrhas82/agentic-kit/packages"
else
    echo ""
    echo "=========================================="
    echo "✓ Published to npm.js only"
    echo "=========================================="
    echo ""
    echo "npm.js: https://www.npmjs.com/package/@amrhas82/agentic-kit"
    echo ""
    echo "To publish to GitHub Packages later:"
    echo "  1. Set GITHUB_TOKEN: export GITHUB_TOKEN=ghp_your_token_here"
    echo "  2. Run: npm run publish:github"
fi

echo ""
