# Contributing to VoidCat Operating System (VCOS)

Thank you for your interest in contributing to VoidCat Operating System! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Security](#security)
- [Questions?](#questions)

## Code of Conduct

This project follows the [VoidCat Project Development Rules](.voidcatrules). All contributors must adhere to these rules, which emphasize:

- Zero-Compromise Quality Standards
- Test-Driven Development
- Security-first approach
- Comprehensive documentation
- Respectful collaboration

## Getting Started

### Prerequisites

- Node.js 23.3.0+
- Bun 1.2.21+
- Git
- A GitHub account

### Development Environment Setup

1. **Fork and clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/eliza.git
cd eliza
```

2. **Install dependencies**

```bash
bun install
```

3. **Build the project**

```bash
bun run build
```

4. **Run tests**

```bash
bun run test
```

5. **Verify everything works**

```bash
bun run lint
bun run format:check
```

## Development Workflow

### Branch Strategy

We use the following branch structure:

- `main` - Production-ready code (protected)
- `develop` - Integration branch (protected)
- `feat/<component>-<description>` - Feature branches
- `fix/<issue>-<description>` - Bug fix branches
- `docs/<description>` - Documentation branches

### Creating a Feature Branch

```bash
# Make sure you're on develop and it's up to date
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feat/my-feature

# Make your changes and commit
git add .
git commit -m "feat: add new feature"

# Push to your fork
git push origin feat/my-feature
```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

**Examples:**

```
feat(runtime): add security context injection to AgentRuntime
fix(plugin-github): handle rate limiting correctly
docs(architecture): update plugin API diagrams
test(core): add coverage for error handling
```

## Coding Standards

### TypeScript Style

- Use TypeScript strict mode
- No `any` types in public APIs
- Prefer explicit typing over type inference for public APIs
- Use meaningful variable and function names

### Formatting

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas (es5 style)
- Max line width: 100 characters

Run the formatter before committing:

```bash
bun run format
```

### Linting

All code must pass linting:

```bash
bun run lint
```

Fix auto-fixable issues:

```bash
bun run lint --fix
```

### File Organization

```
packages/
  ├── core/           # Core runtime and types
  ├── server/         # Express API server
  ├── client/         # React UI
  ├── cli/            # CLI tool
  └── plugin-*/       # Plugins
```

- Keep files focused and single-purpose
- Group related functionality
- Use index files for clean exports
- Maximum 500 lines per file (guideline, not hard rule)

## Testing Requirements

### Coverage Targets

**MANDATORY:**

- Line coverage: >= 90%
- Branch coverage: >= 85%
- New plugins: 100% coverage
- Critical business logic: 100% coverage

### Test Types

1. **Unit Tests** - Test individual functions/methods

```typescript
import { describe, it, expect } from 'bun:test';

describe('MyFunction', () => {
  it('should handle valid input', () => {
    const result = myFunction('valid');
    expect(result).toBe('expected');
  });

  it('should throw on invalid input', () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

2. **Integration Tests** - Test component interactions

```typescript
describe('AgentRuntime Integration', () => {
  it('should inject security context on spawn', async () => {
    const runtime = new AgentRuntime(config);
    const agent = await runtime.spawn(agentConfig);
    expect(agent.securityContext).toBeDefined();
  });
});
```

3. **Plugin Tests** - Test plugin API compliance

```typescript
describe('MyPlugin MCP Compliance', () => {
  it('should complete MCP handshake', async () => {
    const plugin = new MyPlugin(config);
    const handshake = await plugin.mcpHandshake();
    expect(handshake.version).toBe('1.0');
  });
});
```

### Running Tests

```bash
# Run all tests
bun run test

# Run tests for specific package
cd packages/core
bun run test

# Run with coverage
bun run test --coverage

# Run specific test file
bun test path/to/test.test.ts
```

### Test Guidelines

- Tests must be deterministic (no flakiness)
- Use mocks for external dependencies
- Use fixtures/recordings for integration tests
- Test edge cases and error conditions
- Keep tests fast (< 1s per unit test)

## Pull Request Process

### Before Opening a PR

- [ ] All tests pass locally
- [ ] Code is formatted (`bun run format`)
- [ ] Linting passes (`bun run lint`)
- [ ] Coverage thresholds met (>= 90% lines, >= 85% branches)
- [ ] Documentation updated (if applicable)
- [ ] Commit messages follow conventional format

### PR Checklist

When you open a PR, include this checklist in the description:

```markdown
## PR Checklist

- [ ] Tests added/updated, coverage reports attached
- [ ] Build and static checks passed locally and in CI
- [ ] Documentation updated (where relevant)
- [ ] Security scan passed or documented mitigation
- [ ] Follows .voidcatrules standards
- [ ] No breaking changes (or migration guide provided)
```

### PR Review Process

1. **Automated Checks**

   - CI build must pass
   - All tests must pass
   - Coverage thresholds must be met
   - CodeQL security scan must pass
   - No critical or high vulnerabilities

2. **Peer Review**

   - At least 1 peer reviewer approval required
   - Address all review comments
   - Resolve all conversations

3. **Maintainer Approval**

   - 1 maintainer approval required for merge
   - Maintainers verify architectural alignment

4. **Merge**
   - Squash merge to develop (keep history clean)
   - Delete feature branch after merge

### CI Pipeline

Our CI pipeline enforces the 5-Gate Progressive System:

**Gate 2**: Development environment ready

- Dependencies install successfully
- Build completes without errors

**Gate 3**: Code complete with tests

- All tests pass
- Static analysis passes (linting, type checking)

**Gate 4**: Security and quality validation

- Coverage >= 90% lines, >= 85% branches
- CodeQL scan passes (no critical/high issues)
- Dependency scan passes

## Security

### Reporting Vulnerabilities

**DO NOT** open public issues for security vulnerabilities.

Instead:

1. Email security@voidcat.example (placeholder - to be updated)
2. Include detailed description and reproduction steps
3. Wait for acknowledgment before public disclosure

### Security Requirements

- No hardcoded secrets (use environment variables)
- All external communication over TLS 1.2+
- Input validation on all user-provided data
- Permission checks before resource access
- Audit logging for security events

### SAST and Dependency Scanning

All PRs are automatically scanned:

- CodeQL for code vulnerabilities
- Dependency scanning for vulnerable packages
- Critical/High findings block merge

## Documentation

### When to Update Docs

Update documentation when you:

- Add new features or APIs
- Change existing behavior
- Add configuration options
- Create new plugins

### Documentation Types

1. **Code Comments** (JSDoc/TSDoc)

```typescript
/**
 * Spawns a new agent with security context.
 *
 * @param config - Agent configuration
 * @returns Promise resolving to spawned agent
 * @throws {PermissionError} If insufficient permissions
 */
async spawn(config: AgentConfig): Promise<Agent>
```

2. **README Files** - In each package directory

3. **Architecture Docs** - In `docs/` directory

4. **API Reference** - Auto-generated from JSDoc

## Development Tips

### Debugging

Use the debug log level:

```bash
LOG_LEVEL=debug bun run start
```

### Performance Profiling

```bash
bun run --inspect start
# Open chrome://inspect in Chrome
```

### IDE Setup

**VSCode Recommended Extensions:**

- TypeScript and JavaScript Language Features
- Prettier - Code formatter
- ESLint
- Bun for Visual Studio Code

**Settings:**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Getting Help

### Resources

- [Architecture Documentation](docs/Architecture.md)
- [PRD](docs/PRD.md)
- [VoidCat Rules](.voidcatrules)
- [Milestone Timeline](docs/Milestone_Timeline.md)

### Communication

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: Questions and general discussion
- **Pull Requests**: Code review and technical discussion

### Common Issues

**Issue**: Build fails with dependency errors  
**Solution**: Clear cache and reinstall

```bash
rm -rf node_modules bun.lock
bun install
```

**Issue**: Tests timeout  
**Solution**: Increase timeout in test

```typescript
it('long running test', async () => {
  // test code
}, 60000); // 60 second timeout
```

**Issue**: Coverage below threshold  
**Solution**: Add tests for uncovered code paths

## Recognition

Contributors will be recognized in:

- Release notes
- Contributors list in README
- Project changelog

## License

By contributing to VCOS, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

## Quick Reference

### Essential Commands

```bash
# Setup
bun install
bun run build

# Development
bun run dev
bun run test
bun run lint
bun run format

# CI checks (run before PR)
bun run build
bun run test
bun run lint
bun run format:check

# Package-specific
cd packages/core
bun run build
bun run test
```

### File Structure for New Plugin

```
packages/plugin-my-plugin/
├── src/
│   ├── index.ts          # Main plugin export
│   ├── plugin.ts         # Plugin implementation
│   ├── types.ts          # Type definitions
│   └── __tests__/        # Test files
│       ├── plugin.test.ts
│       └── integration.test.ts
├── package.json          # Plugin manifest
├── README.md             # Plugin documentation
├── tsconfig.json         # TypeScript config
└── .npmignore           # NPM publish exclusions
```

---

**Last Updated**: 2025-11-04  
**Version**: 1.0 (aligned with VCOS transformation)

Thank you for contributing to VoidCat Operating System! 🚀
