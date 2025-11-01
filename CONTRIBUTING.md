# Contributing Guide

How to contribute to the Agentic Toolkit by adding custom agents, skills, and improvements.

## Table of Contents

- [Getting Started](#getting-started)
- [Contribution Types](#contribution-types)
- [Adding Custom Agents](#adding-custom-agents)
- [Adding Custom Skills](#adding-custom-skills)
- [Code Style & Standards](#code-style--standards)
- [Testing Requirements](#testing-requirements)
- [Submission Process](#submission-process)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

- Familiarity with Markdown and YAML
- Basic understanding of agents and skills
- Read [ARCHITECTURE.md](ARCHITECTURE.md)
- Read [AGENTS.md](AGENTS.md) and [SKILLS.md](SKILLS.md)
- Git knowledge (for submission)

### Development Setup

```bash
# Clone repository
git clone https://github.com/anthropic/agentic-toolkit.git
cd agentic-kit

# Install dependencies (if any)
npm install

# Link locally for testing
npm link

# Verify installation
@Master: *help
```

### Understanding the Architecture

Before contributing, understand:

1. **Ultra-Lean Design** - See [ARCHITECTURE.md](ARCHITECTURE.md)
2. **Agent Format** - See [AGENTS.md](AGENTS.md)
3. **Skill Format** - See [SKILLS.md](SKILLS.md)
4. **Manifest System** - See [ARCHITECTURE.md - Plugin Manifest System](ARCHITECTURE.md#plugin-manifest-system)

## Contribution Types

We welcome contributions in several areas:

| Type | Effort | Impact | Example |
|------|--------|--------|---------|
| **New Agent** | High | High | "Enterprise Compliance Agent" |
| **New Skill** | High | High | "Database Integration Skill" |
| **Bug Fix** | Low | Medium | "Fix PDFMerge timeout" |
| **Documentation** | Low | Medium | "Add examples to agent docs" |
| **Improvement** | Medium | Medium | "Optimize agent startup time" |
| **Test** | Medium | Medium | "Add comprehensive tests" |

### Choosing a Contribution

**If you want to help but don't know how:**
1. Look at open issues
2. Pick a "good first issue"
3. Comment "I'd like to work on this"
4. Maintainer assigns it
5. Follow submission process

**If you have your own idea:**
1. Open an issue first
2. Describe what and why
3. Wait for feedback
4. Start work once approved

## Adding Custom Agents

### Agent File Structure

Create a new file in `agents/`:

```markdown
---
name: your-agent-name
description: "Clear description of what this agent does"
model: inherit
color: color-name
---

# Agent Persona and Purpose

Clear description of the agent's role, expertise, and how it helps users.

## Core Operating Principles

1. **Principle One** - Explanation
2. **Principle Two** - Explanation
3. **Principle Three** - Explanation

## Commands (if applicable)

- **\*command-name** - Description of what command does
- **\*another-command** - Description

## Resource Dependencies

List any resources the agent uses:
- **Templates** (~/.claude/templates): list templates
- **Data** (~/.claude/data): list data files
- **Checklists** (~/.claude/checklists): list checklists

## Workflow Patterns

Description of typical workflows and usage patterns.

## Execution Guidelines

How the agent should execute and behave.

---

[Rest of agent definition with detailed instructions]
```

### Naming Conventions

**Agent Names:**
- Use lowercase with hyphens: `data-analyst`, `api-designer`
- Be descriptive: `api-designer` not `dev2`
- Avoid generic: `architect` is better than `design-person`

**File Names:**
- Use agent name as filename: `agents/data-analyst.md`
- Use hyphens not underscores
- Numbered prefix if workflow dependent: `1-prepare-data.md`

**Agent ID (in frontmatter):**
- Must match filename (without .md)
- Lowercase with hyphens
- Used in manifests and @ mentions

### Agent Quality Checklist

Before submitting an agent, ensure:

- [ ] **Clear Purpose** - Agent's role is immediately clear
- [ ] **Unique Value** - Doesn't duplicate existing agents
- [ ] **Well-Documented** - Instructions are clear and complete
- [ ] **Follows Format** - Uses standard markdown + YAML structure
- [ ] **Has Commands** - If applicable, includes command interface
- [ ] **Error Handling** - Describes how agent handles errors
- [ ] **Examples** - Includes usage examples
- [ ] **Dependencies** - Lists all resources used
- [ ] **No Secrets** - No API keys, passwords, or credentials in agent definition
- [ ] **Tested** - Tested in actual Claude conversations

### Example Custom Agent

```markdown
---
name: data-analyst
description: Specialized agent for data analysis, visualization, and insight generation from datasets
model: inherit
color: purple
---

# Data Analyst Agent

An expert data analyst who transforms raw datasets into actionable insights through visualization, statistical analysis, and trend identification.

## Core Operating Principles

1. **Data-Driven Decision Making** - All recommendations backed by data and analysis
2. **Clear Communication** - Explain findings in non-technical language
3. **Pattern Recognition** - Identify trends, outliers, and opportunities
4. **Best Practices** - Apply statistical and analytical best practices

## Commands

- **\*analyze {filename}** - Analyze dataset from file
- **\*visualize {data}** - Create visualization of data
- **\*trend-analysis** - Identify trends and patterns
- **\*anomaly-detection** - Find outliers and anomalies
- **\*summary {filename}** - Generate analysis summary
- **\*help** - Show all commands
- **\*exit** - Exit agent

## Resource Dependencies

- **Templates** (~/.claude/templates): analysis-tmpl.yaml, report-tmpl.yaml
- **Data** (~/.claude/data): statistical-methods.md
- **Checklists** (~/.claude/checklists): analysis-checklist.md

## Workflow Patterns

**Typical Analysis Workflow:**
1. User provides dataset (file, paste, describe)
2. Agent asks clarifying questions
3. Agent performs analysis
4. Agent creates visualizations
5. Agent generates insights
6. Agent creates report

**Commands Used:**
- `*analyze [filename]` - Initial analysis
- `*visualize` - Create charts
- `*trend-analysis` - Find patterns
- `*summary` - Export findings

## Execution Guidelines

1. Always ask for clarification about data goals
2. Provide data dictionary (column explanations)
3. Identify and address data quality issues
4. Use appropriate statistical methods
5. Explain findings in business language
6. Provide actionable recommendations

[Rest of agent definition continues...]
```

### Testing Your Agent

1. **Installation:**
   ```bash
   npm link
   ```

2. **Launch Claude** with toolkit

3. **Test in conversation:**
   ```
   @Your Agent Name: [test request]
   ```

4. **Verify:**
   - Agent responds appropriately
   - No errors in console
   - All commands work
   - Resources load correctly

5. **Test edge cases:**
   - Empty input
   - Invalid parameters
   - Missing resources
   - Long responses

## Adding Custom Skills

### Skill Directory Structure

Create new directory in `skills/`:

```
skills/your-skill-name/
├── SKILL.md          (Required) Skill definition
├── SKILL.yaml        (Optional) Manifest
├── examples/         (Optional) Example files
│   └── example1.md
├── templates/        (Optional) Templates
│   └── template.yaml
├── reference.md      (Optional) Reference guide
└── LICENSE.txt       (Optional) License
```

### SKILL.md Format

```markdown
---
name: your-skill-name
description: "What this skill does and when to use it"
license: "License information"
---

# Skill Overview

Clear description of the skill's purpose and capabilities.

## What It Enables

List of key capabilities:
- Capability one
- Capability two
- Capability three

## Use Cases

Example use cases for this skill:
- Use case one: Description
- Use case two: Description

## Getting Started

Quick start instructions.

## Key Features

- Feature one
- Feature two
- Feature three

## Integration

How this skill integrates with agents and other skills.

## Examples

Practical examples of how to use the skill.

## Troubleshooting

Common issues and solutions.

## Advanced Usage

Advanced features and patterns.
```

### Skill Naming Conventions

**Skill Names:**
- Use lowercase with hyphens: `data-export`, `api-client`
- Be descriptive and specific
- Avoid generic names: `analytics-pro` not `analytics`

**Directory Names:**
- Match skill name: `skills/data-export/`
- Use hyphens not underscores
- One skill per directory

**Skill ID (in manifest):**
- Must match directory name
- Used in manifest declaration

### Skill Quality Checklist

Before submitting a skill:

- [ ] **Clear Purpose** - Skill purpose immediately obvious
- [ ] **Well-Documented** - SKILL.md is comprehensive
- [ ] **Unique Value** - Doesn't duplicate existing skills
- [ ] **Use Cases** - Includes real-world use cases
- [ ] **Examples** - Provides working examples
- [ ] **Integration** - Works well with agents
- [ ] **Error Handling** - Handles errors gracefully
- [ ] **No Secrets** - No hardcoded credentials
- [ ] **Tested** - Verified to work as documented
- [ ] **Licensed** - Includes license information

### Example Custom Skill

```markdown
---
name: database-integration
description: Connect to databases, execute queries, and export results for agent use
license: MIT - See LICENSE.txt
---

# Database Integration Skill

Enable agents to connect to databases, execute queries, retrieve data, and export results.

## What It Enables

- Connect to multiple database types (PostgreSQL, MySQL, MongoDB, SQLite)
- Execute read queries safely
- Retrieve and format results
- Export data in multiple formats (JSON, CSV, Excel)
- Create database backups

## Use Cases

- **Data Analytics** - Query analytics database, export metrics
- **Reporting** - Generate reports from live data
- **Data Migration** - Transfer data between systems
- **Integration** - Connect external data sources

## Getting Started

1. Configure database connection
2. Test connection with simple query
3. Query data as needed
4. Export results in desired format

## Key Features

- Multiple database support
- Query safety checks
- Result formatting
- Export options
- Connection pooling
- Error handling

## Integration

Works with:
- **Business Analyst** - Data analysis
- **Full-Stack Developer** - Data access
- **QA Test Architect** - Test data management

## Examples

### Connect to Database
```
@Master: Connect to the analytics database
Host: analytics.company.com
Database: metrics
```

### Query Data
```
@Business Analyst: Query the sales metrics for Q4
```

### Export Results
```
@Master: Export this data as CSV
```

## Advanced Usage

- Connection pooling for performance
- Query optimization tips
- Backup and restore procedures
- Multi-database transactions

[Continue with more detail...]
```

### Testing Your Skill

1. **Verify directory structure:**
   ```bash
   ls -la skills/your-skill-name/
   ```

2. **Check SKILL.md:**
   - Valid markdown
   - Clear examples
   - No broken links

3. **Test with agents:**
   ```
   @Master: Use the your-skill-name skill to [task]
   ```

4. **Verify output:**
   - Results are correct
   - Formatting is good
   - Examples work

## Code Style & Standards

### Markdown Style

- **Headers:** Use proper hierarchy (# ## ###)
- **Code Blocks:** Use triple backticks with language
- **Lists:** Use hyphens for unordered, numbers for ordered
- **Emphasis:** Use **bold** and *italic* appropriately
- **Links:** Use [text](path) format
- **Frontmatter:** Use valid YAML

### YAML Style

```yaml
---
# Keep simple and consistent
name: descriptive-name
description: "Clear, complete description"
color: valid-color-name
---
```

**Valid colors:** red, orange, yellow, green, blue, purple, pink, gray

### Naming Conventions

**Files:**
- Use lowercase
- Use hyphens not underscores
- Be descriptive

**Variables/IDs:**
- lowercase-with-hyphens
- Avoid abbreviations
- Descriptive names

**Commands:**
- Use \* prefix
- Use hyphens not underscores
- Descriptive names

### Documentation Standards

- **Clear language** - Avoid jargon, explain terms
- **Examples** - Provide real-world examples
- **Completeness** - Document all features
- **Consistency** - Match existing documentation style
- **Accuracy** - Ensure all information is correct
- **Currency** - Keep up to date

## Testing Requirements

### Manual Testing

Before submitting, test:

1. **Basic Functionality:**
   - Agent/skill loads correctly
   - Commands/features work
   - No obvious errors

2. **Edge Cases:**
   - Empty input
   - Invalid parameters
   - Missing files
   - Long responses

3. **Integration:**
   - Works with other agents
   - Works with other skills
   - Compatible with variants

4. **Documentation:**
   - Examples work as shown
   - No broken links
   - Instructions are clear

### Validation Checklist

Run before submission:

```bash
# Check markdown formatting
npm run lint:markdown

# Validate YAML
npm run lint:yaml

# Check references
./validate-references.sh

# Verify manifest syntax
npm run validate:manifest
```

### Documentation Tests

- [ ] Links work (or are external)
- [ ] Code examples are accurate
- [ ] Commands are correct
- [ ] File paths are correct
- [ ] No typos or grammar errors

## Submission Process

### Before Submission

1. **Review your contribution:**
   - Meets quality checklist
   - Passes validation
   - Tested thoroughly
   - No security issues

2. **Understand variant system:**
   - Which variant should include your contribution?
   - Update appropriate manifests
   - Ensure backwards compatibility

3. **Document properly:**
   - README section complete
   - Examples clear and working
   - Architecture documented
   - Troubleshooting included

### Submission Steps

1. **Fork Repository:**
   ```bash
   git clone https://github.com/anthropic/agentic-toolkit.git
   cd agentic-kit
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes:**
   - Add your agent/skill files
   - Update manifests as needed
   - Update documentation
   - Commit with clear messages

3. **Commit Convention:**
   ```bash
   git commit -m "Add [agent|skill]: Your Feature Name

   - Description of changes
   - Which variant affected
   - Any breaking changes
   - Related issue (if any): #123"
   ```

4. **Push Branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request:**
   - Clear title: "Add [Agent|Skill]: Feature Name"
   - Detailed description
   - Link related issues
   - Note variant compatibility

6. **PR Template:**
   ```markdown
   ## What This Adds
   Description of new agent/skill and its purpose.

   ## Type
   - [ ] New Agent
   - [ ] New Skill
   - [ ] Bug Fix
   - [ ] Documentation
   - [ ] Other

   ## Variant Compatibility
   - [ ] Lite
   - [ ] Standard
   - [ ] Pro

   ## Testing
   Description of testing performed.

   ## Manifest Changes
   List of manifest updates.

   ## Related Issues
   Closes #123
   ```

### Review Process

1. **Maintainer Review:**
   - Checks quality standards
   - Verifies testing
   - Reviews documentation

2. **Feedback Loop:**
   - May request changes
   - May ask for clarification
   - Working together to improve

3. **Approval & Merge:**
   - Once approved, maintainer merges
   - Your contribution is now part of toolkit
   - You're listed as contributor

## Community Guidelines

### Code of Conduct

- **Be Respectful** - Treat all contributors and users with respect
- **Be Inclusive** - Welcome diverse perspectives and backgrounds
- **Be Constructive** - Offer helpful feedback and solutions
- **Be Professional** - Keep discussions focused and productive

### Communication

- Use English in issues and PRs
- Be clear and detailed in descriptions
- Respond to feedback thoughtfully
- Ask for clarification if needed

### Licensing

- All contributions must be compatible with project license
- Include license information for external code
- Respect open source licenses of dependencies

## Getting Help with Contributions

### Resources

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understanding the system
- **[AGENTS.md](AGENTS.md)** - Agent specifications
- **[SKILLS.md](SKILLS.md)** - Skill specifications
- **Existing agents/skills** - Use as templates

### Asking for Help

1. **Check documentation first**
2. **Look at similar agents/skills**
3. **Ask in issue or discussion**
4. **Contact maintainers** if needed

### Common Questions

**Q: Can I modify existing agents?**
A: Yes, improvements welcome. Submit PR with clear explanation.

**Q: How do I know what to contribute?**
A: Check open issues, look at feature requests, or propose your idea.

**Q: Do I need special permissions?**
A: No, anyone can contribute. Just follow submission process.

**Q: How long until my PR is reviewed?**
A: Usually 3-7 days. Check project for updates.

**Q: Can I create a variant?**
A: Custom variants possible but recommend working with maintainers.

## Success Stories

Celebrate contributions! Successful contributions:

- Added to CONTRIBUTORS.md
- Credited in release notes
- Recognized in community

## Next Steps

1. Read [ARCHITECTURE.md](ARCHITECTURE.md)
2. Review existing agents and skills
3. Choose contribution type
4. Create and test
5. Submit PR with documentation
6. Work with maintainers on feedback
7. Celebrate contribution!

---

**Version:** 1.0.0
**Last Updated:** Nov 2024
**Status:** Open for Contributions

Thanks for contributing to making Agentic Toolkit better!
