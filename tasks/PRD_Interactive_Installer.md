# Product Requirements Document (PRD)
## Interactive Multi-Tool Installer System

### 1. Executive Summary

This PRD defines requirements for an interactive installer system that supports multiple AI coding tools (Claude Code, Opencode, Ampcode, Droid) with different package variants and clear installation path management. The system will provide users with a step-by-step installation process with clear feedback about what was installed where.

### 2. Problem Statement

**Current Issues:**
1. **Installation Location Ambiguity** - Users don't know where npm packages are installed (should be ~/.claude for Claude)
2. **Poor Installation Feedback** - "1 package installed in 3 seconds" doesn't indicate location or contents
3. **Single-Tool Limitation** - Current system only supports Claude Code, but users need multiple tools
4. **No Package Selection** - Users can't choose between Lite/Standard/Pro variants interactively
5. **Path Management** - No way to customize or verify installation paths for different tools

### 3. Goals & Objectives

**Primary Goals:**
- Provide clear visibility into installation locations and contents
- Support multiple AI coding tools with unified installer
- Enable interactive package and tool selection
- Give users control over installation paths

**Success Metrics:**
- 100% clarity on where files are installed
- Support for 4+ tools with proper path isolation
- < 2 minute installation time for any configuration
- Zero post-installation confusion about what was installed

### 4. User Personas

**Primary Users:**
1. **Developer** - Technical user installing multiple tools for different projects
2. **Product Manager** - Non-technical user who needs simple installation process
3. **System Administrator** - Managing installations across teams/organizations

### 5. Functional Requirements

#### 5.1 Interactive Installation Flow

**Step 1/4 - Package Selection**
- Display 3 variants: Lite, Standard, Pro
- Show feature comparison table
- Allow user selection via keyboard or mouse
- Default selection: Standard

**Step 2/4 - Tool Selection**
- Display available tools: Claude Code, Opencode, Ampcode, Droid
- Support multi-selection with checkboxes
- Show tool descriptions and target directories
- Default: No tools selected (minimum 1 required to proceed)

**Step 3/4 - Path Configuration**
- Display default paths for selected tools only:
  - Claude Code: ~/.claude
  - Opencode: ~/.config/opencode
  - Ampcode: ~/.amp
  - Droid: ~/.factory
- Default paths applied to selected tools
- Allow path customization per tool (optional)
- When user specifies custom path: show confirmation dialog with path validation
- Validate path permissions and availability
- Show disk space requirements
- Require confirmation when custom paths are specified

**Step 4/4 - Installation Summary**
- Show detailed summary of what will be installed
- Display counts: subagents, skills, resources per tool
- Show overwrite warnings for existing installations
- Highlight any custom paths with confirmation requirement
- Require confirmation before proceeding

#### 5.2 Installation Process

**File Operations:**
- Copy agents/ to selected tool directories
- Copy skills/ based on variant selection
- Copy resources/ and hooks/ as needed
- Create/update manifest files per tool
- Set proper file permissions

**Progress Tracking:**
- Real-time progress bar per tool
- Show current file being copied
- Display installation speed and ETA
- Handle errors gracefully with rollback option

#### 5.3 Post-Installation Verification

**Verification Steps:**
- Validate all files copied successfully
- Check manifest integrity
- Verify tool can detect installed components
- Generate installation report

**Reporting:**
- Detailed installation log
- File counts and sizes per tool
- Path locations and permissions
- Next steps for each tool

### 6. Non-Functional Requirements

#### 6.1 Performance
- Installation time: < 2 minutes for any configuration
- Startup time: < 3 seconds to launch interactive installer
- Memory usage: < 50MB during installation

#### 6.2 Usability
- CLI and GUI interface options
- Keyboard navigation support
- Clear error messages with solutions
- Undo/rollback capability

#### 6.3 Compatibility
- Node.js 14+ support
- Windows, macOS, Linux compatibility
- Support for custom installation directories
- Integration with existing tool ecosystems

#### 6.4 Reliability
- Atomic installation operations
- Rollback on failure
- Validation before and after installation
- Handle interrupted installations

### 7. Technical Requirements

#### 7.1 Architecture

**Components:**
1. **Interactive CLI** - Main installer interface
2. **Path Manager** - Handles tool-specific paths and validation
3. **Package Manager** - Manages tool-specific variant content
4. **Installation Engine** - Performs file operations with rollback
5. **Verification System** - Validates installations

#### 7.1.1 Tool-Specific Package Architecture

**Core Principle:** Each AI tool requires optimized packages tailored to its specific capabilities, interaction patterns, and platform requirements.

**Tool-Specific Optimizations:**
- **Claude Code**: Agents optimized for conversational AI interactions, markdown formatting, and Claude's response patterns
- **Opencode**: Agents optimized for CLI-based AI codegen, command-line workflows, and terminal-based development interactions
- **Ampcode**: Agents optimized for amplified AI codegen workflows, enhanced automation capabilities, and accelerated development
- **Droid**: Agents optimized for AI codegen in mobile/Android development, mobile-specific patterns, and platform integration

**Package Differentiation Strategy:**
- Agent prompting strategies adapted per tool
- Skill implementations optimized for tool capabilities
- Resource formats tailored to tool expectations
- Hook configurations specific to tool integration points

#### 7.2 File Structure

**Source Structure:**
```
agentic-kit/
├── packages/
│   ├── claude/
│   │   ├── agents/              # All 13 agents optimized for Claude
│   │   ├── skills/              # All 14 skills compatible with Claude
│   │   ├── resources/           # Claude-specific resources
│   │   ├── hooks/               # Claude-specific hooks
│   │   └── variants.json        # Variant configuration
│   ├── opencode/
│   │   ├── agents/              # All 13 agents optimized for Opencode
│   │   ├── skills/              # All 14 skills compatible with Opencode
│   │   ├── resources/           # Opencode-specific resources
│   │   ├── hooks/               # Opencode-specific hooks
│   │   └── variants.json        # Variant configuration
│   ├── ampcode/
│   │   ├── agents/              # All 13 agents optimized for Ampcode
│   │   ├── skills/              # All 14 skills compatible with Ampcode
│   │   ├── resources/           # Ampcode-specific resources
│   │   ├── hooks/               # Ampcode-specific hooks
│   │   └── variants.json        # Variant configuration
│   └── droid/
│       ├── agents/              # All 13 agents optimized for Droid
│       ├── skills/              # All 14 skills compatible with Droid
│       ├── resources/           # Droid-specific resources
│       ├── hooks/               # Droid-specific hooks
│       └── variants.json        # Variant configuration
├── shared/
│   ├── agents/              # Common agent definitions
│   ├── skills/              # Common skill definitions
│   ├── resources/           # Common resources
│   └── hooks/                # Common hooks
├── tools/
│   ├── claude/
│   │   └── manifest-template.json
│   ├── opencode/
│   │   └── manifest-template.json
│   ├── ampcode/
│   │   └── manifest-template.json
│   └── droid/
│   │   └── manifest-template.json
└── installer/
    ├── cli.js
    ├── path-manager.js
    ├── package-manager.js
    ├── installation-engine.js
    └── verification-system.js
```

#### 7.2.1 Variant Configuration System

**Core Principle:** Single source of truth for each tool with variant-specific configurations determining content selection.

**variants.json Format:**
```json
{
  "lite": {
    "description": "Minimal setup with 3 core agents",
    "agents": ["master", "orchestrator", "scrum-master"],
    "skills": [],
    "resources": ["basic-templates.yaml"],
    "hooks": ["basic-register.js"]
  },
  "standard": {
    "description": "Full agent set with 8 core skills",
    "agents": ["*"],
    "skills": [
      "pdf", "docx", "xlsx", "pptx", 
      "canvas-design", "theme-factory", 
      "brand-guidelines", "internal-comms"
    ],
    "resources": ["*"],
    "hooks": ["*"]
  },
  "pro": {
    "description": "Complete toolkit with all advanced skills",
    "agents": ["*"],
    "skills": ["*"],
    "resources": ["*"],
    "hooks": ["*"]
  }
}
```

**Variant Selection Logic:**
- `"*"` - Include all items in category
- `["item1", "item2"]` - Include specific items only
- `[]` - Include no items from category

**Installation Process:**
1. Read variants.json for selected tool
2. Parse selected variant configuration
3. Copy only specified agents/skills/resources/hooks
4. Generate manifest based on actual copied content

**Benefits:**
- No content duplication between variants
- Single source of truth for each tool
- Easy to maintain and update
- Flexible variant definitions
- Reduced storage requirements

**Package Organization Rationale:**

1. **Tool-Specific Optimization**: Each tool directory contains packages optimized for that tool's AI codegen capabilities:
   - **Claude**: Conversational AI patterns, markdown formatting, Claude-specific response handling
   - **Opencode**: CLI-based AI codegen agents, terminal workflows, command-line integration
   - **Ampcode**: Enhanced AI codegen automation agents, amplified development workflows
   - **Droid**: Mobile-focused AI codegen agents, Android development patterns, platform integration

2. **Single Source Architecture**: Each tool has one complete package with variant configurations determining content selection, eliminating duplication

3. **Variant Configuration System**: `variants.json` files define what content goes into each variant (Lite/Standard/Pro) using flexible selection patterns

4. **Shared Components**: Common definitions in `shared/` prevent duplication while allowing tool-specific customization

5. **Manifest Templates**: Tool-specific manifest templates ensure proper integration with each platform
agentic-kit/
├── packages/
│   ├── claude/
│   │   ├── lite/
│   │   │   ├── agents/ (3 core agents for Claude)
│   │   │   ├── skills/ (empty)
│   │   │   ├── resources/ (Claude-specific resources)
│   │   │   └── hooks/ (Claude-specific hooks)
│   │   ├── standard/
│   │   │   ├── agents/ (13 agents optimized for Claude)
│   │   │   ├── skills/ (8 skills compatible with Claude)
│   │   │   ├── resources/ (Claude-specific resources)
│   │   │   └── hooks/ (Claude-specific hooks)
│   │   └── pro/
│   │       ├── agents/ (13 agents optimized for Claude)
│   │       ├── skills/ (14 skills compatible with Claude)
│   │       ├── resources/ (Claude-specific resources)
│   │       └── hooks/ (Claude-specific hooks)
│   ├── opencode/
│   │   ├── lite/
│   │   │   ├── agents/ (3 core agents for Opencode)
│   │   │   ├── skills/ (empty)
│   │   │   ├── resources/ (Opencode-specific resources)
│   │   │   └── hooks/ (Opencode-specific hooks)
│   │   ├── standard/
│   │   │   ├── agents/ (13 agents optimized for Opencode)
│   │   │   ├── skills/ (8 skills compatible with Opencode)
│   │   │   ├── resources/ (Opencode-specific resources)
│   │   │   └── hooks/ (Opencode-specific hooks)
│   │   └── pro/
│   │       ├── agents/ (13 agents optimized for Opencode)
│   │       ├── skills/ (14 skills compatible with Opencode)
│   │       ├── resources/ (Opencode-specific resources)
│   │       └── hooks/ (Opencode-specific hooks)
│   ├── ampcode/
│   │   ├── lite/
│   │   │   ├── agents/ (3 core agents for Ampcode)
│   │   │   ├── skills/ (empty)
│   │   │   ├── resources/ (Ampcode-specific resources)
│   │   │   └── hooks/ (Ampcode-specific hooks)
│   │   ├── standard/
│   │   │   ├── agents/ (13 agents optimized for Ampcode)
│   │   │   ├── skills/ (8 skills compatible with Ampcode)
│   │   │   ├── resources/ (Ampcode-specific resources)
│   │   │   └── hooks/ (Ampcode-specific hooks)
│   │   └── pro/
│   │       ├── agents/ (13 agents optimized for Ampcode)
│   │       ├── skills/ (14 skills compatible with Ampcode)
│   │       ├── resources/ (Ampcode-specific resources)
│   │       └── hooks/ (Ampcode-specific hooks)
│   └── droid/
│       ├── lite/
│       │   ├── agents/ (3 core agents for Droid)
│       │   ├── skills/ (empty)
│       │   ├── resources/ (Droid-specific resources)
│       │   └── hooks/ (Droid-specific hooks)
│       ├── standard/
│       │   ├── agents/ (13 agents optimized for Droid)
│       │   ├── skills/ (8 skills compatible with Droid)
│       │   ├── resources/ (Droid-specific resources)
│       │   └── hooks/ (Droid-specific hooks)
│       └── pro/
│           ├── agents/ (13 agents optimized for Droid)
│           ├── skills/ (14 skills compatible with Droid)
           ├── resources/ (Droid-specific resources)
│           └── hooks/ (Droid-specific hooks)
├── shared/
│   ├── agents/              # Common agent definitions
│   ├── skills/              # Common skill definitions
│   ├── resources/           # Common resources
│   └── hooks/                # Common hooks
├── tools/
│   ├── claude/
│   │   └── manifest-template.json
│   ├── opencode/
│   │   └── manifest-template.json
│   ├── ampcode/
│   │   └── manifest-template.json
│   └── droid/
│   │   └── manifest-template.json
└── installer/
    ├── cli.js
    ├── path-manager.js
    ├── package-manager.js
    ├── installation-engine.js
    └── verification-system.js
```

**Target Structure:**
```
~/.claude/
├── agents/              # Claude-optimized agents
├── skills/              # Claude-compatible skills
├── resources/           # Claude-specific resources
├── hooks/               # Claude-specific hooks
└── manifest.json        # Claude installation manifest

~/.config/opencode/
├── agents/              # Opencode-optimized agents
├── skills/              # Opencode-compatible skills
├── resources/           # Opencode-specific resources
├── hooks/               # Opencode-specific hooks
└── manifest.json        # Opencode installation manifest

~/.amp/
├── agents/              # Ampcode-optimized agents
├── skills/              # Ampcode-compatible skills
├── resources/           # Ampcode-specific resources
├── hooks/               # Ampcode-specific hooks
└── manifest.json        # Ampcode installation manifest

~/.factory/
├── agents/              # Droid-optimized agents
├── skills/              # Droid-compatible skills
├── resources/           # Droid-specific resources
├── hooks/               # Droid-specific hooks
└── manifest.json        # Droid installation manifest
```

#### 7.3 Manifest Format

```json
{
  "tool": "claude",
  "variant": "standard",
  "version": "1.1.0",
  "installed_at": "2025-01-15T10:30:00Z",
  "tool_optimization": "conversational-ai",
  "components": {
    "agents": 13,
    "skills": 8,
    "resources": 1,
    "hooks": 2
  },
  "paths": {
    "agents": "~/.claude/agents",
    "skills": "~/.claude/skills",
    "resources": "~/.claude/resources",
    "hooks": "~/.claude/hooks"
  },
  "optimizations": {
    "agent_format": "claude-conversational",
    "skill_compatibility": "claude-native",
    "resource_format": "markdown",
    "hook_integration": "claude-plugin"
  },
  "files": {
    "total": 156,
    "size": "2.3MB"
  }
}
```

**Tool-Specific Manifest Fields:**

- **tool_optimization**: Indicates the AI codegen optimization approach (conversational-ai, cli-codegen, amplified-codegen, mobile-codegen)
- **optimizations**: Tool-specific configuration details
- **agent_format**: How agents are formatted for the target tool
- **skill_compatibility**: Compatibility level with tool capabilities
- **resource_format**: Preferred resource format for the tool
- **hook_integration**: How hooks integrate with the tool's ecosystem

### 8. User Interface Design

#### 8.1 CLI Interface

**Welcome Screen:**
```
┌─────────────────────────────────────────────────────────────┐
│              Agentic Kit Installer v1.1.0                    │
│         Multi-Tool AI Development Kit Installer               │
└─────────────────────────────────────────────────────────────┘

This installer will set up AI development tools for:
• Claude Code • Opencode • Ampcode • Droid

Press Enter to begin or Ctrl+C to exit
```

**Step 1 - Package Selection:**
```
Step 1/4 — Choose Package Variant

┌─────────────┬─────────┬─────────┬─────────────────────────────┐
│ Variant     │ Agents  │ Skills  │ Description                 │
├─────────────┼─────────┼─────────┼─────────────────────────────┤
│ ○ Lite      │    3    │    0    │ Minimal setup, CI/CD        │
│ ● Standard  │   13    │    8    │ Most users, general dev      │
│ ○ Pro       │   13    │   14    │ Advanced users, full features│
└─────────────┴─────────┴─────────┴─────────────────────────────┘

Use arrow keys to navigate, Enter to select
```

**Step 3 - Tool Selection:**
```
Step 2/4 — Choose Tools (Minimum 1 required)

┌─────────────────┬─────────────────────────────┐
│ ☐ Claude Code   │ ~/.claude/                   │
│ ☐ Opencode      │ ~/.config/opencode/          │
│ ☐ Ampcode       │ ~/.amp/                      │
│ ☐ Droid         │ ~/.factory/                  │
└─────────────────┴─────────────────────────────┘

Default: No tools selected
Use space to toggle selection, Enter to continue (requires 1+ tools)
```

**Step 4 - Installation Summary:**
```
Step 4/4 — Installation Summary

Package: Standard (13 agents, 8 skills)
Tools: Claude Code, Opencode (example - shows selected tools)

Installation Details:
┌─────────────┬──────────────────┬──────────┬─────────────┐
│ Tool        │ Path             │ Files    │ Size        │
├─────────────┼──────────────────┼──────────┼─────────────┤
│ Claude Code │ ~/.claude/       │ 124      │ 1.8MB       │
│ Opencode    │ ~/.config/opencode/ │ 124   │ 1.8MB       │
└─────────────┴──────────────────┴──────────┴─────────────┘

⚠️  Existing installation found at ~/.claude/
   89 files will be overwritten

Press Enter to install or Esc to cancel
```

#### 8.2 Progress Display

```
Installing Standard package...

Claude Code  [████████████████████] 100% (124/124 files)
Opencode     [████████████████░░░░]  75% (93/124 files)

Total: 217/248 files (87%) • 1.2MB/1.6MB • Elapsed: 0:45 • ETA: 0:12
```

### 9. Error Handling & Edge Cases

#### 9.1 Common Error Scenarios

**Permission Errors:**
- Detect insufficient permissions before installation
- Provide clear instructions to fix permissions
- Offer alternative installation paths

**Space Issues:**
- Check available disk space before installation
- Show space requirements per tool
- Suggest cleanup options if insufficient space

**Network Issues:**
- Handle package download failures gracefully
- Support resume capability for interrupted downloads
- Provide offline installation option

#### 9.2 Rollback Mechanism

**Automatic Rollback:**
- Detect installation failures
- Restore previous state from backup
- Report rollback status to user

**Manual Rollback:**
- Provide uninstall command
- Support selective component removal
- Clean up orphaned files

### 10. Testing Requirements

#### 10.1 Test Scenarios

**Installation Tests:**
- All package variants × all tool combinations
- Custom path installations
- Permission-restricted environments
- Low-disk-space scenarios

**Upgrade Tests:**
- Variant upgrades (Lite → Standard → Pro)
- Tool additions to existing installations
- Path changes during upgrade

**Failure Tests:**
- Network interruptions
- Permission denials
- Disk space exhaustion
- Process termination

#### 10.2 Validation Criteria

**Functional Validation:**
- All files copied to correct locations
- Manifests generated accurately
- Tools detect installed components
- File permissions set correctly

**Performance Validation:**
- Installation times within limits
- Memory usage within bounds
- Progress reporting accuracy

### 11. Success Metrics

**Installation Success:**
- 99%+ installation success rate
- < 1% rollback requirement
- 100% post-install verification pass

**User Satisfaction:**
- < 30 seconds to complete interactive selection
- Zero support tickets about installation location
- 95%+ user confidence in what was installed

**Technical Metrics:**
- < 2 minute total installation time
- 100% file integrity verification
- Zero orphaned files after uninstall

### 12. Future Considerations

**Phase 2 Enhancements:**
- GUI installer for desktop environments
- Package management (add/remove components)
- Automatic updates and notifications
- Team/enterprise deployment support

**Integration Opportunities:**
- Package manager integration (npm, homebrew)
- IDE plugin installations
- Cloud development environment support
- Container deployment options

### 7.4 Repository Migration Strategy

**Current State:**
- Repository currently contains only Claude Code packages in existing structure
- Need to create structure for Opencode, Ampcode, and Droid packages

**Recommended Implementation Approach:**

**Option 1: Gradual Migration (Recommended)**
1. **Phase 1**: Create new `packages/` structure alongside existing content
2. **Phase 2**: Migrate Claude Code content to `packages/claude/` 
3. **Phase 3**: Create placeholder structures for Opencode, Ampcode, Droid
4. **Phase 4**: Develop tool-specific optimizations for each

**Directory Creation Plan:**
```bash
# Create new package structure
mkdir -p packages/{claude,opencode,ampcode,droid}
mkdir -p shared/{agents,skills,resources,hooks}
mkdir -p tools/{claude,opencode,ampcode,droid}
mkdir -p installer

# Copy existing Claude content to new structure
cp -r agents/ packages/claude/
cp -r skills/ packages/claude/
cp -r resources/ packages/claude/
cp -r hooks/ packages/claude/

# Create variants.json for Claude
# (Implementation detail: define variant configurations for each tool)
```

**Option 2: In-Place Restructuring**
- Directly reorganize existing repository into new structure
- Higher risk but faster implementation

**Content Development Strategy:**
1. **Start with Claude**: Migrate existing content as baseline with variants.json
2. **Create Opencode**: Adapt Claude content for CLI-based AI codegen with variants.json
3. **Create Ampcode**: Enhance for amplified AI codegen workflows with variants.json
4. **Create Droid**: Specialize for mobile AI codegen with variants.json

**Tool-Specific Customization Requirements:**
- **Opencode**: Modify agent prompts for CLI interactions, adapt skills for terminal workflows, create variants.json
- **Ampcode**: Enhance automation capabilities, optimize for accelerated development, create variants.json
- **Droid**: Add mobile development patterns, Android-specific knowledge bases, create variants.json

**Variant Configuration Development:**
Each tool needs a variants.json defining:
- Lite: 3 core agents, no skills
- Standard: All agents, 8 core skills
- Pro: All agents, all skills

### 13. Acceptance Criteria

**Must Have:**
- [ ] Interactive 4-step installation process
- [ ] Support for all 4 tools with proper path isolation
- [ ] Default: No tools selected (minimum 1 required)
- [ ] Clear installation location feedback
- [ ] Package variant selection (Lite/Standard/Pro)
- [ ] Installation summary with file counts
- [ ] Custom path confirmation dialog
- [ ] Rollback capability on failure
- [ ] Post-install verification

**Should Have:**
- [ ] Custom path configuration with validation
- [ ] Progress tracking with ETA
- [ ] Existing installation detection
- [ ] Uninstall functionality
- [ ] Cross-platform compatibility

**Could Have:**
- [ ] GUI installer option
- [ ] Silent installation mode
- [ ] Configuration file support
- [ ] Network installation support

---

**Document Version:** 1.0  
**Created:** January 15, 2025  
**Author:** Product Team  
**Status:** Ready for Development