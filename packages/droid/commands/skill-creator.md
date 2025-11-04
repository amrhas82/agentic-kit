---
description: Guide for creating effective skills that extend Claude's capabilities with specialized knowledge
argument-hint: <skill-concept>
---

Create effective skills that extend Claude's capabilities with specialized knowledge, workflows, and tool integrations.

## What Skills Provide

1. **Specialized workflows** - Multi-step procedures for specific domains
2. **Tool integrations** - Instructions for working with specific file formats or APIs  
3. **Domain expertise** - Company-specific knowledge, schemas, business logic
4. **Bundled resources** - Scripts, references, and assets for complex tasks

## Anatomy of a Skill

```
skill-name/
├── SKILL.md (required)
│   ├── YAML frontmatter metadata (required)
│   │   ├── name: (required)
│   │   └── description: (required)
│   └── Markdown instructions (required)
└── Bundled Resources (optional)
    ├── scripts/          - Executable code (Python/Bash/etc.)
    ├── references/       - Documentation for context loading
    └── assets/           - Files used in output (templates, icons, fonts)
```

### SKILL.md Structure

**YAML Frontmatter:**
```yaml
---
name: skill-name
description: This skill should be used when [specific use case]. [What it does].
license: License information
---
```

**Content Guidelines:**
- Be specific about what the skill does and when to use it
- Use third-person perspective ("This skill should be used when...")
- Keep body under 5k words for context efficiency
- Include concrete examples and patterns
- Progressive disclosure: core info in SKILL.md, detailed info in references/

### Bundled Resources

#### Scripts (`scripts/`)
- **Purpose:** Deterministic, reusable code that gets rewritten repeatedly
- **When to include:** Same code patterns across projects, need reliability
- **Examples:** PDF rotation, data transformation, file processing
- **Benefits:** Token efficient, deterministic, executable without context loading

#### References (`references/`)
- **Purpose:** Documentation loaded as needed into context
- **When to include:** Large documentation, schemas, API specs, company policies
- **Best practices:** 
  - Keep SKILL.md lean (<5k words)
  - Move detailed info to references files
  - Use grep patterns for large files (>10k words)
- **Examples:** Financial schemas, API documentation, domain knowledge

#### Assets (`assets/`)
- **Purpose:** Files used in output, not loaded into context
- **When to include:** Templates, images, boilerplate code, fonts
- **Examples:** HTML templates, PowerPoint slides, brand assets, sample documents
- **Benefits:** Separates output resources from documentation

## Skill Creation Process

### Step 1: Understanding with Concrete Examples

Understand concrete usage patterns before building:

**Questions to ask:**
- What functionality should this skill support?
- Can you give examples of how this skill would be used?
- What are the most common workflows?
- What knowledge gaps exist that this skill should fill?

**Validation:** Generate examples and validate with user feedback

### Step 2: Define Scope and Boundaries

**Scope definition:**
- What is IN the skill's domain?
- What is OUT of scope?
- When should this skill trigger vs. other skills?

**Naming guidelines:**
- Use descriptive, domain-specific names
- Avoid generic names ("file-handler" vs. "document-processor")
- Consider workflow names users would recognize

### Step 3: Structure the Knowledge

**Progressive disclosure:**
1. **Metadata** (100 words) - Always loaded
2. **SKILL.md body** (<5k words) - When skill triggers  
3. **Bundled resources** (unlimited) - As needed

**Content organization:**
- Core procedural knowledge in SKILL.md
- Detailed reference material in references/
- Reusable code patterns in scripts/
- Output templates in assets/

### Step 4: Write Effective Instructions

**Instruction quality:**
- Clear, actionable steps
- Concrete examples with actual code
- Common patterns and anti-patterns
- Edge cases and error handling
- Integration points with other tools

**Examples structure:**
```markdown
## Usage Examples

**Basic usage:**
`/skill-name input-file`

**Advanced workflow:**
`/skill-name complex-input --option value`

**Common patterns:**
```typescript
// Example code showing the pattern
```
```

### Step 5: Add Bundled Resources

**Scripts inclusion criteria:**
- Code rewritten repeatedly across projects
- Deterministic operations requiring reliability
- Complex multi-step workflows

**References inclusion criteria:**
- Documentation >10k words
- Technical specifications and schemas
- Company policies and procedures
- API documentation and examples

**Assets inclusion criteria:**
- Templates used in output
- Brand materials and styling
- Boilerplate code structures
- Sample documents for modification

### Step 6: Test and Refine

**Testing approach:**
- Create example use cases
- Validate with real scenarios
- Check instruction clarity
- Verify bundled resource integration

**Quality checklist:**
- [ ] Name and description are specific and accurate
- [ ] Instructions are actionable and clear
- [ ] Examples demonstrate real usage
- [ ] Bundled resources are properly organized
- [ ] Progressive disclosure works effectively

## Best Practices

**Do:**
- Be specific about use cases and boundaries
- Include concrete examples and patterns
- Use progressive disclosure for complex topics
- Bundle resources when reused across projects
- Test with real scenarios

**Don't:**
- Make instructions too generic
- Include everything in SKILL.md
- Create skills for single-use cases
- Over-bundle resources unnecessarily
- Skip validation with actual examples

## Usage Examples

**Create new skill:**
`/skill-creator "document processing skill for PDF forms"`

**Improve existing skill:**
`/skill-creator "enhance PDF processing with better error handling"`

**Bundle resources:**
`/skill-creator "create skill with scripts and reference docs"`

Remember: Skills are "onboarding guides" for specialized domains—they should transform Claude from general-purpose to specialized expert.
