# VoidCat Operating System (VCOS) - System Architecture

**Version:** 1.0  
**Date:** November 4, 2025  
**Status:** Draft

---

## 1. Architecture Overview

VoidCat Operating System (VCOS) is a security-hardened, multi-agent AI platform built on a modular architecture with three primary layers:

1. **Core Runtime Layer** - AgentRuntime, logging, error handling, security context
2. **Plugin & Integration Layer** - Model Context Protocol, VoidCat Universe, Ryuzu Suite
3. **Interface Layer** - VoidCat RDC Command Center (CLI/UI), API endpoints

```
┌─────────────────────────────────────────────────────────────────┐
│                    VoidCat RDC Command Center                   │
│                         (CLI / Web UI)                          │
└─────────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────────┐
│                             │                                 │
│                    API Gateway Layer                          │
│              (REST API, WebSocket, gRPC)                      │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────────┐
│                             │                                 │
│                    AgentRuntime Core                          │
│   ┌────────────┬──────────────┬─────────────┬──────────┐    │
│   │  Logging   │ Error Mgmt   │  Security   │  Lifecycle│    │
│   │  System    │  & Tracing   │  Context    │  Manager  │    │
│   └────────────┴──────────────┴─────────────┴──────────┘    │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┼─────────────────────────────────┐
│                             │                                 │
│              Model Context Protocol (MCP)                     │
│                   Plugin Interface Layer                      │
│                                                               │
└───────────────────────────────────────────────────────────────┘
                              ▲
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────┴──────┐   ┌──────────┴────────┐   ┌───────┴────────┐
│   VoidCat    │   │  Ryuzu Covenant   │   │   Community    │
│   Universe   │   │      Suite        │   │    Plugins     │
│   Plugin     │   │  ┌──────────────┐ │   │                │
│              │   │  │   GitHub     │ │   │                │
│              │   │  │   Web/Sel    │ │   │                │
│              │   │  │   Filesystem │ │   │                │
│              │   │  └──────────────┘ │   │                │
└──────────────┘   └───────────────────┘   └────────────────┘
```

---

## 2. Core Components

### 2.1 AgentRuntime

The AgentRuntime is the heart of VCOS, providing a secure execution environment for AI agents.

#### Key Responsibilities:
- **Agent Lifecycle Management**: Spawn, configure, execute, and terminate agents
- **Security Context Injection**: Bind permissions and identity to each agent instance
- **Structured Logging**: Configurable log levels (DEBUG, INFO, WARN, ERROR)
- **Error Handling**: Centralized error wrapping with stack traces and context
- **Resource Management**: Memory limits, timeout enforcement, graceful shutdown

#### Architecture:

```
AgentRuntime
├── SecurityContext
│   ├── AgentIdentity (ID, name, type)
│   ├── PermissionToken (capabilities, expiry)
│   └── AuditLogger (permission events)
│
├── LoggingService
│   ├── ConfigurableLogLevel
│   ├── StructuredLogging (JSON)
│   └── LogTransports (console, file, remote)
│
├── ErrorManagement
│   ├── ExplicitResult<T, E> (success/failure pattern)
│   ├── ErrorWrapper (context enrichment)
│   └── StackTracePropagation
│
└── LifecycleManager
    ├── SpawnAgent (with security context)
    ├── ConfigureAgent (plugins, permissions)
    ├── ExecuteAgent (with monitoring)
    └── TerminateAgent (cleanup resources)
```

#### Interfaces:

```typescript
interface AgentRuntimeConfig {
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  securityContext: SecurityContext;
  plugins: PluginDescriptor[];
  resourceLimits: ResourceLimits;
}

interface SecurityContext {
  agentIdentity: AgentIdentity;
  permissionToken: PermissionToken;
  auditLogger: AuditLogger;
}

interface AgentIdentity {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
}

interface PermissionToken {
  capabilities: Capability[];
  expiresAt: Date;
  issuedBy: string;
}
```

---

### 2.2 Plugin Architecture

VCOS uses the Model Context Protocol (MCP) for standardized plugin communication.

#### Plugin Lifecycle:

```
1. Discovery → 2. Registration → 3. Initialization → 4. Invocation → 5. Cleanup

┌──────────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌────────┐
│ Plugin   │──→│ Validate│──→│ Init &   │──→│ Execute  │──→│ Cleanup│
│ Manifest │   │ Perms   │   │ Resources│   │ Method   │   │ & Exit │
└──────────┘   └─────────┘   └──────────┘   └──────────┘   └────────┘
```

#### Plugin Manifest Schema:

```json
{
  "name": "plugin-voidcat-universe",
  "version": "1.0.0",
  "mcpVersion": "1.0",
  "requiredPermissions": [
    "network:https:voidcat-universe.example.com",
    "cache:read",
    "cache:write"
  ],
  "capabilities": [
    {
      "method": "queryKnowledge",
      "description": "Query VoidCat knowledge base",
      "parameters": {
        "query": "string",
        "limit": "number?"
      }
    }
  ],
  "sandboxing": {
    "network": "restricted",
    "filesystem": "none",
    "process": "none"
  }
}
```

#### Model Context Protocol Flow:

```
Agent                    MCP Adapter                   Plugin
  │                          │                           │
  │──(1) invokePlugin────→   │                           │
  │                          │──(2) validatePerms────→   │
  │                          │                           │
  │                          │←─(3) permsOK──────────    │
  │                          │                           │
  │                          │──(4) execute──────────→   │
  │                          │                           │
  │                          │←─(5) result───────────    │
  │←─(6) response────────    │                           │
  │                          │                           │
```

---

### 2.3 Permissions & Security Layer

VCOS implements capability-based security with fine-grained permissions.

#### Permission Model:

```
Capability = Resource + Action + Constraints

Examples:
- "network:https:github.com" (access GitHub API)
- "filesystem:read:/data/agents/*" (read from agents directory)
- "plugin:invoke:plugin-github:createIssue" (invoke specific plugin method)
```

#### Permission Enforcement Points:

```
┌─────────────────────────────────────────────────────────────┐
│                       Agent Request                         │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│            AgentRuntime Permission Interceptor              │
│  1. Extract security context from agent                     │
│  2. Identify required capability for operation              │
│  3. Check permission token for capability                   │
│  4. Audit log: grant/deny decision                          │
└─────────────────────────────────────────────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │  Permit?        │
                    └─────────────────┘
                      YES │      │ NO
                          │      │
                ┌─────────┘      └─────────┐
                ▼                          ▼
    ┌──────────────────┐      ┌──────────────────┐
    │  Execute         │      │  Deny & Audit    │
    │  Operation       │      │  Return Error    │
    └──────────────────┘      └──────────────────┘
```

#### Audit Log Schema:

```typescript
interface AuditLogEntry {
  timestamp: Date;
  agentId: string;
  agentName: string;
  operation: string;
  requiredCapability: string;
  decision: 'GRANTED' | 'DENIED';
  reason?: string;
  metadata?: Record<string, any>;
}
```

---

## 3. Plugin Specifications

### 3.1 plugin-voidcat-universe

**Purpose**: Access VoidCat knowledge base with authentication and caching

**Architecture**:

```
┌──────────────────────────────────────────────────────────┐
│         plugin-voidcat-universe                          │
│                                                          │
│  ┌────────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  API Adapter   │  │  Auth Module │  │ Cache Layer │ │
│  │  (REST/gRPC)   │  │  (OAuth 2.0) │  │ (TTL-based) │ │
│  └────────────────┘  └──────────────┘  └─────────────┘ │
│           │                  │                 │        │
│           └──────────────────┴─────────────────┘        │
│                              │                          │
└──────────────────────────────┼──────────────────────────┘
                               │
                               ▼
                   VoidCat Universe API
                   (External Service)
```

**Key Features**:
- OAuth 2.0 authentication with token refresh
- Response caching with configurable TTL (default 5 minutes)
- Rate limiting to prevent API abuse
- Structured error handling for network failures
- Model Context Protocol compliance

---

### 3.2 Ryuzu Covenant Suite

#### 3.2.1 plugin-github

**Purpose**: Interact with GitHub repositories, issues, PRs

**Permissions Required**:
- `network:https:api.github.com`
- `plugin:github:read` or `plugin:github:write`

**API Surface**:
```typescript
interface GitHubPlugin {
  getRepository(owner: string, repo: string): Promise<Repository>;
  createIssue(owner: string, repo: string, issue: IssueCreate): Promise<Issue>;
  listPullRequests(owner: string, repo: string, filters?: Filters): Promise<PullRequest[]>;
  // ... more methods
}
```

---

#### 3.2.2 plugin-web-selenium

**Purpose**: Web automation and scraping with security controls

**Permissions Required**:
- `network:https:<whitelisted-domains>`
- `plugin:web:navigate`
- `plugin:web:execute` (for JS execution)

**Security Features**:
- URL whitelist enforcement
- Content sanitization (XSS prevention)
- No access to credentials or local storage (unless explicitly permitted)
- Timeout limits on page loads

**API Surface**:
```typescript
interface WebSeleniumPlugin {
  navigate(url: string): Promise<void>;
  findElement(selector: string): Promise<WebElement>;
  executeScript(script: string): Promise<any>;
  screenshot(): Promise<Buffer>;
  // ... more methods
}
```

---

#### 3.2.3 plugin-filesystem

**Purpose**: File system operations within sandboxed directories

**Permissions Required**:
- `filesystem:read:<path-pattern>`
- `filesystem:write:<path-pattern>`
- `filesystem:delete:<path-pattern>`

**Security Features**:
- Path traversal prevention
- Whitelist of accessible directories
- File size limits
- Malware scanning integration (optional)

**API Surface**:
```typescript
interface FilesystemPlugin {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  listDirectory(path: string): Promise<FileInfo[]>;
  deleteFile(path: string): Promise<void>;
  // ... more methods
}
```

---

## 4. Agent Blueprints

Blueprints are pre-configured agent templates for common use cases.

### 4.1 Guardian Blueprint

**Purpose**: Security monitoring and compliance enforcement

**Configuration**:
```yaml
blueprint: guardian
description: Monitors system for security violations
plugins:
  - plugin-voidcat-universe
  - plugin-github (read-only)
permissions:
  - audit:read
  - alert:write
behavior:
  - Monitor audit logs for suspicious activity
  - Alert on permission violations
  - Generate compliance reports
```

### 4.2 Scribe Blueprint

**Purpose**: Documentation generation and maintenance

**Configuration**:
```yaml
blueprint: scribe
description: Generates and updates documentation
plugins:
  - plugin-github
  - plugin-filesystem
permissions:
  - filesystem:read:/docs/*
  - filesystem:write:/docs/*
  - github:read
  - github:write (for PR creation)
behavior:
  - Scan code for JSDoc comments
  - Generate API documentation
  - Update README files
  - Create PRs for doc updates
```

---

## 5. VoidCat RDC Command Center

### 5.1 CLI Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     vcos CLI                            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ init     │  │ create   │  │ status   │  │ deploy │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │ logs     │  │ perms    │  │ plugins  │  │ docs   │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│              AgentRuntime API Client                    │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Key Commands

| Command | Description | Example |
|---------|-------------|---------|
| `vcos init` | Initialize new VCOS project | `vcos init my-agent-project` |
| `vcos create` | Create agent from blueprint | `vcos create agent --blueprint guardian` |
| `vcos start` | Start agent runtime | `vcos start --config agent.yaml` |
| `vcos status` | Show agent health and metrics | `vcos status --agent-id abc123` |
| `vcos logs` | View agent logs | `vcos logs --agent-id abc123 --tail 100` |
| `vcos perms` | Manage permissions | `vcos perms grant --agent abc123 --capability network:https:api.github.com` |
| `vcos plugins` | List/install plugins | `vcos plugins install plugin-github` |
| `vcos docs` | Open documentation | `vcos docs --topic permissions` |

---

## 6. Data Flow

### 6.1 Agent Execution Flow

```
1. User invokes CLI: vcos start --config agent.yaml

2. CLI loads configuration and validates

3. AgentRuntime initializes:
   - Create security context
   - Initialize logging service
   - Load plugins (with permission checks)

4. Agent spawned with injected context:
   - AgentRuntime.spawn(config, securityContext)

5. Agent executes logic:
   - Invokes plugin methods via MCP
   - Permission interceptor validates each call
   - Audit logger records decisions

6. Results returned to user or stored

7. On termination:
   - Cleanup resources
   - Flush logs
   - Revoke permissions
```

### 6.2 Permission Grant Flow

```
1. Admin runs: vcos perms grant --agent abc123 --capability network:https:api.github.com

2. CLI validates capability string format

3. Permission service:
   - Lookup agent by ID
   - Check admin authorization
   - Create permission record
   - Update agent's permission token

4. Audit log entry created:
   {
     "timestamp": "2025-11-04T18:00:00Z",
     "action": "PERMISSION_GRANTED",
     "admin": "user@example.com",
     "agent": "abc123",
     "capability": "network:https:api.github.com"
   }

5. Confirmation returned to CLI
```

---

## 7. Deployment Architecture

### 7.1 Standalone Deployment

```
┌────────────────────────────────────────┐
│         Host Machine / Container       │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │       VCOS Runtime Process       │ │
│  │  ┌────────┐  ┌────────┐         │ │
│  │  │ Agent  │  │ Agent  │         │ │
│  │  │   1    │  │   2    │  ...    │ │
│  │  └────────┘  └────────┘         │ │
│  └──────────────────────────────────┘ │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │      Persistent Storage          │ │
│  │  (Configs, Logs, Cache)          │ │
│  └──────────────────────────────────┘ │
└────────────────────────────────────────┘
```

### 7.2 Distributed Deployment (Future)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Node 1     │     │   Node 2     │     │   Node 3     │
│  [Agents 1-5]│────→│  [Agents 6-10]────→│ [Agents 11-15]│
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       └────────────────────┼─────────────────────┘
                            │
                ┌───────────┴──────────┐
                │ Coordination Service │
                │  (Consensus, State)  │
                └──────────────────────┘
```

---

## 8. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Bun 1.2+ | Fast JS/TS runtime |
| Language | TypeScript 5.9 | Type safety, modern JS |
| Build | Turbo | Monorepo build orchestration |
| Package Mgmt | Lerna | Monorepo package management |
| Testing | Bun Test | Unit/integration testing |
| Linting | ESLint, Prettier | Code quality |
| Security | CodeQL, Snyk | SAST, dependency scanning |
| Logging | Winston / Pino | Structured logging |
| CLI | Commander.js | CLI framework |

---

## 9. Performance Considerations

### 9.1 Optimization Strategies

1. **Lazy Plugin Loading**: Load plugins on-demand, not at startup
2. **Permission Cache**: Cache permission check results (with invalidation)
3. **Async I/O**: Non-blocking operations for network, filesystem
4. **Connection Pooling**: Reuse HTTP connections for external APIs
5. **Streaming**: Stream large responses instead of buffering

### 9.2 Resource Limits

```typescript
interface ResourceLimits {
  maxMemoryMB: number;        // Default: 512MB
  maxCPUPercent: number;      // Default: 50%
  maxExecutionTimeMs: number; // Default: 300000 (5 min)
  maxConcurrentOps: number;   // Default: 10
}
```

---

## 10. Security Architecture

### 10.1 Defense in Depth

1. **Layer 1: Input Validation** - Sanitize all external inputs
2. **Layer 2: Permission Enforcement** - Check capabilities before operations
3. **Layer 3: Plugin Sandboxing** - Isolate plugin execution contexts
4. **Layer 4: Network Security** - TLS for all external communication
5. **Layer 5: Audit Logging** - Record all security-relevant events

### 10.2 Threat Model

| Threat | Mitigation |
|--------|------------|
| Malicious Agent | Permission system limits damage; audit trail for forensics |
| Compromised Plugin | Sandboxing prevents lateral movement; dependency scanning |
| Credential Leakage | No hardcoded secrets; environment variables; rotation |
| Injection Attacks | Input validation; parameterized queries; content sanitization |
| DoS | Rate limiting; resource limits; timeout enforcement |

---

## 11. Migration from ElizaOS

### 11.1 Compatibility Matrix

| ElizaOS Feature | VCOS Equivalent | Compatibility |
|----------------|-----------------|---------------|
| Agent config | Agent config + security context | 90% compatible |
| Plugin API | MCP + permissions | Adapter layer needed |
| CLI commands | VoidCat RDC commands | Mostly preserved |
| Environment vars | VCOS_* variables | Mapping provided |

### 11.2 Migration Path

1. **Assessment**: Audit existing ElizaOS agents and plugins
2. **Mapping**: Identify required VCOS permissions for each agent
3. **Adaptation**: Update configurations (rename, add security context)
4. **Testing**: Validate in VCOS environment
5. **Deployment**: Roll out incrementally with rollback plan

---

## 12. Future Enhancements

- **Multi-tenancy**: Isolated environments for multiple organizations
- **Visual Workflow Builder**: Drag-and-drop agent composition
- **Plugin Marketplace**: Community-contributed plugins
- **Distributed Orchestration**: Cross-node agent coordination
- **Advanced Analytics**: ML-based anomaly detection in logs
- **Auto-scaling**: Dynamic agent provisioning based on load

---

## Appendix A: Acronyms

- **VCOS**: VoidCat Operating System
- **MCP**: Model Context Protocol
- **RDC**: Remote Development Center (Command Center)
- **TLS**: Transport Layer Security
- **SAST**: Static Application Security Testing
- **TTL**: Time To Live
- **PR**: Pull Request
- **API**: Application Programming Interface

---

## Appendix B: References

- [Model Context Protocol Spec](https://example.com/mcp-spec) (placeholder)
- [VCOS_Project_Plan.md](../VCOS_Project_Plan.md)
- [PRD.md](./PRD.md)
- [.voidcatrules](../.voidcatrules)

---

**Document Control**  
- **Created**: 2025-11-04  
- **Last Updated**: 2025-11-04  
- **Version**: 1.0 (Draft)  
- **Next Review**: Upon Phase 1 completion
