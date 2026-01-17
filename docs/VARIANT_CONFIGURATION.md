# Variant Configuration Guide

**Purpose:** This document explains the rationale for variant configurations and skill selection across all agentic-kit tools (Claude, Opencode, Ampcode, Droid).

**Last Updated:** 2025-11-04

---

## Table of Contents

1. [Variant Philosophy](#variant-philosophy)
2. [Core Skills Selection](#core-skills-selection)
3. [Variant Breakdown](#variant-breakdown)
4. [Tool-Specific Optimizations](#tool-specific-optimizations)
5. [Usage Recommendations](#usage-recommendations)

---

## Variant Philosophy

The agentic-kit installer offers **three variant levels** to accommodate different user needs and resource constraints:

### Design Principles

1. **Progressive Capability:** Each variant builds upon the previous, adding functionality without removing features
2. **Clear Use Cases:** Each variant targets specific user personas and workflows
3. **Resource Optimization:** Variants minimize disk space and cognitive load while maximizing value
4. **Consistent Core:** All tools share the same variant structure for predictability

### Variant Tiers

| Variant | Agents | Skills | Target Users | Disk Space |
|---------|--------|--------|--------------|------------|
| **Lite** | 3 core | 0 | Beginners, evaluators, minimal setup | ~5-10 MB |
| **Standard** | All (13) | 8 core | Professional developers, teams | ~50-100 MB |
| **Pro** | All (13) | All (22) | Power users, enterprises | ~150-200 MB |

---

## Core Skills Selection

The **8 core skills** included in the Standard variant were selected based on:

### Selection Criteria

1. **Universal Applicability:** Skills useful across all development workflows
2. **Professional Necessity:** Capabilities required for professional development work
3. **Document Processing:** Essential document creation and manipulation
4. **Design Integration:** Basic design and branding capabilities
5. **Communication Support:** Internal communication and documentation needs

### The 8 Core Skills

#### Document Processing Skills (4)

**1. pdf**
- **Purpose:** PDF manipulation, form filling, document generation
- **Rationale:** PDFs are ubiquitous in professional workflows (contracts, reports, forms)
- **Use Cases:** Invoice generation, form automation, document archival
- **Size:** ~2 MB (scripts, reference docs)

**2. docx**
- **Purpose:** Microsoft Word document creation and editing
- **Rationale:** Word is the standard for collaborative document editing
- **Use Cases:** Technical documentation, proposals, reports, templates
- **Size:** ~8 MB (OOXML schemas, validation scripts)

**3. xlsx**
- **Purpose:** Excel spreadsheet operations
- **Rationale:** Spreadsheets essential for data analysis and reporting
- **Use Cases:** Data exports, financial reports, automated dashboards
- **Size:** ~500 KB (Python libraries, recalc scripts)

**4. pptx**
- **Purpose:** PowerPoint presentation creation
- **Rationale:** Presentations required for stakeholder communication
- **Use Cases:** Project updates, design presentations, pitch decks
- **Size:** ~8 MB (OOXML schemas, HTML conversion)

#### Design & Branding Skills (3)

**5. canvas-design**
- **Purpose:** Graphics, diagrams, and visual content creation
- **Rationale:** Visual communication essential for modern development
- **Use Cases:** Architecture diagrams, social media graphics, infographics
- **Size:** ~15 MB (50+ fonts, templates)
- **Note:** Largest skill due to font library

**6. theme-factory**
- **Purpose:** Design theme generation (colors, typography, branding)
- **Rationale:** Consistent branding required across professional projects
- **Use Cases:** Design systems, brand identity, UI theming
- **Size:** ~1 MB (theme templates, showcase)

**7. brand-guidelines**
- **Purpose:** Brand guideline document generation
- **Rationale:** Brand documentation essential for team alignment
- **Use Cases:** Style guides, brand handoffs, design documentation
- **Size:** ~100 KB (templates)

#### Communication Skill (1)

**8. internal-comms**
- **Purpose:** Internal communication content (newsletters, updates, FAQs)
- **Rationale:** Team communication foundational to all projects
- **Use Cases:** Release notes, team announcements, documentation
- **Size:** ~200 KB (templates, examples)

### Skills Excluded from Standard (14)

These advanced skills are available only in the **Pro variant**:

**Development Skills:**
- `artifacts-builder` - Web artifact creation (React, Tailwind)
- `code-review` - Automated code review
- `mcp-builder` - MCP server builder
- `skill-creator` - Create new skills

**Testing & Debugging:**
- `condition-based-waiting` - Test wait conditions
- `root-cause-tracing` - Bug root cause analysis
- `systematic-debugging` - Structured debugging
- `test-driven-development` - TDD methodology
- `testing-anti-patterns` - Test anti-pattern detection
- `webapp-testing` - Playwright web testing

**Creative Skills:**
- `algorithmic-art` - Generative art
- `slack-gif-creator` - Animated GIF creation

**Workflow Skills:**
- `brainstorming` - Facilitated brainstorming
- `verification-before-completion` - Pre-completion checks

**Rationale for Exclusion:**
- Specialized use cases (not universally needed)
- Advanced/power user features
- Niche workflows (algorithmic art, GIF creation)
- Development-specific tools (MCP, artifacts)

---

## Variant Breakdown

### Lite Variant

**Purpose:** Minimal installation for evaluation and basic workflow management

**Included:**
- 3 agents: `master`, `orchestrator`, `story-writer`
- 0 skills
- All resources (agent-teams.yaml, checklists.md, etc.)
- All hooks

**Use Cases:**
- Try agentic-kit with minimal commitment
- Learn the agent system before full installation
- Limited resource environments (cloud VMs, containers)
- Quick setup for demonstrations

**Capabilities:**
- Task execution and management
- Multi-agent workflows
- Agile sprint management
- Resource-driven operations (checklists, templates)

**Limitations:**
- No document processing
- No design capabilities
- No specialized skills
- Basic workflow support only

### Standard Variant (Recommended)

**Purpose:** Balanced installation for professional development

**Included:**
- 13 agents: All agents (master, orchestrator, specialized domain agents)
- 8 skills: Core document processing and design (pdf, docx, xlsx, pptx, canvas-design, theme-factory, brand-guidelines, internal-comms)
- All resources
- All hooks

**Use Cases:**
- Professional software development
- Team collaboration
- Document creation and automation
- Design and branding work
- 90% of user workflows

**Capabilities:**
- Full agent suite (PRD creation, task generation, development, QA, UX)
- Complete document processing pipeline
- Design and branding support
- Internal communication tools
- Resource and template management

**Recommended For:**
- Professional developers
- Development teams
- Consultants and agencies
- Anyone doing serious development work

### Pro Variant

**Purpose:** Complete installation with all capabilities

**Included:**
- 13 agents: All agents
- 22 skills: All skills (8 core + 14 advanced)
- All resources
- All hooks

**Use Cases:**
- Power users needing every capability
- Enterprise teams with diverse needs
- Development teams doing advanced testing
- Creative workflows requiring algorithmic art/GIFs
- MCP server development
- Custom skill creation

**Capabilities:**
- Everything in Standard, plus:
- Advanced testing (Playwright, condition-based waiting)
- Debugging tools (root cause tracing, systematic debugging)
- Creative tools (algorithmic art, GIF creation)
- Development tools (MCP builder, artifact builder)
- Skill creation and customization

**Recommended For:**
- Power users
- Enterprises
- Teams with comprehensive requirements
- Users exploring all capabilities

---

## Tool-Specific Optimizations

While all tools share the same variant structure and core skills, each has optimizations:

### Claude (Conversational AI)
- **Optimization:** `conversational-ai`
- **Focus:** Natural language interactions, markdown-first
- **Strengths:** Extensive documentation, conversational tone
- **Best For:** Teams preferring conversational interfaces

### Opencode (CLI-Optimized)
- **Optimization:** `cli-codegen`
- **Focus:** Terminal-first workflows, command-line integration
- **Strengths:** Fast execution, scriptable, automation-ready
- **Best For:** CLI power users, terminal enthusiasts, DevOps

### Ampcode (Amplified Development)
- **Optimization:** `amplified-codegen`
- **Focus:** Maximum velocity, automation-focused
- **Strengths:** Rapid development, high throughput
- **Best For:** Teams focused on velocity, fast-paced projects

### Droid (Mobile Development)
- **Optimization:** `mobile-codegen`
- **Focus:** Android-first, mobile patterns
- **Strengths:** Mobile-specific workflows, Android Studio integration
- **Best For:** Android developers, mobile development teams

---

## Usage Recommendations

### Choosing a Variant

**Start with Lite if:**
- You're evaluating agentic-kit for the first time
- You have limited disk space (< 50 MB available)
- You only need basic workflow management
- You want to learn the system before full installation

**Choose Standard if:**
- You're a professional developer (90% of users)
- You need document processing capabilities
- You work on team projects requiring design/branding
- You want the "recommended" configuration
- You have 50-100 MB disk space available

**Choose Pro if:**
- You need every capability
- You're doing advanced testing or debugging
- You're building custom skills or MCP servers
- You have specialized creative needs (art, GIFs)
- You have 150-200 MB disk space available
- You're an enterprise with diverse requirements

### Upgrading Between Variants

The installer supports seamless upgrades:

```bash
# Upgrade from Lite to Standard
node installer/cli.js --upgrade claude standard

# Upgrade from Standard to Pro
node installer/cli.js --upgrade claude pro

# Downgrade from Pro to Standard (if needed)
node installer/cli.js --upgrade claude standard
```

**Upgrade Process:**
- Automatic backup created before upgrade
- Only adds/removes differential files
- Preserves user-created content
- Updates manifest with new variant metadata

### Choosing a Tool

**Choose Claude if:**
- You prefer conversational interfaces
- You value extensive documentation
- You're comfortable with markdown-first workflows

**Choose Opencode if:**
- You're a CLI power user
- You prefer terminal-based workflows
- You need scriptable, automatable processes

**Choose Ampcode if:**
- You prioritize development velocity
- You need maximum throughput
- You're focused on rapid iteration

**Choose Droid if:**
- You're developing Android applications
- You need mobile-specific patterns
- You work in Android Studio

### Multi-Tool Installation

You can install multiple tools simultaneously:

```bash
# Install both Claude (standard) and Opencode (lite)
node installer/cli.js --tools claude,opencode --variant standard

# Install to custom paths
node installer/cli.js --tools claude --path claude=~/.claude-ai
```

---

## Maintenance and Updates

### Skill Updates

Skills are updated independently of agents:

- **Minor Updates:** Bug fixes, improved documentation
- **Major Updates:** New features, breaking changes
- **Deprecations:** Announced 6 months in advance

### Variant Evolution

As agentic-kit evolves, variant definitions may change:

**Standard Variant Philosophy:**
- Will always include essential document processing (pdf, docx, xlsx, pptx)
- May add new "core" skills if universally useful
- Will maintain ~8-12 skills to balance capability vs. bloat

**Pro Variant Philosophy:**
- Will include all available skills (no limit)
- New experimental skills added here first
- Power users get early access to new capabilities

---

## Customization

### Custom Variants

Advanced users can create custom `variants.json` configurations:

```json
{
  "custom": {
    "name": "Custom",
    "description": "My custom variant",
    "useCase": "Specific to my workflow",
    "targetUsers": "Me",
    "agents": ["master", "orchestrator", "code-developer"],
    "skills": ["pdf", "docx", "code-review", "webapp-testing"],
    "resources": "*",
    "hooks": "*"
  }
}
```

Then install with:
```bash
node installer/cli.js --variant custom
```

### Skill-Specific Installation

While not officially supported, you can manually add specific skills:

1. Install desired variant
2. Manually copy skill directories from another installation
3. Update `manifest.json` to include new skills

---

## Summary

**Key Takeaways:**

1. **Three Variants:** Lite (minimal), Standard (recommended), Pro (complete)
2. **8 Core Skills:** Document processing (pdf, docx, xlsx, pptx) + Design (canvas-design, theme-factory, brand-guidelines) + Communication (internal-comms)
3. **Standard for Most:** 90% of users should choose Standard variant
4. **Tool-Specific:** Each tool optimized for different workflows (conversational, CLI, amplified, mobile)
5. **Upgradeable:** Easy to upgrade between variants as needs change

**Configuration Files:**
- `packages/claude/variants.json` - Claude variant definitions
- `packages/opencode/variants.json` - Opencode variant definitions
- `packages/ampcode/variants.json` - Ampcode variant definitions
- `packages/droid/variants.json` - Droid variant definitions

**Related Documentation:**
- `docs/PACKAGE_BASELINE.md` - Claude package structure reference
- `installer/README.md` - Installation instructions
- `docs/INSTALLER_GUIDE.md` - Comprehensive installer guide (coming in Phase 7.0)

---

## Version History

- **2025-11-04:** Initial documentation
  - Documented 8 core skills rationale
  - Explained variant philosophy
  - Provided usage recommendations
  - Documented tool-specific optimizations
