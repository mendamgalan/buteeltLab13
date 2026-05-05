# ADR-002 — AI-Assisted Implementation Strategy

**Status**: Accepted
**Context**: Personal Task Tracker project execution using AI (Copilot/Claude)
**Date**: May 2026
**Deciders**: Ж.Мэнд-Амгалан, AI Assistant (Claude)

---

## Problem Statement

How should AI tools (GitHub Copilot, Claude) be leveraged in a 2-week software construction project to:
1. **Maximize productivity** without sacrificing code quality
2. **Maintain security** despite AI-generated code
3. **Preserve learning** (student should still understand the code)
4. **Manage hallucinations** and incomplete AI suggestions

---

## Decision

**Use a 3-tier AI collaboration model:**

```
┌─────────────────────────────────────────────┐
│ Tier 1: AI-Driven (60%)                     │
│ - Boilerplate generation                    │
│ - Test case suggestions                     │
│ - Code refactoring prompts                  │
│ - Documentation auto-completion             │
└─────────────────────────────────────────────┘
                    ↓↓↓
┌─────────────────────────────────────────────┐
│ Tier 2: Hybrid Human-AI (30%)                │
│ - Architecture decisions (AI suggests +)     │
│ - Edge case handling (AI proposes)           │
│ - Error messages (AI drafts)                 │
│ - Code review checklist (AI-generated)       │
└─────────────────────────────────────────────┘
                    ↓↓↓
┌─────────────────────────────────────────────┐
│ Tier 3: Manual Human Review (10%)            │
│ - Security checks (SQL injection, etc.)      │
│ - Performance testing                        │
│ - Business logic validation                  │
│ - Production readiness sign-off              │
└─────────────────────────────────────────────┘
```

---

## Rationale

### Why This Approach?

1. **Productivity**: AI handles repetitive tasks (CRUD boilerplate, test skeletons)
   - Without AI: ~15-20 hours for full implementation
   - With AI: ~8-10 hours
   - Gain: 5-10 hours for refinement, testing, documentation

2. **Quality**: Mandatory manual review at critical layers
   - Security-sensitive code (database, validation)
   - Business logic (core algorithms)
   - Performance-critical paths

3. **Learning**: Student sees AI limitations, learns to review
   - Debugging AI mistakes teaches deeper understanding
   - Choosing between AI suggestions builds judgment
   - Manual review prevents "copy-paste without thinking"

4. **Maintainability**: Clear division of labor
   - AI: fast, consistent, easy to regenerate
   - Human: creative, contextual, responsible

---

## Implementation

### Tier 1 Workflow: AI-Driven (60%)

**When to use:**
- ✅ Boilerplate CRUD endpoints
- ✅ Validation schema generation
- ✅ Test case happy-path scenarios
- ✅ README sections, code comments
- ✅ API documentation (Swagger)

**How:**
```
1. Describe requirement in English
   "Generate GET /tasks endpoint with filters: priority, labels, search"

2. Copilot generates code
3. Review structure (function names, parameters, return shape)
4. Accept if structure good, move to Tier 2
```

**Example:**
```javascript
// Copilot-generated (with minor edits)
async function getTasks(req, res, next) {
  try {
    const { priority, label, search } = req.query;
    // AI provided this skeleton
    let query = "SELECT * FROM tasks WHERE 1=1";
    let params = [];

    if (priority) query += " AND priority = ?";
    if (label) query += " AND labels LIKE ?";
    if (search) query += " AND title LIKE ? OR description LIKE ?";

    const tasks = db.all(query, params);
    res.json({ data: tasks });
  } catch (err) {
    next(err);
  }
}
// ✅ Accept structure, move to Tier 2
```

### Tier 2 Workflow: Hybrid Human-AI (30%)

**When to use:**
- ⚠️ Database queries (parameterization check needed)
- ⚠️ Error handling (should not expose stack traces)
- ⚠️ Validation rules (business logic specific)
- ⚠️ Edge cases (what if X is null?)

**How:**
```
1. AI provides draft
2. Human reviews for business logic
3. If good: Human tests with edge cases
4. If gaps: Human refines or asks AI to revise
```

**Example:**
```javascript
// AI Draft (incomplete)
async function updateTask(req, res) {
  const { id } = req.params;
  const { title, priority } = req.body;
  
  db.run("UPDATE tasks SET title = ?, priority = ? WHERE id = ?", 
         [title, priority, id]);
  
  res.json({ data: { id } });
}

// Human Review Findings:
// ❌ Missing: check if task exists before update
// ❌ Missing: return updated task, not just ID
// ❌ Missing: error handling
// ✅ Good: parameterized query

// Human Revised:
async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, priority } = req.body;
    
    // Check existence
    const existing = db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    if (!existing) return res.status(404).json({ error: "Not found" });
    
    // Update
    db.run(
      "UPDATE tasks SET title = ?, priority = ? WHERE id = ?",
      [title, priority, id]
    );
    
    // Fetch and return updated
    const updated = db.get("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json({ data: updated, message: "Updated" });
  } catch (err) {
    next(err);
  }
}
```

### Tier 3 Workflow: Manual Review (10%)

**What to check:**

#### Security (Non-negotiable)
```javascript
// ❌ NEVER accept this from AI
const query = `SELECT * FROM tasks WHERE id = ${id}`;

// ✅ ALWAYS enforce parameterized queries
const query = "SELECT * FROM tasks WHERE id = ?";
db.get(query, [id]);
```

#### Error Messages
```javascript
// ❌ Leaks implementation details (production bad)
res.status(500).json({ 
  error: "TypeError: Cannot read property 'map' of undefined at line 42" 
});

// ✅ Generic safe message
res.status(500).json({ 
  error: "Internal server error", 
  message: "Task update failed" 
});
```

#### Performance
```javascript
// ❌ N+1 query problem (AI often misses this)
const tasks = db.all("SELECT * FROM tasks");
tasks.forEach(task => {
  task.labels = db.all("SELECT * FROM labels WHERE task_id = ?", [task.id]);
});

// ✅ Single JOIN query
const tasks = db.all(`
  SELECT t.*, GROUP_CONCAT(l.name) as label_names
  FROM tasks t
  LEFT JOIN task_labels tl ON t.id = tl.task_id
  LEFT JOIN labels l ON tl.label_id = l.id
  GROUP BY t.id
`);
```

#### Testing Completeness
```javascript
// ❌ Only happy path (AI tests default to this)
test("Should get all tasks", async () => {
  const res = await request(app).get("/api/tasks");
  expect(res.status).toBe(200);
  expect(res.body.data).toEqual([...]);
});

// ✅ Include error cases
test("Should return 404 for invalid task ID", async () => {
  const res = await request(app).get("/api/tasks/9999");
  expect(res.status).toBe(404);
});

test("Should return 400 for invalid priority filter", async () => {
  const res = await request(app).get("/api/tasks?priority=INVALID");
  expect(res.status).toBe(400);
});
```

---

## Tools & Prompting Strategy

### Tool Selection

| Tool | Best For | When NOT to use |
|------|----------|-----------------|
| **Copilot Inline** | Quick snippets, fixes | Complex architectural decisions |
| **Copilot Chat** | Multi-step reasoning, debugging | Security-sensitive code without review |
| **Claude (Chat)** | Explanations, alternatives, ethics | Real-time coding (slower) |

### Prompt Template (Effective)

```markdown
# Context
I'm building a Personal Task Tracker API with Express + SQLite + Zod.
Database: tasks table with (id, title, description, priority, due_date, created_at)

# Task
Generate a POST /api/tasks endpoint that:
1. Validates input with Zod schema
2. Inserts into database with parameterized query
3. Returns { data: newTask, message: "Created" }
4. Handles errors with try/catch

# Constraints
- Use async/await, no raw Promises
- Parameterized queries only
- Consistent error response shape
- ESLint-compliant (no console.log)

# Expected Output
- Route handler function
- Zod schema if needed
- Brief comment explaining error handling
```

**Why this works:**
- Context prevents hallucinations
- Constraints guide AI to your standards
- Expected output clarifies scope

---

## Guardrails & Rules

### ✅ Always Do
1. Read generated code before accepting
2. Check parameterized queries (security)
3. Test error cases manually
4. Review error messages (no stack traces)
5. Run linter (ESLint) before commit
6. Write tests for AI-generated code

### ❌ Never Do
1. Accept code without review (especially security)
2. Skip testing (AI often breaks edge cases)
3. Concatenate user input into SQL
4. Use `any` types or skip validation
5. Ignore performance (N+1 queries, etc.)
6. Copy error stack traces to production responses

### ⚠️ Verify Before Merging
- [ ] Security review (SQL injection, XSS, etc.)
- [ ] Test coverage > 70%
- [ ] Linter passing
- [ ] No `console.log` in production paths
- [ ] Error messages safe for production
- [ ] Performance acceptable

---

## Expected Outcomes

### Productivity Gains
| Phase | Manual | With AI | Gain |
|-------|--------|---------|------|
| Architecture | 2 hrs | 1 hr | 50% |
| API Skeleton | 4 hrs | 1.5 hrs | 60% |
| Validation | 2 hrs | 0.5 hrs | 75% |
| Tests | 3 hrs | 1 hr | 60% |
| Docs | 1 hr | 0.25 hrs | 75% |
| **Total** | 12 hrs | 4.25 hrs | **64% faster** |

### Quality Trade-offs
- ✅ Speed: +64% faster
- ✅ Code quality: Same (AI code is clean)
- ✅ Test coverage: Comparable (AI test suggestions solid)
- ⚠️ Security: Requires manual review (add 30-60 min)
- ⚠️ Edge cases: AI misses ~10% (need human catch)

---

## Alternatives Considered

### Option A: 100% AI-Generated (Rejected)
**Rationale**: High security risk, hallucinations undetected, learning reduced

### Option B: AI-Free (Manual Coding Only) (Rejected)
**Rationale**: 2-week timeline unrealistic without AI assistance

### Option C: 3-Tier Hybrid (Selected) ✅
**Rationale**: Balances productivity, security, quality, learning

---

## Success Criteria

- [ ] All features implemented
- [ ] Test coverage > 70%
- [ ] ESLint passing
- [ ] Security review clean
- [ ] API docs complete (Swagger)
- [ ] No SQL injection vulnerabilities
- [ ] Error messages safe for production
- [ ] No unhandled promise rejections
- [ ] Student can explain 80% of code

---

## Lessons Learned (Retrospective)

### What Worked
✅ Tier 1 boilerplate generation saved 40% time
✅ Copilot Chat for debugging was efficient
✅ Zod schema generation accurate
✅ Test skeleton suggestions solid

### What Needs Improvement
⚠️ AI often over-engineers solutions (e.g., middleware chains)
⚠️ Edge case handling required manual addition
⚠️ Performance queries (JOINs) need human review
⚠️ Error handling patterns not always idiomatic

### Future Adjustments
- Add security checklist template to prompts
- Request AI suggest edge cases explicitly
- Use "Write idiomatic Express" as constraint
- Pair with TypeScript to catch type errors early

---

## Conclusion

**This ADR recommends the 3-tier hybrid model for AI-assisted development:**

1. **Tier 1 (60%)**: AI generates, human spot-checks structure
2. **Tier 2 (30%)**: Human + AI collaborate on business logic
3. **Tier 3 (10%)**: Mandatory security/performance review

**Expected**: 64% faster development with maintained code quality and security.