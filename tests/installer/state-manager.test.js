/**
 * Tests for State Manager
 *
 * Tests state save/load/clear functionality and resume capability
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const StateManager = require('../../installer/state-manager');

describe('StateManager', () => {
  let stateManager;
  let testStateFilePath;

  beforeEach(() => {
    stateManager = new StateManager();
    // Use a test-specific state file path
    testStateFilePath = path.join(os.tmpdir(), `.agentic-kit-test-state-${Date.now()}.json`);
    stateManager.stateFilePath = testStateFilePath;
  });

  afterEach(async () => {
    // Clean up test state file
    try {
      if (fs.existsSync(testStateFilePath)) {
        await fs.promises.unlink(testStateFilePath);
      }
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('initializeState', () => {
    test('should initialize state with correct structure', () => {
      const variant = 'standard';
      const tools = ['claude', 'opencode'];
      const paths = {
        claude: '~/.claude',
        opencode: '~/.config/opencode'
      };

      const state = stateManager.initializeState(variant, tools, paths);

      expect(state).toBeDefined();
      expect(state.schemaVersion).toBe('1.0.0');
      expect(state.variant).toBe(variant);
      expect(state.tools).toEqual(tools);
      expect(state.paths).toEqual(paths);
      expect(state.currentTool).toBe('claude'); // First tool
      expect(state.completedTools).toEqual([]);
      expect(state.failedTools).toEqual([]);
      expect(state.stage).toBe('initializing');
    });

    test('should generate unique session ID', () => {
      const state1 = stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
      const stateManager2 = new StateManager();
      const state2 = stateManager2.initializeState('standard', ['claude'], { claude: '~/.claude' });

      expect(state1.sessionId).toBeDefined();
      expect(state2.sessionId).toBeDefined();
      expect(state1.sessionId).not.toBe(state2.sessionId);
    });

    test('should set timestamps', () => {
      const state = stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });

      expect(state.startedAt).toBeDefined();
      expect(state.lastUpdated).toBeDefined();
      expect(new Date(state.startedAt)).toBeInstanceOf(Date);
      expect(new Date(state.lastUpdated)).toBeInstanceOf(Date);
    });
  });

  describe('saveState', () => {
    beforeEach(() => {
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
    });

    test('should save state to file', async () => {
      await stateManager.saveState();

      expect(fs.existsSync(testStateFilePath)).toBe(true);
      const fileContent = await fs.promises.readFile(testStateFilePath, 'utf8');
      const savedState = JSON.parse(fileContent);

      expect(savedState.variant).toBe('standard');
      expect(savedState.tools).toEqual(['claude']);
    });

    test('should update lastUpdated timestamp on save', async () => {
      const initialState = stateManager.getState();
      const initialLastUpdated = initialState.lastUpdated;

      // Wait a bit to ensure timestamp difference
      await new Promise(resolve => setTimeout(resolve, 10));

      await stateManager.saveState({ stage: 'installing' });

      const updatedState = stateManager.getState();
      expect(updatedState.lastUpdated).not.toBe(initialLastUpdated);
      expect(new Date(updatedState.lastUpdated) > new Date(initialLastUpdated)).toBe(true);
    });

    test('should merge updates with existing state', async () => {
      await stateManager.saveState({ stage: 'installing' });

      const state = stateManager.getState();
      expect(state.stage).toBe('installing');
      expect(state.variant).toBe('standard'); // Original value preserved
    });

    test('should use atomic write (temp file + rename)', async () => {
      await stateManager.saveState();

      // Check that temp file doesn't exist after successful save
      const tempFilePath = `${testStateFilePath}.tmp`;
      expect(fs.existsSync(tempFilePath)).toBe(false);

      // Check that actual file exists
      expect(fs.existsSync(testStateFilePath)).toBe(true);
    });

    test('should throw error if state not initialized', async () => {
      const uninitializedManager = new StateManager();
      uninitializedManager.stateFilePath = path.join(os.tmpdir(), `.agentic-kit-test-uninit-${Date.now()}.json`);

      await expect(uninitializedManager.saveState()).rejects.toThrow('State not initialized');
    });
  });

  describe('loadState', () => {
    test('should load existing state from file', async () => {
      // Create and save a state
      stateManager.initializeState('pro', ['claude', 'opencode'], {
        claude: '~/.claude',
        opencode: '~/.config/opencode'
      });
      await stateManager.saveState({ stage: 'installing' });

      // Create new manager and load state
      const newManager = new StateManager();
      newManager.stateFilePath = testStateFilePath;
      const loadedState = await newManager.loadState();

      expect(loadedState).toBeDefined();
      expect(loadedState.variant).toBe('pro');
      expect(loadedState.tools).toEqual(['claude', 'opencode']);
      expect(loadedState.stage).toBe('installing');
    });

    test('should return null if state file does not exist', async () => {
      const newManager = new StateManager();
      newManager.stateFilePath = path.join(os.tmpdir(), '.non-existent-state.json');

      const loadedState = await newManager.loadState();
      expect(loadedState).toBeNull();
    });

    test('should return null if state file is corrupted (invalid JSON)', async () => {
      // Write invalid JSON to state file
      await fs.promises.writeFile(testStateFilePath, '{ invalid json }', 'utf8');

      const loadedState = await stateManager.loadState();
      expect(loadedState).toBeNull();
    });

    test('should validate loaded state structure', async () => {
      // Create invalid state (missing required fields)
      const invalidState = {
        variant: 'standard',
        tools: ['claude']
        // Missing many required fields
      };
      await fs.promises.writeFile(testStateFilePath, JSON.stringify(invalidState), 'utf8');

      const loadedState = await stateManager.loadState();
      expect(loadedState).toBeNull();
    });

    test('should warn about schema version mismatch', async () => {
      // Create state with different schema version
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
      const state = stateManager.getState();
      state.schemaVersion = '0.9.0'; // Old version
      await fs.promises.writeFile(testStateFilePath, JSON.stringify(state), 'utf8');

      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      await stateManager.loadState();

      expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('schema version mismatch'));
      consoleWarnSpy.mockRestore();
    });
  });

  describe('clearState', () => {
    test('should delete state file', async () => {
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
      await stateManager.saveState();

      expect(fs.existsSync(testStateFilePath)).toBe(true);

      await stateManager.clearState();

      expect(fs.existsSync(testStateFilePath)).toBe(false);
      expect(stateManager.getState()).toBeNull();
    });

    test('should not throw error if state file does not exist', async () => {
      await expect(stateManager.clearState()).resolves.not.toThrow();
    });
  });

  describe('hasInterruptedInstallation', () => {
    test('should return false if no state file exists', async () => {
      const hasInterrupted = await stateManager.hasInterruptedInstallation();
      expect(hasInterrupted).toBe(false);
    });

    test('should return false if installation is completed', async () => {
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
      await stateManager.saveState({ stage: 'completed' });

      const hasInterrupted = await stateManager.hasInterruptedInstallation();
      expect(hasInterrupted).toBe(false);
    });

    test('should return true if installation was interrupted', async () => {
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
      await stateManager.saveState({ stage: 'installing' });

      const newManager = new StateManager();
      newManager.stateFilePath = testStateFilePath;
      const hasInterrupted = await newManager.hasInterruptedInstallation();

      expect(hasInterrupted).toBe(true);
    });
  });

  describe('updateFileProgress', () => {
    beforeEach(() => {
      stateManager.initializeState('standard', ['claude'], { claude: '~/.claude' });
    });

    test('should update file progress', async () => {
      await stateManager.updateFileProgress('agents/master.md', 1024, 100, 102400);

      const state = stateManager.getState();
      expect(state.currentToolProgress.filesCompleted).toContain('agents/master.md');
      expect(state.currentToolProgress.bytesTransferred).toBe(1024);
      expect(state.currentToolProgress.totalFiles).toBe(100);
      expect(state.currentToolProgress.totalBytes).toBe(102400);
    });

    test('should accumulate multiple file updates', async () => {
      await stateManager.updateFileProgress('agents/master.md', 1024, 100, 102400);
      await stateManager.updateFileProgress('agents/orchestrator.md', 512, 100, 102400);

      const state = stateManager.getState();
      expect(state.currentToolProgress.filesCompleted).toHaveLength(2);
      expect(state.currentToolProgress.bytesTransferred).toBe(1536);
    });

    test('should not throw if state not initialized', async () => {
      const uninitializedManager = new StateManager();
      await expect(
        uninitializedManager.updateFileProgress('test.md', 100, 10, 1000)
      ).resolves.not.toThrow();
    });
  });

  describe('completeCurrentTool', () => {
    beforeEach(() => {
      stateManager.initializeState('standard', ['claude', 'opencode'], {
        claude: '~/.claude',
        opencode: '~/.config/opencode'
      });
    });

    test('should mark current tool as completed and move to next', async () => {
      expect(stateManager.getState().currentTool).toBe('claude');

      await stateManager.completeCurrentTool();

      const state = stateManager.getState();
      expect(state.completedTools).toContain('claude');
      expect(state.currentTool).toBe('opencode');
    });

    test('should reset progress for next tool', async () => {
      await stateManager.updateFileProgress('agents/master.md', 1024, 100, 102400);
      await stateManager.completeCurrentTool();

      const state = stateManager.getState();
      expect(state.currentToolProgress.filesCompleted).toHaveLength(0);
      expect(state.currentToolProgress.bytesTransferred).toBe(0);
      expect(state.currentToolProgress.toolId).toBe('opencode');
    });

    test('should set stage to completed when all tools done', async () => {
      await stateManager.completeCurrentTool(); // Complete claude
      await stateManager.completeCurrentTool(); // Complete opencode

      const state = stateManager.getState();
      expect(state.completedTools).toEqual(['claude', 'opencode']);
      expect(state.currentTool).toBeNull();
      expect(state.stage).toBe('completed');
    });
  });

  describe('failCurrentTool', () => {
    beforeEach(() => {
      stateManager.initializeState('standard', ['claude', 'opencode'], {
        claude: '~/.claude',
        opencode: '~/.config/opencode'
      });
    });

    test('should mark current tool as failed', async () => {
      const error = new Error('Installation failed');

      await stateManager.failCurrentTool(error);

      const state = stateManager.getState();
      expect(state.failedTools).toHaveLength(1);
      expect(state.failedTools[0].toolId).toBe('claude');
      expect(state.failedTools[0].error).toBe('Installation failed');
      expect(state.failedTools[0].timestamp).toBeDefined();
    });

    test('should record error details', async () => {
      const error = new Error('Test error');
      error.stack = 'Test stack trace';

      await stateManager.failCurrentTool(error);

      const state = stateManager.getState();
      expect(state.failedTools[0].stack).toBe('Test stack trace');
      expect(state.lastError.message).toBe('Test error');
    });

    test('should move to next tool after failure', async () => {
      await stateManager.failCurrentTool(new Error('Failed'));

      const state = stateManager.getState();
      expect(state.currentTool).toBe('opencode');
    });

    test('should set stage to failed when all tools processed with failures', async () => {
      await stateManager.failCurrentTool(new Error('Failed 1'));
      await stateManager.failCurrentTool(new Error('Failed 2'));

      const state = stateManager.getState();
      expect(state.stage).toBe('failed');
      expect(state.currentTool).toBeNull();
    });
  });

  describe('getResumeSummary', () => {
    beforeEach(() => {
      stateManager.initializeState('pro', ['claude', 'opencode', 'ampcode'], {
        claude: '~/.claude',
        opencode: '~/.config/opencode',
        ampcode: '~/.config/amp'
      });
    });

    test('should return null if state not initialized', () => {
      const uninitializedManager = new StateManager();
      expect(uninitializedManager.getResumeSummary()).toBeNull();
    });

    test('should return summary with progress information', async () => {
      await stateManager.completeCurrentTool(); // Complete claude

      const summary = stateManager.getResumeSummary();

      expect(summary).toBeDefined();
      expect(summary.variant).toBe('pro');
      expect(summary.totalTools).toBe(3);
      expect(summary.completedTools).toBe(1);
      expect(summary.remainingTools).toBe(2);
      expect(summary.completedToolsList).toEqual(['claude']);
      expect(summary.currentTool).toBe('opencode');
    });

    test('should include current tool progress', async () => {
      await stateManager.updateFileProgress('agents/master.md', 1024, 100, 102400);
      await stateManager.updateFileProgress('agents/orchestrator.md', 512, 100, 102400);

      const summary = stateManager.getResumeSummary();

      expect(summary.currentToolProgress.filesCompleted).toBe(2);
      expect(summary.currentToolProgress.totalFiles).toBe(100);
      expect(summary.currentToolProgress.percentComplete).toBe(2);
    });

    test('should include failed tools list', async () => {
      await stateManager.failCurrentTool(new Error('Failed'));

      const summary = stateManager.getResumeSummary();

      expect(summary.failedTools).toBe(1);
      expect(summary.failedToolsList).toEqual(['claude']);
    });
  });

  describe('validateState', () => {
    test('should validate complete state object', () => {
      const validState = {
        schemaVersion: '1.0.0',
        sessionId: 'test-session',
        startedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        variant: 'standard',
        tools: ['claude'],
        paths: { claude: '~/.claude' },
        currentTool: 'claude',
        completedTools: [],
        failedTools: [],
        currentToolProgress: {
          toolId: 'claude',
          filesCompleted: [],
          totalFiles: 0,
          bytesTransferred: 0,
          totalBytes: 0
        },
        stage: 'initializing',
        lastError: null
      };

      expect(stateManager.validateState(validState)).toBe(true);
    });

    test('should reject state with missing required fields', () => {
      const invalidState = {
        variant: 'standard',
        tools: ['claude']
        // Missing many required fields
      };

      expect(stateManager.validateState(invalidState)).toBe(false);
    });

    test('should reject state with invalid types', () => {
      const invalidState = {
        schemaVersion: '1.0.0',
        sessionId: 'test-session',
        startedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        variant: 123, // Should be string
        tools: 'claude', // Should be array
        paths: { claude: '~/.claude' },
        currentTool: 'claude',
        completedTools: [],
        failedTools: [],
        currentToolProgress: {
          toolId: 'claude',
          filesCompleted: [],
          totalFiles: 0,
          bytesTransferred: 0,
          totalBytes: 0
        },
        stage: 'initializing',
        lastError: null
      };

      expect(stateManager.validateState(invalidState)).toBe(false);
    });
  });

  describe('generateSessionId', () => {
    test('should generate unique session IDs', () => {
      const id1 = stateManager.generateSessionId();
      const id2 = stateManager.generateSessionId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    test('should include timestamp and random component', () => {
      const id = stateManager.generateSessionId();

      expect(id).toMatch(/^\d+-[a-z0-9]+$/);
    });
  });

  describe('getStateFilePath', () => {
    test('should return state file path', () => {
      const filePath = stateManager.getStateFilePath();

      expect(filePath).toBeDefined();
      expect(filePath).toContain('.agentic-kit-install-state.json');
    });
  });
});
