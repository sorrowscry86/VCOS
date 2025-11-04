# VCOS Project Milestone Timeline

**Version:** 1.0  
**Date:** November 4, 2025  
**Status:** Draft

---

## Executive Summary

This document outlines the detailed milestone timeline for transforming ElizaOS into VoidCat Operating System (VCOS). The project is estimated at **12-20 weeks** with 7 major milestones (A-G) aligned with the 5-Gate Progressive System.

---

## Timeline Overview

```
Week:  1    2    3    4    5    6    7    8    9    10   11   12   13   14   15   16   17   18   19   20
       │────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────│
   A   ██
   B        ██████████
   C                  ██████████
   D                            ████████████████████████
   E                                                    ████████████
   F                                                                ██████████
   G                                                                          ████

Legend:
A = Project Setup (Gate 0→1)
B = Phase 1: Transmutation (Gate 2→4)
C = plugin-voidcat-universe (Gate 2→4)
D = Ryuzu Suite Plugins (Gate 2→4, parallelizable)
E = Agent Blueprints & RDC Command Center (Gate 2→4)
F = Permissions & Documentation (Gate 2→4)
G = Buffer & QA
```

---

## Milestone A: Project Setup (Gate 0 → Gate 1)

**Duration:** 1 week  
**Owner:** Project Lead  
**Target Completion:** Week 1

### Objectives
- Establish project foundation and development environment
- Complete planning documentation
- Set up CI/CD baseline

### Deliverables

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| A.1 | Fork ElizaOS repo to VoidCat RDC org (private) | DevOps Lead | 0.5d | ⏳ Pending |
| A.2 | Create .voidcatrules file | Project Lead | 0.5d | ✅ Complete |
| A.3 | Create PRD (Product Requirements Document) | Product Owner | 2d | ✅ Complete |
| A.4 | Create Architecture.md with diagrams | Tech Lead | 2d | ✅ Complete |
| A.5 | Create Milestone Timeline (this doc) | Project Lead | 0.5d | ✅ Complete |
| A.6 | Create Risk Register | Project Lead | 0.5d | 🔄 In Progress |
| A.7 | Set up CI pipeline skeleton | DevOps Lead | 1d | ⏳ Pending |
| A.8 | Initial README, LICENSE, CONTRIBUTING | Project Lead | 0.5d | ⏳ Pending |
| A.9 | Establish branch protection rules | DevOps Lead | 0.5d | ⏳ Pending |

### Gate 0 → Gate 1 Acceptance Criteria
- [ ] Repository forked and accessible to team
- [x] .voidcatrules file committed
- [x] PRD approved by stakeholders
- [x] Architecture reviewed by technical team
- [ ] CI pipeline runs successfully on clean checkout
- [ ] All team members have access and understand workflow

---

## Milestone B: Phase 1 - Transmutation (Gate 2 → Gate 4)

**Duration:** 2-3 weeks  
**Owner:** Core Engineer  
**Dependencies:** Milestone A complete  
**Target Completion:** Week 4

### Objectives
- Rebrand from ElizaOS to VoidCat Operating System
- Harden AgentRuntime with security and logging
- Maintain backward compatibility with existing tests

### Deliverables

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| B.1 | Create feat/branding/transmutation branch | Core Engineer | 0.5d | ⏳ Pending |
| B.2 | Create mapping file (eliza → voidcatos/vcos) | Core Engineer | 1d | ⏳ Pending |
| B.3 | Create transmutation validation tests | Core Engineer | 1d | ⏳ Pending |
| B.4 | Execute find-and-replace operations | Core Engineer | 2d | ⏳ Pending |
| B.5 | Update package names and imports | Core Engineer | 2d | ⏳ Pending |
| B.6 | Rename CLI executable to voidcatos/vcos | Core Engineer | 1d | ⏳ Pending |
| B.7 | Update README, docs, user-facing strings | Tech Writer | 2d | ⏳ Pending |
| B.8 | Add structured logging to AgentRuntime | Core Engineer | 2d | ⏳ Pending |
| B.9 | Add centralized error handling | Core Engineer | 2d | ⏳ Pending |
| B.10 | Add security context injection | Security Engineer | 3d | ⏳ Pending |
| B.11 | Write tests for logging/error/security | Core Engineer | 2d | ⏳ Pending |
| B.12 | Validate all existing tests still pass | QA Engineer | 1d | ⏳ Pending |
| B.13 | Achieve 90% line / 85% branch coverage | Core Engineer | 1d | ⏳ Pending |
| B.14 | Run SAST and dependency scans | Security Engineer | 0.5d | ⏳ Pending |
| B.15 | Open PR: "Phase 1 — Branding and Runtime Hardening" | Core Engineer | 0.5d | ⏳ Pending |

### Gate 2 → Gate 4 Acceptance Criteria
- [ ] Zero "eliza" references remain (validated by tests)
- [ ] All original ElizaOS tests pass
- [ ] AgentRuntime has logging, error handling, security hooks
- [ ] Line coverage >= 90%, branch coverage >= 85%
- [ ] No critical/high vulnerabilities
- [ ] PR approved and merged to develop

### Risks & Mitigations
- **Risk**: Breaking existing tests during rename  
  **Mitigation**: Atomic commits with test validation after each change
- **Risk**: Performance regression from new hooks  
  **Mitigation**: Benchmark tests before/after; optimize hot paths

---

## Milestone C: plugin-voidcat-universe (Gate 2 → Gate 4)

**Duration:** 2-3 weeks  
**Owner:** Integration Engineer  
**Dependencies:** Milestone B complete  
**Target Completion:** Week 7

### Objectives
- Implement VoidCat Universe knowledge base plugin
- Achieve Model Context Protocol compliance
- Reach 100% test coverage

### Deliverables

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| C.1 | Create feat/plugins/plugin-voidcat-universe branch | Integration Engineer | 0.5d | ⏳ Pending |
| C.2 | Design plugin API and manifest | Integration Engineer | 1d | ⏳ Pending |
| C.3 | Implement authentication adapter (OAuth 2.0) | Integration Engineer | 2d | ⏳ Pending |
| C.4 | Implement API client with error handling | Integration Engineer | 2d | ⏳ Pending |
| C.5 | Implement caching layer with TTL | Integration Engineer | 2d | ⏳ Pending |
| C.6 | Implement MCP handshake and protocol | Integration Engineer | 2d | ⏳ Pending |
| C.7 | Write unit tests with mocked API | Integration Engineer | 2d | ⏳ Pending |
| C.8 | Write MCP integration tests | Integration Engineer | 2d | ⏳ Pending |
| C.9 | Write permission validation tests | Security Engineer | 1d | ⏳ Pending |
| C.10 | Create example agent usage | Integration Engineer | 1d | ⏳ Pending |
| C.11 | Write plugin documentation | Tech Writer | 1d | ⏳ Pending |
| C.12 | Achieve 100% plugin test coverage | Integration Engineer | 1d | ⏳ Pending |
| C.13 | Open PR: "plugin-voidcat-universe" | Integration Engineer | 0.5d | ⏳ Pending |

### Gate 2 → Gate 4 Acceptance Criteria
- [ ] Plugin API documented with OpenAPI spec
- [ ] MCP compliance validated with integration tests
- [ ] 100% test coverage (lines and branches)
- [ ] No critical/high vulnerabilities
- [ ] Example agent runs successfully
- [ ] PR approved and merged to develop

---

## Milestone D: Ryuzu Covenant Suite Plugins (Gate 2 → Gate 4)

**Duration:** 3-6 weeks (parallelizable)  
**Owner:** Multiple engineers (1 per plugin)  
**Dependencies:** Milestone C complete  
**Target Completion:** Week 13

### Objectives
- Implement GitHub, Web/Selenium, and Filesystem plugins
- Each plugin reaches 100% test coverage
- Enforce permission boundaries with tests

### D.1: plugin-github

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| D.1.1 | Create feat/plugins/plugin-github branch | Plugin Engineer 1 | 0.5d | ⏳ Pending |
| D.1.2 | Design GitHub API adapter | Plugin Engineer 1 | 1d | ⏳ Pending |
| D.1.3 | Implement OAuth authentication | Plugin Engineer 1 | 2d | ⏳ Pending |
| D.1.4 | Implement repository operations | Plugin Engineer 1 | 3d | ⏳ Pending |
| D.1.5 | Implement issues/PR operations | Plugin Engineer 1 | 3d | ⏳ Pending |
| D.1.6 | Write unit tests with mocked GitHub API | Plugin Engineer 1 | 2d | ⏳ Pending |
| D.1.7 | Write permission validation tests | Plugin Engineer 1 | 1d | ⏳ Pending |
| D.1.8 | Create documentation and examples | Tech Writer | 1d | ⏳ Pending |
| D.1.9 | Achieve 100% coverage | Plugin Engineer 1 | 1d | ⏳ Pending |
| D.1.10 | Open PR: "plugin-github" | Plugin Engineer 1 | 0.5d | ⏳ Pending |

### D.2: plugin-web-selenium

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| D.2.1 | Create feat/plugins/plugin-web-selenium branch | Plugin Engineer 2 | 0.5d | ⏳ Pending |
| D.2.2 | Design web automation API | Plugin Engineer 2 | 1d | ⏳ Pending |
| D.2.3 | Implement Selenium WebDriver wrapper | Plugin Engineer 2 | 2d | ⏳ Pending |
| D.2.4 | Implement URL whitelisting | Plugin Engineer 2 | 1d | ⏳ Pending |
| D.2.5 | Implement content sanitization (XSS prevention) | Security Engineer | 2d | ⏳ Pending |
| D.2.6 | Write unit tests with mocked browser | Plugin Engineer 2 | 2d | ⏳ Pending |
| D.2.7 | Write permission validation tests | Plugin Engineer 2 | 1d | ⏳ Pending |
| D.2.8 | Create documentation and examples | Tech Writer | 1d | ⏳ Pending |
| D.2.9 | Achieve 100% coverage | Plugin Engineer 2 | 1d | ⏳ Pending |
| D.2.10 | Open PR: "plugin-web-selenium" | Plugin Engineer 2 | 0.5d | ⏳ Pending |

### D.3: plugin-filesystem

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| D.3.1 | Create feat/plugins/plugin-filesystem branch | Plugin Engineer 3 | 0.5d | ⏳ Pending |
| D.3.2 | Design filesystem API with sandboxing | Plugin Engineer 3 | 1d | ⏳ Pending |
| D.3.3 | Implement path traversal prevention | Security Engineer | 2d | ⏳ Pending |
| D.3.4 | Implement read/write/delete operations | Plugin Engineer 3 | 2d | ⏳ Pending |
| D.3.5 | Implement file size limits | Plugin Engineer 3 | 1d | ⏳ Pending |
| D.3.6 | Write unit tests with temp filesystem | Plugin Engineer 3 | 2d | ⏳ Pending |
| D.3.7 | Write permission validation tests | Plugin Engineer 3 | 1d | ⏳ Pending |
| D.3.8 | Create documentation and examples | Tech Writer | 1d | ⏳ Pending |
| D.3.9 | Achieve 100% coverage | Plugin Engineer 3 | 1d | ⏳ Pending |
| D.3.10 | Open PR: "plugin-filesystem" | Plugin Engineer 3 | 0.5d | ⏳ Pending |

### Gate 2 → Gate 4 Acceptance Criteria (per plugin)
- [ ] API documented with examples
- [ ] 100% test coverage (mandatory)
- [ ] Permission checks validated
- [ ] No critical/high vulnerabilities
- [ ] PR approved and merged to develop

### Notes
- Plugins can be developed in parallel by different engineers
- Estimated completion assumes 3 engineers working simultaneously

---

## Milestone E: Agent Blueprints & RDC Command Center (Gate 2 → Gate 4)

**Duration:** 2-4 weeks  
**Owner:** UX/Runtime Engineer  
**Dependencies:** Milestone D complete  
**Target Completion:** Week 17

### Objectives
- Create reusable agent templates (blueprints)
- Develop VoidCat RDC Command Center CLI/UI
- Achieve excellent developer experience

### E.1: Agent Blueprints

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| E.1.1 | Create feat/agents/blueprints branch | Runtime Engineer | 0.5d | ⏳ Pending |
| E.1.2 | Design blueprint schema and validator | Runtime Engineer | 1d | ⏳ Pending |
| E.1.3 | Implement "Guardian" blueprint | Runtime Engineer | 2d | ⏳ Pending |
| E.1.4 | Implement "Scribe" blueprint | Runtime Engineer | 2d | ⏳ Pending |
| E.1.5 | Implement blueprint generator tool | Runtime Engineer | 2d | ⏳ Pending |
| E.1.6 | Write blueprint validation tests | Runtime Engineer | 1d | ⏳ Pending |
| E.1.7 | Write integration tests (spawn & behavior) | Runtime Engineer | 2d | ⏳ Pending |
| E.1.8 | Create blueprint documentation | Tech Writer | 1d | ⏳ Pending |
| E.1.9 | Open PR: "Agent Blueprints" | Runtime Engineer | 0.5d | ⏳ Pending |

### E.2: VoidCat RDC Command Center

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| E.2.1 | Create feat/client/rdc-command-center branch | UX Engineer | 0.5d | ⏳ Pending |
| E.2.2 | Design CLI command structure | UX Engineer | 1d | ⏳ Pending |
| E.2.3 | Implement init, create, start commands | UX Engineer | 3d | ⏳ Pending |
| E.2.4 | Implement status, logs, perms commands | UX Engineer | 3d | ⏳ Pending |
| E.2.5 | Implement plugins, docs commands | UX Engineer | 2d | ⏳ Pending |
| E.2.6 | Add telemetry hooks (opt-in) | UX Engineer | 1d | ⏳ Pending |
| E.2.7 | Write CLI integration tests | UX Engineer | 2d | ⏳ Pending |
| E.2.8 | Conduct UX testing and gather feedback | UX Engineer | 2d | ⏳ Pending |
| E.2.9 | Create CLI documentation | Tech Writer | 1d | ⏳ Pending |
| E.2.10 | Open PR: "VoidCat RDC Command Center" | UX Engineer | 0.5d | ⏳ Pending |

### Gate 2 → Gate 4 Acceptance Criteria
- [ ] Blueprints instantiate successfully in test harness
- [ ] RDC Command Center functional with positive UX feedback
- [ ] CLI documentation complete with examples
- [ ] 90%+ coverage for new code
- [ ] PRs approved and merged to develop

---

## Milestone F: Permissions & Documentation (Gate 2 → Gate 4)

**Duration:** 2-3 weeks  
**Owner:** Security Lead & Technical Writer  
**Dependencies:** Milestone E complete  
**Target Completion:** Week 20

### Objectives
- Implement production-ready permissions layer
- Complete comprehensive documentation
- Achieve security compliance

### F.1: Permissions Layer

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| F.1.1 | Create feat/security/permissions-layer branch | Security Engineer | 0.5d | ⏳ Pending |
| F.1.2 | Design permission schema and storage | Security Engineer | 2d | ⏳ Pending |
| F.1.3 | Implement capability-based permission model | Security Engineer | 3d | ⏳ Pending |
| F.1.4 | Implement enforcement middleware in AgentRuntime | Security Engineer | 2d | ⏳ Pending |
| F.1.5 | Implement audit logging for permissions | Security Engineer | 2d | ⏳ Pending |
| F.1.6 | Implement admin tooling (grant/revoke) | Security Engineer | 2d | ⏳ Pending |
| F.1.7 | Write unit tests for permission checks | Security Engineer | 2d | ⏳ Pending |
| F.1.8 | Write attack surface tests | Security Engineer | 2d | ⏳ Pending |
| F.1.9 | Write fuzz tests for permission boundaries | Security Engineer | 1d | ⏳ Pending |
| F.1.10 | Open PR: "Permissions Layer" | Security Engineer | 0.5d | ⏳ Pending |

### F.2: Documentation

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| F.2.1 | Finalize Architecture.md with diagrams | Tech Writer | 2d | 🔄 In Progress |
| F.2.2 | Create API.md / OpenAPI specs | Tech Writer | 2d | ⏳ Pending |
| F.2.3 | Create setup.md (developer onboarding) | Tech Writer | 1d | ⏳ Pending |
| F.2.4 | Create plugin-authoring-guide.md | Tech Writer | 2d | ⏳ Pending |
| F.2.5 | Create migration-guide.md (ElizaOS → VCOS) | Tech Writer | 2d | ⏳ Pending |
| F.2.6 | Create operational-runbook.md | Tech Writer | 2d | ⏳ Pending |
| F.2.7 | Create emergency-procedures.md | Security Lead | 1d | ⏳ Pending |
| F.2.8 | Add JSDoc comments to all public APIs | Dev Team | 3d | ⏳ Pending |
| F.2.9 | Generate API reference docs | Tech Writer | 1d | ⏳ Pending |
| F.2.10 | Review and publish documentation | Project Lead | 1d | ⏳ Pending |

### Gate 2 → Gate 4 Acceptance Criteria
- [ ] Permissions layer enforced in runtime and all plugins
- [ ] Zero critical/high vulnerabilities
- [ ] All documentation complete and reviewed
- [ ] API reference docs auto-generated
- [ ] PRs approved and merged to develop

---

## Milestone G: Buffer & QA

**Duration:** 2 weeks  
**Owner:** QA Lead  
**Dependencies:** All previous milestones (A-F) complete  
**Target Completion:** Week 20

### Objectives
- Address findings from code reviews and QA
- Final security scans and performance testing
- Prepare for production release

### Deliverables

| # | Deliverable | Owner | Effort | Status |
|---|------------|-------|--------|--------|
| G.1 | Integration testing on develop branch | QA Engineer | 3d | ⏳ Pending |
| G.2 | Security audit (SAST, dependency scans) | Security Lead | 2d | ⏳ Pending |
| G.3 | Performance testing and benchmarking | Performance Engineer | 2d | ⏳ Pending |
| G.4 | Load testing for multi-agent scenarios | Performance Engineer | 2d | ⏳ Pending |
| G.5 | Fix critical/high priority issues | Dev Team | 3d | ⏳ Pending |
| G.6 | Final code review and approvals | Tech Lead | 1d | ⏳ Pending |
| G.7 | Prepare release notes and changelog | Tech Writer | 1d | ⏳ Pending |
| G.8 | Create release branch (release/v1.0.0) | DevOps Lead | 0.5d | ⏳ Pending |
| G.9 | Merge to main and tag v1.0.0 | Project Lead | 0.5d | ⏳ Pending |
| G.10 | Publish release artifacts | DevOps Lead | 0.5d | ⏳ Pending |

### Release Acceptance Criteria
- [ ] All gates passed for all milestones
- [ ] Integration tests green on develop
- [ ] Zero critical/high vulnerabilities
- [ ] Performance meets NFR targets
- [ ] Documentation complete and published
- [ ] Release notes approved
- [ ] Tag v1.0.0 created on main branch

---

## Resource Allocation

| Role | Allocation | Milestones | Notes |
|------|-----------|------------|-------|
| Project Lead | 100% | A, G | Overall coordination |
| Core Engineer | 100% | B | Phase 1 transmutation |
| Integration Engineer | 100% | C | VoidCat Universe plugin |
| Plugin Engineer 1 | 100% | D.1 | GitHub plugin |
| Plugin Engineer 2 | 100% | D.2 | Web/Selenium plugin |
| Plugin Engineer 3 | 100% | D.3 | Filesystem plugin |
| Runtime Engineer | 100% | E.1 | Agent blueprints |
| UX Engineer | 100% | E.2 | RDC Command Center |
| Security Engineer | 50% | B, C, D, F.1 | Security features across all phases |
| Tech Writer | 50% | B-F | Documentation throughout |
| DevOps Lead | 25% | A, G | CI/CD setup and release |
| QA Engineer | 25% | B-G | Testing throughout |
| Performance Engineer | 25% | G | Performance/load testing |

**Total Team Size:** ~10 FTE (Full-Time Equivalent)

---

## Critical Path

The critical path through the project is:

```
A → B → C → D → E → F → G
```

**Total Critical Path Duration:** 14-20 weeks

### Parallelization Opportunities

- **Milestone D** (Ryuzu plugins): 3 plugins can be developed in parallel, reducing duration from 9 weeks to 3-6 weeks
- **Documentation** in Milestone F can start earlier and run in parallel with development

### Fast-Track Options

If timeline acceleration is needed:
1. Reduce scope of Milestone D (implement only 1-2 plugins initially)
2. Increase team size for Milestone D (add more plugin engineers)
3. Reduce buffer in Milestone G (risky - not recommended)

---

## Dependencies & Blockers

| Dependency | Impact | Owner | Status |
|-----------|--------|-------|--------|
| VoidCat Universe API spec | Blocks C.2 | External Team | ⏳ Pending |
| GitHub API rate limits | May slow D.1 | Plugin Engineer 1 | ⚠️ Monitor |
| Selenium setup complexity | May extend D.2 | Plugin Engineer 2 | ⚠️ Monitor |
| Security review bandwidth | May delay F.1 | Security Lead | ⏳ Pending |

---

## Status Tracking

Progress will be tracked weekly with the following metrics:

- **Completed Deliverables**: Count of deliverables with ✅ status
- **In-Progress Deliverables**: Count of deliverables with 🔄 status
- **Blocked Deliverables**: Count of deliverables with 🚫 status
- **Coverage Metrics**: Line/branch coverage percentages
- **Security Metrics**: Number of critical/high vulnerabilities
- **Test Metrics**: Pass rate, flakiness rate

Weekly status reports will include:
1. Milestone progress (% complete)
2. Risks and issues
3. Blockers requiring escalation
4. Plan for upcoming week

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-11-04 | Project Lead | Initial draft |

---

**Document Control**  
- **Created**: 2025-11-04  
- **Last Updated**: 2025-11-04  
- **Version**: 1.0 (Draft)  
- **Next Review**: Weekly during project execution
