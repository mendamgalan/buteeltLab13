# /test — Test Generation

Generate comprehensive tests following the testing pyramid.

## Instructions

For the selected code, generate Jest unit tests covering:

### Testing Pyramid
1. **Unit tests** — individual functions in isolation (most tests here)
2. **Integration tests** — controller + model together (mock DB)
3. **Edge cases** — boundary values, error conditions

### Required Test Cases per Function
- ✅ Happy path — normal valid input
- ❌ Invalid input — wrong type, missing required field
- 🔲 Edge case — empty string, zero, null, max length
- 💥 Error condition — DB failure, not found

### Test Structure
```javascript
describe('[Module] [Function]', () => {
  beforeEach(() => { /* setup mocks */ });
  afterEach(() => { /* cleanup */ });

  it('should [expected behavior] when [condition]', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Mocking Rules
- Mock all DB calls — no real DB writes in unit tests
- Mock `better-sqlite3` with jest.mock()
- Use `supertest` for HTTP endpoint tests

## Output
Generate complete test file ready to run with `npm test`.