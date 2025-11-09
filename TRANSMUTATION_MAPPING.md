# VCOS Transmutation Mapping

This document provides a comprehensive mapping of all "eliza" and "ElizaOS" references that need to be replaced with "voidcatos" or "vcos" equivalents as part of Phase 1 transmutation.

**Status:** Planning Phase  
**Created:** 2025-11-04  
**Version:** 1.0

---

## Naming Convention Rules

### Product Names
- `elizaOS` → `VoidCat Operating System` (full product name)
- `eliza` → `voidcatos` (fully-qualified product references)
- `Eliza` → `VoidCat` or `VCOS` (contextual)

### Package Names
- `@elizaos/*` → `@voidcatos/*` (scoped packages)
- `elizaos` → `voidcatos` (unscoped packages)

### Environment Variables
- `ELIZA_*` → `VCOS_*` (all environment variables)

### CLI Executable
- `eliza` → `voidcatos` (CLI binary name)
- Alternative short form: `vcos` (where appropriate)

### Internal Identifiers
- `eliza` → `vcos` (short internal identifiers)
- Preserve case sensitivity based on context

---

## Package Name Mappings

### Core Packages
| Current | New | Type |
|---------|-----|------|
| `@elizaos/core` | `@voidcatos/core` | Scoped package |
| `@elizaos/server` | `@voidcatos/server` | Scoped package |
| `@elizaos/client` | `@voidcatos/client` | Scoped package |
| `@elizaos/cli` | `@voidcatos/cli` | Scoped package |
| `elizaos` | `voidcatos` | Root package |

### Service Packages
| Current | New | Type |
|---------|-----|------|
| `@elizaos/service-interfaces` | `@voidcatos/service-interfaces` | Scoped package |
| `@elizaos/api-client` | `@voidcatos/api-client` | Scoped package |

### Plugin Packages
| Current | New | Type |
|---------|-----|------|
| `@elizaos/plugin-bootstrap` | `@voidcatos/plugin-bootstrap` | Scoped package |
| `@elizaos/plugin-sql` | `@voidcatos/plugin-sql` | Scoped package |
| `@elizaos/plugin-dummy-services` | `@voidcatos/plugin-dummy-services` | Scoped package |
| `@elizaos/plugin-starter` | `@voidcatos/plugin-starter` | Scoped package |
| `@elizaos/plugin-quick-starter` | `@voidcatos/plugin-quick-starter` | Scoped package |

### Starter Packages
| Current | New | Type |
|---------|-----|------|
| `@elizaos/project-starter` | `@voidcatos/project-starter` | Scoped package |
| `@elizaos/project-tee-starter` | `@voidcatos/project-tee-starter` | Scoped package |

### Development Packages
| Current | New | Type |
|---------|-----|------|
| `@elizaos/test-utils` | `@voidcatos/test-utils` | Scoped package |
| `@elizaos/app` | `@voidcatos/app` | Scoped package |
| `@elizaos/config` | `@voidcatos/config` | Scoped package |

---

## Environment Variables

| Current | New | Usage |
|---------|-----|-------|
| `ELIZA_NONINTERACTIVE` | `VCOS_NONINTERACTIVE` | Non-interactive mode flag |
| `ELIZA_*` | `VCOS_*` | All other environment variables |

**Note:** Maintain backward compatibility where possible with deprecation warnings.

---

## CLI Executable Names

| Current | New | Location |
|---------|-----|----------|
| `eliza` | `voidcatos` | Primary CLI executable |
| `eliza` | `vcos` | Alias (if needed) |

---

## Import Paths

### TypeScript/JavaScript Imports
```typescript
// Before
import { AgentRuntime } from '@elizaos/core';
import { ElizaClient } from '@elizaos/api-client';

// After
import { AgentRuntime } from '@voidcatos/core';
import { VoidCatClient } from '@voidcatos/api-client';
```

### Export Class Names
- `ElizaClient` → `VoidCatClient`
- Keep internal implementation names (e.g., `AgentRuntime`) unchanged unless they explicitly reference "Eliza"

---

## Documentation Files

### README Files
- [ ] Root `README.md` - Update all ElizaOS references
- [ ] `packages/*/README.md` - Update package-specific references
- [ ] `CONTRIBUTING.md` - Update contribution guide references
- [ ] `docs/*.md` - Update all documentation files

### Headers and Branding
- Replace "ElizaOS" with "VoidCat Operating System (VCOS)"
- Update logos/badges (if any)
- Update repository URLs if applicable

---

## Configuration Files

### package.json Files
- [ ] Root `package.json` - name, dependencies, scripts
- [ ] `packages/*/package.json` - All package.json files
  - Update `name` field
  - Update `dependencies` and `devDependencies` references
  - Update repository URLs
  - Update keywords

### Other Config Files
- [ ] `lerna.json` - Package references
- [ ] `turbo.json` - Build pipeline references
- [ ] `tsconfig*.json` - Path references (if any)
- [ ] `.github/workflows/*.yml` - CI/CD references

---

## Docker and Deployment

| Current | New | File |
|---------|-----|------|
| `elizaos` | `voidcatos` | Dockerfile image names |
| `eliza` | `voidcatos` | docker-compose.yaml service names |

---

## Test Files

### Test Descriptions
- Update test suite names that reference "Eliza"
- Update assertion messages
- Update mock data that contains "eliza" strings

### Test File Names
- Keep test file names unchanged unless they explicitly contain "eliza" in the filename

---

## UI/UX Text

### User-Facing Strings
- Error messages mentioning "Eliza" or "ElizaOS"
- Help text in CLI commands
- UI labels and messages
- Log messages visible to users

### Example:
```typescript
// Before
console.log("ElizaOS started successfully");
throw new Error("Eliza agent not found");

// After  
console.log("VCOS started successfully");
throw new Error("VoidCat agent not found");
```

---

## Exclusions (DO NOT CHANGE)

The following should **NOT** be changed:
1. Git commit history
2. Third-party library names
3. External API endpoint URLs (unless owned)
4. Historical references in changelogs (context-specific)
5. Code comments explaining ElizaOS origin (add context if needed)
6. Node modules and dependencies from npm
7. File paths in .git directory

---

## Migration Strategy

### Phase 1: Preparation
1. Create this mapping document ✅
2. Create validation tests to detect unmapped "eliza" references
3. Set up automated testing before each rename

### Phase 2: Systematic Renaming
Execute in this order to minimize breakage:

1. **Package Names** (package.json files)
   - Root package.json
   - All packages/*/package.json files
   
2. **Import Statements** (TypeScript/JavaScript files)
   - Update all import/export statements
   - Use automated refactoring tools where possible

3. **Class and Type Names** (TypeScript files)
   - Update exported class names
   - Update type definitions

4. **Environment Variables** (source files and docs)
   - Update all ELIZA_* references
   - Add backward compatibility layer

5. **CLI Executable** (CLI package)
   - Rename binary
   - Update scripts and completion files

6. **Documentation** (markdown files)
   - Update README files
   - Update docs/ directory
   - Update CONTRIBUTING.md

7. **Configuration Files**
   - Update lerna.json
   - Update turbo.json
   - Update CI/CD workflows

8. **Test Files**
   - Update test descriptions
   - Update test data

9. **User-Facing Strings**
   - Update error messages
   - Update log messages
   - Update UI text

### Phase 3: Validation
1. Run full test suite after each major rename
2. Run build after each major rename
3. Validate no regressions
4. Check for any missed references

---

## Validation Checklist

After transmutation is complete, verify:

- [ ] All package names updated in package.json files
- [ ] All import statements updated
- [ ] All class names updated
- [ ] All environment variables updated
- [ ] CLI executable renamed
- [ ] All documentation updated
- [ ] All configuration files updated
- [ ] All tests passing
- [ ] Build succeeds
- [ ] No remaining "eliza" references (except exclusions)
- [ ] Backward compatibility maintained where specified
- [ ] Migration guide updated

---

## Automated Detection

Create tests to detect unmapped references:

```typescript
// Pseudo-code for validation test
const excludedPatterns = [
  '*.git/*',
  'node_modules/*',
  'CHANGELOG.md', // historical
  '*.lock',
];

const allowedContexts = [
  'migration from ElizaOS', // migration docs
  'originally based on ElizaOS', // attribution
];

function validateNoElizaReferences(files) {
  for (const file of files) {
    if (isExcluded(file, excludedPatterns)) continue;
    
    const content = readFile(file);
    const matches = content.match(/\beliza\b|\bEliza\b|\bELIZA\b/gi);
    
    if (matches) {
      for (const match of matches) {
        if (!isAllowedContext(match, content, allowedContexts)) {
          throw new Error(`Found unmapped "eliza" reference in ${file}: ${match}`);
        }
      }
    }
  }
}
```

---

## Risk Mitigation

### Risks
1. **Breaking existing tests** - Run tests after each atomic rename
2. **Missing references** - Use automated detection tests
3. **Import resolution failures** - Update imports systematically
4. **Build failures** - Build after each package rename

### Mitigation
1. Make changes in small, atomic commits
2. Test after each commit
3. Keep git history clean and revertible
4. Use automated refactoring tools
5. Pair program on complex renames

---

## Backward Compatibility

For smooth migration, provide backward compatibility in these areas:

1. **Environment Variables**: Support both ELIZA_* and VCOS_* with deprecation warnings
2. **Import Paths**: Consider providing compatibility exports with deprecation warnings
3. **API Endpoints**: Maintain existing endpoints initially, add new ones
4. **CLI Commands**: Support old command names with deprecation notices

Example:
```typescript
// Backward compatibility for environment variables
const nonInteractive = 
  process.env.VCOS_NONINTERACTIVE || 
  process.env.ELIZA_NONINTERACTIVE; // deprecated

if (process.env.ELIZA_NONINTERACTIVE) {
  console.warn(
    'ELIZA_NONINTERACTIVE is deprecated. Use VCOS_NONINTERACTIVE instead.'
  );
}
```

---

## Completion Criteria

Phase 1 transmutation is complete when:

1. ✅ All package names updated
2. ✅ All imports updated
3. ✅ All class names updated
4. ✅ All environment variables updated
5. ✅ CLI executable renamed
6. ✅ All documentation updated
7. ✅ All tests passing
8. ✅ Build succeeds
9. ✅ Validation tests pass (no unmapped references)
10. ✅ CI/CD pipeline passes all gates
11. ✅ Code review approved
12. ✅ Migration guide verified

---

**Next Steps:**
1. Review and approve this mapping
2. Create validation tests
3. Begin systematic renaming in small commits
4. Test continuously throughout the process
5. Update this document as needed

---

**Document Status:** Draft - Pending Review  
**Requires Approval From:** Project Lead  
**Target Start Date:** Upon approval  
**Estimated Duration:** 2-3 weeks (per Milestone B)
