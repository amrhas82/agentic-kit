/**
 * session-start.js
 *
 * This hook runs at the start of every Claude Code session.
 * It ensures all skills defined in the active variant are loaded and available.
 *
 * Purpose:
 * - Load variant-specific skills automatically
 * - Register agents for auto-invocation
 * - Initialize any session-specific resources
 * - Provide session startup feedback
 */

const fs = require('fs');
const path = require('path');

/**
 * Load and activate skills for the current variant
 */
function loadSkills(skillsDir, skillsList) {
  const loadedSkills = [];

  if (!skillsList || skillsList.length === 0) {
    console.log('ℹ️  No skills to load for this variant');
    return loadedSkills;
  }

  skillsList.forEach(skill => {
    try {
      const skillPath = path.join(skillsDir, skill.path);

      if (fs.existsSync(skillPath)) {
        loadedSkills.push({
          id: skill.id,
          name: skill.name,
          path: skill.path,
          status: 'loaded'
        });
        console.log(`✅ Loaded skill: ${skill.name}`);
      } else {
        console.warn(`⚠️  Skill not found: ${skill.name} at ${skillPath}`);
      }
    } catch (error) {
      console.error(`❌ Failed to load skill ${skill.name}:`, error.message);
    }
  });

  return loadedSkills;
}

/**
 * Initialize agents for the session
 */
function initializeAgents(agentsDir, agentsList) {
  const activeAgents = [];

  agentsList.forEach(agent => {
    try {
      const agentPath = path.join(agentsDir, agent.path);

      if (fs.existsSync(agentPath)) {
        activeAgents.push({
          id: agent.id,
          name: agent.name,
          status: 'ready'
        });
      }
    } catch (error) {
      console.error(`❌ Failed to initialize agent ${agent.name}:`, error.message);
    }
  });

  return activeAgents;
}

/**
 * Display session start banner
 */
function displayBanner(variant, agentCount, skillCount) {
  const variantColors = {
    lite: '\x1b[32m',      // Green
    standard: '\x1b[34m',   // Blue
    pro: '\x1b[35m'        // Magenta
  };

  const color = variantColors[variant] || '\x1b[36m'; // Default cyan
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';

  console.log(`
${bold}${color}╔═══════════════════════════════════════════════╗${reset}
${bold}${color}║        Agentic Kit - ${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant${' '.repeat(Math.max(0, 17 - variant.length))}║${reset}
${bold}${color}╚═══════════════════════════════════════════════╝${reset}

✨ Session started successfully!

📊 Active Components:
   • Agents: ${agentCount}
   • Skills: ${skillCount}

💡 Quick Start:
   • Invoke agents: ${color}@Master:${reset} help
   • See agents: ${color}@Master:${reset} *help
   • Documentation: Check README.md

${bold}Ready to assist with your development tasks!${reset}
`);
}

/**
 * Main session start handler
 */
function onSessionStart(context) {
  try {
    // Get variant from context or default to standard
    const variant = context.variant || 'standard';
    const manifest = context.manifest || {};

    const agentsList = manifest.agents || [];
    const skillsList = manifest.skills || [];

    // Load skills
    const loadedSkills = loadSkills(context.skillsPath || './skills', skillsList);

    // Initialize agents
    const activeAgents = initializeAgents(context.agentsPath || './agents', agentsList);

    // Display banner
    displayBanner(variant, activeAgents.length, loadedSkills.length);

    // Return session context
    return {
      variant,
      agents: activeAgents,
      skills: loadedSkills,
      timestamp: new Date().toISOString(),
      status: 'ready'
    };

  } catch (error) {
    console.error('❌ Session start failed:', error.message);
    console.log('⚠️  Plugin may not function correctly. Please restart or reinstall.');

    return {
      status: 'error',
      error: error.message
    };
  }
}

/**
 * Module exports
 */
module.exports = {
  onSessionStart,
  loadSkills,
  initializeAgents,
  displayBanner
};
