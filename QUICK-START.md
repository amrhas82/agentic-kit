# Quick Start Guide - 15 Minute Onboarding

Welcome to Agentic Toolkit! This guide will get you up and running in just 15 minutes, designed for non-technical users (product managers, designers, business analysts).

## Prerequisites

- Claude account (free or paid)
- Internet connection
- No coding knowledge needed!

## Step 1: Installation (2 minutes)

### Option A: Claude Marketplace (Easiest)

1. Open Claude.ai in your browser
2. Look for the plugin icon or menu (usually top-right)
3. Select "Browse Marketplace" or "Add Plugin"
4. Search for "Agentic Toolkit"
5. Choose your variant:
   - **Standard** (recommended for most people)
   - Lite (if you're just exploring)
   - Pro (if you want advanced features)
6. Click "Install"
7. Done! Refresh Claude if needed

### Option B: If Marketplace Isn't Available

Ask your Claude administrator to install the toolkit, or visit:
https://marketplace.anthropic.com/agentic-toolkit

## Step 2: Verify Installation (1 minute)

1. Open Claude conversation
2. Type: `@Master: *help`
3. Press Enter

You should see a welcome message with available commands. If you don't see agents listed, installation may have failed - skip to Troubleshooting section below.

## Step 3: Your First Task (12 minutes)

Let's walk through creating a Product Requirements Document (PRD) for a simple project.

### 3a: Choose Your Agent (1 minute)

For creating a PRD, we'll use the **Product Manager** agent. In Claude, type:

```
@Product Manager: Help me create a PRD for a mobile app that helps users track their daily expenses
```

### 3b: Watch the Agent Work (5-7 minutes)

The Product Manager will:
- Ask clarifying questions about your app
- Suggest features and structure
- Create a professional PRD outline
- Explain what they're doing as they go

You can:
- Answer questions with natural language
- Ask for more detail on any section
- Request changes to the PRD structure
- Ask "what does this mean?" if unsure

### 3c: Save Your Results (2-3 minutes)

Once complete:

1. Look for a "Copy" or "Select All" button
2. Copy the PRD text
3. Paste into:
   - Google Docs
   - Notion
   - Word document
   - Slack message
   - Email

Or request the agent to: "Save this to a PDF file" or "Create a Word document"

## Step 4: Explore Other Agents (Optional, 10+ minutes)

Now that you understand the basics, try other agents:

### For Product Teams:

**Product Owner** - Create user stories and backlog items
```
@Product Owner: Create user stories for my expense tracking app
```

**Business Analyst** - Analyze business requirements
```
@Business Analyst: What are the key business metrics for this app?
```

### For Design Teams:

**UX Expert** - Design user flows and interfaces
```
@UX Expert: Create a user flow for the expense tracking app
```

### For Development Teams:

**Holistic Architect** - Design system architecture
```
@Holistic Architect: Design the system architecture for the expense app
```

**Full-Stack Developer** - Write code
```
@Full-Stack Developer: Generate backend API endpoints for expense tracking
```

### For Quality Teams:

**QA Test Architect** - Create test plans
```
@QA Test Architect: Create a comprehensive test plan for the expense app
```

### For Project Managers:

**Scrum Master** - Create sprint plans
```
@Scrum Master: Create a 2-week sprint plan for building the expense app
```

## Step 5: Using Skills (10+ minutes)

Skills are special capabilities that extend agents. Once you've created documents with agents, you can process them with skills:

### Document Processing

If you have a PDF or Word document:

```
@Master: Help me extract tables from this PDF
[Attach your PDF]
```

### Creating Documents

If you need to create a professional document:

```
@Master: Create a Word document with the PRD we just created
```

### Design Tasks

If you need visual designs:

```
@Canvas Design Skill: Create a wireframe mockup for the expense app
```

## Common Workflows

### Workflow 1: Product Definition (30 minutes)

1. **Product Manager** - Create PRD
2. **Product Owner** - Create user stories
3. **UX Expert** - Design user flows
4. **Master skill** - Export to Word document

### Workflow 2: Building a Feature (1-2 hours)

1. **Product Manager** - Define feature requirements
2. **Holistic Architect** - Design system changes
3. **Full-Stack Developer** - Write implementation code
4. **QA Test Architect** - Create test cases
5. **Master skill** - Compile into documentation

### Workflow 3: Sprint Planning (1 hour)

1. **Scrum Master** - Create sprint backlog
2. **Product Owner** - Prioritize user stories
3. **Full-Stack Developer** - Estimate effort
4. **Master skill** - Create sprint document

## Tips for Best Results

### 1. Be Specific
**Better:** "Create a PRD for a mobile expense tracking app for freelancers"
**Less Helpful:** "Create a PRD for an app"

### 2. Provide Context
**Better:** "Create user stories for our budget tracking app, targeting small business owners"
**Less Helpful:** "Create user stories"

### 3. Ask Questions
Agents are conversational. You can say:
- "Can you explain this more?"
- "What do you mean by...?"
- "Can we change this section?"
- "What's the best practice here?"

### 4. Iterate
You don't need to get it right the first time:
1. Create a draft with an agent
2. Ask for revisions
3. Refine until you're happy
4. Export the final version

## FAQ

### Q: Do I need to be technical?
**A:** No! Agents speak plain English and work with non-technical requirements.

### Q: What if an agent gives bad advice?
**A:** Just ask it to revise. You can always say "I think that's wrong because..." and it will adjust.

### Q: Can I use multiple agents on one project?
**A:** Yes! That's the power of the toolkit. Use different agents for different aspects.

### Q: How long does each agent take?
**A:** Usually 5-15 minutes depending on complexity. Longer for detailed requirements.

### Q: Can I go back and change something?
**A:** Yes! Just copy your previous output and ask the agent to modify it.

### Q: What if I disagree with an agent's recommendation?
**A:** Tell it! Say "I think we should... instead" and it will adapt.

### Q: Do I need to save locally?
**A:** No, but it's good practice. Copy outputs to documents you control.

### Q: Can I use this for non-software projects?
**A:** Some agents work for general business projects. Try asking!

### Q: What if I make a mistake in my request?
**A:** Just clarify and ask again. There's no penalty for trial and error.

## Troubleshooting

### Problem: Can't Find Agents

**Solution:**
1. Refresh Claude (press F5)
2. Check that installation completed
3. Try typing `@` followed by agent name
4. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed help

### Problem: Agent Response Is Incomplete

**Solution:**
- Click "Continue" if available
- Type "Can you finish that?" in next message
- Try a simpler question

### Problem: Skills Not Working

**Solution:**
1. Verify your variant includes that skill
2. Check that the skill exists in your installation
3. See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

### Problem: Getting Generic Responses

**Solution:**
- Provide more specific context
- Ask follow-up questions
- Mention your industry/domain
- Reference previous work

## Next Steps

1. **Try One Agent** - Start with Product Manager or Master
2. **Create Your First Document** - Create a simple PRD or user story
3. **Explore Other Agents** - Try agents for your role
4. **Learn Skills** - Look at [SKILLS.md](SKILLS.md) for advanced capabilities
5. **Read [AGENTS.md](AGENTS.md)** - Understand what each agent specializes in

## Getting Help

### For Specific Agent Questions:
See [AGENTS.md](AGENTS.md) - Full directory with use cases and examples

### For Specific Skill Questions:
See [SKILLS.md](SKILLS.md) - Complete skills guide with examples

### For Installation Issues:
See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Comprehensive troubleshooting

### For Technical Details:
See [ARCHITECTURE.md](ARCHITECTURE.md) - How the toolkit works

## Key Points to Remember

- **Agents are conversational** - Use natural language
- **No mistakes** - You can always ask for revisions
- **Start simple** - Build confidence with basic tasks
- **Ask questions** - Agents enjoy explaining
- **Save your work** - Copy important outputs to your files
- **Iterate** - Refine until you're happy

## You're Ready!

You've learned:
- How to install the toolkit
- How to use an agent
- How to save your results
- Where to find detailed help

**Start with this task:**

1. Open Claude
2. Type: `@Product Manager: Help me create a PRD for [your project idea]`
3. Follow the conversation
4. Save your results
5. Come back here when done!

---

**Questions?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or explore [AGENTS.md](AGENTS.md) for more detailed information.

**Want to go deeper?** Read [AGENTS.md](AGENTS.md) for comprehensive agent descriptions and advanced use cases.
