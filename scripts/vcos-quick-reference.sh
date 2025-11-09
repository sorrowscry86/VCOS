#!/bin/bash
# VCOS Transmutation Quick Reference
# 
# This script provides quick commands for validating the VCOS transmutation process.
# DO NOT RUN THIS SCRIPT DIRECTLY - use individual commands as needed.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   VCOS Transmutation Quick Reference          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print section headers
print_section() {
    echo ""
    echo -e "${YELLOW}═══ $1 ═══${NC}"
    echo ""
}

# Function to print commands
print_cmd() {
    echo -e "${GREEN}▸${NC} $1"
    echo -e "  ${BLUE}$2${NC}"
}

print_section "Validation Commands"
print_cmd "Run transmutation validation tests" \
    "bun test scripts/validate-transmutation.test.ts"
print_cmd "Run all tests" \
    "bun run test"
print_cmd "Run build" \
    "bun run build"
print_cmd "Run linting" \
    "bun run lint"
print_cmd "Check formatting" \
    "bun run format:check"

print_section "Search for Eliza References"
print_cmd "Find all 'eliza' in source files (case-insensitive)" \
    "grep -r -i 'eliza' --include='*.ts' --include='*.js' --include='*.tsx' packages/"
print_cmd "Find @elizaos in package.json files" \
    "grep -r '@elizaos' --include='package.json' ."
print_cmd "Find ELIZA_ environment variables" \
    "grep -r 'ELIZA_' --include='*.ts' --include='*.js' packages/"
print_cmd "Count total eliza references" \
    "grep -r -i 'eliza' --include='*.ts' --include='*.js' --include='*.md' . | wc -l"

print_section "Package Management"
print_cmd "List all package names in monorepo" \
    "find packages -name 'package.json' -exec jq -r '.name' {} \\;"
print_cmd "Update package name in package.json" \
    "jq '.name = \"@voidcatos/core\"' packages/core/package.json > tmp.json && mv tmp.json packages/core/package.json"

print_section "Documentation"
print_cmd "View VCOS Project Plan" \
    "cat VCOS_Project_Plan.md | less"
print_cmd "View Transmutation Mapping" \
    "cat TRANSMUTATION_MAPPING.md | less"
print_cmd "View Phase 0 Complete" \
    "cat docs/PHASE_0_COMPLETE.md | less"
print_cmd "View Phase 1 Preparation Complete" \
    "cat docs/PHASE_1_PREPARATION_COMPLETE.md | less"

print_section "Git Workflow"
print_cmd "Create feature branch for transmutation" \
    "git checkout -b feat/branding/transmutation"
print_cmd "Check current status" \
    "git status"
print_cmd "View recent commits" \
    "git log --oneline -10"
print_cmd "Create atomic commit" \
    "git add -A && git commit -m 'refactor: update package names to @voidcatos'"

print_section "Execution Order (Per TRANSMUTATION_MAPPING.md)"
echo "1. Package names (package.json files)"
echo "2. Import statements (TypeScript/JavaScript)"
echo "3. Class and type names"
echo "4. Environment variables"
echo "5. CLI executable"
echo "6. Documentation"
echo "7. Configuration files"
echo "8. Test files"
echo "9. User-facing strings"

print_section "Quality Gates (Per .voidcatrules)"
echo "After each change, verify:"
echo "  ✓ Validation tests pass"
echo "  ✓ Build succeeds"
echo "  ✓ All tests pass"
echo "  ✓ Linting passes"
echo "  ✓ Formatting valid"
echo "  ✓ No new security issues"

print_section "Key Files"
echo "  • TRANSMUTATION_MAPPING.md - Complete mapping guide"
echo "  • scripts/validate-transmutation.test.ts - Validation tests"
echo "  • docs/PHASE_1_PREPARATION_COMPLETE.md - Progress summary"
echo "  • .voidcatrules - Development rules"
echo "  • VCOS_Project_Plan.md - Overall project plan"

print_section "Risk Mitigation"
echo "  ⚠️  Make small, atomic commits"
echo "  ⚠️  Test after each category of changes"
echo "  ⚠️  Keep git history clean and revertible"
echo "  ⚠️  Use automated refactoring tools where possible"
echo "  ⚠️  Review impact before committing"

echo ""
echo -e "${GREEN}✅ Ready to proceed with Phase 1 execution${NC}"
echo ""
echo -e "${YELLOW}Next Action:${NC} Review and approve TRANSMUTATION_MAPPING.md"
echo -e "${YELLOW}Blocking:${NC} VoidCat Universe API specification (Risk R-9)"
echo ""
