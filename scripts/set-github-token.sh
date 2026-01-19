#!/bin/bash
# Helper script to set GITHUB_TOKEN from pass

# Check if pass is available
if ! command -v pass &> /dev/null; then
    echo "❌ Error: 'pass' command not found"
    echo ""
    echo "Install pass:"
    echo "  - Ubuntu/Debian: sudo apt install pass"
    echo "  - macOS: brew install pass"
    echo "  - Arch: sudo pacman -S pass"
    echo ""
    exit 1
fi

# Check if token exists in pass
if ! pass show amr/github &> /dev/null; then
    echo "❌ Error: Token not found at amr/github in pass"
    echo ""
    echo "Store your GitHub token in pass first:"
    echo "  pass insert amr/github"
    echo ""
    exit 1
fi

# Retrieve token from pass
TOKEN=$(pass show amr/github)

if [ -z "$TOKEN" ]; then
    echo "❌ Error: Retrieved token is empty"
    exit 1
fi

# Export it
export GITHUB_TOKEN="$TOKEN"

echo "✓ GITHUB_TOKEN set from pass (amr/github)"
echo ""
echo "Token starts with: ${TOKEN:0:10}..."
echo ""
echo "To make this persist for your current shell session:"
echo "  source ./set-github-token.sh"
echo ""
echo "Or add to your shell config (~/.bashrc or ~/.zshrc):"
echo "  export GITHUB_TOKEN=\$(pass show amr/github)"
