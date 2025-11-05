# Security Considerations - Agentic Kit

## Overview

This document outlines the security measures implemented in Agentic Kit and provides guidance for secure usage. The installer handles file system operations and user input, making security a critical concern.

## Security Principles

1. **Least Privilege**: The installer runs with user permissions, not root/admin
2. **Input Validation**: All user input is validated and sanitized
3. **Path Safety**: File operations are protected against path traversal attacks
4. **Atomic Operations**: Installation operations are atomic with rollback capability
5. **No Code Execution**: No dynamic code execution from user input or configuration files

## Security Measures Implemented

### 1. Path Traversal Prevention

**Risk**: Malicious path input like `../../etc/passwd` could access sensitive files

**Mitigations**:
- All paths are resolved to absolute paths using `path.resolve()`
- Parent directory references are normalized before use
- Installation only writes to user-specified directories
- Paths are validated to ensure they're within expected boundaries
- Symlink attacks are prevented by checking real paths

**Code Locations**:
- `installer/path-manager.js`: Path validation and normalization
- `installer/installation-engine.js`: File operations with path checks

### 2. Input Validation

**Risk**: Malicious tool names or variants could cause unexpected behavior

**Mitigations**:

#### Tool Names
- Tool names are validated against a whitelist: `claude`, `opencode`, `ampcode`, `droid`
- Only predefined tools can be selected
- Tool names are sanitized before use in file paths

#### Variant Names
- Variants are validated against whitelist: `lite`, `standard`, `pro`
- Invalid variants are rejected with clear error messages
- Variant names are sanitized before use

#### File Paths
- Custom paths are validated for:
  - Existence of parent directory
  - Write permissions
  - Available disk space
  - Path format validity
- Tilde (`~`) expansion is handled securely

**Code Locations**:
- `installer/cli.js`: Input validation in `selectTools()`, `selectVariant()`, `configurePaths()`
- `installer/path-manager.js`: Path validation in `validatePath()`

### 3. Configuration File Parsing

**Risk**: Malicious JSON in variants.json could cause code execution or DoS

**Mitigations**:
- JSON parsing uses `JSON.parse()` with try-catch error handling
- No use of `eval()` or dynamic code execution
- Configuration schema is validated:
  - Required fields are checked
  - Data types are validated
  - Array contents are validated
  - Unexpected fields are ignored
- File size limits prevent DoS via large files
- Malformed JSON is caught and reported safely

**Code Locations**:
- `installer/package-manager.js`: `loadVariantConfig()` method
- Validation in `selectVariantContent()` and `validatePackage()`

### 4. File Operation Safety

**Risk**: Race conditions or interrupted operations could leave system in inconsistent state

**Mitigations**:

#### Atomic Operations
- Files are written atomically where possible
- Temporary files are used for multi-step operations
- Failed operations are rolled back completely
- Installation state is tracked for resume capability

#### Race Condition Prevention
- Sequential file operations for dependent tasks
- State locking prevents concurrent installations
- Proper error handling at each step

#### Backup Safety
- Backups are created before overwriting existing files
- Backup files are stored in temporary locations
- Backup permissions match original file permissions (0600 or more restrictive)
- Backups are automatically cleaned up after successful installation

**Code Locations**:
- `installer/installation-engine.js`: Atomic operations and rollback
- `installer/state-manager.js`: State management and locking

### 5. Sensitive Data Protection

**Risk**: Installation logs or backups could expose sensitive information

**Mitigations**:
- Installation logs stored with user-only permissions (0600)
- Backup files inherit secure permissions
- No sensitive data (passwords, keys) in logs or reports
- Telemetry data is anonymous (see PRIVACY.md)
- Rollback removes all traces of failed installation

**File Permissions**:
```
~/.agentic-kit-install.log        - 0600 (read/write owner only)
~/.agentic-kit-config.json        - 0600 (read/write owner only)
~/.agentic-kit-telemetry.log      - 0600 (read/write owner only)
~/.agentic-kit-install-state.json - 0600 (read/write owner only)
```

**Code Locations**:
- `installer/report-template.js`: Report generation
- `installer/telemetry.js`: Telemetry logging

### 6. Command Injection Prevention

**Risk**: User input could be used in shell commands causing injection attacks

**Mitigations**:
- **No shell execution of user input**: User-provided paths and names are never passed to shell
- File operations use Node.js `fs` module APIs directly (not shell commands)
- No use of `child_process.exec()` with user input
- Path concatenation uses `path.join()` not string concatenation

### 7. Symbolic Link Attacks

**Risk**: Malicious symlinks could cause files to be written to unintended locations

**Mitigations**:
- `fs.realpath()` is used to resolve symlinks before operations
- Target paths are validated after symlink resolution
- Installation directory is checked for unexpected symlinks
- Manifest files are validated to prevent symlink exploitation

### 8. Denial of Service Prevention

**Risk**: Malicious configuration could cause resource exhaustion

**Mitigations**:
- File size limits on configuration files (max 1MB)
- Installation timeout limits (default 10 minutes per tool)
- File count limits (max 10,000 files per tool)
- Memory usage limits during file operations
- Disk space checks before installation

## Security Testing

### Test Cases Implemented

1. **Path Traversal Tests**
   - `../../etc/passwd` → Rejected
   - `~/../../../etc/passwd` → Rejected
   - Symlinks to sensitive files → Detected and rejected

2. **Input Validation Tests**
   - Invalid tool names → Rejected
   - Invalid variants → Rejected
   - Special characters in paths → Sanitized or rejected
   - Very long input strings → Truncated or rejected

3. **Configuration Parsing Tests**
   - Malformed JSON → Handled gracefully
   - Extremely large JSON files → Rejected
   - Unexpected JSON structure → Validated and rejected

4. **Race Condition Tests**
   - Concurrent installations → Prevented
   - Interrupted installations → Recoverable
   - File system changes during installation → Detected

### Manual Testing Recommendations

When testing the installer, try these security test cases:

```bash
# Path traversal attempts
node installer/cli.js --variant standard --tools claude --path claude=../../etc/passwd

# Command injection attempts
node installer/cli.js --variant standard --tools "claude; rm -rf /" --silent

# Large file DoS
# Create variants.json with 1GB of data and test parsing

# Race condition tests
# Run two installers simultaneously

# Symlink attacks
# Create symlink at installation target pointing to sensitive location
ln -s /etc ~/.claude
node installer/cli.js --variant standard --tools claude
```

## Known Limitations

### 1. File System Permissions
- The installer respects existing file system permissions
- If user has write access to sensitive directories, installer could write there
- **Mitigation**: Run installer as regular user, not root/admin

### 2. Disk Space Exhaustion
- Very large installations could fill available disk space
- **Mitigation**: Pre-installation disk space checks

### 3. Interrupted Operations
- Hard system crashes (power loss) may leave partial installations
- **Mitigation**: Resume capability and rollback on restart

## Security Best Practices

### For Users

1. **Don't Run as Root**: Always run installer with regular user privileges
2. **Review Custom Paths**: Carefully check custom installation paths before confirming
3. **Use Default Paths**: Default paths are safer and well-tested
4. **Keep Node.js Updated**: Ensure you're using a supported Node.js version
5. **Review Logs**: Check installation logs for unexpected behavior
6. **Verify Sources**: Only download agentic-kit from official sources

### For Developers

1. **Input Validation**: Validate all external input before use
2. **No Dynamic Execution**: Never use `eval()` or execute user-provided code
3. **Secure File Operations**: Always use `path.join()` and validate paths
4. **Error Handling**: Catch and handle errors gracefully without exposing internals
5. **Security Reviews**: Review code changes for security implications
6. **Dependency Audits**: Regularly audit npm dependencies for vulnerabilities

## Dependency Security

### Current Dependencies

The installer has minimal dependencies to reduce attack surface:
- Node.js built-in modules only (fs, path, os, readline)
- No third-party dependencies for core functionality

### Dependency Management

1. **Regular Audits**: Run `npm audit` regularly
2. **Minimal Dependencies**: Only add dependencies when absolutely necessary
3. **Version Pinning**: Lock dependency versions to prevent supply chain attacks
4. **Security Updates**: Apply security updates promptly

## Reporting Security Vulnerabilities

If you discover a security vulnerability in Agentic Kit:

### Do Not
- ❌ Open a public GitHub issue
- ❌ Discuss in public forums or social media
- ❌ Exploit the vulnerability

### Do
- ✅ Email security report to: [security contact email]
- ✅ Provide detailed description of vulnerability
- ✅ Include steps to reproduce
- ✅ Allow reasonable time for fix before public disclosure
- ✅ Provide proof of concept (if applicable)

### Our Commitment
- We will acknowledge receipt within 48 hours
- We will provide regular updates on fix progress
- We will credit reporters (unless anonymity requested)
- We will release fixes as quickly as safely possible

## Security Checklist

Before each release, verify:

- [ ] All user input is validated
- [ ] Path operations use `path.join()` and are validated
- [ ] No use of `eval()` or `child_process.exec()` with user input
- [ ] Configuration parsing is safe and validates structure
- [ ] File permissions are set correctly (0600 for sensitive files)
- [ ] Error messages don't expose system internals
- [ ] Rollback mechanism works correctly
- [ ] Race conditions are prevented
- [ ] Resource limits are enforced
- [ ] Security tests pass
- [ ] Dependencies have no known vulnerabilities
- [ ] Documentation is up to date

## Audit Log

### Version 1.2.0 (January 2025)
- Initial security review conducted
- Path traversal prevention implemented
- Input validation added for all user inputs
- Configuration parsing hardened
- File permissions secured
- Security documentation created

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [NPM Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)

---

**Last Updated**: January 2025
**Version**: 1.0
**Next Review**: July 2025
