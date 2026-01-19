# Troubleshooting Guide

Common issues, solutions, and support resources for the Agentic Toolkit.

## Quick Diagnostics

### Is Your Problem Here?

| Problem | See Section |
|---------|------------|
| Agents don't appear | [Agents Not Appearing](#agents-not-appearing) |
| Agents appear but don't work | [Agent Errors](#agent-errors) |
| Skills not working | [Skills Not Loading](#skills-not-loading) |
| Installation failed | [Installation Issues](#installation-issues) |
| Slow performance | [Performance Issues](#performance-issues) |
| Something seems broken | [General Troubleshooting](#general-troubleshooting) |

## Installation Issues

### Problem: Installation Hangs

**Symptoms:**
- Installation process stops responding
- Download appears stuck
- No error message

**Solutions:**

1. **Check your connection:**
   - Verify internet connection is stable
   - Try on different network if possible
   - Disable VPN temporarily if using one

2. **Retry installation:**
   - Cancel installation (Ctrl+C)
   - Wait 30 seconds
   - Retry installation

3. **Use direct link:**
   ```
   npm install https://github.com/anthropic/agentic-toolkit.git
   ```

4. **Clear npm cache:**
   ```bash
   npm cache clean --force
   npm install agentic-toolkit
   ```

5. **Check disk space:**
   - Lite needs 10MB free
   - Standard needs 20MB free
   - Pro needs 30MB free
   - Run: `df -h` (Linux/Mac) or check Properties (Windows)

### Problem: "Package Not Found"

**Symptoms:**
- Error: `npm ERR! 404 Not Found`
- Agent toolkit not in registry

**Solutions:**

1. **Verify package name:**
   ```bash
   npm search agentic-toolkit
   ```

2. **Check npm registry:**
   ```bash
   npm config set registry https://registry.npmjs.org/
   ```

3. **Use marketplace instead:**
   - Go to Claude.ai
   - Use Marketplace to install
   - More reliable than npm

4. **Check your npm version:**
   ```bash
   npm --version
   # Should be v6 or higher
   ```

### Problem: Permission Denied

**Symptoms:**
- Error: `EACCES: permission denied`
- Cannot write to directory

**Solutions (by platform):**

**Linux/Mac:**
```bash
# Option 1: Use sudo (not recommended)
sudo npm install -g agentic-toolkit

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g agentic-toolkit
```

**Windows:**
1. Run Command Prompt as Administrator
2. Retry installation
3. Restart computer if still fails

### Problem: Version Mismatch

**Symptoms:**
- Error about incompatible version
- Features not working after update

**Solutions:**

1. **Check installed version:**
   ```bash
   npm list agentic-toolkit
   ```

2. **Update to latest:**
   ```bash
   npm install agentic-toolkit@latest
   ```

3. **If using specific variant:**
   ```bash
   npm install agentic-toolkit@standard@latest
   npm install agentic-toolkit@pro@latest
   ```

4. **Uninstall and reinstall:**
   ```bash
   npm uninstall agentic-toolkit
   npm install agentic-toolkit
   ```

## Agents Not Appearing

### Problem: Can't Find Agents with @ Mention

**Symptoms:**
- Type `@` and don't see agent names
- "Agent not found" error
- @ mention doesn't autocomplete

**Diagnosis Steps:**

1. **Verify installation:**
   ```
   @Master: *help
   ```

   If this works, installation is fine. If not:
   - Check that you installed the toolkit
   - Verify correct variant installed
   - Check installation succeeded without errors

2. **Check Claude version:**
   - Agentic Toolkit requires Claude 3.5 or later
   - Verify you're using up-to-date Claude
   - Try in new conversation

3. **Run validation:**
   ```bash
   ./validate-references.sh
   ```

   Look for errors about missing agents

**Solutions (in order):**

1. **Refresh Claude:**
   - Press F5 or reload page
   - Close and reopen Claude
   - Clear browser cache
   - Try in private/incognito window

2. **Restart Claude:**
   - Close all Claude tabs
   - Open new Claude conversation
   - Try `@Master: *help`

3. **Check variant manifest:**
   - Standard should have 13 agents
   - Lite should have 3 agents
   - Pro should have 13 agents

   If agents missing, manifest may be corrupted

4. **Reinstall toolkit:**
   ```bash
   npm uninstall agentic-toolkit
   npm install agentic-toolkit
   ```

5. **Try marketplace:**
   - Uninstall current
   - Use Claude Marketplace to reinstall
   - Marketplace version more reliable

### Problem: Only Some Agents Appear

**Symptoms:**
- Some agents visible, others missing
- Expected agents not in list

**Causes & Solutions:**

1. **Wrong variant installed:**
   - Lite has 3 agents (Master, Orchestrator, 1 more)
   - Standard has 13 agents
   - Pro has 13 agents

   Check which variant is installed:
   ```bash
   npm list agentic-toolkit
   ```

2. **Variant manifest mismatch:**
   - Install correct variant:
   ```bash
   npm uninstall agentic-toolkit
   npm install agentic-toolkit@standard
   ```

3. **Corrupt manifest file:**
   - Validate manifest:
   ```bash
   ./validate-references.sh
   ```
   - If errors, reinstall

### Problem: Agent Appears but @ Mention Doesn't Work

**Symptoms:**
- See agent name in list
- Clicking agent does nothing
- Error when trying to invoke

**Solutions:**

1. **Refresh browser:**
   - Press F5
   - Close all tabs and reopen

2. **Clear Claude cache:**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Restart browser
   - Try again

3. **Check agent definition:**
   - Agent markdown file may be corrupted
   - Run validation: `./validate-references.sh`
   - Look for parsing errors

4. **Try Master agent:**
   ```
   @Master: *help
   ```

   If Master works, problem is with specific agent

5. **Check agent file integrity:**
   - Ensure agent YAML is valid
   - Ensure agent markdown is readable
   - Check file isn't empty or corrupted

## Agent Errors

### Problem: Agent Responds with Error

**Symptoms:**
- Agent appears and loads
- Responds with error message
- Specific error from agent

**Common Errors & Solutions:**

#### Error: "Resource Not Found"

**Cause:** Agent tried to load resource that doesn't exist

**Solution:**
1. Check file paths in error message
2. Verify resource files exist:
   ```bash
   ls resources/templates/
   ls resources/data/
   ```
3. Run validation:
   ```bash
   ./validate-references.sh
   ```
4. Reinstall if files missing:
   ```bash
   npm install agentic-toolkit --force
   ```

#### Error: "Invalid Template"

**Cause:** Template file is corrupted or invalid

**Solution:**
1. Check template syntax (YAML or Markdown)
2. Verify template is not empty
3. Check for special characters that need escaping
4. Try different template
5. Run validation: `./validate-references.sh`

#### Error: "Permission Denied"

**Cause:** Cannot access file or directory

**Solution:**
1. Check file permissions:
   ```bash
   # Linux/Mac
   ls -la agents/
   ls -la skills/
   ```
2. Fix permissions:
   ```bash
   chmod -R 755 agents/
   chmod -R 755 skills/
   ```
3. Check parent directory ownership
4. Reinstall if permissions corrupted

### Problem: Agent Response is Incomplete

**Symptoms:**
- Agent starts responding then stops
- Response cuts off mid-sentence
- "Continue..." button appears

**Solutions:**

1. **Click Continue:**
   - Scroll down, find Continue button
   - Click to resume response
   - Agent will continue

2. **Ask agent to continue:**
   ```
   Can you continue from where you left off?
   ```

3. **Request summary:**
   ```
   Summarize the key points from your response so far
   ```

4. **Break into smaller requests:**
   - Instead of one large request
   - Make multiple focused requests
   - Agent will have more space

5. **Check context length:**
   - If very long conversation, context may fill
   - Start new conversation
   - Copy previous context if needed

### Problem: Agent Gives Wrong or Bad Advice

**Symptoms:**
- Agent response seems incorrect
- Advice contradicts requirements
- Output quality is poor

**Solutions:**

1. **Provide more context:**
   - Agent may lack information
   - Give more specific details
   - Mention constraints or requirements
   - Provide examples if available

2. **Clarify request:**
   ```
   I think that approach is wrong because [reason].
   Instead, I need [specific requirement].
   ```

3. **Ask for revision:**
   ```
   Can you revise that section with [specific guidance]?
   ```

4. **Try different agent:**
   - Different agent might have better approach
   - Orchestrator can recommend alternatives
   - May need domain-specific agent

5. **Provide reference material:**
   - Paste relevant documentation
   - Share existing examples
   - Agent learns from context

## Skills Not Loading

### Problem: Skill Not Found or Not Available

**Symptoms:**
- Skill is not listed
- Error when invoking skill
- "Skill not available" message

**Diagnosis:**

1. **Check variant includes skill:**
   - Lite: PDF only
   - Standard: 8 core skills
   - Pro: All 14 skills

   See [SKILLS.md](SKILLS.md) for complete list

2. **Verify skill is in manifest:**
   ```bash
   grep -i "skill-name" .claude-plugin/plugin-standard.json
   ```

3. **Check skill directory exists:**
   ```bash
   ls skills/skill-name/
   ```

4. **Verify SKILL.md exists:**
   ```bash
   ls -la skills/skill-name/SKILL.md
   ```

**Solutions:**

1. **Upgrade to correct variant:**
   - Some skills only in Pro
   - Upgrade to Pro for all skills
   - Use: `npm install agentic-toolkit@pro`

2. **Reinstall toolkit:**
   - Skill files may be missing
   - Reinstall: `npm install agentic-toolkit --force`

3. **Validate installation:**
   ```bash
   ./validate-references.sh
   ```

   Look for missing skill files

4. **Run diagnostics:**
   ```bash
   npm list agentic-toolkit
   npm view agentic-toolkit version
   ```

### Problem: Skill Doesn't Work When Invoked

**Symptoms:**
- Skill appears available
- Invoking skill causes error
- Skill loads but fails

**Solutions:**

1. **Check skill implementation:**
   - Read `skills/skill-name/SKILL.md`
   - Follow usage instructions
   - Some skills have prerequisites

2. **Provide required parameters:**
   - Some skills require specific inputs
   - Review SKILL.md for required parameters
   - Example: `@Canvas Design: Create a [specific type of design]`

3. **Check file permissions:**
   ```bash
   chmod -R 755 skills/
   ```

4. **Try different agent with skill:**
   ```
   @Master: Use the PDF skill to extract tables
   @Full-Stack Developer: Use the PDF skill to create a document
   ```

5. **Run validation:**
   ```bash
   ./validate-references.sh
   ```

## Performance Issues

### Problem: Toolkit is Slow

**Symptoms:**
- Agents take long time to respond
- Slow agent initialization
- System feels sluggish

**Causes & Solutions:**

1. **Large conversation history:**
   - Start new conversation periodically
   - Existing messages slow down responses
   - Solution: New conversation every 50 messages

2. **Too many files in agents/:**
   - More than 20 agents can slow discovery
   - Solution: Lite variant if minimal usage

3. **Resource files very large:**
   - Large templates or data files
   - Solution: Cleanup old templates
   - Remove unused resources

4. **Internet connection:**
   - Claude API requests slow
   - Solution: Check internet speed
   - Try wired connection if available

5. **System resources low:**
   - Not enough RAM available
   - Solution: Close other applications
   - Restart computer
   - Upgrade RAM if consistently slow

**Performance Optimization:**

1. **Use Lite variant if possible:**
   - Smallest footprint
   - Fastest startup

2. **Upgrade to Pro selectively:**
   - Only if you need additional skills
   - Pro has more overhead

3. **Keep conversations short:**
   - Start new conversation every 50-100 messages
   - Don't keep multi-hour conversations

4. **Optimize resources:**
   - Remove unused templates
   - Archive old data files
   - Keep skills directory clean

### Problem: High Memory Usage

**Symptoms:**
- System slows down when using toolkit
- Browser tab uses lots of RAM
- Computer fans loud/hot

**Solutions:**

1. **Check which files are loaded:**
   ```bash
   du -sh agentic-kit/
   du -sh skills/
   ```

2. **Remove unused files:**
   - Delete unused skill directories
   - Clean up large resource files
   - Keep only needed agents

3. **Use Lite variant:**
   - Much smaller memory footprint
   - Start with Lite if low on RAM

4. **Reduce conversation context:**
   - Start new conversation periodically
   - Old messages consume memory
   - Cleanup after long sessions

## Reference and Path Issues

### Problem: Validation Script Reports Errors

**Symptoms:**
- `./validate-references.sh` shows errors
- References are broken
- Files are missing

**Solutions:**

1. **Check error messages carefully:**
   ```bash
   ./validate-references.sh
   ```

   Look for:
   - Missing files
   - Broken paths
   - Invalid YAML

2. **Fix missing files:**
   - If agent is missing: recreate from backup or reinstall
   - If skill is missing: upgrade variant or reinstall

3. **Fix broken paths:**
   - Update references in manifests
   - Ensure paths are relative to root
   - Check for typos

4. **Reinstall if many errors:**
   ```bash
   npm uninstall agentic-toolkit
   npm install agentic-toolkit --force
   ```

### Problem: Agent References Missing Resource

**Symptoms:**
- Agent works but references wrong path
- File not found error from agent
- Agent can't load template

**Solutions:**

1. **Check resource exists:**
   ```bash
   ls resources/templates/
   ls resources/data/
   ```

2. **Update agent reference:**
   - Edit agent file
   - Fix path to resource
   - Reload Claude

3. **Verify path is correct:**
   - Paths are relative to project root
   - Use `resources/` prefix
   - Check spelling exactly

4. **Check file permissions:**
   ```bash
   chmod 644 resources/templates/*.yaml
   ```

## General Troubleshooting

### Problem: Something Seems Broken (Unclear What)

**Diagnosis Steps:**

1. **Test basic functionality:**
   ```
   @Master: *help
   ```

   If this works, toolkit fundamentally works

2. **Run validation:**
   ```bash
   ./validate-references.sh
   ```

   Check for any reported errors

3. **Check installation:**
   ```bash
   npm list agentic-toolkit
   npm view agentic-toolkit version
   ```

4. **Try simple task:**
   ```
   @Master: What is 2+2?
   ```

   If this works, agents work

5. **Check specific agent:**
   ```
   @Product Manager: List your capabilities
   ```

6. **Gather debug info:**
   ```bash
   npm list agentic-toolkit > debug.txt
   node --version >> debug.txt
   npm --version >> debug.txt
   echo "OS: $(uname -a)" >> debug.txt
   ./validate-references.sh >> debug.txt 2>&1
   ```

### Problem: Got an Error I Don't Understand

**For Error Messages:**

1. **Search the error in this guide:**
   - Use Ctrl+F to search message
   - Often listed with solutions

2. **Check ARCHITECTURE.md:**
   - May explain technical issue
   - Error may be design-related

3. **Check AGENTS.md or SKILLS.md:**
   - Error may be usage-related
   - Check agent/skill documentation

4. **Report to support:**
   - Include full error message
   - Include debug output from above
   - Include steps to reproduce

## Getting Help

### Self-Help Resources

1. **[README.md](README.md)** - Overview and quick start
2. **[QUICK-START.md](QUICK-START.md)** - Beginner guide
3. **[AGENTS.md](AGENTS.md)** - Agent documentation
4. **[SKILLS.md](SKILLS.md)** - Skill documentation
5. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical details
6. **[CONTRIBUTING.md](docs/CONTRIBUTING.md)** - Extension guide

### Contacting Support

**For Official Support:**
- Email: support@anthropic.com
- Include:
  - Clear description of issue
  - Steps to reproduce
  - Full error message
  - Output from `./validate-references.sh`
  - Output from `npm list agentic-toolkit`

**Before Contacting Support:**
1. Check this troubleshooting guide
2. Run `./validate-references.sh`
3. Try reinstalling
4. Try different browser
5. Try in new conversation

### Common Support Questions

**Q: How do I know if it's installed?**
A: Run `@Master: *help` - if you see output, it's installed.

**Q: How do I uninstall?**
A: `npm uninstall agentic-toolkit`

**Q: How do I switch variants?**
A: Uninstall current: `npm uninstall agentic-toolkit`
   Install new: `npm install agentic-toolkit@pro`

**Q: Do I need to restart anything?**
A: Just refresh Claude (F5). Usually no computer restart needed.

**Q: Where are files stored?**
A: Depends on installation method:
- npm: `node_modules/agentic-toolkit/`
- Development: `/path/to/agentic-kit/`

**Q: Can I use multiple variants at once?**
A: No, only one variant at a time. Reinstall to switch.

**Q: Will my data be lost if I uninstall?**
A: Your work in Claude conversations remains. Toolkit code is not stored in conversations.

## Validation Checklist

Before reporting an issue, verify:

- [ ] I've tried refreshing Claude (F5)
- [ ] I've tried starting a new conversation
- [ ] I've run `./validate-references.sh`
- [ ] I've verified the correct variant is installed
- [ ] I've restarted my computer
- [ ] I've checked this troubleshooting guide
- [ ] I've reviewed [README.md](README.md)
- [ ] I can run `@Master: *help` successfully

If all above are checked and issue persists, safe to report to support.

---

**Version:** 1.0.0
**Last Updated:** Nov 2024
**Status:** Complete

For other questions, see [README.md](README.md) or contact support@anthropic.com.
