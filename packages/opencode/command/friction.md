---
name: friction
description: Analyze session behavior patterns
usage: /friction <sessions-path>
argument-hint: <sessions-path>
---

Analyze Claude Code session logs for friction signals, behavioral patterns, and failure antigens.

**Guardrails**
- Favor straightforward, minimal implementations first and add complexity only when requested or clearly required.
- Keep changes tightly scoped to the requested outcome.

**Argument: sessions-path (required)**

Path to the OpenCode sessions directory containing JSONL files.
- Example: `/friction ~/.config/opencode/projects/-home-hamr-PycharmProjects-aurora/`
- If no argument provided, ask the user for the path. Do NOT guess.

**What it does**

Runs friction analysis on session JSONL files and writes results to `.opencode/friction/` in the current project.

**Steps**

1. **Validate path**
   - The argument `$ARGUMENTS` is the sessions path
   - Verify the path exists and contains `.jsonl` files
   - If path doesn't exist or has no JSONL files, tell the user and stop
   - Count total session files found

2. **Run friction.js** (bundled at `commands/friction/friction.js`)
   - Look for friction.js in order:
     1. `~/.config/opencode/command/friction/friction.js` (installed)
     2. `packages/opencode/command/friction/friction.js` (package development)
   - If found, run: `node <path-to-friction.js> "$ARGUMENTS"`
   - If it does NOT exist anywhere, fall back to running the analysis manually (step 3)
   - If friction.js succeeds, skip to step 7

3. **Manual analysis fallback** (only if friction.js not available)
   - For each `.jsonl` session file in the path:
     - Read the file
     - Extract signals using these patterns:

   | Signal | Weight | How to detect |
   |---|---|---|
   | `user_intervention` | 10 | User message contains `/stash` |
   | `session_abandoned` | 10 | Last 3 turns have friction > 15 and no `exit_success` |
   | `false_success` | 8 | LLM text contains "done"/"complete"/"fixed" AND next tool result has error |
   | `no_resolution` | 8 | Session has `exit_error` signals but no `exit_success` after them |
   | `tool_loop` | 6 | Same tool called 3+ times with identical arguments |
   | `rapid_exit` | 6 | <3 turns AND ends with error |
   | `interrupt_cascade` | 5 | Multiple `request_interrupted` within 60 seconds |
   | `user_curse` | 5 | User message matches profanity patterns |
   | `request_interrupted` | 2.5 | Turn has `is_interrupted: true` or ESC/Ctrl+C signal |
   | `exit_error` | 1 | Tool result has non-zero exit code |
   | `repeated_question` | 1 | User asks same question twice (fuzzy match) |
   | `long_silence` | 0.5 | >10 minute gap between turns |
   | `user_negation` | 0.5 | User message starts with "no", "wrong", "didn't work" |
   | `compaction` | 0.5 | System message indicates context compaction |

4. **Score each session**
   - Accumulate weighted signal scores (no subtraction, only accumulation)
   - Track peak friction score
   - Classify session quality:
     - **BAD**: has `user_intervention` or `session_abandoned`
     - **FRICTION**: has `user_curse` or `false_success`
     - **ROUGH**: peak friction >= 15, no intervention
     - **OK**: low friction, completed normally
     - **ONE-SHOT**: single turn, not interactive (filter out)

5. **Aggregate stats**
   - Count sessions by quality
   - Calculate BAD rate
   - Identify worst and best sessions
   - Daily trend if sessions span multiple days

6. **Extract antigen candidates from BAD sessions**
   - For each BAD session, extract:
     - Anchor signal (what triggered BAD classification)
     - Tool sequence around the failure
     - Error messages
     - Pattern description
   - Write as antigen candidates

7. **Write output to `.opencode/friction/`**
   - Create `.opencode/friction/` directory if it doesn't exist
   - Write these files:
     - `friction_analysis.json` — per-session breakdown (quality, peak, signals)
     - `friction_summary.json` — aggregate stats, verdict, daily trend
     - `friction_raw.jsonl` — all raw signals with timestamps
     - `antigen_candidates.json` — raw extracted failure patterns
     - `antigen_clusters.json` — clustered patterns (primary artifact for /remember)
     - `antigen_review.md` — human-readable clustered review

8. **Report to user**
   - Sessions analyzed count
   - BAD / FRICTION / ROUGH / OK counts
   - BAD rate percentage
   - Worst session ID and peak friction
   - Path to `antigen_review.md` for review
   - Remind: run `/remember` to consolidate into project memory

**Output format for antigen_review.md**

```markdown
# Friction Antigen Clusters

Generated: [date]
BAD sessions: [count] | Raw candidates: [count] | Clusters: [count]

## Cluster Summary

| # | Signal | Tool Pattern | Count | Sessions | Score | Median Peak |
|---|--------|-------------|-------|----------|-------|-------------|
| 1 | false_success | Bash,Bash | 35 | 23 | 280 | 73 |
| 2 | user_intervention | (none) | 34 | 24 | 340 | 65 |

## Cluster 1: false_success | Bash,Bash

**Occurrences:** 35 across 23 sessions | **Score:** 280

### User Context (what the user said)
> [actual user quote from session]

### Errors
[error messages if any]

### Files involved
- [file paths]
```

**File locations**
- Design doc: `docs/02-features/memory/LONG_TERM_MEMORY.md`
- Input: JSONL session files from `$ARGUMENTS` path
- Output: `.opencode/friction/` (project-local)
- JS script: `commands/friction/friction.js` (bundled alongside this command)
- Python equivalent: `scripts/friction.py` (aurora users, same logic)
- Manual fallback: built into this command if friction.js unavailable
