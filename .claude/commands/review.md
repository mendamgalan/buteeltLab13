# /review — Security & Robustness Review

Review the selected code for security vulnerabilities and robustness issues.

## Instructions

Analyze the provided code and check for:

### Security (OWASP Top 10)
- [ ] SQL Injection — are all queries parameterized?
- [ ] Input validation — is all user input validated and sanitized?
- [ ] Error messages — do they leak internal info or stack traces?
- [ ] Sensitive data — are secrets/keys hardcoded?
- [ ] Rate limiting — are endpoints protected?

### Robustness
- [ ] Error handling — are all async operations in try/catch?
- [ ] Edge cases — null/undefined, empty arrays, negative numbers
- [ ] Type checking — are inputs the expected type?
- [ ] Resource cleanup — are DB connections/files closed?

### Code Quality
- [ ] Does it follow CLAUDE.md conventions?
- [ ] No `console.log` in production paths?
- [ ] No `eval()` or `new Function()`?

## Output Format

```
## Security Issues
🔴 CRITICAL: [issue] — [fix suggestion]
🟡 WARNING: [issue] — [fix suggestion]
🟢 OK: [what looks good]

## Robustness Issues
[same format]

## Recommendations
[ordered by priority]
```