# VCOS Developer Setup Guide

This guide will help you set up your development environment for VoidCat Operating System (VCOS).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Development Tools](#development-tools)
- [Running the Project](#running-the-project)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | 23.3.0+ | https://nodejs.org/ |
| **Bun** | 1.2.21+ | https://bun.sh/docs/installation |
| **Git** | Latest | https://git-scm.com/ |

### Operating System Support

- ✅ **Linux** (Ubuntu 20.04+, Debian 11+, Fedora 35+)
- ✅ **macOS** (12.0+ Monterey)
- ✅ **Windows** (via WSL 2)

> **Windows Users**: You must use WSL 2. Native Windows is not supported.

---

## Quick Start

### 1-Minute Setup

```bash
# Clone the repository
git clone https://github.com/voidcat/eliza.git
cd eliza

# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test

# Start development
bun run dev
```

If all commands succeed, you're ready to develop! ✅

---

## Detailed Setup

### Step 1: Install Node.js

**Using nvm (recommended):**

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install Node.js 23
nvm install 23
nvm use 23
nvm alias default 23

# Verify
node --version  # Should show v23.x.x
```

**Using package manager:**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_23.x | sudo -E bash -
sudo apt-get install -y nodejs

# macOS
brew install node@23

# Verify
node --version
```

### Step 2: Install Bun

**Linux/macOS:**

```bash
curl -fsSL https://bun.sh/install | bash

# Restart shell or source profile
source ~/.bashrc  # or ~/.zshrc

# Verify
bun --version  # Should show 1.2.21 or higher
```

**Windows (WSL):**

```bash
# Inside WSL terminal
curl -fsSL https://bun.sh/install | bash

# Verify
bun --version
```

### Step 3: Clone Repository

```bash
# Fork the repository first on GitHub, then:
git clone https://github.com/YOUR_USERNAME/eliza.git
cd eliza

# Add upstream remote
git remote add upstream https://github.com/voidcat/eliza.git

# Verify remotes
git remote -v
```

### Step 4: Install Dependencies

```bash
# Install all workspace dependencies
bun install

# This will:
# - Install all npm packages
# - Run postinstall scripts
# - Initialize git submodules
# - Set up pre-commit hooks
```

**Expected output:**
```
bun install v1.2.21 (...)
Resolving dependencies
Resolved, downloaded and extracted [328]
✓ Installation complete
```

### Step 5: Build Project

```bash
# Build all packages (except app and config)
bun run build

# This will:
# - Compile TypeScript to JavaScript
# - Generate type declarations
# - Bundle CLI executables
# - Run in parallel using Turbo
```

**Build times:**
- Fresh build: ~2-5 minutes
- Incremental build: ~30-60 seconds

**Expected output:**
```
turbo run build --filter=!./packages/app ...
✓ Built core
✓ Built server
✓ Built client
✓ Built cli
... (more packages)
Build complete!
```

### Step 6: Verify Installation

```bash
# Run test suite
bun run test

# Run linter
bun run lint

# Check formatting
bun run format:check
```

All checks should pass ✅

---

## Development Tools

### Recommended IDE: Visual Studio Code

**Install VSCode:**

```bash
# Ubuntu/Debian
sudo snap install code --classic

# macOS
brew install --cask visual-studio-code

# Or download from https://code.visualstudio.com/
```

**Recommended Extensions:**

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "oven.bun-vscode",
    "ms-vscode.vscode-typescript-next",
    "usernamehw.errorlens",
    "eamodio.gitlens"
  ]
}
```

Install all recommended extensions:

```bash
# Open VSCode in project directory
code .

# VSCode will prompt to install recommended extensions
```

**VSCode Settings (.vscode/settings.json):**

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### Alternative IDEs

**WebStorm:**
- Built-in TypeScript support
- Excellent refactoring tools
- Git integration

**Vim/Neovim:**
- Use with coc.nvim or native LSP
- TypeScript language server

---

## Running the Project

### Development Mode

**Start dev server with watch mode:**

```bash
# Watch all packages (rebuilds on change)
bun run dev
```

**Start specific package:**

```bash
# Core package
cd packages/core
bun run dev

# Server
cd packages/server
bun run dev

# Client
cd packages/client
bun run dev
```

### Running the CLI

```bash
# Build CLI first
bun run build:cli

# Run CLI (from project root)
bun run start

# Or run with specific character file
bun run start -- --characters characters/example.json
```

### Running Tests

```bash
# All tests
bun run test

# Core tests only
bun run test:core

# Client tests
bun run test:client

# With coverage
cd packages/core
bun run test --coverage

# Watch mode (re-run on changes)
bun run test --watch

# Specific test file
bun test packages/core/src/__tests__/runtime.test.ts
```

### Linting and Formatting

```bash
# Check for lint errors
bun run lint

# Auto-fix lint errors
bun run lint --fix

# Format code
bun run format

# Check formatting (CI mode)
bun run format:check
```

### Building for Production

```bash
# Build all packages
bun run build

# Build specific package
bun run build:core
bun run build:cli
bun run build:client

# Clean build (remove all artifacts first)
bun run clean
```

---

## Environment Configuration

### Create .env file

```bash
cp .env.example .env
```

**Edit .env with your API keys:**

```env
# OpenAI (for GPT models)
OPENAI_API_KEY=sk-...

# Anthropic (for Claude models)
ANTHROPIC_API_KEY=sk-ant-...

# Log level
LOG_LEVEL=info

# Other optional keys
GITHUB_API_KEY=ghp_...
```

**Never commit .env to git!** (already in .gitignore)

### Environment Variables Reference

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `OPENAI_API_KEY` | Recommended | OpenAI API key | - |
| `ANTHROPIC_API_KEY` | Recommended | Anthropic API key | - |
| `LOG_LEVEL` | No | Logging level (debug, info, warn, error) | info |
| `NODE_ENV` | No | Environment (development, production, test) | development |
| `PORT` | No | Server port | 3000 |

---

## Monorepo Structure

```
eliza/
├── packages/               # All workspace packages
│   ├── core/              # Core runtime (AgentRuntime, types)
│   ├── server/            # Express API server
│   ├── client/            # React web UI
│   ├── cli/               # CLI tool (elizaos command)
│   ├── plugin-*/          # Plugins (bootstrap, sql, etc.)
│   └── project-*/         # Starter templates
├── docs/                  # Documentation
├── examples/              # Example projects
├── scripts/               # Build and automation scripts
├── .github/               # GitHub Actions workflows
├── package.json           # Root package (workspace config)
├── turbo.json            # Turbo configuration
├── lerna.json            # Lerna configuration
└── .voidcatrules         # VoidCat development rules
```

### Package Dependencies

```
┌─────────────┐
│    CLI      │  (depends on ↓)
└─────────────┘
       ↓
┌─────────────┐
│   Server    │  (depends on ↓)
└─────────────┘
       ↓
┌─────────────┐
│    Core     │  (base layer)
└─────────────┘

Plugins depend on Core
```

---

## Troubleshooting

### Build Errors

**Issue**: "Cannot find module 'X'"

```bash
# Solution: Clean install
rm -rf node_modules bun.lock
bun install
bun run build
```

**Issue**: "TypeScript errors"

```bash
# Solution: Rebuild type declarations
bun run build
```

**Issue**: "Turbo build failed"

```bash
# Solution: Clear Turbo cache
rm -rf .turbo
bun run build
```

### Test Failures

**Issue**: Tests timeout

```bash
# Solution: Increase timeout
export BUN_TEST_TIMEOUT=60000
bun run test
```

**Issue**: "Address already in use"

```bash
# Solution: Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Installation Issues

**Issue**: "bun: command not found"

```bash
# Solution: Add Bun to PATH
echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Issue**: Slow dependency installation

```bash
# Solution: Use different registry
export BUN_INSTALL_REGISTRY=https://registry.npmjs.org/
bun install
```

### Git Submodule Issues

**Issue**: Submodules not initialized

```bash
# Solution: Initialize manually
git submodule update --init --recursive
```

### Platform-Specific Issues

**macOS**: "xcrun: error: invalid active developer path"

```bash
# Solution: Install Xcode Command Line Tools
xcode-select --install
```

**Linux**: "Permission denied" on bun install

```bash
# Solution: Fix ownership
sudo chown -R $USER:$USER ~/.bun
```

**Windows/WSL**: "Line ending issues"

```bash
# Solution: Configure git
git config --global core.autocrlf input
```

---

## Performance Optimization

### Faster Builds

**Use Turbo remote caching:**

```bash
export TURBO_TOKEN=your_token
export TURBO_TEAM=your_team
bun run build
```

**Parallel builds:**

```bash
# Turbo automatically parallelizes
bun run build --concurrency 10
```

### Faster Tests

**Run tests in parallel:**

```bash
bun run test --concurrency 5
```

**Skip slow tests in development:**

```bash
# Use .only for focused testing
it.only('fast test', () => { ... });
```

---

## Next Steps

After setup:

1. ✅ Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. ✅ Review [.voidcatrules](.voidcatrules)
3. ✅ Check [Architecture.md](docs/Architecture.md)
4. ✅ Browse [PRD.md](docs/PRD.md)
5. ✅ Pick an issue to work on
6. ✅ Create a feature branch
7. ✅ Make changes and test
8. ✅ Open a pull request

---

## Getting Help

### Resources

- **Documentation**: `docs/` directory
- **Examples**: `examples/` directory
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions

### Common Questions

**Q: How long does setup take?**  
A: ~10 minutes for clean install and build

**Q: Do I need all API keys?**  
A: No, only if you're testing those integrations

**Q: Can I use npm/yarn instead of Bun?**  
A: No, Bun is required (package manager and runtime)

**Q: How do I update dependencies?**  
A: `bun update` (check for breaking changes first)

---

**Last Updated**: 2025-11-04  
**Version**: 1.0

Happy coding! 🚀
