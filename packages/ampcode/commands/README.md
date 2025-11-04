# Droid Slash Commands

This directory contains 22 transformed Claude skills converted into Factory.ai CLI compatible Droid slash commands.

## Command Reference by Category

### Core Development Skills (7)
*Code creation, testing, and development workflows*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **algorithmic-art** | Create algorithmic art using p5.js with seeded randomness and interactive parameter exploration | Algorithmic philosophy creation, p5.js templates, generator patterns, interactive viewer creation |
| **artifacts-builder** | Build elaborate multi-component HTML artifacts using React, TypeScript, Tailwind CSS, and shadcn/ui | React + TypeScript setup, shadcn/ui components, Parcel bundling, single HTML output |
| **canvas-design** | Create beautiful visual art in PNG and PDF documents using design philosophy and minimal text | Design philosophy creation, visual expression, minimal text approach, craftsmanship principles |
| **code-review** | Request structured code review to catch issues before they cascade | Mandatory review triggers, focus areas, feedback handling, workflow integration |
| **test-driven-development** | Write test first, watch it fail, write minimal code to pass - ensures tests actually verify behavior | Red-green-refactor cycle, iron law of TDD, test quality standards, common patterns |
| **testing-anti-patterns** | Avoid testing anti-patterns - never test mock behavior, add test-only methods, or mock without understanding | Mock behavior testing prevention, production code pollution avoidance, dependency understanding |
| **skill-creator** | Guide for creating effective skills that extend Claude's capabilities with specialized knowledge | Skill anatomy, progressive disclosure, bundled resources, creation workflow |

### Debugging & Quality (4)
*Systematic debugging, quality assurance, and verification*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **systematic-debugging** | Systematic four-phase debugging framework - investigate root cause before any fixes | Four-phase process (investigation, analysis, hypothesis, implementation), evidence-based debugging |
| **root-cause-tracing** | Systematically trace bugs backward through call stack to find original trigger, never just fix symptoms | Backward tracing process, instrumentation techniques, multi-layer defense, test pollution detection |
| **condition-based-waiting** | Replace arbitrary timeouts with condition polling to eliminate flaky tests from timing guesses | Wait-for-condition patterns, polling implementation, race condition elimination |
| **verification-before-completion** | Evidence before claims - verify work completion with fresh verification commands | Iron law of verification, gate function, common failure patterns, evidence-based reporting |

### Communication & Documentation (4)
*Writing, collaboration, and documentation workflows*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **brainstorming** | Turn rough ideas into fully-formed designs through collaborative questioning and exploration | Process-based questioning, approach exploration, design presentation, documentation workflow |
| **internal-comms** | Write internal communications using company-approved formats and templates | 3P updates, company newsletters, FAQ responses, status reports, leadership communications |
| **brand-guidelines** | Apply Anthropic's official brand colors and typography to any artifact | Official color palette (orange, blue, green, grays), Poppins/Lora fonts, CSS/Python implementations |
| **mcp-builder** | Create high-quality MCP servers that enable LLMs to interact with external services through well-designed tools | MCP protocol, agent-centric design, workflow optimization, Python/Node implementations |

### File Processing & Office Tools (4)
*Document, presentation, and spreadsheet manipulation*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **pdf** | Comprehensive PDF processing toolkit - extract text/tables, create PDFs, merge/split, handle forms | pypdf operations, form handling, image conversion, JavaScript pdf-lib, table extraction |
| **docx** | Create, edit, and manipulate Word documents with JavaScript library and XML manipulation | docx library, raw XML editing, comments, tracked changes, validation schemas |
| **pptx** | Create, edit, and analyze PowerPoint presentations with HTML conversion, XML manipulation, and design principles | Design-first approach, color palettes, HTML-to-PPTX conversion, XML structure access |
| **xlsx** | Create, edit, and analyze spreadsheets with formulas, formatting, data analysis, and visualization | Formula requirements, pandas/openpyxl workflows, financial modeling standards, recalculation tools |

### Web & API Integration (2)
*Web application testing and API integration*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **webapp-testing** | Test local web applications using Playwright - verify functionality, debug UI, capture screenshots | Playwright setup, server management, reconnaissance pattern, common testing patterns |
| **theme-factory** | Apply professional themes to artifacts - 10 curated themes with color palettes and font pairings | 10 pre-built themes, theme showcase, custom theme creation, application standards |

### Creative & Animation (1)
*Animation and visual creativity*

| Command | Purpose | Key Features |
|---------|---------|--------------|
| **slack-gif-creator** | Create animated GIFs optimized for Slack with size validation and composable animation primitives | Slack size constraints, validation tools, animation primitives (shake, bounce, spin, etc.), optimization strategies |

## Usage

Each command can be invoked in Droid with:
```
/command-name <optional-arguments>
```

Arguments should match the `argument-hint` specified in each command's YAML frontmatter.

## Transformation Process

These commands were transformed from Claude skills located in `~/.factory/commands/` according to Factory.ai CLI formatting requirements. Each skill was renamed from `SKILL.md` to `{skill-name}.md` and reformatted with proper YAML frontmatter for Droid compatibility.
