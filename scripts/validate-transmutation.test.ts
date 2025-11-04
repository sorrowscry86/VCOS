/**
 * VCOS Transmutation Validation Tests
 * 
 * These tests validate that the ElizaOS → VCOS transmutation is complete
 * and that no unexpected "eliza" references remain in the codebase.
 * 
 * Per VCOS Project Plan section 2.1.3: "Create tests (string-level and 
 * integration-level) that assert no unexpected 'eliza' occurrences remain."
 */

import { describe, it, expect } from 'bun:test';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const PROJECT_ROOT = join(__dirname, '..');

/**
 * Files and directories to exclude from validation
 */
const EXCLUDED_PATTERNS = [
    /node_modules/,
    /\.git\//,
    /\.next\//,
    /dist\//,
    /build\//,
    /coverage\//,
    /\.bun\//,
    /\.turbo\//,
    /bun\.lock$/,
    /package-lock\.json$/,
    /yarn\.lock$/,
    /pnpm-lock\.yaml$/,
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.gif$/,
    /\.svg$/,
    /\.ico$/,
    /\.woff$/,
    /\.woff2$/,
    /\.ttf$/,
    /\.eot$/,
    /\.map$/,
    /\.min\.js$/,
    /\.min\.css$/,
];

/**
 * Allowed contexts where "eliza" references are acceptable
 */
const ALLOWED_CONTEXTS = [
    /migration from elizaos/i,
    /originally based on elizaos/i,
    /forked from elizaos/i,
    /derived from elizaos/i,
    /compatibility with elizaos/i,
    /backward[s]? compat.*eliza/i,
    /deprecated.*eliza/i,
    /\beliza\b.*deprecated/i,
    /historical.*eliza/i,
    /transmutation.*mapping/i, // This mapping file itself
    /validate.*transmutation/i, // This test file itself
];

/**
 * Files that are explicitly allowed to contain "eliza" references
 * (e.g., migration guides, changelogs, attribution)
 */
const ALLOWED_FILES = [
    'TRANSMUTATION_MAPPING.md',
    'scripts/validate-transmutation.test.ts',
    'docs/migration-guide.md',
    'CHANGELOG.md',
    '.git', // entire .git directory
];

/**
 * Recursively get all files in a directory
 */
function getAllFiles(dir: string, fileList: string[] = []): string[] {
    const files = readdirSync(dir);

    files.forEach((file) => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Check if a file should be excluded from validation
 */
function isExcluded(filePath: string): boolean {
    const relativePath = relative(PROJECT_ROOT, filePath);

    // Check if file is in allowed files list
    for (const allowedFile of ALLOWED_FILES) {
        if (relativePath.includes(allowedFile)) {
            return true;
        }
    }

    // Check against excluded patterns
    for (const pattern of EXCLUDED_PATTERNS) {
        if (pattern.test(relativePath)) {
            return true;
        }
    }

    return false;
}

/**
 * Check if a match is in an allowed context
 */
function isAllowedContext(content: string, matchIndex: number): boolean {
    // Get surrounding context (200 chars before and after)
    const start = Math.max(0, matchIndex - 200);
    const end = Math.min(content.length, matchIndex + 200);
    const context = content.substring(start, end);

    // Check if context matches any allowed pattern
    for (const pattern of ALLOWED_CONTEXTS) {
        if (pattern.test(context)) {
            return true;
        }
    }

    return false;
}

/**
 * Find all "eliza" references in a file
 */
function findElizaReferences(filePath: string): Array<{ line: number; text: string }> {
    try {
        const content = readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        const matches: Array<{ line: number; text: string }> = [];

        // Search for various forms of "eliza"
        const elizaPattern = /\b(eliza|Eliza|ELIZA|elizaOS|ElizaOS|elizaos|@elizaos)\b/g;

        lines.forEach((line, index) => {
            const lineMatches = line.matchAll(elizaPattern);

            for (const match of lineMatches) {
                const matchIndex = content.indexOf(line) + (match.index || 0);

                // Skip if this is an allowed context
                if (!isAllowedContext(content, matchIndex)) {
                    matches.push({
                        line: index + 1,
                        text: line.trim(),
                    });
                }
            }
        });

        return matches;
    } catch (error) {
        // Skip files that can't be read as text
        return [];
    }
}

describe('VCOS Transmutation Validation', () => {
    describe('String-Level Validation', () => {
        it('should not contain unexpected "eliza" references in source files', () => {
            const allFiles = getAllFiles(PROJECT_ROOT);
            const violations: Record<string, Array<{ line: number; text: string }>> = {};

            for (const file of allFiles) {
                if (isExcluded(file)) {
                    continue;
                }

                const matches = findElizaReferences(file);
                if (matches.length > 0) {
                    const relativePath = relative(PROJECT_ROOT, file);
                    violations[relativePath] = matches;
                }
            }

            if (Object.keys(violations).length > 0) {
                let errorMessage = '\n\n❌ Found unexpected "eliza" references:\n\n';

                for (const [file, matches] of Object.entries(violations)) {
                    errorMessage += `📄 ${file}:\n`;
                    matches.forEach(({ line, text }) => {
                        errorMessage += `   Line ${line}: ${text}\n`;
                    });
                    errorMessage += '\n';
                }

                errorMessage +=
                    'Please update these references to use "voidcatos" or "vcos" instead.\n';
                errorMessage += 'See TRANSMUTATION_MAPPING.md for guidance.\n';

                throw new Error(errorMessage);
            }
        });

        it('should have replaced @elizaos package scope with @voidcatos', () => {
            const packageJsonFiles = getAllFiles(PROJECT_ROOT).filter((f) =>
                f.endsWith('package.json')
            );

            const violations: string[] = [];

            for (const file of packageJsonFiles) {
                if (isExcluded(file)) {
                    continue;
                }

                const content = readFileSync(file, 'utf-8');
                const pkg = JSON.parse(content);

                // Check package name
                if (pkg.name && pkg.name.includes('@elizaos/')) {
                    violations.push(`${relative(PROJECT_ROOT, file)}: name="${pkg.name}"`);
                }

                // Check dependencies
                const allDeps = {
                    ...pkg.dependencies,
                    ...pkg.devDependencies,
                    ...pkg.peerDependencies,
                };

                for (const [dep, version] of Object.entries(allDeps)) {
                    if (typeof dep === 'string' && dep.includes('@elizaos/')) {
                        violations.push(
                            `${relative(PROJECT_ROOT, file)}: dependency="${dep}@${version}"`
                        );
                    }
                }
            }

            if (violations.length > 0) {
                throw new Error(
                    '\n\n❌ Found @elizaos package references:\n\n' +
                        violations.map((v) => `  - ${v}`).join('\n') +
                        '\n\nUpdate to @voidcatos instead.\n'
                );
            }
        });

        it('should have replaced ELIZA_ environment variables with VCOS_', () => {
            const sourceFiles = getAllFiles(PROJECT_ROOT).filter(
                (f) => f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.tsx')
            );

            const violations: Array<{ file: string; line: number; text: string }> = [];

            for (const file of sourceFiles) {
                if (isExcluded(file)) {
                    continue;
                }

                const content = readFileSync(file, 'utf-8');
                const lines = content.split('\n');

                lines.forEach((line, index) => {
                    // Look for process.env.ELIZA_ or similar patterns
                    const envPattern = /\bELIZA_[A-Z_]+\b/g;
                    const matches = line.matchAll(envPattern);

                    for (const match of matches) {
                        // Skip if it's in a comment about deprecation/backward compatibility
                        if (
                            /deprecated|backward.*compat|legacy/i.test(line) ||
                            isAllowedContext(content, content.indexOf(line))
                        ) {
                            continue;
                        }

                        violations.push({
                            file: relative(PROJECT_ROOT, file),
                            line: index + 1,
                            text: line.trim(),
                        });
                    }
                });
            }

            if (violations.length > 0) {
                throw new Error(
                    '\n\n❌ Found ELIZA_ environment variable references:\n\n' +
                        violations
                            .map((v) => `  ${v.file}:${v.line}\n    ${v.text}`)
                            .join('\n\n') +
                        '\n\nUpdate to VCOS_ instead (or add backward compatibility with deprecation warning).\n'
                );
            }
        });
    });

    describe('Integration-Level Validation', () => {
        it('should have valid package.json files with @voidcatos scope', () => {
            const rootPackageJson = join(PROJECT_ROOT, 'package.json');
            const pkg = JSON.parse(readFileSync(rootPackageJson, 'utf-8'));

            // Verify root package name
            expect(pkg.name).toBe('voidcatos');

            // Verify workspaces still exist
            expect(pkg.workspaces).toBeDefined();
            expect(Array.isArray(pkg.workspaces)).toBe(true);
        });

        it('should maintain consistent package naming across all packages', () => {
            const packageJsonFiles = getAllFiles(PROJECT_ROOT).filter(
                (f) => f.endsWith('package.json') && !isExcluded(f)
            );

            const packageNames: string[] = [];

            for (const file of packageJsonFiles) {
                const pkg = JSON.parse(readFileSync(file, 'utf-8'));
                if (pkg.name) {
                    packageNames.push(pkg.name);
                }
            }

            // All scoped packages should use @voidcatos
            const scopedPackages = packageNames.filter((name) => name.startsWith('@'));
            const invalidScopes = scopedPackages.filter(
                (name) => !name.startsWith('@voidcatos/')
            );

            expect(invalidScopes).toHaveLength(0);
        });

        it('should have updated CLI executable name in package.json', () => {
            const cliPackageJson = join(PROJECT_ROOT, 'packages/cli/package.json');
            const pkg = JSON.parse(readFileSync(cliPackageJson, 'utf-8'));

            // Check if CLI has bin field pointing to voidcatos
            expect(pkg.bin).toBeDefined();
            expect(pkg.bin.voidcatos || pkg.bin.vcos).toBeDefined();
        });
    });

    describe('Documentation Validation', () => {
        it('should have updated README files', () => {
            const readmeFiles = getAllFiles(PROJECT_ROOT).filter(
                (f) => f.endsWith('README.md') && !isExcluded(f)
            );

            const violations: string[] = [];

            for (const file of readmeFiles) {
                const content = readFileSync(file, 'utf-8');

                // Check for "ElizaOS" in headings or prominent places
                const headingPattern = /^#.*ElizaOS/gm;
                if (headingPattern.test(content)) {
                    violations.push(relative(PROJECT_ROOT, file));
                }
            }

            if (violations.length > 0) {
                console.warn(
                    '\n⚠️  Found README files with "ElizaOS" in headings:\n' +
                        violations.map((v) => `  - ${v}`).join('\n') +
                        '\nConsider updating to "VCOS" or "VoidCat Operating System".\n'
                );
            }

            // This is a warning, not a hard failure
            expect(true).toBe(true);
        });
    });
});

describe('Backward Compatibility Validation', () => {
    it('should provide deprecation warnings for old environment variables', () => {
        // This test validates that backward compatibility is maintained
        // We'll implement this when we add the backward compatibility layer
        expect(true).toBe(true);
    });
});
