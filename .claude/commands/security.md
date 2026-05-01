# /security — OWASP Top 10 Security Audit

Perform a focused security audit based on OWASP Top 10 (2021).

## Instructions

Audit the provided code against OWASP Top 10:

### A01 — Broken Access Control
- Are there authorization checks?
- Can users access resources they shouldn't?

### A02 — Cryptographic Failures
- Is sensitive data transmitted/stored securely?
- Are passwords hashed (bcrypt)?

### A03 — Injection
- SQL: Are all queries parameterized? No string concatenation?
- NoSQL: N/A (SQLite used)
- Command injection: Any use of exec/spawn with user input?

### A04 — Insecure Design
- Is input validation enforced at the API boundary?
- Are error responses generic (no internal details)?

### A05 — Security Misconfiguration
- Are security headers set (helmet)?
- Is CORS configured restrictively?
- Are debug modes off in production?

### A06 — Vulnerable Components
- Check package.json dependencies for known CVEs
- Run: `npm audit`

### A07 — Identification & Auth Failures
- (Single-user app — note if auth is missing by design)

### A08 — Software & Data Integrity
- Is the .gitignore correct? (no .env, *.db committed)

### A09 — Logging Failures
- Are errors logged with context?
- Are sensitive fields excluded from logs?

### A10 — SSRF
- Does the app make outbound HTTP requests with user input?

## Output Format
```
## OWASP Audit Results

### Critical 🔴
[list issues]

### Warning 🟡
[list issues]

### Info 🔵
[observations]

### Passed ✅
[what looks good]

## Priority Fixes
1. [most critical fix]
2. ...
```