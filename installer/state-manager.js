/**
 * State Manager for Agentic Kit Installer
 *
 * Manages installation state persistence for resume capability
 * Saves progress after each file copied to enable recovery from interruptions
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class StateManager {
  constructor() {
    // State file location in user's home directory
    this.stateFilePath = path.join(os.homedir(), '.agentic-kit-install-state.json');

    // Current state structure
    this.state = null;

    // State schema version for future compatibility
    this.SCHEMA_VERSION = '1.0.0';
  }

  /**
   * Initialize a new installation state
   * Called at the start of installation process
   *
   * @param {string} variant - Selected variant ('lite', 'standard', 'pro')
   * @param {Array<string>} tools - Selected tool IDs
   * @param {Object} paths - Target paths for each tool {toolId: path}
   * @returns {Object} - Initialized state object
   */
  initializeState(variant, tools, paths) {
    this.state = {
      // Schema version for migration support
      schemaVersion: this.SCHEMA_VERSION,

      // Session metadata
      sessionId: this.generateSessionId(),
      startedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),

      // User selections
      variant: variant,
      tools: tools,
      paths: paths,

      // Installation progress
      currentTool: tools[0], // First tool to install
      completedTools: [],    // Tools successfully installed
      failedTools: [],       // Tools that failed (with error info)

      // File-level progress for current tool
      currentToolProgress: {
        toolId: tools[0],
        filesCompleted: [],   // Array of completed file paths
        totalFiles: 0,        // Total files to install for this tool
        bytesTransferred: 0,  // Bytes copied so far
        totalBytes: 0         // Total bytes to copy
      },

      // Installation stage
      stage: 'initializing', // initializing, installing, verifying, completed, failed

      // Error information (if any)
      lastError: null
    };

    return this.state;
  }

  /**
   * Save current state to disk
   * Called after each file is copied and at critical checkpoints
   *
   * @param {Object} updates - Partial state updates to merge with current state
   * @returns {Promise<void>}
   */
  async saveState(updates = {}) {
    if (!this.state) {
      throw new Error('State not initialized. Call initializeState() first.');
    }

    // Merge updates into current state
    this.state = {
      ...this.state,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    try {
      // Write state to file atomically using temp file + rename
      const tempFilePath = `${this.stateFilePath}.tmp`;
      const stateJson = JSON.stringify(this.state, null, 2);

      await fs.promises.writeFile(tempFilePath, stateJson, 'utf8');
      await fs.promises.rename(tempFilePath, this.stateFilePath);

    } catch (error) {
      console.error(`Warning: Failed to save installation state: ${error.message}`);
      // Don't throw - state saving is best-effort, shouldn't block installation
    }
  }

  /**
   * Load existing state from disk
   * Called on installer startup to detect interrupted installations
   *
   * @returns {Promise<Object|null>} - Loaded state object or null if no state exists
   */
  async loadState() {
    try {
      // Check if state file exists
      await fs.promises.access(this.stateFilePath);

      // Read and parse state file
      const stateJson = await fs.promises.readFile(this.stateFilePath, 'utf8');
      this.state = JSON.parse(stateJson);

      // Validate schema version
      if (this.state.schemaVersion !== this.SCHEMA_VERSION) {
        console.warn(`Warning: State file schema version mismatch (expected ${this.SCHEMA_VERSION}, got ${this.state.schemaVersion})`);
        // Could implement migration logic here in the future
      }

      // Validate state structure
      if (!this.validateState(this.state)) {
        console.warn('Warning: Invalid state file structure, ignoring existing state');
        return null;
      }

      return this.state;

    } catch (error) {
      if (error.code === 'ENOENT') {
        // No state file exists - this is normal for fresh installations
        return null;
      } else if (error instanceof SyntaxError) {
        // Corrupted JSON - ignore and start fresh
        console.warn('Warning: Corrupted state file, starting fresh installation');
        return null;
      } else {
        // Other errors - log but don't fail
        console.error(`Warning: Failed to load state: ${error.message}`);
        return null;
      }
    }
  }

  /**
   * Clear state file from disk
   * Called after successful installation completion or when user declines resume
   *
   * @returns {Promise<void>}
   */
  async clearState() {
    try {
      await fs.promises.unlink(this.stateFilePath);
      this.state = null;
    } catch (error) {
      if (error.code !== 'ENOENT') {
        // Only log if error is not "file not found"
        console.error(`Warning: Failed to clear state file: ${error.message}`);
      }
    }
  }

  /**
   * Check if a previous installation was interrupted
   * Returns true if valid state file exists and installation was not completed
   *
   * @returns {Promise<boolean>}
   */
  async hasInterruptedInstallation() {
    const state = await this.loadState();
    return state !== null && state.stage !== 'completed';
  }

  /**
   * Update progress for current tool
   * Called after each file is copied
   *
   * @param {string} filePath - Relative path of file just copied
   * @param {number} fileSize - Size of file in bytes
   * @param {number} totalFiles - Total files to copy for this tool
   * @param {number} totalBytes - Total bytes to copy for this tool
   */
  async updateFileProgress(filePath, fileSize, totalFiles, totalBytes) {
    if (!this.state) {
      return; // Silent fail if state not initialized
    }

    // Update current tool progress
    this.state.currentToolProgress.filesCompleted.push(filePath);
    this.state.currentToolProgress.bytesTransferred += fileSize;
    this.state.currentToolProgress.totalFiles = totalFiles;
    this.state.currentToolProgress.totalBytes = totalBytes;

    // Save state
    await this.saveState({
      stage: 'installing',
      currentToolProgress: this.state.currentToolProgress
    });
  }

  /**
   * Mark current tool as completed
   * Moves to next tool in the queue
   */
  async completeCurrentTool() {
    if (!this.state) {
      return;
    }

    const completedTool = this.state.currentTool;
    this.state.completedTools.push(completedTool);

    // Find next tool to install
    const remainingTools = this.state.tools.filter(
      tool => !this.state.completedTools.includes(tool) &&
              !this.state.failedTools.some(f => f.toolId === tool)
    );

    if (remainingTools.length > 0) {
      // Move to next tool
      this.state.currentTool = remainingTools[0];
      this.state.currentToolProgress = {
        toolId: remainingTools[0],
        filesCompleted: [],
        totalFiles: 0,
        bytesTransferred: 0,
        totalBytes: 0
      };

      await this.saveState({
        completedTools: this.state.completedTools,
        currentTool: this.state.currentTool,
        currentToolProgress: this.state.currentToolProgress
      });
    } else {
      // All tools completed
      this.state.currentTool = null;
      this.state.stage = 'completed';

      await this.saveState({
        completedTools: this.state.completedTools,
        currentTool: null,
        stage: 'completed'
      });
    }
  }

  /**
   * Mark current tool as failed
   * Records error information and moves to next tool
   *
   * @param {Error} error - Error that caused the failure
   */
  async failCurrentTool(error) {
    if (!this.state) {
      return;
    }

    this.state.failedTools.push({
      toolId: this.state.currentTool,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });

    this.state.lastError = {
      message: error.message,
      timestamp: new Date().toISOString()
    };

    // Find next tool to install
    const remainingTools = this.state.tools.filter(
      tool => !this.state.completedTools.includes(tool) &&
              !this.state.failedTools.some(f => f.toolId === tool)
    );

    if (remainingTools.length > 0) {
      // Move to next tool
      this.state.currentTool = remainingTools[0];
      this.state.currentToolProgress = {
        toolId: remainingTools[0],
        filesCompleted: [],
        totalFiles: 0,
        bytesTransferred: 0,
        totalBytes: 0
      };
    } else {
      // All tools processed (some failed)
      this.state.currentTool = null;
      this.state.stage = 'failed';
    }

    await this.saveState({
      failedTools: this.state.failedTools,
      currentTool: this.state.currentTool,
      currentToolProgress: this.state.currentToolProgress,
      lastError: this.state.lastError,
      stage: this.state.stage
    });
  }

  /**
   * Get current state object
   *
   * @returns {Object|null} - Current state or null if not initialized
   */
  getState() {
    return this.state;
  }

  /**
   * Get resume summary for display to user
   * Shows what was completed and what remains
   *
   * @returns {Object} - Summary object with progress information
   */
  getResumeSummary() {
    if (!this.state) {
      return null;
    }

    const totalTools = this.state.tools.length;
    const completedTools = this.state.completedTools.length;
    const failedTools = this.state.failedTools.length;
    const remainingTools = totalTools - completedTools - failedTools;

    const currentProgress = this.state.currentToolProgress;
    const filesCompleted = currentProgress.filesCompleted.length;
    const totalFiles = currentProgress.totalFiles;
    const percentComplete = totalFiles > 0 ? Math.round((filesCompleted / totalFiles) * 100) : 0;

    return {
      sessionId: this.state.sessionId,
      startedAt: this.state.startedAt,
      lastUpdated: this.state.lastUpdated,
      variant: this.state.variant,
      totalTools: totalTools,
      completedTools: completedTools,
      failedTools: failedTools,
      remainingTools: remainingTools,
      currentTool: this.state.currentTool,
      currentToolProgress: {
        filesCompleted: filesCompleted,
        totalFiles: totalFiles,
        percentComplete: percentComplete
      },
      completedToolsList: this.state.completedTools,
      failedToolsList: this.state.failedTools.map(f => f.toolId),
      stage: this.state.stage
    };
  }

  /**
   * Validate state object structure
   * Ensures all required fields are present and have correct types
   *
   * @param {Object} state - State object to validate
   * @returns {boolean} - True if valid, false otherwise
   */
  validateState(state) {
    try {
      // Required top-level fields
      const requiredFields = [
        'schemaVersion', 'sessionId', 'startedAt', 'lastUpdated',
        'variant', 'tools', 'paths', 'currentTool', 'completedTools',
        'failedTools', 'currentToolProgress', 'stage'
      ];

      for (const field of requiredFields) {
        if (!(field in state)) {
          console.warn(`Missing required field: ${field}`);
          return false;
        }
      }

      // Validate types
      if (typeof state.variant !== 'string') return false;
      if (!Array.isArray(state.tools)) return false;
      if (typeof state.paths !== 'object') return false;
      if (!Array.isArray(state.completedTools)) return false;
      if (!Array.isArray(state.failedTools)) return false;
      if (typeof state.currentToolProgress !== 'object') return false;

      // Validate current tool progress structure
      const progress = state.currentToolProgress;
      if (!progress.toolId || !Array.isArray(progress.filesCompleted)) {
        return false;
      }

      return true;

    } catch (error) {
      console.warn(`State validation error: ${error.message}`);
      return false;
    }
  }

  /**
   * Generate unique session ID
   * Used to identify installation sessions
   *
   * @returns {string} - Unique session ID
   */
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
  }

  /**
   * Get state file path
   * Useful for debugging and testing
   *
   * @returns {string} - Absolute path to state file
   */
  getStateFilePath() {
    return this.stateFilePath;
  }
}

module.exports = StateManager;
