---
description: Security vulnerability scan
argument-hint: [file, directory, or leave empty for full scan]
allowed-tools: Read, Grep, Glob
---
Audit $ARGUMENTS for security vulnerabilities.

## Check For
- Injection: SQL, command, XSS, template
- Auth: Weak passwords, session issues, CSRF
- Data: Exposure, logging secrets, insecure storage
- Config: Debug mode, default creds, missing headers
- Dependencies: Known CVEs

## Output
Severity-ranked findings with:
- Location (file:line)
- Risk explanation
- Remediation steps
