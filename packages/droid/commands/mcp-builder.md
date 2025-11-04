---
description: Create high-quality MCP servers that enable LLMs to interact with external services through well-designed tools
argument-hint: <service-to-integrate> <language-choice>
---

Build high-quality MCP (Model Context Protocol) servers that enable LLMs to effectively interact with external services and APIs.

## MCP Development Workflow

### Phase 1: Research and Planning

#### 1.1 Agent-Centric Design Principles

**Build for Workflows, Not Just API Endpoints:**
- Don't simply wrap existing API endpoints - build thoughtful, high-impact workflow tools
- Consolidate related operations (e.g., `schedule_event` that checks availability AND creates event)
- Focus on tools that enable complete tasks, not just individual API calls
- Consider what workflows agents actually need to accomplish

**Optimize for Limited Context:**
- Agents have constrained context windows - make every token count
- Return high-signal information, not exhaustive data dumps
- Provide "concise" vs "detailed" response format options
- Default to human-readable identifiers over technical codes (names over IDs)
- Consider the agent's context budget as a scarce resource

**Design Actionable Error Messages:**
- Error messages should guide agents toward correct usage patterns
- Suggest specific next steps: "Try using filter='active_only' to reduce results"
- Make errors educational, not just diagnostic
- Help agents learn proper tool usage through clear feedback

**Follow Natural Task Subdivisions:**
- Tool names should reflect how humans think about tasks
- Group related tools with consistent prefixes for discoverability
- Design tools around natural workflows, not just API structure

#### 1.2 Study MCP Protocol
Fetch the latest MCP protocol documentation:
```bash
# Load comprehensive MCP specification
https://modelcontextprotocol.io/llms-full.txt
```

#### 1.3 Framework Documentation

**Python Implementation:**
- Load: `https://raw.githubusercontent.com/modelcontextprotocol/python-sdk/main/README.md`
- Use FastMCP framework for Python servers

**Node/TypeScript Implementation:**
- Load: `https://raw.githubusercontent.com/modelcontextprotocol/typescript-sdk/main/README.md`
- Use MCP SDK for Node/TypeScript servers

#### 1.4 API Documentation Study
Exhaustively study the service API:
- Official API reference documentation
- Authentication and authorization requirements
- Rate limiting and pagination patterns
- Error responses and status codes
- Available endpoints and their parameters
- Data models and schemas

#### 1.5 Implementation Planning
Create a comprehensive plan:

**Tool Selection:**
- List the most valuable endpoints/operations to implement
- Prioritize tools that enable common and important use cases
- Consider which tools work together for complex workflows

**Shared Utilities:**
- Identify common API request patterns
- Design authentication handling
- Create pagination helpers
- Build error handling utilities

### Phase 2: Development

#### 2.1 Project Setup
```bash
# Python setup
pip install fastmcp
mkdir mcp-server
cd mcp-server

# Node/TypeScript setup
npm init -y
npm install @modelcontextprotocol/sdk
mkdir mcp-server
cd mcp-server
```

#### 2.2 Tool Design Patterns

**Workflow-Focused Tools:**
```python
# ❌ BAD: Simple API wrapper
@tool
def get_user(user_id: str) -> dict:
    return api.get(f"/users/{user_id}")

# ✅ GOOD: Complete workflow tool
@tool
def get_user_profile(user_id: str, include_recent_activity: bool = False) -> dict:
    """
    Get comprehensive user profile information.
    
    Args:
        user_id: User identifier
        include_recent_activity: Include last 30 days of activity
        
    Returns:
        Complete user profile with optional activity data
    """
    user = api.get(f"/users/{user_id}")
    if include_recent_activity:
        activity = api.get(f"/users/{user_id}/activity", params={"days": 30})
        user["recent_activity"] = activity
    
    return user
```

**Context-Aware Responses:**
```python
@tool
def search_items(query: str, max_results: int = 10) -> dict:
    """
    Search for items with intelligent result formatting.
    
    Args:
        query: Search query
        max_results: Maximum number of results (default: 10, max: 50)
        
    Returns:
        Concise search results with key identifiers and summaries
    """
    results = api.get("/search", params={"q": query, "limit": max_results})
    
    # Return concise, actionable format
    return {
        "query": query,
        "total_found": len(results),
        "items": [
            {
                "id": item["id"],
                "name": item["name"], 
                "summary": item["description"][:100] + "...",
                "relevance_score": item["score"]
            }
            for item in results
        ]
    }
```

#### 2.3 Error Handling
```python
@tool
def create_event(event_data: dict) -> dict:
    """
    Create a calendar event with validation.
    
    Args:
        event_data: Event details including title, start, end, attendees
        
    Returns:
        Created event information
        
    Raises:
        ValidationError: If event data is invalid (missing required fields, 
                        scheduling conflicts, or invalid time format)
    """
    try:
        # Validate event data
        if not event_data.get("title"):
            raise ValueError("Event title is required")
            
        # Check for conflicts
        conflicts = check_schedule_conflicts(event_data)
        if conflicts:
            return {
                "success": False,
                "error": "Schedule conflict detected",
                "conflicting_events": conflicts,
                "suggestion": "Try adjusting the time or use check_availability tool first"
            }
            
        # Create event
        result = api.post("/events", json=event_data)
        return {"success": True, "event": result}
        
    except ValidationError as e:
        return {
            "success": False, 
            "error": str(e),
            "suggestion": "Ensure all required fields are provided and times are in ISO format"
        }
```

### Phase 3: Testing and Evaluation

#### 3.1 Create Evaluation Scenarios
```python
# Test realistic agent workflows
test_scenarios = [
    {
        "name": "Complete user onboarding workflow",
        "steps": [
            "create_user",
            "send_welcome_email", 
            "schedule_kickoff_call",
            "add_to_team"
        ]
    },
    {
        "name": "Project management workflow",
        "steps": [
            "create_project",
            "add_team_members",
            "create_tasks", 
            "set_milestones",
            "generate_report"
        ]
    }
]
```

#### 3.2 Agent Testing
Test the MCP server with real LLM agents:
- Verify tools work for actual use cases
- Check error messages guide correct usage
- Ensure responses are appropriate for agent context
- Validate workflow completeness

### Phase 4: Documentation and Deployment

#### 4.1 Tool Documentation
Each tool should include:
- Clear description of purpose and use cases
- Parameter documentation with types and descriptions
- Return value documentation
- Usage examples
- Error handling guidance

#### 4.2 Best Practices Checklist

**Tool Design:**
- [ ] Tools enable complete workflows, not just API calls
- [ ] Error messages are actionable and educational
- [ ] Responses are concise but informative
- [ ] Tool names reflect natural task subdivisions
- [ ] Related tools have consistent prefixes

**Development:**
- [ ] Comprehensive API coverage studied
- [ ] Authentication handled securely
- [ ] Rate limiting respected
- [ ] Pagination implemented
- [ ] Error handling robust
- [ ] Type safety maintained

**Testing:**
- [ ] Realistic evaluation scenarios created
- [ ] Agent feedback incorporated
- [ ] Performance tested
- [ ] Edge cases covered

## Usage Examples

**Create MCP server for calendar service:**
`/mcp-builder "Google Calendar API" "python"`

**Build integration for project management:**
`/mcp-builder "Jira API" "typescript"`

**Develop customer support tools:**
`/mcp-builder "Zendesk API" "python"`

**Create data analytics server:**
`/mcp-builder "Analytics API" "typescript"`

Remember: Quality MCP servers enable LLMs to accomplish real-world tasks effectively through well-designed, workflow-focused tools.
