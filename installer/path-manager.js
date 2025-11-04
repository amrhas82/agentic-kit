/**
 * Path Manager for Agentic Kit Installer
 * 
 * Handles path validation, permissions, and tool-specific path management
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class PathManager {
  constructor() {
    this.homeDir = os.homedir();
    this.defaultPaths = {
      claude: path.join(this.homeDir, '.claude'),
      opencode: path.join(this.homeDir, '.config', 'opencode'),
      ampcode: path.join(this.homeDir, '.amp'),
      droid: path.join(this.homeDir, '.factory')
    };
  }
  
  /**
   * Expand user home path (~) to full path
   */
  expandPath(pathStr) {
    if (pathStr.startsWith('~')) {
      return path.join(this.homeDir, pathStr.slice(1));
    }
    return pathStr;
  }
  
  /**
   * Validate if a path is writable
   */
  async validatePath(pathStr) {
    const fullPath = this.expandPath(pathStr);
    
    try {
      // Check if parent directory exists and is writable
      const parentDir = path.dirname(fullPath);
      await fs.promises.access(parentDir, fs.constants.W_OK);
      
      // Try to create the directory if it doesn't exist
      await fs.promises.mkdir(fullPath, { recursive: true });
      
      // Test write access
      const testFile = path.join(fullPath, '.install-test');
      await fs.promises.writeFile(testFile, 'test');
      await fs.promises.unlink(testFile);
      
      return { valid: true, path: fullPath };
    } catch (error) {
      return { 
        valid: false, 
        path: fullPath, 
        error: error.message 
      };
    }
  }
  
  /**
   * Get disk space information for a path
   */
  async getDiskSpace(pathStr) {
    const fullPath = this.expandPath(pathStr);
    
    try {
      const stats = await fs.promises.statfs(fullPath);
      return {
        total: stats.bavail * stats.bsize,
        available: stats.bavail * stats.bsize,
        path: fullPath
      };
    } catch (error) {
      return { error: error.message };
    }
  }
  
  /**
   * Check if path exists and has existing installation
   */
  async checkExistingInstallation(pathStr) {
    const fullPath = this.expandPath(pathStr);
    
    try {
      const manifestPath = path.join(fullPath, 'manifest.json');
      await fs.promises.access(manifestPath);
      
      const manifest = JSON.parse(
        await fs.promises.readFile(manifestPath, 'utf8')
      );
      
      return {
        exists: true,
        manifest,
        path: fullPath
      };
    } catch (error) {
      return { exists: false, path: fullPath };
    }
  }
  
  /**
   * Get default path for a tool
   */
  getDefaultPath(toolId) {
    return this.defaultPaths[toolId] || null;
  }
  
  /**
   * Normalize path for display
   */
  normalizePathForDisplay(pathStr) {
    const fullPath = this.expandPath(pathStr);
    
    if (fullPath.startsWith(this.homeDir)) {
      return '~' + fullPath.slice(this.homeDir.length);
    }
    
    return fullPath;
  }
}

module.exports = PathManager;