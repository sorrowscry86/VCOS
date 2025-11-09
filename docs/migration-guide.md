# Migration Guide: ElizaOS to VoidCat Operating System (VCOS)

**Version:** 1.0  
**Date:** November 4, 2025  
**Status:** Planning Document

---

## Overview

This guide will help you migrate existing ElizaOS projects to VoidCat Operating System (VCOS). VCOS maintains approximately 90% backward compatibility with ElizaOS APIs while adding enhanced security, permissions, and enterprise features.

> **Note**: This is a planning document. Detailed migration steps will be added as Phase 1 (Transmutation) is implemented.

---

## Migration Scope

### What Changes

#### 1. **Branding & Naming**

- Package names: `@elizaos/*` → `@voidcatos/*`
- CLI command: `elizaos` → `vcos` (or `voidcatos`)
- Environment variables: `ELIZA_*` → `VCOS_*`
- Module imports and references

#### 2. **Security Model**

- **New**: Security context injection for all agents
- **New**: Capability-based permissions system
- **New**: Audit logging for security events
- **Enhanced**: Plugin sandboxing

#### 3. **Runtime Enhancements**

- **New**: Structured logging with configurable levels
- **New**: Centralized error handling
- **Enhanced**: Plugin architecture (Model Context Protocol)

#### 4. **Documentation & Tooling**

- **New**: VoidCat RDC Command Center (enhanced CLI)
- **New**: Agent blueprints for common patterns
- **Enhanced**: Developer documentation

### What Stays the Same

- Core agent configuration schema (~90% compatible)
- Plugin API structure (with adapters for legacy plugins)
- Database connections and data models
- Character file format
- Most CLI commands (renamed but similar)

---

## Migration Paths

Choose your migration path based on your use case:

### Path A: Fresh VCOS Installation (Recommended for New Projects)

**Best for:**

- New projects starting from scratch
- Projects wanting full VCOS features from day one

**Steps:**

1. Install VCOS CLI
2. Create new VCOS project
3. Configure with VCOS standards (security, permissions)
4. Develop with VCOS native features

### Path B: In-Place Migration (Existing Projects)

**Best for:**

- Existing ElizaOS projects
- Projects requiring gradual migration
- Projects with custom plugins

**Steps:**

1. Audit current ElizaOS usage
2. Update dependencies to VCOS packages
3. Rename imports and references
4. Add security context configuration
5. Update environment variables
6. Test thoroughly
7. Deploy incrementally

### Path C: Hybrid (Run Both)

**Best for:**

- Large deployments
- Projects requiring zero downtime
- Risk-averse migrations

**Steps:**

1. Deploy VCOS alongside ElizaOS
2. Migrate agents incrementally
3. Maintain both systems during transition
4. Fully switch once validated

---

## Step-by-Step Migration (Path B: In-Place)

### Phase 1: Pre-Migration Assessment

#### 1.1 Audit Your Current Setup

```bash
# List all ElizaOS packages in use
npm list @elizaos/* --depth=0

# Check for custom plugins
find . -name "*plugin*" -type d

# Review environment variables
cat .env | grep ELIZA
```

Create an inventory:

- Which ElizaOS packages are you using?
- Do you have custom plugins?
- What ElizaOS APIs are you calling?
- What environment variables are configured?

#### 1.2 Review Breaking Changes

Check the [CHANGELOG.md](../CHANGELOG.md) for breaking changes between ElizaOS and VCOS v1.0.

### Phase 2: Backup & Preparation

#### 2.1 Backup Your Project

```bash
# Create backup branch
git checkout -b backup/pre-vcos-migration
git push origin backup/pre-vcos-migration

# Backup database (if applicable)
pg_dump elizadb > elizadb_backup_$(date +%Y%m%d).sql

# Backup .env file
cp .env .env.backup
```

#### 2.2 Prepare VCOS Environment

```bash
# Install VCOS CLI (will replace elizaos CLI)
bun install -g @voidcatos/cli

# Verify installation
vcos --version
```

### Phase 3: Update Dependencies

#### 3.1 Update package.json

**Before (ElizaOS):**

```json
{
  "dependencies": {
    "@elizaos/core": "^1.4.4",
    "@elizaos/server": "^1.4.4",
    "@elizaos/client": "^1.4.4"
  }
}
```

**After (VCOS):**

```json
{
  "dependencies": {
    "@voidcatos/core": "^1.0.0",
    "@voidcatos/server": "^1.0.0",
    "@voidcatos/client": "^1.0.0"
  }
}
```

#### 3.2 Install VCOS Packages

```bash
# Remove ElizaOS packages
bun remove @elizaos/core @elizaos/server @elizaos/client

# Install VCOS packages
bun add @voidcatos/core @voidcatos/server @voidcatos/client

# Reinstall all dependencies
bun install
```

### Phase 4: Update Code References

#### 4.1 Update Import Statements

**Before:**

```typescript
import { AgentRuntime } from '@elizaos/core';
import { startServer } from '@elizaos/server';
```

**After:**

```typescript
import { AgentRuntime } from '@voidcatos/core';
import { startServer } from '@voidcatos/server';
```

**Automated approach:**

```bash
# Use find and replace (carefully!)
find ./src -type f -name "*.ts" -exec sed -i 's/@elizaos/@voidcatos/g' {} +

# Verify changes
git diff
```

#### 4.2 Update CLI Commands in Scripts

**package.json - Before:**

```json
{
  "scripts": {
    "start": "elizaos start",
    "create": "elizaos create"
  }
}
```

**package.json - After:**

```json
{
  "scripts": {
    "start": "vcos start",
    "create": "vcos create"
  }
}
```

### Phase 5: Update Configuration

#### 5.1 Update Environment Variables

**Before (.env):**

```env
ELIZA_DATABASE_URL=postgresql://...
ELIZA_LOG_LEVEL=info
ELIZA_PORT=3000
```

**After (.env):**

```env
VCOS_DATABASE_URL=postgresql://...
VCOS_LOG_LEVEL=info
VCOS_PORT=3000

# Legacy support (optional, for backward compatibility)
ELIZA_DATABASE_URL=postgresql://...
```

#### 5.2 Update Agent Configuration

**Before (agent.json):**

```json
{
  "name": "my-agent",
  "runtime": {
    "type": "eliza"
  }
}
```

**After (agent.json):**

```json
{
  "name": "my-agent",
  "runtime": {
    "type": "vcos"
  },
  "security": {
    "permissions": ["network:https:api.example.com", "filesystem:read:/data/*"]
  }
}
```

### Phase 6: Add VCOS-Specific Features

#### 6.1 Configure Security Context

```typescript
import { AgentRuntime, SecurityContext } from '@voidcatos/core';

// Create security context
const securityContext: SecurityContext = {
  agentIdentity: {
    id: 'agent-123',
    name: 'MyAgent',
    type: 'chatbot',
    createdAt: new Date(),
  },
  permissionToken: {
    capabilities: ['network:https:api.example.com', 'plugin:invoke:plugin-github'],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    issuedBy: 'admin@example.com',
  },
  auditLogger: console, // or custom logger
};

// Initialize runtime with security context
const runtime = new AgentRuntime({
  ...config,
  securityContext,
});
```

#### 6.2 Enable Structured Logging

```typescript
import { AgentRuntime } from '@voidcatos/core';

const runtime = new AgentRuntime({
  logLevel: 'INFO', // DEBUG, INFO, WARN, ERROR
  logFormat: 'json', // or 'text'
  logTransports: ['console', 'file'],
});
```

### Phase 7: Update Custom Plugins

#### 7.1 Add Plugin Manifest (New Requirement)

**Create `plugin-manifest.json`:**

```json
{
  "name": "my-custom-plugin",
  "version": "1.0.0",
  "mcpVersion": "1.0",
  "requiredPermissions": ["network:https:myapi.example.com"],
  "capabilities": [
    {
      "method": "doSomething",
      "description": "Does something useful",
      "parameters": {
        "input": "string"
      }
    }
  ],
  "sandboxing": {
    "network": "restricted",
    "filesystem": "none"
  }
}
```

#### 7.2 Update Plugin to Implement MCP

```typescript
import { Plugin, MCPAdapter } from '@voidcatos/core';

export class MyPlugin implements Plugin {
  async mcpHandshake(): Promise<MCPHandshakeResponse> {
    return {
      version: '1.0',
      capabilities: this.manifest.capabilities,
    };
  }

  async execute(method: string, params: any): Promise<any> {
    // Permission check happens automatically
    // Implement your plugin logic
  }
}
```

### Phase 8: Testing

#### 8.1 Run Tests

```bash
# Build VCOS project
bun run build

# Run test suite
bun run test

# Check for errors
echo $?  # Should be 0
```

#### 8.2 Integration Testing

```bash
# Start VCOS server
vcos start

# Test API endpoints
curl http://localhost:3000/api/health

# Test agent spawning
vcos create agent --blueprint guardian --test
```

#### 8.3 Validate Permissions

```bash
# Grant permissions to agent
vcos perms grant --agent agent-123 --capability network:https:api.example.com

# Test permission enforcement
vcos test permissions --agent agent-123
```

### Phase 9: Deployment

#### 9.1 Staged Rollout (Recommended)

```bash
# Deploy to staging first
vcos deploy --environment staging

# Run smoke tests
vcos test smoke --environment staging

# Deploy to production
vcos deploy --environment production
```

#### 9.2 Rollback Plan

```bash
# If issues occur, rollback
git checkout backup/pre-vcos-migration
bun install
elizaos start  # Revert to ElizaOS
```

---

## API Compatibility Matrix

| ElizaOS API        | VCOS Equivalent | Compatibility | Notes                                  |
| ------------------ | --------------- | ------------- | -------------------------------------- |
| `AgentRuntime`     | `AgentRuntime`  | ✅ 100%       | Enhanced with security context         |
| `Plugin` interface | `Plugin` + MCP  | ⚠️ 90%        | Requires MCP implementation            |
| `elizaos start`    | `vcos start`    | ✅ 100%       | Command renamed                        |
| `elizaos create`   | `vcos create`   | ✅ 100%       | Command renamed                        |
| Environment vars   | `VCOS_*`        | ⚠️ 90%        | Legacy `ELIZA_*` supported temporarily |
| Character files    | Same            | ✅ 100%       | No changes                             |

---

## Common Migration Issues

### Issue 1: Import Errors

**Error:**

```
Cannot find module '@elizaos/core'
```

**Solution:**
Update all imports from `@elizaos/*` to `@voidcatos/*`

### Issue 2: Missing Permissions

**Error:**

```
PermissionError: Agent lacks capability 'network:https:api.example.com'
```

**Solution:**
Grant required permissions:

```bash
vcos perms grant --agent <agent-id> --capability network:https:api.example.com
```

### Issue 3: Plugin Not Loading

**Error:**

```
Plugin 'my-plugin' does not implement MCP handshake
```

**Solution:**
Update plugin to implement `mcpHandshake()` method.

### Issue 4: Environment Variables Not Found

**Error:**

```
Environment variable ELIZA_DATABASE_URL not set
```

**Solution:**
Update to `VCOS_DATABASE_URL` or set both for transition period.

---

## Migration Checklist

Use this checklist to track your migration progress:

### Pre-Migration

- [ ] Audit current ElizaOS usage
- [ ] Review breaking changes
- [ ] Create backup branch
- [ ] Backup database
- [ ] Backup .env file

### Dependencies

- [ ] Update package.json dependencies
- [ ] Remove ElizaOS packages
- [ ] Install VCOS packages
- [ ] Run `bun install`

### Code Updates

- [ ] Update import statements
- [ ] Update CLI commands in scripts
- [ ] Update environment variables
- [ ] Update agent configurations
- [ ] Add security context configuration
- [ ] Enable structured logging

### Plugin Updates

- [ ] Create plugin manifests
- [ ] Implement MCP in custom plugins
- [ ] Test plugin permission enforcement

### Testing

- [ ] Build passes
- [ ] All tests pass
- [ ] Integration tests pass
- [ ] Permission tests pass

### Deployment

- [ ] Deploy to staging
- [ ] Run smoke tests
- [ ] Deploy to production
- [ ] Monitor for issues

### Post-Migration

- [ ] Update documentation
- [ ] Train team on VCOS features
- [ ] Archive ElizaOS backup

---

## Getting Help

### Resources

- **VCOS Documentation**: [docs/](../docs/)
- **Architecture Guide**: [docs/Architecture.md](Architecture.md)
- **API Reference**: (to be generated)
- **GitHub Issues**: Report migration problems

### Support Channels

- **GitHub Discussions**: General questions
- **GitHub Issues**: Bug reports
- **Email**: support@voidcat.example (placeholder)

---

## FAQ

**Q: Can I run ElizaOS and VCOS side-by-side?**  
A: Yes, during migration you can run both. Use different ports and databases.

**Q: Will my existing character files work?**  
A: Yes, character file format is unchanged.

**Q: Do I need to grant permissions for every agent?**  
A: Yes, VCOS uses a default-deny security model. You must explicitly grant capabilities.

**Q: Can I migrate incrementally?**  
A: Yes, you can migrate one agent at a time using the hybrid approach.

**Q: What if I find a bug during migration?**  
A: Report it on GitHub Issues with the `migration` label.

**Q: How long does migration take?**  
A: Simple projects: 1-2 hours. Complex projects: 1-2 days.

---

## Rollback Procedure

If you need to roll back to ElizaOS:

```bash
# 1. Checkout backup branch
git checkout backup/pre-vcos-migration

# 2. Reinstall ElizaOS dependencies
bun install

# 3. Restore database (if needed)
psql elizadb < elizadb_backup_YYYYMMDD.sql

# 4. Restore .env
cp .env.backup .env

# 5. Start ElizaOS
elizaos start
```

---

## Next Steps After Migration

1. ✅ Explore VCOS-specific features (blueprints, RDC Command Center)
2. ✅ Implement fine-grained permissions for agents
3. ✅ Set up audit logging
4. ✅ Optimize performance with caching
5. ✅ Contribute to VCOS community

---

**Last Updated**: 2025-11-04  
**Version**: 1.0 (Planning Document)  
**Next Review**: After Phase 1 completion

---

**Note**: This migration guide will be updated with detailed steps and examples as Phase 1 (Transmutation) of the VCOS Project Plan is implemented.
