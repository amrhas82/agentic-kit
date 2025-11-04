/**
 * register-agents.js
 * Auto-discovery mechanism that scans agents/ directory
 * Extracts metadata from agent files
 * Registers all agents in context.agentRegistry
 * Enables auto-invocation
 */

const fs = require('fs');
const path = require('path');

/**
 * Parse agent metadata from markdown file
 * Looks for frontmatter and specific headers
 */
function parseAgentMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  const agent = {
    id: path.basename(filePath, '.md'),
    name: '',
    description: '',
    role: '',
    capabilities: [],
    filePath: filePath
  };

  // Extract title/name from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  if (titleMatch) {
    agent.name = titleMatch[1].trim();
  }

  // Extract description from first paragraph after title
  const descMatch = content.match(/^#\s+.+\n\n(.+?)(?:\n\n|##)/s);
  if (descMatch) {
    agent.description = descMatch[1].trim();
  }

  // Extract role section if it exists
  const roleMatch = content.match(/##\s+Role\n\n(.+?)(?=\n##)/s);
  if (roleMatch) {
    agent.role = roleMatch[1].trim();
  }

  // Extract capabilities from section if it exists
  const capsMatch = content.match(/##\s+Capabilities\n\n([\s\S]+?)(?=\n##|$)/);
  if (capsMatch) {
    const capsText = capsMatch[1];
    agent.capabilities = capsText
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s+/, '').trim());
  }

  return agent;
}

/**
 * Scan agents/ directory and register all agents
 */
function registerAgents(agentsDir) {
  const registry = {};

  try {
    if (!fs.existsSync(agentsDir)) {
      console.warn(`Agents directory not found: ${agentsDir}`);
      return registry;
    }

    const files = fs.readdirSync(agentsDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));

    mdFiles.forEach(file => {
      try {
        const filePath = path.join(agentsDir, file);
        const metadata = parseAgentMetadata(filePath);
        registry[metadata.id] = metadata;
        console.log(`Registered agent: ${metadata.id} - ${metadata.name}`);
      } catch (error) {
        console.error(`Failed to register agent ${file}:`, error.message);
      }
    });

  } catch (error) {
    console.error(`Failed to scan agents directory: ${error.message}`);
  }

  return registry;
}

/**
 * Auto-invocation handler
 * Matches user commands to available agents and invokes them
 */
function createAutoInvocationHandler(registry) {
  return function invokeAgent(agentId, context) {
    const agent = registry[agentId];

    if (!agent) {
      throw new Error(`Agent not found: ${agentId}`);
    }

    // Agent would be invoked here with appropriate context
    return {
      agentId: agent.id,
      name: agent.name,
      description: agent.description,
      role: agent.role,
      capabilities: agent.capabilities,
      context: context
    };
  };
}

/**
 * Module exports
 */
module.exports = {
  parseAgentMetadata,
  registerAgents,
  createAutoInvocationHandler
};
