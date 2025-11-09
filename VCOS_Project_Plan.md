# VCOS (VoidCat Operating System) — Detailed Numbered Plan

This plan translates the provided "PROJECT MANDATE" and "VoidCat Project Development Rules" into a step-by-step, numbered implementation and delivery roadmap for transmuting ElizaOS into VoidCat Operating System (VCOS). The plan is organized by phases (per the mandate), aligned with the 5-Gate Progressive System and VoidCat rules, and includes deliverables, acceptance criteria, branch/PR strategy, tests, security checks, and reporting cadence.

Summary: work will be done in a forked private repository under the VoidCat RDC org, each major component on its own feature branch, passing all gates before merging to the VCOS main line. All steps obey Zero-Compromise Quality Standards and Test-Driven Development.

1. Project Setup (Gate 0 → Gate 1)
   1.1. Forking & Repository Provisioning
   1.1.1. Fork elizaOS/eliza into VoidCat RDC organization as voidcatos/eliza (private).
   1.1.2. Create repository metadata: README, License (if required), CODE_OF_CONDUCT, CONTRIBUTING.
   1.1.3. Create initial branches: - main (protected) - develop (integration) - branch-per-feature convention: feat/<component>-<short-desc>
   1.1.4. Create a .voidcatrules file at repo root containing the "VoidCat Project Development Rules".
   1.2. Planning & Documentation (PRD, Architecture)
   1.2.1. Produce a full PRD (Product Requirements Document) covering scope, non-functional requirements, performance, security, and acceptance criteria.
   1.2.2. Produce system architecture diagrams mapping: - AgentRuntime structure - plugin architecture and Model Context Protocol - CLI/client architecture (VoidCat RDC Command Center) - Permissions model
   1.2.3. Produce a milestone timeline with estimated durations (weeks) and resource assignments.
   1.2.4. Produce a risk register with mitigations.
   1.3. Environment & CI Baseline (Gate 2 prerequisites)
   1.3.1. Identify runtime and tooling (language versions, test framework, linter, formatter, coverage tool, SAST scanner, dependency scanner).
   1.3.2. Add .env.example and update .gitignore (ensure secrets excluded).
   1.3.3. Create CI pipeline skeleton: - Build step - Static analysis/lint step - Unit tests with coverage - SAST & dependency scanning - Format and type checks
   1.3.4. Verify [BUILD_COMMAND] succeeds on a clean checkout (Gate 2 check).

2. Phase 1 — Transmutation (Branding & Core Configuration) (Gate 2 → Gate 4)
   2.1. Gate 2: Setup for Phase 1
   2.1.1. Create feature branch feat/branding/transmutation.
   2.1.2. Prepare a comprehensive mapping file of all strings and identifiers referencing "eliza" to be replaced with "voidcatos" or "vcos". Include: - package names - module paths - CLI executable names - documentation and UI text - environment variables, e.g., ELIZA*\* → VCOS*\*
   2.1.3. Create tests (string-level and integration-level) that assert no unexpected "eliza" occurrences remain.
   2.2. Implementation Tasks
   2.2.1. Perform deterministic, automated find-and-replace operations guided by the mapping. - Use scripted transformations and commit in small, atomic commits with clear messages. - Maintain history by not rewriting unrelated commits.
   2.2.2. Rename packages/modules and update imports.
   2.2.3. Update CLI binary name to voidcatos (or vcos where appropriate), update completion scripts and docs.
   2.2.4. Update README, docs, and user-facing strings.
   2.3. AgentRuntime Hardening & Embedding VCOS Standards
   2.3.1. Add logging, error handling, and security protocol hooks into AgentRuntime: - Structured logging (configurable log level) - Centralized error wrap/trace facility following explicit result/failure pattern - Security context injection (agent identity, permissions token)
   2.3.2. Add tests for: - logging initialization/config override - error propagation semantics - security context binding at agent spawn time
   2.3.3. Integration tests verifying agents spawned through AgentRuntime contain expected hooks and headers.
   2.4. Gate 3 & Gate 4 Validation for Phase 1
   2.4.1. Run full CI: build, static analysis, tests.
   2.4.2. Ensure all existing ElizaOS tests still pass. If any test fails, investigate and fix while preserving original semantics.
   2.4.3. Achieve minimum coverage thresholds per VoidCat rules (>=90% lines, >=85% branches).
   2.4.4. Run dependency scanners and SAST; fix critical/high vulnerabilities.
   2.5. Deliverables & PR
   2.5.1. Open PR: PR Title "Phase 1 — Branding and AgentRuntime Hardening".
   2.5.2. PR contents: - Mapping file of changes - Migration notes - Test results and coverage reports - CI run artifacts
   2.5.3. Require 1+ peer review, pass CI, and merge to develop after approvals.

3. Phase 2 — Integration (Plugin Development) (Gate 2 → Gate 4 per plugin)
   3.1. General Plugin Development Rules
   3.1.1. Each plugin lives in its own top-level package: plugins/plugin-voidcat-universe, plugins/plugin-github, plugins/plugin-web-selenium, plugins/plugin-filesystem.
   3.1.2. Follow starter templates strictly. Each plugin must include: - API surface and model/context adapters - Unit tests with mocks for external dependencies - Integration tests for the Model Context Protocol - Documentation and example usage
   3.1.3. Enforce plugin sandboxing, permissions metadata and tests verifying permission checks.
   3.1.4. Require 100% coverage for new plugins (as mandated).
   3.2. plugin-voidcat-universe (Primary Gate)
   3.2.1. Branch: feat/plugins/plugin-voidcat-universe
   3.2.2. Deliverables: - Implement provider for the custom knowledge base with Model Context Protocol compliance. - Authentication/authorization adapter for fetching knowledge artifacts. - Caching and TTL strategy with tests. - Example agent usage.
   3.2.3. Tests: - Unit tests for API adapter - End-to-end test for Model Context handshake - Permission validation tests
   3.2.4. Acceptance: - All plugin interfaces documented - 100% plugin test coverage
   3.3. Ryuzu Covenant Suite Plugins (GitHub, Web/Selenium, Filesystem)
   3.3.1. Branches: - feat/plugins/plugin-github - feat/plugins/plugin-web-selenium - feat/plugins/plugin-filesystem
   3.3.2. Implementation plan per plugin: - Implement API adapter conforming to plugin contract - Add explicit, minimal permission model; tests ensure agents must request permissions - Mock external services in unit tests; include integration tests (when safe) using recorded fixtures
   3.3.3. Each plugin must reach 100% test coverage before merge.
   3.4. Gate Validation & PRs
   3.4.1. Each plugin follows Gate 2→4: setup, development, CI validation, security scans.
   3.4.2. Open PR per plugin with detailed changelog, API docs, test coverage reports.
   3.4.3. Peer review, CI green, and 100% coverage required before merging to develop.

4. Phase 3 — Refinement (Agent & Interface Customization)
   4.1. Agent Blueprints
   4.1.1. Branch: feat/agents/blueprints
   4.1.2. Create templated agent blueprints: "Guardian", "Scribe", and a blueprint generator tool.
   4.1.3. Blueprints must: - Leverage AgentRuntime standards (logging, error handling, security) - Declare required permissions and external plugins - Include CI-checked examples and tests for behavior and permission enforcement
   4.1.4. Tests: - Unit tests for blueprint validation - Integration tests: spawn blueprint-based agents in test harness and assert behavior
   4.2. VoidCat RDC Command Center (client package transmutation)
   4.2.1. Branch: feat/client/rdc-command-center
   4.2.2. Tasks: - Refactor client package interface into VoidCat RDC Command Center UI/CLI - Preserve backward-compatible programmatic API where practical, provide deprecation notices - Implement command-line UX consistent with project branding and ergonomics - Add telemetry/diagnostics hooks (configurable, opt-in)
   4.2.3. Tests: - CLI integration tests - Functional tests for critical workflows - Accessibility/UX acceptance checklist
   4.2.4. Deliverable: - A functional client application that will be inspected manually by the project owner
   4.3. Gate Validation & PRs
   4.3.1. Achieve Gate 3 & 4 checks: build, static analysis, all tests, 90%+ coverage.
   4.3.2. Open PRs: - "Phase 3 — Agent Blueprints" - "Phase 3 — VoidCat RDC Command Center"
   4.3.3. Merge to develop only after approvals and passing CI.

5. Phase 4 — Fortification (Security & Documentation)
   5.1. Permissions Layer
   5.1.1. Branch: feat/security/permissions-layer
   5.1.2. Design: - Fine-grained capability-based permissions for agents and plugins - Permission tokens bound to agent identity and lifespan - Enforcement in AgentRuntime and plugin adapters - Audit logging for permission grants/denials
   5.1.3. Implementation tasks: - Permission schema and migration (if persistent store required) - Enforcement middleware/hooks in runtime - Admin tooling for granting/revoking permissions
   5.1.4. Tests: - Unit tests for permission checks - Attack surface tests (simulate agents attempting unauthorized actions) - Fuzz tests for permission boundary behavior
   5.2. Documentation & Developer Experience
   5.2.1. Branch: docs/documentation-complete (or combined with each feature PR)
   5.2.2. Produce: - Architecture.md (detailed diagrams and rationales) - API.md / OpenAPI specs for public endpoints - setup.md (developer setup and CI instructions) - plugin authoring guide and templates - migration guide from ElizaOS to VCOS - changelogs and release notes per PR
   5.2.3. Ensure all public functions/types have documentation comments (JSDoc/Docstrings).
   5.2.4. Include operational runbook and emergency procedures (as per VoidCat rules).
   5.3. Gate Validation & PRs
   5.3.1. Run security scans and fix issues (no critical vulnerabilities).
   5.3.2. Achieve coverage and CI requirements.
   5.3.3. Open PRs for the permissions layer and docs; require approvals and sign-off.

6. Cross-Cutting Quality, CI, and Release Work
   6.1. CI/CD & Validation
   6.1.1. CI pipeline must enforce Gate loops (build, static analysis, tests, coverage, SAST).
   6.1.2. Enforce branch protection rules and required checks before merge.
   6.1.3. Implement pre-commit hooks: formatter, linter, license header checks.
   6.2. Testing & Coverage
   6.2.1. Enforce Test-Driven Development: write tests before implementation where possible.
   6.2.2. For all new code and modified legacy code, maintain or exceed test coverage targets: - Line coverage >= 90% - Branch coverage >= 85% - 100% coverage for critical business logic and plugins
   6.2.3. Use deterministic fixtures, mocks, and recorded integration fixtures to avoid flakiness.
   6.3. Static Analysis & Typing
   6.3.1. Enforce strict typing rules, no use of any/unsafe types in public APIs.
   6.3.2. Fix all static analysis warnings; treat warnings as errors in CI.
   6.4. Security & Dependency Management
   6.4.1. Integrate dependency scanning (weekly) and SAST in CI.
   6.4.2. No new critical vulnerabilities; remediation planned immediately for findings.
   6.4.3. Secrets management: remove hard-coded secrets; use env vars and the vault for CI secrets.
   6.5. Release & Versioning
   6.5.1. Maintain semantic versioning for VCOS releases.
   6.5.2. Produce release notes with migration guidance from ElizaOS.
   6.5.3. Tag and publish releases from protected main branch only after full gate pass.

7. Branching, PR Strategy, and Merge Policy
   7.1. Branches
   7.1.1. Use feature branches per task as described above.
   7.1.2. Keep changes small and focused; prefer multiple small PRs for large features when practical.
   7.2. Pull Requests
   7.2.1. PR checklist (must be satisfied before requesting review): - Tests added/updated, coverage reports attached - Build and static checks passed locally and in CI - Documentation updated (where relevant) - Security scan pass or documented mitigation
   7.2.2. Require at least one peer review and one maintainer approval for merging to develop.
   7.2.3. Use draft PRs during long-running work; convert to ready-for-review only when Gate checks pass locally.
   7.3. Releases
   7.3.1. Merge into develop for integration; conduct integration tests on develop branch.
   7.3.2. Create release branches (release/vX.Y.Z) after integration testing and QA sign-off.
   7.3.3. Merge release branch into main and tag.

8. Reporting, Daily Rhythm, and Acceptance
   8.1. Daily Reporting
   8.1.1. Provide an end-of-day summary covering: - What was completed (commits/PRs) - Status of tests and CI - Any blockers/issues - Plan for next day
   8.1.2. Deliver daily report as a short document attached to the main project board or via the agreed communication channel.
   8.2. Acceptance Criteria for Each Phase
   8.2.1. Phase 1 acceptance: - No remaining "eliza" references (validated by tests) - All original ElizaOS tests pass - AgentRuntime logging, error, and security hooks implemented and tested - CI, static analysis, coverage thresholds met
   8.2.2. Phase 2 acceptance: - plugin-voidcat-universe implemented and passes Model Context Protocol tests - Ryuzu suite plugins implemented with 100% plugin coverage - Permission checks validated for plugins
   8.2.3. Phase 3 acceptance: - Agent blueprints working in test harness - RDC Command Center functional and QA inspected
   8.2.4. Phase 4 acceptance: - Permissions layer enforced across runtime and plugins - Documentation complete and reviewed - Security scans clear of critical issues
   8.3. PR Submission per Mandate
   8.3.1. Submit a PR for review upon completion of each major component (Phase 1, each plugin in Phase 2, Phase 3 deliverables, Phase 4).
   8.3.2. Attach required artifacts: test results, coverage, migration notes, and documentation.

9. Risk Management & Contingencies
   9.1. Common Risks
   9.1.1. Breaking existing tests due to renames — mitigation: run tests after each atomic rename; preserve semantics.
   9.1.2. Security issues in third-party dependencies — mitigation: pin versions, scan, and replace vulnerable deps.
   9.1.3. Test flakiness in integration tests — mitigation: use mocks/recordings and retry policies; isolate nondeterministic tests.
   9.2. Absolute Stop Conditions
   9.2.1. Halt development immediately if build errors, static analysis errors, failing tests, coverage below 90%, critical security vulnerabilities, performance regressions, or memory leaks are observed. Follow emergency procedures documented in rules.

10. Milestones, Estimates, and Owners (Example schedule — adjust after Gate 0)
    10.1. Milestone A — Project Setup & Gate 0/1 (1 week)

    - Owner: Project Lead
    - Deliverables: Forked repo, PRD, architecture, CI skeleton
      10.2. Milestone B — Phase 1 Complete (2–3 weeks)
    - Owner: Core Engineer
    - Deliverables: Branding, AgentRuntime changes, Phase 1 PR
      10.3. Milestone C — plugin-voidcat-universe (2–3 weeks)
    - Owner: Integration Engineer
    - Deliverables: plugin implementation, 100% coverage, PR
      10.4. Milestone D — Ryuzu Suite Plugins (3–6 weeks, parallelizable)
    - Owners: Multiple engineers per plugin
    - Deliverables: plugin-github, plugin-web-selenium, plugin-filesystem
      10.5. Milestone E — Agent Blueprints & RDC Client (2–4 weeks)
    - Owner: UX/Runtime Engineer
    - Deliverables: Blueprints, RDC Command Center, tests
      10.6. Milestone F — Permissions & Docs (2–3 weeks)
    - Owner: Security Lead & Technical Writer
    - Deliverables: Permissions layer, docs, QA sign-off
      10.7. Buffer and QA (2 weeks)
    - Address findings from reviews, QA, SAST, and performance tests.

11. Next Steps (immediate actionable items)
    11.1. Approve plan and provide repository provisioning instructions (VoidCat RDC org specifics and access).
    11.2. Fork and create initial repository and branches.
    11.3. Produce PRD and architecture doc (Gate 0 deliverable).
    11.4. Implement CI baseline and run first green build.

Appendix A — Enforcement Checklist (to be added to PR templates)

- [ ] PRD and architecture link
- [ ] Unit and integration tests added
- [ ] Coverage report attached (>=90% lines)
- [ ] Static analysis and type checks pass
- [ ] Dependency & SAST scan results attached
- [ ] Documentation updated
- [ ] Permissions metadata declared if plugin/agent accesses resources
- [ ] Release notes / migration guidance included

Appendix B — Naming & Migration Conventions

- Replace "eliza" with "voidcatos" for fully-qualified product names.
- Use "vcos" as appropriate for short internal identifiers and environment variables.
- Provide deprecation mapping for any public API names changed.

Notes:

- This plan adheres to the VoidCat Project Development Rules and the Project Mandate's Phase definitions.
- All work requires TDD, strict CI validation, and adherence to the Absolute Stop Conditions.
- Estimates are preliminary and will be refined in Gate 0 once resources and priorities are finalized.

End of plan.
